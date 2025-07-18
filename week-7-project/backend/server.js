require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mernapp';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the MERN backend API' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// User registration endpoint
app.post('/api/users', async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });
    let user = await User.findOne({ username });
    if (user) {
      // Return existing user for login
      return res.status(200).json(user);
    }
    user = new User({ username });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Get all users
app.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Get all messages
app.get('/api/messages', async (req, res, next) => {
  try {
    const messages = await Message.find().populate('sender', 'username').sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('sendMessage', async ({ senderId, content, room }) => {
    try {
      const message = new Message({ sender: senderId, content, room });
      await message.save();
      const populatedMessage = await message.populate('sender', 'username');
      io.to(room).emit('newMessage', populatedMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('joinRoom', async ({ room, username }) => {
    socket.join(room);
    // Optionally emit room users and messages
    const roomUsers = await User.find({ username: { $ne: username } }); // Simplified example
    const roomMessages = await Message.find({ room }).populate('sender', 'username').sort({ createdAt: 1 });
    io.to(room).emit('roomUsers', roomUsers);
    io.to(room).emit('roomMessages', roomMessages);
  });

  socket.on('leaveRoom', ({ room, username }) => {
    socket.leave(room);
    // Optionally update room users
  });

  socket.on('typing', ({ username, room }) => {
    socket.to(room).emit('userTyping', { username, room });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
