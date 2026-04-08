import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './HeaderNav.css';

export default function HeaderNav({ title, onBack, rightContent, noBorder }) {
  return (
    <div className={`header-nav ${noBorder ? 'no-border' : ''} glass`}>
      <div className="header-left">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={18} />
          </button>
        )}
      </div>
      <div className="header-title">{title}</div>
      <div className="header-right">
        {rightContent}
      </div>
    </div>
  );
}
