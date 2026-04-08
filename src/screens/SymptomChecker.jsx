import React from 'react';
import HeaderNav from '../components/HeaderNav';
import ClaudeSymptomChecker from '../components/SymptomChecker';

export default function SymptomChecker({ navigate }) {
  return (
    <div className="screen animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0px' }}>
      <HeaderNav 
        title="Check Symptoms" 
        onBack={() => navigate('home')} 
      />
      
      <div style={{ flex: 1, overflow: 'hidden', padding: '16px' }}>
        <ClaudeSymptomChecker />
      </div>
    </div>
  );
}
