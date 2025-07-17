import React from 'react';

export default function Button({ children, onClick, disabled, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${disabled ? 'btn-disabled' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}