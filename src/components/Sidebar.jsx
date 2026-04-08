import React, { useState, useEffect } from 'react';
import { Home, Stethoscope, MessageSquare, Video, Pill, Sun, Moon, Plus, MessageCircle } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import './Sidebar.css';

export default function Sidebar({ currentScreen, navigate, theme, toggleTheme, activeSessionId, setActiveSessionId }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setSessions(data);
    };
    fetchSessions();
  }, [activeSessionId, currentScreen]);

  const handleNewChat = () => {
    setActiveSessionId(null);
    navigate('chat');
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'symptom', icon: Stethoscope, label: 'Check Symptoms' },
    { id: 'chat', icon: MessageSquare, label: 'Ask Dr. Aiva' },
    { id: 'teleconsult', icon: Video, label: 'Teleconsult' },
    { id: 'pharmacy', icon: Pill, label: 'Pharmacy' },
  ];

  return (
    <aside className="desktop-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="nav-dot"><Stethoscope size={16} color="white" /></div>
          <span className="sidebar-title">TriageAI</span>
        </div>
      </div>
      
      <button className="new-chat-btn hover-scale" onClick={handleNewChat}>
        <Plus size={18} />
        <span>New Chat</span>
      </button>

      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id && (item.id !== 'chat' || !activeSessionId);
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                 if (item.id === 'chat') handleNewChat();
                 else navigate(item.id);
              }}
            >
              <Icon size={20} className="sidebar-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-history">
        <div className="history-label">Recent Chats</div>
        <div className="history-list">
          {sessions.map(s => (
            <button 
              key={s.id} 
              className={`history-item ${activeSessionId === s.id && currentScreen === 'chat' ? 'active' : ''}`}
              onClick={() => {
                setActiveSessionId(s.id);
                navigate('chat');
              }}
            >
              <MessageCircle size={16} className="history-icon" />
              <span className="history-title">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-theme-toggle hover-scale" onClick={toggleTheme}>
          {theme === 'light' ? (
            <><Moon size={18} /><span>Dark Mode</span></>
          ) : (
            <><Sun size={18} /><span>Light Mode</span></>
          )}
        </button>
        <div className="sidebar-user">
          <div className="nav-avatar">AK</div>
          <div className="user-details">
            <div className="user-name">Arjun K.</div>
            <div className="user-plan">Premium Member</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
