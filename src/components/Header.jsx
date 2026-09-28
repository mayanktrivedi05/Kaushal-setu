import React from 'react';
import { 
  Sparkles, 
  UserCheck, 
  ShieldCheck, 
  LogOut,
  Mic,
  User,
  Award,
  MapPin,
  MessageSquare
} from 'lucide-react';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  language, 
  setLanguage, 
  activeTab, 
  setActiveTab, 
  user, 
  onOpenLogin, 
  onLogout 
}) {
  return (
    <>
      <header style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(10, 15, 28, 0.96)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%'
      }}>
        {/* Top Gov Tricolor Bar */}
        <div style={{
          background: 'linear-gradient(90deg, #ff6f00 0%, #ffffff 50%, #138808 100%)',
          height: '3px',
          width: '100%'
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.65rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.65rem'
        }}>
          {/* Brand & SIH Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 12px rgba(249, 115, 22, 0.4)',
              flexShrink: 0
            }}>
              <Sparkles size={20} color="#ffffff" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff' }}>
                  Kaushal Setu <span style={{ color: '#f97316' }}>AI</span>
                </span>
                <span className="badge badge-saffron" style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem' }}>
                  SIH 2026 • SIH26097
                </span>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                PM-AJAY (GIA Component) | Team SixSnipers
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            
            {/* Language Switch */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '2px'
            }}>
              <button
                onClick={() => setLanguage('hi')}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: language === 'hi' ? '700' : '500',
                  background: language === 'hi' ? '#f97316' : 'transparent',
                  color: language === 'hi' ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage('en')}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: language === 'en' ? '700' : '500',
                  background: language === 'en' ? '#f97316' : 'transparent',
                  color: language === 'en' ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                ENG
              </button>
            </div>

            {/* Role Switcher */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#1e293b',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '2px'
            }}>
              <button
                onClick={() => {
                  setCurrentRole('beneficiary');
                  if (activeTab === 'officer') setActiveTab('voice');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 9px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: currentRole === 'beneficiary' ? 'linear-gradient(135deg, #0ea5e9, #0284c7)' : 'transparent',
                  color: currentRole === 'beneficiary' ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <UserCheck size={13} />
                <span>{language === 'hi' ? 'नागरिक' : 'Citizen'}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentRole('officer');
                  setActiveTab('officer');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 9px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  background: currentRole === 'officer' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
                  color: currentRole === 'officer' ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <ShieldCheck size={13} />
                <span>{language === 'hi' ? 'अधिकारी' : 'Officer'}</span>
              </button>
            </div>

            {/* Auth Button */}
            {user ? (
              <button
                onClick={onLogout}
                title="Logout"
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  borderRadius: '6px',
                  padding: '5px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem'
                }}
              >
                <LogOut size={13} />
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                {language === 'hi' ? 'लॉग इन' : 'Login'}
              </button>
            )}

          </div>
        </div>

        {/* Desktop Tab Navigation Bar */}
        {currentRole === 'beneficiary' && (
          <div className="horizontal-scroll-container" style={{
            background: 'rgba(15, 23, 42, 0.7)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '0.35rem 0.85rem',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            <div style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              gap: '0.4rem'
            }}>
              {[
                { id: 'voice', label_hi: '🎙️ वॉयस सहायक', label_en: '🎙️ Voice Profiler' },
                { id: 'profile', label_hi: '👤 आजीविका प्रोफ़ाइल', label_en: '👤 Livelihood Profile' },
                { id: 'recommendations', label_hi: '🎯 NSQF सिफारिशें', label_en: '🎯 NSQF Courses' },
                { id: 'opportunities', label_hi: '📍 नजदीकी केंद्र व ग्रांट', label_en: '📍 Local Centers & Grants' },
                { id: 'whatsapp', label_hi: '📱 व्हाट्सएप वॉयस', label_en: '📱 WhatsApp Voice' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '5px 12px',
                    fontSize: '0.78rem',
                    fontWeight: activeTab === tab.id ? '700' : '500',
                    color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                    background: activeTab === tab.id ? 'rgba(249, 115, 22, 0.2)' : 'transparent',
                    border: activeTab === tab.id ? '1px solid rgba(249, 115, 22, 0.4)' : '1px solid transparent',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                >
                  {language === 'hi' ? tab.label_hi : tab.label_en}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Bottom Floating Mobile Tab Bar for Thumb-Friendly Navigation */}
      {currentRole === 'beneficiary' && (
        <nav style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(10, 15, 28, 0.98)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '6px 4px 8px 4px',
          zIndex: 90,
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          {[
            { id: 'voice', icon: Mic, label_hi: 'वॉयस', label_en: 'Voice' },
            { id: 'profile', icon: User, label_hi: 'प्रोफ़ाइल', label_en: 'Profile' },
            { id: 'recommendations', icon: Award, label_hi: 'NSQF', label_en: 'NSQF' },
            { id: 'opportunities', icon: MapPin, label_hi: 'केंद्र', label_en: 'Centers' },
            { id: 'whatsapp', icon: MessageSquare, label_hi: 'WhatsApp', label_en: 'WhatsApp' }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#f97316' : '#94a3b8',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '0.68rem',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  touchAction: 'manipulation'
                }}
              >
                <Icon size={18} color={isActive ? '#f97316' : '#94a3b8'} />
                <span>{language === 'hi' ? item.label_hi : item.label_en}</span>
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}
