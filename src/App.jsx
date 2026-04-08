import React, { useState } from 'react';
import Home from './screens/Home';
import SymptomChecker from './screens/SymptomChecker';
import TriageResult from './screens/TriageResult';
import Chat from './screens/Chat';
import Teleconsult from './screens/Teleconsult';
import Booking from './screens/Booking';
import Pharmacy from './screens/Pharmacy';
import Cart from './screens/Cart';
import Delivery from './screens/Delivery';
import Emergency from './screens/Emergency';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [cartCount, setCartCount] = useState(2);
  const [theme, setTheme] = useState('light');

  const navigate = (screen) => setCurrentScreen(screen);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <Home navigate={navigate} theme={theme} toggleTheme={toggleTheme} />;
      case 'symptom': return <SymptomChecker navigate={navigate} />;
      case 'triage': return <TriageResult navigate={navigate} />;
      case 'chat': return <Chat navigate={navigate} activeSessionId={activeSessionId} setActiveSessionId={setActiveSessionId} />;
      case 'teleconsult': return <Teleconsult navigate={navigate} />;
      case 'booking': return <Booking navigate={navigate} />;
      case 'pharmacy': return <Pharmacy navigate={navigate} cartCount={cartCount} setCartCount={setCartCount} />;
      case 'cart': return <Cart navigate={navigate} cartCount={cartCount} />;
      case 'delivery': return <Delivery navigate={navigate} />;
      case 'emergency': return <Emergency navigate={navigate} />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentScreen={currentScreen} 
        navigate={navigate} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        activeSessionId={activeSessionId}
        setActiveSessionId={setActiveSessionId}
      />
      
      <main className="main-content">
        {renderScreen()}
        
        {/* On mobile, Sidebar is hidden and BottomNav is shown instead */}
        {['home', 'symptom', 'pharmacy', 'chat', 'teleconsult'].includes(currentScreen) && (
          <BottomNav currentScreen={currentScreen} navigate={navigate} />
        )}
      </main>
    </div>
  );
}
