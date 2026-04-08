import React from 'react';
import './Button.css';

export default function Button({ 
  children, 
  variant = 'secondary', 
  size = 'md', 
  fullWidth = false, 
  onClick, 
  icon,
  className = '',
  disabled = false
}) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
