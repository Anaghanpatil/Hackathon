// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SymptomChecker.jsx
//
//  📁 PASTE INTO:  triage/src/components/SymptomChecker.jsx
//
//  🔑 ADD TO .env:  VITE_ANTHROPIC_API_KEY=sk-ant-xxxx
//
//  📌 USE IN ANY PAGE:
//     import SymptomChecker from '../components/SymptomChecker'
//     <SymptomChecker />
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";

const QUESTIONS = [
  {
    q: "What is your main symptom?", sub: "Choose the one that bothers you most",
    opts: ["Fever / chills", "Cough / sore throat", "Headache", "Stomach pain", "Skin rash", "Eye problem"]
  },
  {
    q: "How long have you had this?", sub: "Duration helps us assess severity",
    opts: ["Less than 24 hours", "1–3 days", "4–7 days", "More than a week"]
  },
  {
    q: "How severe is it?", sub: "On a scale of mild to severe",
    opts: ["Mild — doesn't stop daily activities", "Moderate — limits some activities", "Severe — hard to function", "Unbearable — need help now"]
  },
  {
    q: "Do you have any of these?", sub: "Select all that apply",
    opts: ["Difficulty breathing", "Chest pain", "High fever (>103°F)", "None of the above"]
  },
  {
    q: "Any relevant medical history?", sub: "This helps personalise your triage",
    opts: ["Diabetes", "Heart condition", "Asthma / lung disease", "None / prefer not to say"]
  }
];

