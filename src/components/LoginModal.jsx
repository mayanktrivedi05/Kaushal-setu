import React, { useState } from 'react';
import { User, ShieldCheck, Lock, ArrowRight, X, Sparkles } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLogin, language }) {
  const [role, setRole] = useState('beneficiary');
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [otpOrPassword, setOtpOrPassword] = useState('123456');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: role === 'beneficiary' ? 'Ramesh Kumar (SC Beneficiary)' : 'Dr. Alok Verma (District Officer)',
      role: role === 'beneficiary' ? 'Beneficiary' : 'PM-AJAY Officer',
      identifier: mobileOrEmail || (role === 'beneficiary' ? '9876543210' : 'officer.varanasi@pmajay.gov.in')
    };
    onLogin(userData, role);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '440px',
        width: '100%',
        background: '#0f172a',
        border: '1px solid rgba(249, 115, 22, 0.35)',
        padding: '1.75rem',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="#f97316" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>
              {language === 'hi' ? 'कौशल सेतु AI में लॉगिन' : 'Login to Kaushal Setu AI'}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Toggle in Login */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '10px',
          marginBottom: '1.25rem'
        }}>
          <button
            type="button"
            onClick={() => setRole('beneficiary')}
            style={{
              padding: '8px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: role === 'beneficiary' ? 'linear-gradient(135deg, #0ea5e9, #0284c7)' : 'transparent',
              color: role === 'beneficiary' ? '#ffffff' : '#94a3b8'
            }}
          >
            <User size={14} /> {language === 'hi' ? 'लाभार्थी / नागरिक' : 'Beneficiary'}
          </button>

          <button
            type="button"
            onClick={() => setRole('officer')}
            style={{
              padding: '8px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: role === 'officer' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: role === 'officer' ? '#ffffff' : '#94a3b8'
            }}
          >
            <ShieldCheck size={14} /> {language === 'hi' ? 'सरकारी अधिकारी' : 'Govt. Officer'}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>
              {role === 'beneficiary' ? 'मोबाइल नंबर (Mobile Number / Aadhaar)' : 'Govt. Email ID (nic.in / gov.in)'}
            </label>
            <input
              type="text"
              value={mobileOrEmail}
              onChange={(e) => setMobileOrEmail(e.target.value)}
              placeholder={role === 'beneficiary' ? 'e.g. 9876543210' : 'officer.varanasi@pmajay.gov.in'}
              style={{
                width: '100%',
                background: '#1e293b',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#ffffff',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px' }}>
              {role === 'beneficiary' ? 'OTP (One-Time Password)' : 'Password'}
            </label>
            <input
              type="password"
              value={otpOrPassword}
              onChange={(e) => setOtpOrPassword(e.target.value)}
              placeholder="••••••"
              style={{
                width: '100%',
                background: '#1e293b',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#ffffff',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{
            background: 'rgba(249, 115, 22, 0.1)',
            border: '1px solid rgba(249, 115, 22, 0.25)',
            borderRadius: '8px',
            padding: '8px 10px',
            fontSize: '0.75rem',
            color: '#fed7aa'
          }}>
            💡 <strong>Demo Mode:</strong> Click Login directly to explore full functional prototype.
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '10px', fontSize: '0.9rem', marginTop: '0.25rem' }}
          >
            {language === 'hi' ? 'लॉग इन करें' : 'Login / Continue'} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
