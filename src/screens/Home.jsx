import React, { useState, useEffect } from 'react';
import { Pill, MessageSquare, Stethoscope, Video, TriangleAlert, Sun, Moon } from 'lucide-react';
import Card from '../components/Card';
import Tag from '../components/Tag';
import { supabase } from '../utils/supabaseClient';
import './Home.css';

export default function Home({ navigate, theme, toggleTheme }) {
  const [recentOrder, setRecentOrder] = useState(null);
  const [recentTriage, setRecentTriage] = useState(null);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const { data: orderData } = await supabase.from('pharmacy_orders').select('*').order('created_at', { ascending: false }).limit(1);
        if (orderData && orderData.length > 0) setRecentOrder(orderData[0]);

        const { data: triageData } = await supabase.from('triage_history').select('*').order('created_at', { ascending: false }).limit(1);
        if (triageData && triageData.length > 0) setRecentTriage(triageData[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="screen animate-fade-in">
      <div className="nav-top">
        <div className="nav-logo">
          <div className="nav-dot"><Stethoscope size={14} color="white" /></div>
          <span className="nav-title">TriageAI</span>
        </div>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <div className="nav-avatar">AK</div>
        </div>
      </div>
      
      <div className="content">
        <div className="home-wrapper">
          <div className="welcome-box glass">
            <div className="welcome-name">Good morning, Arjun</div>
            <div className="welcome-sub">How are you feeling today?</div>
          </div>

          <div className="emergency-bar hover-scale" onClick={() => navigate('emergency')}>
            <div className="emergency-icon-wrap">
              <TriangleAlert size={16} color="white" />
            </div>
            <div>
              <div className="emergency-bar-text">Emergency? Call 108 immediately</div>
              <div className="emergency-bar-sub">Chest pain, difficulty breathing, severe injury</div>
            </div>
          </div>

          <div className="section-header">
            <h2 className="section-title">What do you need?</h2>
          </div>
          
          <div className="action-grid">
            <div className="action-tile" onClick={() => navigate('symptom')}>
              <div className="action-icon" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <Stethoscope size={24} />
              </div>
              <div className="action-label">Check symptoms</div>
              <div className="action-sub">AI-guided triage</div>
            </div>
            <div className="action-tile" onClick={() => navigate('chat')}>
              <div className="action-icon" style={{ background: 'var(--color-info-light)', color: 'var(--color-info)' }}>
                <MessageSquare size={24} />
              </div>
              <div className="action-label">Ask Dr. Aiva</div>
              <div className="action-sub">Medical chatbot</div>
            </div>
            <div className="action-tile" onClick={() => navigate('teleconsult')}>
              <div className="action-icon" style={{ background: '#F0ECFD', color: '#7F77DD' }}>
                <Video size={24} />
              </div>
              <div className="action-label">See a doctor</div>
              <div className="action-sub">Live teleconsult</div>
            </div>
            <div className="action-tile" onClick={() => navigate('pharmacy')}>
              <div className="action-icon" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                <Pill size={24} />
              </div>
              <div className="action-label">Pharmacy</div>
              <div className="action-sub">Order medicines</div>
            </div>
          </div>

          <div className="section-header" style={{ marginTop: '24px' }}>
            <h2 className="section-title">Recent activity</h2>
          </div>
          
          <Card hoverable className="activity-card" onClick={() => navigate('delivery')}>
            <div className="activity-item">
              <div>
                <div className="activity-title">
                  {recentOrder ? `Order #${recentOrder.id} — ${recentOrder.status || 'Preparing'}` : 'Order #4821 — On the way'}
                </div>
                <div className="activity-desc">
                  {recentOrder ? `${recentOrder.items?.length || 0} items` : 'Metformin 500mg · Vitamin D3 · Cetrizine'}
                </div>
              </div>
              <Tag color="amber">~7 min</Tag>
            </div>
          </Card>
          
          <Card hoverable className="activity-card" onClick={() => navigate('triage')} style={{ marginTop: '12px' }}>
            <div className="activity-item">
              <div>
                <div className="activity-title">
                  {recentTriage ? `Triage — ${recentTriage.result_level}` : 'Triage — Upper respiratory'}
                </div>
                <div className="activity-desc">
                  {recentTriage ? recentTriage.result_desc.slice(0, 40) + '...' : 'Self-care recommended · 2 days ago'}
                </div>
              </div>
              <Tag color="green">Mild</Tag>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