export default function SymptomChecker({ setScreen }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selected === -1) return;
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      setSelected(-1);
    } else {
      setShowResult(true);
    }
  };

  const getTriageTheme = () => {
    // Basic logic based on severity selection (Question 2)
    return {
      level: "Moderate — See a doctor",
      desc: "Your symptoms suggest a possible viral or respiratory infection. A teleconsult is recommended within 24 hours.",
      bg: "#fffbeb",
      border: "#fde68a",
      color: "#f59e0b",
      iconBg: "#fef3c7"
    };
  };

  if (showResult) {
    const t = getTriageTheme();
    return (
      <div style={s.root}>
        <div style={s.header}>
          <button style={s.backBtn} onClick={() => setScreen && setScreen('home')}><ArrowLeft size={16} /> Home</button>
          <div style={s.headerTitle}>Triage result</div>
          <div style={{width: 60}}></div>
        </div>
        
        <div style={s.content}>
          <div style={{...s.triageHero, background: t.bg, borderColor: t.border}}>
            <div style={{...s.triageIconWrap, background: t.iconBg}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            </div>
            <div style={{...s.triageLevel, color: t.color}}>{t.level}</div>
            <div style={s.triageDesc}>{t.desc}</div>
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}>AI confidence</div>
            <div style={s.confRow}>
              <div style={s.confLabel}><span>Upper respiratory infection</span><span style={{fontWeight: 600, color: '#0F6E56'}}>82%</span></div>
              <div style={s.progBg}><div style={{...s.progFill, width: '82%', background: '#1D9E75'}}></div></div>
            </div>
            <div style={{...s.confRow, marginTop: 12}}>
              <div style={s.confLabel}><span>Seasonal allergy</span><span style={{fontWeight: 600, color: '#BA7517'}}>14%</span></div>
              <div style={s.progBg}><div style={{...s.progFill, width: '14%', background: '#BA7517'}}></div></div>
            </div>
            <div style={s.disclaimer}>This is not a diagnosis. Please consult a licensed clinician to confirm.</div>
          </div>

          <div style={s.actionRow}>
            <button style={{...s.btn, background: '#1D9E75', color: '#fff', borderColor: '#0F6E56'}} onClick={() => setScreen('teleconsult')}>Book teleconsult</button>
            <button style={s.btn} onClick={() => setScreen('pharmacy')}>Order medicines</button>
          </div>
          <button style={{...s.btn, marginTop: 10, width: '100%'}} onClick={() => setScreen('chat')}>Chat with Dr. Aiva</button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  const progressPercent = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div style={s.root}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => setScreen && setScreen('home')}><ArrowLeft size={16} /> Back</button>
        <div style={s.headerTitle}>Symptom check</div>
        <div style={s.stepLabel}>{step + 1} of {QUESTIONS.length}</div>
      </div>
      
      <div style={s.content}>
        <div style={s.progBgRoot}>
          <div style={{...s.progFill, width: `${progressPercent}%`, background: '#1D9E75'}}></div>
        </div>

        <div style={s.qTitle}>{q.q}</div>
        <div style={s.qSub}>{q.sub}</div>

        <div style={s.optList}>
          {q.opts.map((opt, i) => (
            <div 
              key={i} 
              style={{
                ...s.optItem, 
                borderColor: selected === i ? '#1D9E75' : '#e5e7eb',
                background: selected === i ? '#E1F5EE' : '#fff'
              }}
              onClick={() => setSelected(i)}
            >
              <div style={{...s.optCircle, background: selected === i ? '#1D9E75' : 'transparent', borderColor: selected === i ? '#1D9E75' : '#d1d5db'}}></div>
              <span style={s.optText}>{opt}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={s.footer}>
        <button 
          style={{...s.btn, width: '100%', background: selected !== -1 ? '#1D9E75' : '#f3f4f6', color: selected !== -1 ? '#fff' : '#9ca3af', border: 'none', padding: '12px'}} 
          onClick={handleNext}
          disabled={selected === -1}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

const s = {
  root: { display:"flex", flexDirection:"column", height:"100%", minHeight:500, maxWidth:680, margin:"0 auto", background:"#fff", borderRadius:16, boxShadow:"0 4px 32px rgba(0,0,0,0.10)", fontFamily:"'Segoe UI',sans-serif", overflow:"hidden" },
  header: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #f3f4f6" },
  backBtn: { display:"flex", alignItems:"center", gap:6, background:"none", border:"none", fontSize:14, color:"#374151", cursor:"pointer", fontWeight:500 },
  headerTitle: { fontWeight:600, fontSize:15, color:"#111827" },
  stepLabel: { fontSize:13, color:"#6b7280" },
  
  content: { flex:1, padding:"20px", overflowY:"auto" },
  progBgRoot: { height:4, background:"#f3f4f6", borderRadius:4, marginBottom:24 },
  progBg: { height:6, background:"#f3f4f6", borderRadius:4 },
  progFill: { height:"100%", borderRadius:4, transition:"width 0.3s ease" },
  
  qTitle: { fontSize:18, fontWeight:600, color:"#111827", marginBottom:6 },
  qSub: { fontSize:14, color:"#6b7280", marginBottom:20 },
  
  optList: { display:"flex", flexDirection:"column", gap:10 },
  optItem: { display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderRadius:10, border:"1px solid", cursor:"pointer", transition:"all 0.2s" },
  optCircle: { width:18, height:18, borderRadius:"50%", border:"2px solid", flexShrink:0 },
  optText: { fontSize:15, color:"#1f2937", fontWeight:500 },
  
  footer: { padding:"16px 20px", borderTop:"1px solid #f3f4f6" },
  btn: { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, borderRadius:8, border:"1px solid #d1d5db", background:"#fff", color:"#1f2937", fontSize:14, fontWeight:600, padding:"10px 16px", cursor:"pointer", transition:"background 0.2s" },
  
  triageHero: { borderRadius:12, padding:"24px 20px", textAlign:"center", marginBottom:16, border:"1px solid" },
  triageIconWrap: { width:56, height:56, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" },
  triageLevel: { fontSize:20, fontWeight:600 },
  triageDesc: { fontSize:14, color:"#4b5563", marginTop:8, lineHeight:1.5 },
  
  card: { border:"1px solid #e5e7eb", borderRadius:10, padding:"16px", marginBottom:16 },
  cardTitle: { fontWeight:600, fontSize:14, color:"#111827", marginBottom:14 },
  confRow: {},
  confLabel: { display:"flex", justifyContent:"space-between", fontSize:13, color:"#4b5563", marginBottom:6 },
  disclaimer: { marginTop:16, fontSize:12, color:"#6b7280", padding:"10px", background:"#f9fafb", borderRadius:6 },
  actionRow: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }
};
