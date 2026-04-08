import React, { useState, useEffect, useRef } from 'react';
import HeaderNav from '../components/HeaderNav';
import Tag from '../components/Tag';
import { Send, UserRound } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import './Chat.css';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You are Dr. Aiva, an expert AI medical assistant for the TriageAI app.
Your strict instruction is to ONLY answer health, medical, triage, or pharmacy-related queries.
If the user asks about ANYTHING outside of the medical domain (e.g. "I want to study DBMS", programming, history, etc.), you MUST politely decline and ask them to provide a health-related query.
Example: "I'm a medical assistant, so I can only help with health-related issues. Please let me know how you are feeling."
Always keep responses concise, conversational, and empathetic.`;

export default function Chat({ navigate, activeSessionId, setActiveSessionId }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Fetch chat history from Supabase
  useEffect(() => {
    if (!activeSessionId) {
      setMessages([]);
      return;
    }

    const fetchChat = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', activeSessionId)
        .order('created_at', { ascending: true });
      
      if (!error && data) {
        setMessages(data);
      }
    };
    fetchChat();
  }, [activeSessionId]);

  const quickReplies = [
    "I have a fever", "Sore throat & cough", "Eye irritation", "Rash on skin"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const saveMsgToDb = async (type, text, session) => {
    try {
      await supabase.from('chat_messages').insert({ type, text, session_id: session });
    } catch (e) {
      console.error(e);
    }
  };

  const sendMsg = async (text) => {
    const query = text || inputVal.trim();
    if (!query || loading) return;
    
    let currentSession = activeSessionId;
    if (!currentSession) {
      const title = query.slice(0, 30) + (query.length > 30 ? '...' : '');
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({ title })
        .select()
        .single();
        
      if (!error && data) {
        currentSession = data.id;
        setActiveSessionId(currentSession);
      }
    }

    const userMsg = { id: Date.now().toString(), type: 'user', text: query };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputVal('');
    await saveMsgToDb('user', query, currentSession);

    setLoading(true);

    try {
      // Free Mock AI Logic to bypass API fees
      const simulateAIResponse = (query, history) => {
        const q = query.toLowerCase();
        
        // 1. Decline Non-Health Queries
        const nonHealth = ['study', 'dbms', 'math', 'code', 'programming', 'movie', 'game', 'sports', 'weather', 'finance'];
        if (nonHealth.some(kw => q.includes(kw))) {
          return "I'm a medical assistant, so I can only help with health-related issues. Please let me know how you are feeling or describe your symptoms.";
        }

        // 2. Affirmative Responses for Appointments
        const isAffirmative = /\b(yes|yeah|sure|okay|ok|book|please|do it|yup)\b/.test(q);
        const lastMsg = history[history.length - 1];
        if (isAffirmative && lastMsg && lastMsg.type === 'bot' && lastMsg.text.includes('doctor')) {
          return "Your appointment is confirmed. Dr. Priya Rajan will see you tomorrow at 10:30 AM. Contact Number: +91 98765-43210. I have sent the details to your phone. Can I help you with anything else?";
        }

        // 3. Negative Responses
        const isNegative = /\b(no|nope|not now|never|nah)\b/.test(q);
        if (isNegative && lastMsg && lastMsg.type === 'bot' && lastMsg.text.includes('doctor')) {
          return "No problem at all! Feel free to ask me if you have any other questions or need help later.";
        }

        // 4. Specific Symptom Logic
        if (q.includes('fever')) return "I see you have a fever. Is it above 101°F (38.3°C)? Are you experiencing body aches?";
        if (q.includes('throat') || q.includes('cough')) return "A sore throat and cough can be irritating. Are you having any difficulty swallowing or breathing?";
        if (q.includes('irritation') || q.includes('eye')) return "Eye irritation can be caused by allergies or infection. Is there any redness or discharge?";
        if (q.includes('rash')) return "Rashes can be triggered by many things. Is it itchy, spreading, or accompanied by a fever?";
        if (q.includes('teleconsult') || q.includes('doctor')) return "I can connect you to a doctor for a professional consultation. Shall I set that up for you?";

        // 5. Conversational Fallback
        const botCount = history.filter(m => m.type === 'bot').length;
        if (botCount === 0) return "I understand. When did these symptoms first start?";
        if (botCount === 1) return "Thank you. Based on what you've described, I recommend resting and monitoring your symptoms. Would you like to consult a doctor?";
        
        return "I can connect you to a doctor for a professional consultation. Shall I set that up for you?";
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const botReply = simulateAIResponse(query, messages);
      
      const botMsg = { id: Date.now().toString(), type: 'bot', text: botReply };
      setMessages(prev => [...prev, botMsg]);
      await saveMsgToDb('bot', botReply, currentSession);
    } catch (err) {
      console.error("AI Error:", err);
      const errMsg = { id: Date.now().toString(), type: 'bot', text: "Error connecting to AI." };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMsg(inputVal);
  };

  const DoctorInfo = (
    <div className="chat-doc-info">
      <div className="chat-avatar">
        <UserRound size={16} />
      </div>
      <div>
        <div className="chat-doc-name">Dr. Aiva</div>
        <div className="chat-doc-sub">AI Medical Assistant</div>
      </div>
    </div>
  );

  return (
    <div className="screen chat-screen animate-fade-in">
      <HeaderNav 
        title={DoctorInfo} 
        onBack={() => navigate('home')}
        rightContent={<Tag color="green">Online</Tag>}
      />
      
      <div className="chat-area" ref={scrollRef}>
        <div className="chat-content-wrapper">
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', margin: '60px auto 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="chat-avatar" style={{ width: 48, height: 48, marginBottom: 16 }}>
                <UserRound size={24} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)' }}>How can I help you today?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginTop: 8 }}>I'm Dr. Aiva, your AI medical assistant.</p>
            </div>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={`msg-row msg-${msg.type}`}>
              <div className="msg-bubble animate-fade-in">
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < msg.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className="msg-time">Now</div>
            </div>
          ))}
          {loading && (
            <div className={`msg-row msg-bot`}>
              <div className="msg-bubble animate-fade-in" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                Dr. Aiva is typing...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="chat-bottom-wrapper">
        <div className="chat-content-wrapper">
          <div className="chat-quick-replies">
            {quickReplies.map((qr, i) => (
              <button key={i} className="quick-reply-btn" onClick={() => sendMsg(qr)}>
                {qr}
              </button>
            ))}
          </div>

          <div className="chat-input-row glass">
            <input 
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyPress}
              className="chat-input"
              placeholder="Message Dr. Aiva..." 
            />
            <button className="chat-send" onClick={() => sendMsg(inputVal)} disabled={!inputVal.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
