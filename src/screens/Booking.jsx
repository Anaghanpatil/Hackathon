import React from 'react';
import HeaderNav from '../components/HeaderNav';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Booking({ navigate }) {
  return (
    <div className="screen animate-fade-in">
      <HeaderNav title="Confirm booking" onBack={() => navigate('teleconsult')} />
      
      <div className="content">
        <Card style={{ textAlign: 'center', padding: '24px 16px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%', background: '#F0ECFD', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto 16px', fontWeight: '600', fontSize: '20px', color: '#7F77DD'
          }}>PR</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)' }}>Dr. Priya Rajan</div>
          <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>General Medicine</div>
          
          <div style={{ margin: '20px 0', padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '6px 0', color: 'var(--color-text-secondary)' }}>
              <span>Consultation fee</span>
              <span style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>₹299</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '6px 0', color: 'var(--color-text-secondary)' }}>
              <span>Platform fee</span>
              <span style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>₹29</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', padding: '10px 0 4px', borderTop: '1px solid var(--color-border-tertiary)', marginTop: '8px' }}>
              <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>Total</span>
              <span style={{ fontWeight: '700', color: 'var(--color-primary-dark)' }}>₹328</span>
            </div>
          </div>
          
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
            Estimated wait: ~3 minutes. You'll receive a secure video link via SMS.
          </div>
          
          <Button variant="primary" fullWidth size="lg" onClick={() => navigate('home')}>
            Confirm & Pay ₹328
          </Button>
        </Card>
        
        <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
          By booking, you agree to our teleconsultation terms. This is not an emergency service.
        </div>
      </div>
    </div>
  );
}
