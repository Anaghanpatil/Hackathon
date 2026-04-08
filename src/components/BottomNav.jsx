import React from 'react';
import { Home, Stethoscope, Pill, MessageSquare } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav({ currentScreen, navigate }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'symptom', label: 'Triage', icon: Stethoscope },
    { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
    { id: 'chat', label: 'Dr. Aiva', icon: MessageSquare }
  ];

  return (
    <nav className="bottom-nav glass">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            className={`bnav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(tab.id)}
          >
            <Icon size={20} className={isActive ? 'icon-active animate-fade-in' : ''} />
            <span className="bnav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
