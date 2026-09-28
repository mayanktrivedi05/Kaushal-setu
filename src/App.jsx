import React, { useState } from 'react';
import Header from './components/Header';
import VoiceAssistant from './components/VoiceAssistant';
import DigitalProfile from './components/DigitalProfile';
import Recommendations from './components/Recommendations';
import LocalOpportunities from './components/LocalOpportunities';
import OfficerDashboard from './components/OfficerDashboard';
import WhatsAppSimulator from './components/WhatsAppSimulator';
import LoginModal from './components/LoginModal';

export default function App() {
  const [language, setLanguage] = useState('hi'); // 'hi' or 'en'
  const [currentRole, setCurrentRole] = useState('beneficiary'); // 'beneficiary' or 'officer'
  const [activeTab, setActiveTab] = useState('voice'); // 'voice', 'profile', 'recommendations', 'opportunities', 'whatsapp', 'officer'
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'Ramesh Kumar',
    role: 'Beneficiary',
    category: 'SC (Chamar/Jatav)',
    district: 'Varanasi',
    state: 'Uttar Pradesh'
  });

  // Default initial profile state populated from voice assistant or demo
  const [profile, setProfile] = useState({
    name: 'Ramesh Kumar',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'SC (Scheduled Caste)',
    education: '10th Matric Pass',
    skills: 'Domestic Wiring & Solar Installation Experience',
    aspiration: 'Self-Enterprise with PM-AJAY GIA Grant'
  });

  const handleProfilingComplete = (newProfile) => {
    setProfile(newProfile);
    setActiveTab('profile');
  };

  const handleLogin = (userData, role) => {
    setUser(userData);
    setCurrentRole(role);
    if (role === 'officer') {
      setActiveTab('officer');
    } else {
      setActiveTab('voice');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-container">
      
      {/* Universal Top Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main App Body */}
      <main className="main-content">
        {currentRole === 'beneficiary' && (
          <>
            {activeTab === 'voice' && (
              <VoiceAssistant
                language={language}
                profile={profile}
                setProfile={setProfile}
                onCompleteProfiling={handleProfilingComplete}
              />
            )}

            {activeTab === 'profile' && (
              <DigitalProfile
                profile={profile}
                language={language}
                onGoToRecommendations={() => setActiveTab('recommendations')}
                onGoToOpportunities={() => setActiveTab('opportunities')}
              />
            )}

            {activeTab === 'recommendations' && (
              <Recommendations
                language={language}
                profile={profile}
                onGoToOpportunities={() => setActiveTab('opportunities')}
              />
            )}

            {activeTab === 'opportunities' && (
              <LocalOpportunities
                language={language}
                profile={profile}
              />
            )}

            {activeTab === 'whatsapp' && (
              <WhatsAppSimulator
                language={language}
              />
            )}
          </>
        )}

        {currentRole === 'officer' && (
          <OfficerDashboard
            language={language}
          />
        )}
      </main>

      {/* Footer with SIH 2026 Presentation Metadata */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(10, 15, 28, 0.98)',
        padding: '1.25rem 1rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#94a3b8'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ color: '#ffffff', fontWeight: '700' }}>Smart India Hackathon (SIH 2026)</span>
            <span>•</span>
            <span style={{ color: '#f97316' }}>Problem Statement: SIH26097</span>
            <span>•</span>
            <span style={{ color: '#10b981' }}>Team: SixSnipers (Team ID: 175248)</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
            AI-Driven Voice Assistant for Livelihood Mapping & NSQF-Aligned Skilling Recommendations for SC Communities under GIA Component of PM-AJAY.
          </p>
        </div>
      </footer>

      {/* Dual Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        language={language}
      />

    </div>
  );
}
