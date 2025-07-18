import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Chat App', () => {
  test('renders login screen initially', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeTruthy();
    expect(screen.getByPlaceholderText(/enter username/i)).toBeTruthy();
  });

  test('allows user to login and shows chat UI', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter username/i);
    const button = screen.getByRole('button', { name: /login/i });

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'div' && content.includes('Logged in as:');
      })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /chat app/i })).toBeInTheDocument();
    });
  });

  test('allows sending a message', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter username/i);
    const button = screen.getByRole('button', { name: /login/i });

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);

    await waitFor(() => screen.getByText(/logged in as:/i));

    const messageInput = screen.getByPlaceholderText(/type a message/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(messageInput, { target: { value: 'Hello world' } });
    fireEvent.click(sendButton);

    // Since socket.io is mocked, we can't test real message sending here
    // But we can check input cleared
    expect(messageInput.value).toBe('');
  });
});
