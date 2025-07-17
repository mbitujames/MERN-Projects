import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import FormComponent from '../../components/FormComponent'; // hypothetical form component

jest.mock('axios');

describe('FormComponent Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form and submits data successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<FormComponent />);

    const input = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/form-submit', { name: 'John Doe' });
      expect(screen.getByText(/submission successful/i)).toBeInTheDocument();
    });
  });

  it('shows validation error when input is empty', async () => {
    render(<FormComponent />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });
});