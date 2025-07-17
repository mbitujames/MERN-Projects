import React, { useState, useEffect, useRef } from 'react';

const ChatRoom = ({
  username,
  currentRoom,
  users = [],
  messages = [],
  sendMessage,
  sendFile,
  typingUsers = [],
  setTyping,
  markAsRead,
  reactToMessage,
  connect,
  disconnect,
  isConnected,
}) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef(null);

  const MESSAGES_PER_PAGE = 20;
  const paginatedMessages = messages.slice(-page * MESSAGES_PER_PAGE);

  useEffect(() => {
    connect(username, currentRoom);
    return () => disconnect();
    // eslint-disable-next-line
  }, [username, currentRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Mark all visible messages as read
    paginatedMessages.forEach(msg => {
      if (!msg.readBy?.includes(username)) markAsRead(msg.id);
    });
    // eslint-disable-next-line
  }, [paginatedMessages, username, markAsRead]);

  const handleInput = (e) => {
    setMessage(e.target.value);
    setTyping(e.target.value.length > 0);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        sendFile({ text: message.trim(), file: reader.result, fileName: file.name });
        setFile(null);
      };
      reader.readAsDataURL(file);
    } else if (message.trim()) {
      sendMessage(message.trim());
    }
    setMessage('');
    setTyping(false);
  };

  return (
    <div className="chat-room">
      <aside className="user-list">
        <h4>Online Users</h4>
        <ul>
          {users.map(user => (
            <li key={user.id || user.username}>{user.username}</li>
          ))}
        </ul>
      </aside>
      <main className="chat-main">
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <div className="messages">
          {messages.length > paginatedMessages.length && (
            <button onClick={() => setPage(page + 1)}>Load More</button>
          )}
          {paginatedMessages
            .filter(msg => !msg.isPrivate && (msg.room === currentRoom || !msg.room))
            .filter(msg => msg.message?.toLowerCase().includes(search.toLowerCase()))
            .map(msg => (
              <div key={msg.id} className={msg.system ? 'system-msg' : msg.sender === username ? 'my-msg' : 'other-msg'}>
                <span className="sender">{msg.system ? '' : msg.sender} </span>
                <span className="text">{msg.message}</span>
                {msg.file && (
                  <a href={msg.file} download={msg.fileName} target="_blank" rel="noopener noreferrer">
                    {msg.fileName}
                  </a>
                )}
                <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                <span>
                  {msg.readBy && msg.readBy.length > 1 && (
                    <span title={`Read by: ${msg.readBy.join(', ')}`}>✓</span>
                  )}
                </span>
                <button onClick={() => reactToMessage(msg.id, '👍')}>👍</button>
                <span>{msg.reactions && Object.values(msg.reactions).join(' ')}</span>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="typing-indicator">
          {typingUsers.length > 0 && (
            <span>
              {typingUsers.filter(u => u !== username).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </span>
          )}
        </div>
        <form className="chat-input" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleInput}
            onBlur={() => setTyping(false)}
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit" disabled={!isConnected || (!message.trim() && !file)}>Send</button>
        </form>
      </main>
    </div>
  );
};

export default ChatRoom;