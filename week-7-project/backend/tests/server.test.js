const request = require('supertest');
const mongoose = require('mongoose');
const { createServer } = require('http');
const express = require('express');
const { Server } = require('socket.io');
const Client = require('socket.io-client');
const User = require('../models/User');
const Message = require('../models/Message');

let app, server, io, clientSocket;

beforeAll(async () => {
  // Connect to test MongoDB
  const mongoURI = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/mernapp_test';
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = express();
  app.use(express.json());

  // Mock routes from server.js
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  });

  app.post('/api/users', async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });
    let user = await User.findOne({ username });
    if (user) return res.status(200).json(user); // Return existing user for login
    user = new User({ username });
    await user.save();
    res.status(201).json(user);
  });

  app.get('/api/users', async (req, res) => {
    const users = await User.find().sort({ createdAt: 1 });
    res.json(users);
  });

  app.get('/api/messages', async (req, res) => {
    const messages = await Message.find().populate('sender', 'username').sort({ createdAt: 1 });
    res.json(messages);
  });

  server = createServer(app);
  io = new Server(server);

  io.on('connection', (socket) => {
    socket.on('sendMessage', async ({ senderId, content }) => {
      const message = new Message({ sender: senderId, content });
      await message.save();
      const populatedMessage = await message.populate('sender', 'username');
      io.emit('newMessage', populatedMessage);
    });
  });

  await new Promise((resolve) => {
    server.listen(() => {
      const port = server.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      clientSocket.on('connect', resolve);
    });
  });
});

beforeEach(async () => {
  await User.deleteMany({});
  await Message.deleteMany({});
});

afterAll(async () => {
  clientSocket.close();
  io.close();
  server.close();
  await mongoose.connection.close();
});

describe('Backend API and Socket.io', () => {
  test('Health check endpoint', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('User registration and duplicate username', async () => {
    const username = 'testuser';
    const res1 = await request(app).post('/api/users').send({ username });
    expect(res1.statusCode).toBe(201);
    expect(res1.body.username).toBe(username);

    const res2 = await request(app).post('/api/users').send({ username });
    expect(res2.statusCode).toBe(200);
    expect(res2.body.username).toBe(username);
  });

  test('Get users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Get messages', async () => {
    const res = await request(app).get('/api/messages');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Socket.io send and receive message', (done) => {
    clientSocket.once('newMessage', (message) => {
      expect(message).toHaveProperty('content', 'Hello from test');
      expect(message).toHaveProperty('sender');
      done();
    });

    // Create a user first
    User.findOne().then(user => {
      if (!user) {
        user = new User({ username: 'socketuser' });
        user.save().then(() => {
          clientSocket.emit('sendMessage', { senderId: user._id.toString(), content: 'Hello from test' });
        });
      } else {
        clientSocket.emit('sendMessage', { senderId: user._id.toString(), content: 'Hello from test' });
      }
    });
  });
});
