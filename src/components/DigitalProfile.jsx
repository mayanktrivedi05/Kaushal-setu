import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Target, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Printer, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Sparkles,
  QrCode,
  Check,
  Building,
  PhoneCall
} from 'lucide-react';

export default function DigitalProfile({ 
  profile, 
  language, 
  onGoToRecommendations,
  onGoToOpportunities 
}) {
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fade-in" style={{ maxWidth: '980px', margin: '0 auto', width: '100%' }}>
      
      {/* Top Banner Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="badge badge-green">AI Livelihood Profile Verified</span>
            <span className="badge badge-saffron">PM-AJAY GIA Beneficiary</span>
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginTop: '0.35rem' }}>
            {language === 'hi' ? 'डिजिटल आजीविका प्रोफ़ाइल एवं प्रमाण-पत्र' : 'Digital Livelihood Profile & Identity'}
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {language === 'hi'
              ? 'वॉयस असिस्टेंट द्वारा विश्लेषित पारंपरिक कौशल, योग्यता एवं GIA अनुदान स्वीकृति रिपोर्ट।'
              : 'Voice-analyzed digital profile recognizing traditional skills, competencies, and GIA readiness.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.55rem 0.9rem' }}>
            <Printer size={15} /> {language === 'hi' ? 'ID कार्ड प्रिंट करें' : 'Print ID Card'}
          </button>
          <button onClick={onGoToRecommendations} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.55rem 1rem' }}>
            {language === 'hi' ? 'NSQF कोर्स देखें' : 'View NSQF Pathways'} <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Official PM-AJAY Laminated Beneficiary ID Card */}
      <div className="id-card-container" style={{ marginBottom: '1.25rem' }}>
        <div className="id-card-watermark">PM-AJAY</div>

        {/* Card Header Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          paddingBottom: '0.75rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: '#ff6f00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              color: '#ffffff',
              fontSize: '0.9rem'
            }}>
              🇮🇳
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', letterSpacing: '0.02em' }}>
                GOVERNMENT OF INDIA • PM-AJAY
              </div>
              <div style={{ fontSize: '0.68rem', color: '#38bdf8' }}>
                Special Livelihood Identity Card (GIA Component)
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '6px',
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.72rem',
            color: '#34d399',
            fontWeight: '700'
          }}>
            <ShieldCheck size={13} /> Aadhaar / Caste e-Verified
          </div>
        </div>

        {/* Card Body with Avatar, Details, QR Code */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* Avatar & Basic Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              flexShrink: 0
            }}>
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'R'}
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.2' }}>
                {profile.name || 'Ramesh Kumar'}
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} color="#f97316" />
                {profile.district || 'Varanasi'}, {profile.state || 'Uttar Pradesh'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#fed7aa', marginTop: '4px' }}>
                Beneficiary ID: <strong>KS-AJAY-2026-9812</strong>
              </div>
            </div>
          </div>

          {/* Key Parameters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '3px' }}>
              <span style={{ color: '#94a3b8' }}>Category:</span>
              <strong style={{ color: '#fb923c' }}>SC (Scheduled Caste)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '3px' }}>
              <span style={{ color: '#94a3b8' }}>Qualification:</span>
              <strong style={{ color: '#ffffff' }}>{profile.education || '10th Matric'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '3px' }}>
              <span style={{ color: '#94a3b8' }}>GIA Grant Status:</span>
              <strong style={{ color: '#34d399' }}>100% Free + ₹3,500 Stipend</strong>
            </div>
          </div>

          {/* QR Code & Digital Stamp */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.85rem'
          }}>
            <div style={{
              background: '#ffffff',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <QrCode size={56} color="#0f172a" />
              <span style={{ fontSize: '0.55rem', color: '#0f172a', fontWeight: 'bold', marginTop: '2px' }}>
                SCAN TO VERIFY
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 2 Column Details: AI Competency Mapping + NSQF Readiness */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        
        {/* Identified Skills Card */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <Sparkles size={18} color="#f97316" />
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>
              {language === 'hi' ? 'पहचाने गए अनौपचारिक कौशल' : 'Identified Informal Competencies'}
            </h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            <span className="badge badge-blue">
              <CheckCircle size={12} /> {profile.skills || 'Electrical Wiring & Solar Work'}
            </span>
            <span className="badge badge-blue">
              <CheckCircle size={12} /> Domestic Appliance Maintenance
            </span>
            <span className="badge badge-blue">
              <CheckCircle size={12} /> Rural Customer Service
            </span>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.76rem',
            color: '#cbd5e1'
          }}>
            <strong style={{ color: '#38bdf8' }}>AI Extraction Note:</strong> Traditional knowledge matched against National Occupational Standards (NOS: ELE/N5901).
          </div>
        </div>

        {/* Skill Gap & Bridge Plan */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <AlertCircle size={18} color="#f87171" />
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>
              {language === 'hi' ? 'पहचानी गई कमियां (Skill Gaps)' : 'Skill Gaps & Training Needs'}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#f87171' }}>•</span> Formal Solar PV inverting & grounding safety standards
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#f87171' }}>•</span> Digital billing & PM Surya Ghar portal compliance
            </div>
          </div>

          {/* Readiness Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '3px' }}>
              <span style={{ color: '#94a3b8' }}>NSQF Level 4 Readiness Score</span>
              <strong style={{ color: '#10b981' }}>88% Match</strong>
            </div>
            <div style={{ height: '7px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, #f97316, #10b981)' }} />
            </div>
          </div>
        </div>

      </div>

      {/* Next Actions CTA */}
      <div className="glass-panel" style={{
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem',
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <TrendingUp size={22} color="#f97316" />
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>
              {language === 'hi' ? '4 NSQF कोर्स व 3 नजदीकी केंद्र उपलब्ध' : '4 Verified NSQF Courses & 3 Training Centers Ready'}
            </h4>
            <p style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
              {language === 'hi' ? 'अपनी रुचि के अनुसार तुरंत निःशुल्क नामांकन करें।' : 'Enroll with 100% PM-AJAY GIA grant subsidy today.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={onGoToOpportunities} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}>
            {language === 'hi' ? '📍 नजदीकी केंद्र' : '📍 Nearby Centers'}
          </button>
          <button onClick={onGoToRecommendations} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
            {language === 'hi' ? '🎯 अनुशंसित कोर्स देखें' : '🎯 View NSQF Courses'}
          </button>
        </div>
      </div>

    </div>
  );
}
