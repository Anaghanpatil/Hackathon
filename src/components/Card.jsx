import React from 'react';
import './Card.css';

export default function Card({ children, className = '', onClick, hoverable = false }) {
  return (
    <div 
      className={`card ${hoverable || onClick ? 'card-hoverable' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
