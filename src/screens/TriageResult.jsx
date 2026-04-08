import React from 'react';
import { Activity } from 'lucide-react';
import HeaderNav from '../components/HeaderNav';
import Button from '../components/Button';
import Card from '../components/Card';
import './TriageResult.css';

export default function TriageResult({ navigate }) {
  return (
    <div className="screen animate-fade-in">
      <HeaderNav title="Triage result" onBack={() => navigate('home')} />
      
      <div className="content">
        <div className="triage-hero moderate">
          <div className="triage-icon">
            <Activity size={28} />
          </div>
          <div className="triage-level">Moderate — See a doctor</div>
          <div className="triage-desc">Your symptoms suggest a possible upper respiratory tract infection. A teleconsult is recommended within 24 hours.</div>
        </div>
        
        <Card className="confidence-card">
          <div className="card-title">AI confidence</div>
          
          <div className="confidence-item">
            <div className="confidence-label">
              <span>Upper respiratory infection</span>
              <span className="pct high">82%</span>
            </div>
            <div className="conf-bar"><div className="conf-fill high-fill" style={{ width: '82%' }}></div></div>
          </div>
          
          <div className="confidence-item">
            <div className="confidence-label">
              <span>Seasonal allergy</span>
              <span className="pct med">14%</span>
            </div>
            <div className="conf-bar"><div className="conf-fill med-fill" style={{ width: '14%' }}></div></div>
          </div>
          
          <div className="disclaimer">
            This is not a diagnosis. Please consult a licensed clinician to confirm.
          </div>
        </Card>
        
        <div className="action-row">
          <Button variant="primary" onClick={() => navigate('teleconsult')}>Book teleconsult</Button>
          <Button variant="secondary" onClick={() => navigate('pharmacy')}>Order medicines</Button>
        </div>
        <Button variant="ghost" fullWidth className="chat-btn" onClick={() => navigate('chat')}>
          Discuss with Dr. Aiva
        </Button>
      </div>
    </div>
  );
}
