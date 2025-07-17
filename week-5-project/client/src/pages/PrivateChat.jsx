import React, { useState, useRef, useEffect } from 'react';

const PrivateChat = ({
  username,
  users,
  sendPrivateMessage,
  messages,
  markAsRead,
  reactToMessage,
}) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Mark all visible private messages as read
    messages
      .filter(
        msg =>
          msg.isPrivate &&
          ((msg.sender === username && msg.to === recipient) ||
            (msg.sender === recipient && msg.to === username)) &&
          !msg.readBy?.includes(username)
      )
      .forEach(msg => markAsRead(msg.id));
  }, [messages, username, recipient, markAsRead]);

  const handleSend = (e) => {
    e.preventDefault();
    if (recipient && message.trim()) {
      sendPrivateMessage(recipient, message.trim());
      setMessage('');
    }
  };

  return (
    <div className="private-chat">
      <h3>Private Messaging</h3>
      <select value={recipient} onChange={e => setRecipient(e.target.value)}>
        <option value="">Select user</option>
        {users.filter(u => u.username !== username).map(u => (
          <option key={u.id} value={u.username}>{u.username}</option>
        ))}
      </select>
      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a private message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit" disabled={!recipient || !message.trim()}>Send</button>
      </form>
      <div className="private-messages">
        <h4>Conversation</h4>
        {messages
          .filter(
            msg =>
              msg.isPrivate &&
              ((msg.sender === username && msg.to === recipient) ||
                (msg.sender === recipient && msg.to === username))
          )
          .map((msg, idx) => (
            <div key={msg.id || idx} className={msg.sender === username ? 'my-msg' : 'other-msg'}>
              <span><b>{msg.sender}:</b> {msg.message}</span>
              <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              <span>
                {msg.readBy && msg.readBy.length > 1 && (
                  <span title={`Read by: ${msg.readBy.join(', ')}`}>✓</span>
                )}
              </span>
              <button onClick={() => reactToMessage(msg.id, '❤️')}>❤️</button>
              <span>{msg.reactions && Object.values(msg.reactions).join(' ')}</span>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default PrivateChat;