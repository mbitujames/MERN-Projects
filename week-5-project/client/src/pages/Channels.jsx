import React, { useState } from 'react';

const Rooms = ({ rooms, currentRoom, joinRoom, createRoom }) => {
  const [newRoom, setNewRoom] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (newRoom.trim() && !rooms.includes(newRoom.trim())) {
      createRoom(newRoom.trim());
      setNewRoom('');
    }
  };

  return (
    <div className="rooms">
      <h3>Chat Rooms</h3>
      <ul>
        {rooms.map(room => (
          <li key={room}>
            <button
              disabled={room === currentRoom}
              onClick={() => joinRoom(room)}
            >
              {room} {room === currentRoom && '(joined)'}
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New room name"
          value={newRoom}
          onChange={e => setNewRoom(e.target.value)}
        />
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default Rooms;