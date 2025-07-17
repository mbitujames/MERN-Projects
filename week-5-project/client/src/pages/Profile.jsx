import React, { useState } from 'react';

const Profile = ({ username, onUpdateUsername }) => {
  const [newUsername, setNewUsername] = useState(username);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (newUsername.trim() && newUsername !== username) {
      onUpdateUsername(newUsername.trim());
    }
  };

  return (
    <div className="profile">
      <h3>User Profile</h3>
      <form onSubmit={handleUpdate}>
        <label>
          Username:
          <input
            type="text"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
          />
        </label>
        <button type="submit" disabled={newUsername === username}>Update</button>
      </form>
    </div>
  );
};

export default Profile;