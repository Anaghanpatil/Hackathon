import React, { useState, useEffect } from 'react';
import HeaderNav from '../components/HeaderNav';
import Card from '../components/Card';
import './Delivery.css';

export default function Delivery({ navigate }) {
  const [eta, setEta] = useState(443);

  useEffect(() => {
    const int = setInterval(() => setEta(e => (e > 0 ? e - 1 : 0)), 1000);
    return () => clearInterval(int);
  }, []);

  const mins = Math.floor(eta / 60);
  const secs = eta % 60;
  const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <div className="screen animate-fade-in">
      <HeaderNav title="Order tracking" onBack={() => navigate('home')} />
      
      <div className="content">
        <div className="delivery-status glass">
          <div className="eta-row">
            <div className="eta-timer">{timeStr}</div>
            <div className="eta-text">minutes away</div>
          </div>
          <div className="delivery-label">Courier Ravi K. is on the way</div>
        </div>
        
        <Card>
          <div className="order-id">Order #4821</div>
          
          <div className="steps-track">
            <div className="step-row">
              <div className="step-line-wrap"><div className="step-dot done"></div><div className="step-connector done"></div></div>
              <div className="step-info">
                <div className="step-title">Order confirmed</div>
                <div className="step-sub">2:14 PM · Payment received</div>
              </div>
            </div>
            <div className="step-row">
              <div className="step-line-wrap"><div className="step-dot done"></div><div className="step-connector done"></div></div>
              <div className="step-info">
                <div className="step-title">Pharmacy packed</div>
                <div className="step-sub">2:16 PM · Verified & packed</div>
              </div>
            </div>
            <div className="step-row">
              <div className="step-line-wrap"><div className="step-dot active"></div><div className="step-connector"></div></div>
              <div className="step-info">
                <div className="step-title active">Out for delivery</div>
                <div className="step-sub">Ravi K. · 1.2 km away</div>
              </div>
            </div>
            <div className="step-row">
              <div className="step-line-wrap"><div className="step-dot pending"></div></div>
              <div className="step-info" style={{ paddingBottom: 0 }}>
                <div className="step-title pending">Delivered</div>
                <div className="step-sub">Expected 2:24 PM</div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Items (3)</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
            Metformin 500mg ×2<br/>Vitamin D3 ×1<br/>Cetrizine ×1
          </div>
        </Card>
      </div>
    </div>
  );
}
