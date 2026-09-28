import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Building2, 
  IndianRupee, 
  Car, 
  Home, 
  Calendar,
  Sparkles,
  Layers,
  Compass,
  Check
} from 'lucide-react';
import { NEARBY_CENTERS } from '../data/mockData';

export default function LocalOpportunities({ language, profile }) {
  const [selectedDistrict, setSelectedDistrict] = useState('Varanasi');
  const [activeCenterId, setActiveCenterId] = useState('center-1');
  const [radiusKm, setRadiusKm] = useState(15);
  const [appliedGrants, setAppliedGrants] = useState({});

  const handleGrantApply = (grantName) => {
    setAppliedGrants(prev => ({ ...prev, [grantName]: true }));
  };

  const activeCenter = NEARBY_CENTERS.find(c => c.id === activeCenterId) || NEARBY_CENTERS[0];

  return (
    <div className="fade-in" style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
      
      {/* Header */}
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
            <span className="badge badge-green">GIS & Mobility Intelligence</span>
            <span className="badge badge-saffron">PM-AJAY GIA Grants</span>
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginTop: '0.35rem' }}>
            {language === 'hi' ? 'स्थानीय प्रशिक्षण केंद्र एवं उद्यम अवसर' : 'Local Training Centers & Enterprise Grants'}
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {language === 'hi'
              ? 'स्थान, आवागमन की दूरी, छात्रावास एवं अनुदान सहायता युक्त अधिकृत केंद्र।'
              : 'GIS-optimized opportunities based on travel radius, cluster demand, and PM-AJAY GIA tool-kit assistance.'}
          </p>
        </div>

        {/* District Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={16} color="#f97316" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={{
              background: '#1e293b',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '0.82rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="Varanasi">Varanasi, UP</option>
            <option value="Gaya">Gaya, Bihar</option>
            <option value="Jaipur">Jaipur, Rajasthan</option>
            <option value="Patna">Patna, Bihar</option>
            <option value="Gorakhpur">Gorakhpur, UP</option>
          </select>
        </div>
      </div>

      {/* Interactive GIS Visual Map Canvas (Slide 3 Requirement) */}
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={17} color="#f97316" />
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>
              Interactive GIS Opportunity Map ({selectedDistrict} Cluster)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#94a3b8' }}>
            <span>Radius: <strong>{radiusKm} km</strong></span>
            <input 
              type="range" 
              min="5" 
              max="30" 
              value={radiusKm} 
              onChange={(e) => setRadiusKm(e.target.value)} 
              style={{ width: '100px', cursor: 'pointer', accentColor: '#f97316' }}
            />
          </div>
        </div>

        {/* Map Canvas with pins */}
        <div className="interactive-map-box">
          {/* User Location Pin */}
          <div style={{
            position: 'absolute',
            left: '28%',
            top: '55%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10
          }}>
            <div style={{
              background: '#38bdf8',
              color: '#000',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              marginBottom: '2px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
            }}>
              📍 You (Ramesh Kumar)
            </div>
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#38bdf8',
              border: '2px solid #ffffff',
              boxShadow: '0 0 12px #38bdf8'
            }} />
          </div>

          {/* Center 1 Pin */}
          <div 
            onClick={() => setActiveCenterId('center-1')}
            className="map-pin"
            style={{ left: '46%', top: '35%' }}
          >
            <div style={{
              background: activeCenterId === 'center-1' ? '#f97316' : '#1e293b',
              color: '#fff',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              border: '1px solid #f97316',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              🏢 PMKK Varanasi (6.4 km)
            </div>
          </div>

          {/* Center 2 Pin */}
          <div 
            onClick={() => setActiveCenterId('center-2')}
            className="map-pin"
            style={{ left: '72%', top: '65%' }}
          >
            <div style={{
              background: activeCenterId === 'center-2' ? '#10b981' : '#1e293b',
              color: '#fff',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              border: '1px solid #10b981',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              🌱 KVK Agri Hub (11.2 km)
            </div>
          </div>

          {/* Center 3 Pin */}
          <div 
            onClick={() => setActiveCenterId('center-3')}
            className="map-pin"
            style={{ left: '38%', top: '75%' }}
          >
            <div style={{
              background: activeCenterId === 'center-3' ? '#a855f7' : '#1e293b',
              color: '#fff',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              border: '1px solid #a855f7',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              🧵 CFC Handloom (4.8 km)
            </div>
          </div>

          {/* Map Overlay Stats */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '0.68rem',
            color: '#cbd5e1'
          }}>
            🎯 Showing 3 centers within {radiusKm}km • Click any pin to inspect
          </div>
        </div>
      </div>

      {/* 2 Column Layout: Nearby Centers + GIA Schemes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}>
        
        {/* Left: Center Details */}
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building2 size={17} color="#f97316" />
            {language === 'hi' ? `अधिकृत प्रशिक्षण केंद्र सूची (${selectedDistrict})` : `Affiliated Centers (${selectedDistrict})`}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {NEARBY_CENTERS.map((center) => {
              const isSelected = activeCenterId === center.id;
              return (
                <div 
                  key={center.id} 
                  onClick={() => setActiveCenterId(center.id)}
                  className="glass-card" 
                  style={{ 
                    padding: '1.1rem',
                    border: isSelected ? '2px solid #f97316' : '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: isSelected ? '#fed7aa' : '#f8fafc' }}>
                        {center.name}
                      </h4>
                      <span style={{ fontSize: '0.72rem', color: '#38bdf8', display: 'block', marginTop: '1px' }}>
                        {center.type}
                      </span>
                    </div>
                    <span className="badge badge-saffron" style={{ fontSize: '0.7rem' }}>
                      {center.distance}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.78rem', color: '#94a3b8', margin: '0.65rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={13} color="#94a3b8" />
                      <span>{center.address}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Car size={13} color="#94a3b8" />
                      <span>Travel: {center.travel_time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Home size={13} color={center.free_hostel ? '#10b981' : '#94a3b8'} />
                      <span style={{ color: center.free_hostel ? '#34d399' : '#94a3b8' }}>
                        {center.free_hostel ? '✓ Free Hostel & Food for SC Trainees' : 'Day Scholar Center'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={12} color="#38bdf8" /> {center.contact}
                    </span>
                    <a
                      href={`tel:${center.contact}`}
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Call Center
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Right: PM-AJAY GIA Special Grant Schemes */}
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={17} color="#10b981" />
            {language === 'hi' ? 'पीएम-अजय GIA अनुदान व स्वरोजगार सहायता' : 'PM-AJAY GIA Special Grant Schemes'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            
            {/* Grant Card 1: Tool Kit */}
            <div className="glass-card" style={{
              padding: '1.15rem',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(16, 185, 129, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className="badge badge-green">GIA Component #1</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#34d399' }}>₹50,000 Kit Grant</span>
              </div>

              <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>
                SC Modern Tool-Kit Subsidy (Solar & Electrician)
              </h4>
              <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '0.35rem 0 0.65rem 0' }}>
                100% grant for purchasing certified tool kits, multimeter, solar testing kit, and safety equipment.
              </p>

              <button
                onClick={() => handleGrantApply('toolkit')}
                disabled={appliedGrants['toolkit']}
                className={`btn ${appliedGrants['toolkit'] ? 'btn-accent' : 'btn-primary'}`}
                style={{ width: '100%', padding: '7px', fontSize: '0.78rem' }}
              >
                {appliedGrants['toolkit'] ? '✓ Grant Application Linked' : 'Apply for Tool-Kit Grant'}
              </button>
            </div>

            {/* Grant Card 2: Micro Enterprise */}
            <div className="glass-card" style={{
              padding: '1.15rem',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(249, 115, 22, 0.1) 100%)',
              border: '1px solid rgba(249, 115, 22, 0.3)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className="badge badge-saffron">GIA Component #2</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#fb923c' }}>Up to ₹2,00,000</span>
              </div>

              <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>
                SC Micro-Enterprise Livelihood Seed Capital
              </h4>
              <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '0.35rem 0 0.65rem 0' }}>
                Direct capital subsidy for setting up village-level Solar Service Centers, Handloom units, or Organic input outlets.
              </p>

              <button
                onClick={() => handleGrantApply('seed')}
                disabled={appliedGrants['seed']}
                className={`btn ${appliedGrants['seed'] ? 'btn-accent' : 'btn-primary'}`}
                style={{ width: '100%', padding: '7px', fontSize: '0.78rem' }}
              >
                {appliedGrants['seed'] ? '✓ Seed Capital Profiled' : 'Apply for Micro-Enterprise Grant'}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
