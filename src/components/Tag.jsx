import React from 'react';
import './Tag.css';

export default function Tag({ children, color = 'green', className = '' }) {
  return (
    <span className={`tag tag-${color} ${className}`}>
      {children}
    </span>
  );
}
