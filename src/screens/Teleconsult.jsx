import React, { useState } from 'react';
import HeaderNav from '../components/HeaderNav';
import Button from '../components/Button';
import Card from '../components/Card';
import Tag from '../components/Tag';
import './Teleconsult.css';

const DOCTORS = [
  { id: 1, name: 'Dr. Priya Rajan', spec: 'General Medicine · 8 yrs exp', rating: '4.9 ★ (312 reviews)', avatarBg: '#F0ECFD', avatarColor: '#7F77DD', initials: 'PR', fee: '₹299', eta: 'Wait ~3 min', status: 'Available', statusColor: 'green' },
  { id: 2, name: 'Dr. Suresh Mehta', spec: 'ENT Specialist · 12 yrs exp', rating: '4.8 ★ (201 reviews)', avatarBg: 'var(--color-primary-light)', avatarColor: 'var(--color-primary-dark)', initials: 'SM', fee: '₹499', eta: 'Next: 2:30 PM', status: '~10 min', statusColor: 'amber' },
  { id: 3, name: 'Dr. Anjali Kaur', spec: 'Dermatologist · 6 yrs exp', rating: '4.7 ★ (178 reviews)', avatarBg: 'var(--color-danger-light)', avatarColor: 'var(--color-danger)', initials: 'AK', fee: '₹599', eta: 'Wait ~5 min', status: 'Available', statusColor: 'green' }
];

export default function Teleconsult({ navigate }) {
  const [filter, setFilter] = useState('All');
  
  return (
    <div className="screen animate-fade-in">
      <HeaderNav title="Find a doctor" onBack={() => navigate('home')} />
      
      <div className="content">
        <div className="filter-row">
          {['All', 'General', 'ENT', 'Derm'].map(f => (
            <Button 
              key={f} 
              variant={filter === f ? 'primary' : 'secondary'} 
              size="sm" 
              className="flex-1"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
        
        <h2 className="section-title" style={{ marginTop: '20px' }}>Available now</h2>
        
        <div className="doctor-list">
          {DOCTORS.map(doc => (
            <Card key={doc.id} hoverable className="doc-card" onClick={() => navigate('booking')}>
              <div 
                className="doc-avatar" 
                style={{ background: doc.avatarBg, color: doc.avatarColor }}
              >
                {doc.initials}
              </div>
              <div className="doc-info">
                <div className="doc-name">{doc.name}</div>
                <div className="doc-spec">{doc.spec}</div>
                <div className="doc-meta">
                  <Tag color={doc.statusColor}>{doc.status}</Tag>
                  <span className="doc-rating">{doc.rating}</span>
                </div>
              </div>
              <div className="doc-fee-box">
                <div className="doc-fee-amt">{doc.fee}</div>
                <div className="doc-fee-eta">{doc.eta}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
