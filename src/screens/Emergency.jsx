import React from 'react';
import { Phone, PhoneCall } from 'lucide-react';
import HeaderNav from '../components/HeaderNav';
import Button from '../components/Button';

export default function Emergency({ navigate }) {
  return (
    <div className="screen animate-fade-in" style={{ backgroundColor: 'var(--color-surface)' }}>
      <HeaderNav 
        title={<span style={{ color: 'var(--color-danger)' }}>Emergency</span>} 
        onBack={() => navigate('home')} 
      />
      
      <div className="content" style={{ textAlign: 'center', paddingTop: '40px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-danger)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(226, 75, 74, 0.4)'
        }}>
          <Phone size={36} color="white" fill="white" />
        </div>
        
        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-danger)', marginBottom: '12px' }}>Call Emergency Services</div>
        <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '40px', lineHeight: '1.5', padding: '0 20px' }}>
          If you or someone nearby has a life-threatening emergency, call for help immediately.
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a href="tel:108" style={{ textDecoration: 'none' }}>
            <Button variant="danger" fullWidth size="lg" icon={<PhoneCall size={18} />} className="hover-scale">
              Call 108 — Ambulance
            </Button>
          </a>
          
          <Button variant="secondary" fullWidth size="lg">
            Call 102 — Women & Children
          </Button>
          
          <Button variant="primary" fullWidth size="lg" onClick={() => navigate('teleconsult')} style={{ marginTop: '16px' }}>
            Connect to doctor now
          </Button>
        </div>
        
        <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
          TriageAI does not provide emergency dispatch services.
        </div>
      </div>
    </div>
  );
}
