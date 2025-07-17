// socket.js - Socket.io client setup
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { playSound, showBrowserNotification, requestNotificationPermission } from '../utils/notify';

// Socket.io connection URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Create socket instance
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Custom hook for using socket.io
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Connect to socket server
  const connect = (username) => {
    socket.connect();
    if (username) {
      socket.emit('user_join', username);
    }
  };

  // Disconnect from socket server
  const disconnect = () => {
    socket.disconnect();
  };

  // Send a message
  const sendMessage = (message) => {
    socket.emit('send_message', { message });
  };

  // Send a private message
  const sendPrivateMessage = (to, message) => {
    socket.emit('private_message', { to, message });
  };

  // Set typing status
  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  // --- Advanced features ---
  const rooms = ['General'];
  const joinRoom = (room) => {
    socket.emit('join_room', room);
  };
  const createRoom = (room) => {
    socket.emit('create_room', room);
  };
  const sendFile = ({ text, file, fileName }) => {
    socket.emit('send_file', { text, file, fileName });
  };
  const markAsRead = (messageId) => {
    socket.emit('read_message', messageId);
  };
  const reactToMessage = (messageId, reaction) => {
    socket.emit('react_message', { messageId, reaction });
  };

  // Socket event listeners
  useEffect(() => {
    requestNotificationPermission();

    // Connection events
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    // Message events
    const onReceiveMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
      // Notifications
      if (document.visibilityState !== 'visible') {
        setUnreadCount((c) => c + 1);
        playSound();
        showBrowserNotification('New Message', {
          body: `${message.sender}: ${message.message}`,
        });
      }
    };

    const onPrivateMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
      if (document.visibilityState !== 'visible') {
        setUnreadCount((c) => c + 1);
        playSound();
        showBrowserNotification('Private Message', {
          body: `${message.sender}: ${message.message}`,
        });
      }
    };

    // User events
    const onUserList = (userList) => {
      setUsers(userList);
    };

    const onUserJoined = (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} joined the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
      playSound();
      showBrowserNotification('User Joined', {
        body: `${user.username} joined the chat`,
      });
    };

    const onUserLeft = (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} left the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
      playSound();
      showBrowserNotification('User Left', {
        body: `${user.username} left the chat`,
      });
    };

    // Typing events
    const onTypingUsers = (users) => {
      setTypingUsers(users);
    };

    // Register event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('private_message', onPrivateMessage);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);

    // Clean up event listeners
    window.addEventListener('focus', () => setUnreadCount(0));
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('private_message', onPrivateMessage);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
      window.removeEventListener('focus', () => setUnreadCount(0));
    };
  }, []);

  return {
    socket,
    isConnected,
    lastMessage,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    rooms,
    joinRoom,
    createRoom,
    sendFile,
    markAsRead,
    reactToMessage,
    unreadCount,
  };
};

export default socket;