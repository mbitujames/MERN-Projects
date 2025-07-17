import React, { useState } from 'react';
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
import PrivateChat from './pages/PrivateChat';
import Rooms from './pages/Channels';
import Profile from './pages/Profile';
import { useSocket } from './socket/socket';

const App = () => {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState('chat'); // 'chat', 'private', 'rooms', 'profile'
  const [currentRoom, setCurrentRoom] = useState('General');
  const [privateRecipient, setPrivateRecipient] = useState('');

  const {
    users,
    rooms,
    joinRoom,
    createRoom,
    sendPrivateMessage,
    sendMessage,
    sendFile,
    messages,
    typingUsers,
    setTyping,
    markAsRead,
    reactToMessage,
    connect,
    disconnect,
    isConnected,
  } = useSocket();

  if (!username) return <Login onLogin={setUsername} />;

  return (
    <div className="app-container">
      <nav>
        <button onClick={() => setPage('chat')}>Chat Room</button>
        <button onClick={() => setPage('private')}>Private Chat</button>
        <button onClick={() => setPage('rooms')}>Rooms</button>
        <button onClick={() => setPage('profile')}>Profile</button>
      </nav>
      {page === 'chat' && (
        <ChatRoom
          username={username}
          currentRoom={currentRoom}
          users={users}
          messages={messages}
          sendMessage={sendMessage}
          sendFile={sendFile}
          typingUsers={typingUsers}
          setTyping={setTyping}
          markAsRead={markAsRead}
          reactToMessage={reactToMessage}
          connect={connect}
          disconnect={disconnect}
          isConnected={isConnected}
        />
      )}
      {page === 'private' && (
        <PrivateChat
          username={username}
          users={users}
          sendPrivateMessage={sendPrivateMessage}
          messages={messages}
          markAsRead={markAsRead}
          reactToMessage={reactToMessage}
        />
      )}
      {page === 'rooms' && (
        <Rooms
          rooms={rooms}
          currentRoom={currentRoom}
          joinRoom={room => {
            setCurrentRoom(room);
            joinRoom(room);
            setPage('chat');
          }}
          createRoom={createRoom}
        />
      )}
      {page === 'profile' && (
        <Profile username={username} onUpdateUsername={setUsername} />
      )}
    </div>
  );
};

export default App;