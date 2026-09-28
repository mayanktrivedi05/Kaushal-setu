import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  IndianRupee, 
  Check, 
  Info,
  MapPin,
  Calculator,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NSQF_COURSES } from '../data/mockData';

export default function Recommendations({ language, profile, onGoToOpportunities }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState({});
  const [filterSector, setFilterSector] = useState('All');
  const [showCalculator, setShowCalculator] = useState(false);

  const handleEnroll = (courseId) => {
    setEnrolledCourses(prev => ({ ...prev, [courseId]: true }));
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const sectors = ['All', 'Green Jobs & Renewable Energy', 'Agriculture & Allied', 'Textiles, Apparel & Handicrafts', 'Construction & Capital Goods'];

  const filteredCourses = filterSector === 'All' 
    ? NSQF_COURSES 
    : NSQF_COURSES.filter(c => c.sector === filterSector);

  return (
    <div className="fade-in" style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
      
      {/* Top Header */}
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
            <span className="badge badge-saffron">Hybrid AI Matching Engine</span>
            <span className="badge badge-green">100% GIA Grant Covered</span>
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginTop: '0.35rem' }}>
            {language === 'hi' ? 'NSQF-अलाइन्ड कौशल एवं आजीविका सिफारिशें' : 'NSQF-Aligned Skilling Pathways'}
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {language === 'hi'
              ? 'आपकी रुचि, पारंपरिक कौशल और स्थानीय मांग के आधार पर प्रमाणित कोर्स।'
              : 'Matched against verified National Skills Qualifications Framework (NSQF) Qualification Packs.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowCalculator(!showCalculator)} 
            className="btn btn-secondary" 
            style={{ fontSize: '0.8rem', padding: '0.55rem 0.9rem' }}
          >
            <Calculator size={15} color="#f97316" /> {language === 'hi' ? 'GIA अनुदान कैलकुलेटर' : 'Grant Calculator'}
          </button>
          <button 
            onClick={onGoToOpportunities} 
            className="btn btn-secondary" 
            style={{ fontSize: '0.8rem', padding: '0.55rem 0.9rem' }}
          >
            <MapPin size={15} /> {language === 'hi' ? 'प्रशिक्षण केंद्र' : 'Training Centers'}
          </button>
        </div>
      </div>

      {/* PM-AJAY GIA Financial Benefit & Subsidy Calculator Drawer */}
      {showCalculator && (
        <div className="glass-panel fade-in" style={{
          padding: '1.25rem',
          marginBottom: '1.25rem',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          border: '1px solid rgba(249, 115, 22, 0.35)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IndianRupee size={16} color="#34d399" />
              {language === 'hi' ? 'पीएम-अजय GIA वित्तीय लाभ सारांश (Free Skilling Package)' : 'PM-AJAY GIA Financial Package Breakdown'}
            </h3>
            <button 
              onClick={() => setShowCalculator(false)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}
            >
              ✕
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem'
          }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Course Fee</div>
              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#34d399' }}>₹0 (100% Free)</div>
              <div style={{ fontSize: '0.68rem', color: '#34d399' }}>Paid by Govt under GIA</div>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Monthly Stipend</div>
              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#60a5fa' }}>₹3,500 / month</div>
              <div style={{ fontSize: '0.68rem', color: '#60a5fa' }}>Direct DBT into Bank A/C</div>
            </div>

            <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(249, 115, 22, 0.25)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Tool-Kit Subsidy</div>
              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fb923c' }}>₹50,000 Grant</div>
              <div style={{ fontSize: '0.68rem', color: '#fb923c' }}>Post-Certification Grant</div>
            </div>

            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Target Income</div>
              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#c084fc' }}>₹18k - ₹25k / mo</div>
              <div style={{ fontSize: '0.68rem', color: '#c084fc' }}>Livelihood Outcome</div>
            </div>
          </div>
        </div>
      )}

      {/* Sector Filter Chips */}
      <div className="horizontal-scroll-container" style={{
        display: 'flex',
        gap: '0.4rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '1.25rem',
        whiteSpace: 'nowrap'
      }}>
        {sectors.map((sec) => (
          <button
            key={sec}
            onClick={() => setFilterSector(sec)}
            style={{
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: filterSector === sec ? '700' : '500',
              background: filterSector === sec ? '#f97316' : 'rgba(255, 255, 255, 0.06)',
              color: filterSector === sec ? '#ffffff' : '#94a3b8',
              border: '1px solid ' + (filterSector === sec ? '#f97316' : 'rgba(255, 255, 255, 0.1)'),
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledCourses[course.id];

          return (
            <div 
              key={course.id}
              className="glass-card"
              style={{
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: selectedCourse?.id === course.id 
                  ? '2px solid #f97316' 
                  : '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div>
                {/* Top Badge & Match Score */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <span className="badge badge-saffron" style={{ fontSize: '0.68rem' }}>
                    {course.nsqf_level} • {course.code}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={13} color="#10b981" />
                    <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#10b981' }}>
                      {course.match_score}% Match
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.08rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.2rem', lineHeight: '1.3' }}>
                  {language === 'hi' ? course.title_hi : course.title}
                </h3>

                <p style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '0.85rem' }}>
                  Sector: <strong style={{ color: '#cbd5e1' }}>{course.sector}</strong> • {course.certifying_body}
                </p>

                {/* Key Specs Pills */}
                <div style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '10px',
                  padding: '0.65rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  marginBottom: '0.85rem'
                }}>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Duration</span>
                    <strong style={{ color: '#e2e8f0' }}>{course.duration}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Monthly Stipend</span>
                    <strong style={{ color: '#34d399' }}>{course.stipend}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>GIA Subsidy</span>
                    <strong style={{ color: '#fb923c' }}>100% Free</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', display: 'block' }}>Expected Income</span>
                    <strong style={{ color: '#e2e8f0' }}>{course.expected_income}</strong>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '0.85rem' }}>
                  {course.tags.map((tag, i) => (
                    <span key={i} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#cbd5e1',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.68rem'
                    }}>
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <button
                  onClick={() => setSelectedCourse(course)}
                  style={{
                    width: '100%',
                    background: 'rgba(249, 115, 22, 0.1)',
                    border: '1px solid rgba(249, 115, 22, 0.3)',
                    color: '#fed7aa',
                    padding: '7px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    marginBottom: '0.65rem'
                  }}
                >
                  <Info size={14} color="#f97316" />
                  {language === 'hi' ? 'यह कोर्स क्यों अनुशंसित है? (Explainability)' : 'Why this recommendation? (Explainable AI)'}
                </button>

                <button
                  onClick={() => handleEnroll(course.id)}
                  disabled={isEnrolled}
                  className={`btn ${isEnrolled ? 'btn-accent' : 'btn-primary'}`}
                  style={{ width: '100%', padding: '9px', fontSize: '0.85rem' }}
                >
                  {isEnrolled ? (
                    <>
                      <Check size={16} /> {language === 'hi' ? 'आवेदन स्वीकृत (Enrolled)' : 'Application Approved (Enrolled)'}
                    </>
                  ) : (
                    <>
                      {language === 'hi' ? 'निःशुल्क आवेदन करें (PM-AJAY GIA)' : 'Enroll with PM-AJAY GIA Grant'} <ChevronRight size={15} />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Explainable AI Modal */}
      {selectedCourse && (
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
            maxWidth: '540px',
            width: '100%',
            background: '#0f172a',
            border: '1px solid rgba(249, 115, 22, 0.4)',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={18} color="#f97316" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>
                  {language === 'hi' ? 'पारदर्शी सिफारिश कारण' : 'Explainable AI Decision Breakdown'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.3rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '0.85rem', padding: '0.65rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <strong style={{ color: '#f97316', fontSize: '0.9rem' }}>{selectedCourse.title}</strong>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                NSQF {selectedCourse.nsqf_level} • Match Score: {selectedCourse.match_score}%
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem', fontSize: '0.8rem' }}>
                <span className="badge badge-saffron" style={{ height: 'fit-content', whiteSpace: 'nowrap' }}>1. Skill Match</span>
                <p style={{ color: '#cbd5e1' }}>{selectedCourse.explainability.skill_match}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', fontSize: '0.8rem' }}>
                <span className="badge badge-green" style={{ height: 'fit-content', whiteSpace: 'nowrap' }}>2. Eligibility</span>
                <p style={{ color: '#cbd5e1' }}>{selectedCourse.explainability.eligibility}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', fontSize: '0.8rem' }}>
                <span className="badge badge-blue" style={{ height: 'fit-content', whiteSpace: 'nowrap' }}>3. Local Demand</span>
                <p style={{ color: '#cbd5e1' }}>{selectedCourse.explainability.demand}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', fontSize: '0.8rem' }}>
                <span className="badge badge-purple" style={{ height: 'fit-content', whiteSpace: 'nowrap' }}>4. Accessibility</span>
                <p style={{ color: '#cbd5e1' }}>{selectedCourse.explainability.accessibility}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCourse(null)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.25rem', padding: '9px', fontSize: '0.85rem' }}
            >
              {language === 'hi' ? 'समझ आ गया' : 'Close'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
