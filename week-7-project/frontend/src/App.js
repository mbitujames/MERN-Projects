import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('general');
  const [rooms, setRooms] = useState(['general']);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef();

  useEffect(() => {
    fetchUsers();
    fetchMessages();

    socket.on('newMessage', (message) => {
      if (message.room === currentRoom) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on('userTyping', ({ username, room }) => {
      if (room === currentRoom && username !== loggedInUser?.username) {
        setTypingUsers((prev) => {
          if (!prev.includes(username)) return [...prev, username];
          return prev;
        });
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setTypingUsers((prev) => prev.filter((u) => u !== username));
        }, 3000);
      }
    });

    socket.on('roomMessages', (roomMessages) => {
      setMessages(roomMessages);
    });

    socket.on('roomUsers', (roomUsers) => {
      setUsers(roomUsers);
    });

    return () => {
      socket.off('newMessage');
      socket.off('userTyping');
      socket.off('roomMessages');
      socket.off('roomUsers');
    };
  }, [currentRoom, loggedInUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  const handleLogin = async () => {
    if (!username.trim()) return;
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (res.ok) {
        const user = await res.json();
        setLoggedInUser(user);
        setUsername('');
        socket.emit('joinRoom', { room: 'general', username: user.username });
      } else {
        const error = await res.json();
        alert(error.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !loggedInUser) return;
    socket.emit('sendMessage', {
      senderId: loggedInUser._id,
      content: messageInput,
      room: currentRoom,
    });
    setMessageInput('');
  };

  const handleLogout = () => {
    socket.emit('leaveRoom', { room: currentRoom, username: loggedInUser.username });
    setLoggedInUser(null);
    setMessages([]);
    setUsers([]);
    setUsername('');
    setCurrentRoom('general');
  };

  const handleTyping = () => {
    socket.emit('typing', { username: loggedInUser.username, room: currentRoom });
  };

  const handleRoomChange = (room) => {
    if (room === currentRoom) return;
    socket.emit('leaveRoom', { room: currentRoom, username: loggedInUser.username });
    setCurrentRoom(room);
    socket.emit('joinRoom', { room, username: loggedInUser.username });
  };

  const handleCreateRoom = () => {
    const newRoom = prompt('Enter new room name');
    if (newRoom && !rooms.includes(newRoom)) {
      setRooms((prev) => [...prev, newRoom]);
      handleRoomChange(newRoom);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!loggedInUser) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', padding: 20, border: '1px solid #ccc' }}>
      <h2>Chat App</h2>
      <div>
        <strong>Logged in as:</strong> {loggedInUser.username} <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <strong>Rooms:</strong>
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => handleRoomChange(room)}
            disabled={room === currentRoom}
            style={{ marginLeft: 5 }}
          >
            {room}
          </button>
        ))}
        <button onClick={handleCreateRoom} style={{ marginLeft: 5 }}>
          + Create Room
        </button>
      </div>
      <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ddd', padding: 10, marginTop: 10 }}>
        {messages.map((msg) => (
          <div key={msg._id} style={{ marginBottom: 5 }}>
            <strong>{msg.sender?.username || 'Unknown'}:</strong> {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {typingUsers.length > 0 && (
        <p>
          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
        </p>
      )}
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSendMessage();
          else handleTyping();
        }}
        style={{ flex: 1, marginRight: 10 }}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default App;
