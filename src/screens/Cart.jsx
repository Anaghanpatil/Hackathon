import React, { useState } from 'react';
import HeaderNav from '../components/HeaderNav';
import Tag from '../components/Tag';
import Card from '../components/Card';
import Button from '../components/Button';
import { supabase } from '../utils/supabaseClient';

export default function Cart({ navigate, cartCount }) {
  const [autoRefill, setAutoRefill] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const placeOrder = async () => {
    setOrdering(true);
    try {
      const items = [
        { name: 'Metformin 500mg', qty: 2, price: 84 },
        { name: 'Vitamin D3 60K', qty: 1, price: 88 }
      ];
      await supabase.from('pharmacy_orders').insert({
        items,
        total_amount: 172,
        is_auto_refill: autoRefill
      });
    } catch (e) {
      console.error(e);
    }
    setOrdering(false);
    navigate('delivery');
  };

  return (
    <div className="screen animate-fade-in">
      <HeaderNav title="Your cart" onBack={() => navigate('pharmacy')} />
      
      <div className="content">
        {cartCount === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-secondary)' }}>
            Your cart is empty.
          </div>
        ) : (
          <>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--color-border-tertiary)' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--border-radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--color-text-tertiary)' }}>M</div>
                <div style={{ flex: 1, marginLeft: '12px' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>Metformin 500mg</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>×2 strips</div>
                </div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>₹84</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--color-warning-light)', borderRadius: 'var(--border-radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--color-warning)' }}>V</div>
                <div style={{ flex: 1, marginLeft: '12px' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>Vitamin D3 60K</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>×1 strip</div>
                </div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>₹88</div>
              </div>
            </Card>

            <Card style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Delivery address</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>15, Indiranagar, Bengaluru — 560038</div>
              <div style={{ marginTop: '12px' }}>
                <Tag color="teal">~8 min delivery</Tag>
              </div>
            </Card>

            <Card style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '4px 0', color: 'var(--color-text-secondary)' }}>
                <span>Subtotal</span><span>₹172</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '4px 0', color: 'var(--color-text-secondary)' }}>
                <span>Delivery</span><span style={{ color: 'var(--color-primary-dark)', fontWeight: '500' }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '600', padding: '12px 0 4px', borderTop: '1px solid var(--color-border-tertiary)', marginTop: '8px' }}>
                <span>Total</span><span style={{ color: 'var(--color-primary-dark)' }}>₹172</span>
              </div>
            </Card>

            <div 
              style={{ marginTop: '16px', padding: '16px', background: 'var(--color-info-light)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-info)', cursor: 'pointer' }}
              onClick={() => setAutoRefill(!autoRefill)}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={autoRefill}
                  readOnly
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-info)' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-info-dark)' }}>Set up monthly auto-refill for Metformin</span>
              </label>
            </div>

            <Button variant="primary" fullWidth size="lg" style={{ marginTop: '24px' }} onClick={placeOrder} disabled={ordering}>
              {ordering ? 'Placing Order...' : 'Place order · ₹172'}
            </Button>
            <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
              Rx medicines require a valid prescription on file
            </div>
          </>
        )}
      </div>
    </div>
  );
}
