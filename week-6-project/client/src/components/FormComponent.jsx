import React, { useState } from 'react';
import axios from 'axios';

function FormComponent() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      const response = await axios.post('/api/form-submit', { name });
      if (response.data.success) {
        setSuccess(true);
        setName('');
      }
    } catch (err) {
      setError('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Name"
      />
      {error && <div role="alert">{error}</div>}
      {success && <div role="alert">Submission successful</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;