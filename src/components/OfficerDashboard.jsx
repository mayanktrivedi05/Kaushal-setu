import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Briefcase, 
  IndianRupee, 
  TrendingUp, 
  Download, 
  Search, 
  Layers,
  Sparkles
} from 'lucide-react';
import { BENEFICIARIES_DATA, DISTRICT_STATS } from '../data/mockData';

export default function OfficerDashboard({ language }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [beneficiaries, setBeneficiaries] = useState(BENEFICIARIES_DATA);

  const filteredList = beneficiaries.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.nsqf_mapped.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || b.status_code === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = 'ID,Name,District,Category,Education,NSQF Mapped Course,Status,Progress %,Grant Sanctioned,Disbursed,Outcome\n';
    const rows = filteredList.map(b => 
      `"${b.id}","${b.name}","${b.district}","${b.category}","${b.education}","${b.nsqf_mapped}","${b.status}",${b.progress},"${b.grant_sanctioned}","${b.disbursed}","${b.expected_outcome}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PM_AJAY_Beneficiaries_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
      
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
            <span className="badge badge-saffron">Ministry of Social Justice</span>
            <span className="badge badge-green">PM-AJAY GIA Monitoring</span>
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginTop: '0.35rem' }}>
            {language === 'hi' ? 'अधिकारी एवं जिला मॉनिटरिंग डैशबोर्ड' : 'Officer & District Livelihood Dashboard'}
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {language === 'hi'
              ? 'अनुसूचित जाति लाभार्थियों की रीयल-टाइम प्रगति एवं GIA फंड वितरण।'
              : 'Real-time monitoring of SC beneficiary skilling pathways & GIA grant disbursements.'}
          </p>
        </div>

        <button onClick={exportCSV} className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '0.55rem 1rem' }}>
          <Download size={15} /> {language === 'hi' ? 'एक्सपोर्ट रिपोर्ट (CSV)' : 'Export CSV'}
        </button>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.85rem',
        marginBottom: '1.25rem'
      }}>
        {/* KPI 1 */}
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total Profiled</span>
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
              <Users size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>{DISTRICT_STATS.total_sc_profiled}</div>
          <div style={{ fontSize: '0.72rem', color: '#34d399', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <TrendingUp size={11} /> +18.4% this quarter
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>In Training</span>
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316' }}>
              <GraduationCap size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>{DISTRICT_STATS.active_in_training}</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
            42 PMKK Batches
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>NSQF Certified</span>
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Award size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>{DISTRICT_STATS.nsqf_certified}</div>
          <div style={{ fontSize: '0.72rem', color: '#34d399', marginTop: '2px' }}>
            {DISTRICT_STATS.success_rate} pass rate
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Placed / Enterprise</span>
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
              <Briefcase size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>{DISTRICT_STATS.placed_or_enterprise}</div>
          <div style={{ fontSize: '0.72rem', color: '#c084fc', marginTop: '2px' }}>
            GIA Subsidy Disbursed
          </div>
        </div>

        {/* KPI 5 */}
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>GIA Grants Allocated</span>
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>
              <IndianRupee size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>{DISTRICT_STATS.gia_funds_allocated}</div>
          <div style={{ fontSize: '0.72rem', color: '#38bdf8', marginTop: '2px' }}>
            Disbursed: {DISTRICT_STATS.gia_funds_disbursed}
          </div>
        </div>
      </div>

      {/* Sector Demand & Pipeline */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        {/* Demand Bar Chart */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color="#f97316" />
            {language === 'hi' ? 'जिलावार NSQF कौशल मांग' : 'District Skill Demand & Batches'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Solar & Renewable (PM Surya Ghar)', percent: 85, count: '4,280 Trainees', color: '#f97316' },
              { label: 'Handloom & Modern Zari Craft', percent: 72, count: '3,650 Trainees', color: '#10b981' },
              { label: 'Organic Agri & Bio-Fertilizers', percent: 64, count: '3,120 Trainees', color: '#3b82f6' },
              { label: 'Domestic Electrical & Repair', percent: 58, count: '2,940 Trainees', color: '#a855f7' }
            ].map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '3px' }}>
                  <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{item.label}</span>
                  <span style={{ color: '#94a3b8' }}>{item.count}</span>
                </div>
                <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* End-to-End Pipeline */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={16} color="#10b981" />
            {language === 'hi' ? 'आजीविका यात्रा पाइपलाइन' : 'End-to-End Livelihood Funnel'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { step: '1. Voice Profiling Done', count: '14,820', status: '100% Processed', color: '#38bdf8' },
              { step: '2. NSQF Batch Enrolled', count: '10,240', status: '69% Enrolled', color: '#f97316' },
              { step: '3. Skill Certified', count: '7,890', status: '77% Certified', color: '#10b981' },
              { step: '4. GIA Grant Disbursed', count: '4,210', status: 'Live Enterprises', color: '#c084fc' }
            ].map((funnel, idx) => (
              <div key={idx} style={{
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '0.55rem 0.75rem',
                borderRadius: '8px',
                borderLeft: `4px solid ${funnel.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '600', color: '#ffffff' }}>{funnel.step}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{funnel.status}</div>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: funnel.color }}>
                  {funnel.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beneficiary Management Table with Smooth Mobile Horizontal Scroll */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        
        {/* Table Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>
            {language === 'hi' ? 'लाभार्थी प्रगति ट्रैकर' : 'Live Beneficiary Registry'}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', width: '100%', maxWidth: '420px' }}>
            {/* Search */}
            <div style={{
              flex: 1,
              minWidth: '160px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Search size={14} color="#94a3b8" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search beneficiary..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                background: '#1e293b',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.8rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Status</option>
              <option value="training">In Training</option>
              <option value="placed">Certified / Placed</option>
              <option value="enrolled">Enrolled</option>
              <option value="assessment">Assessment</option>
            </select>
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="horizontal-scroll-container" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', color: '#94a3b8' }}>
                <th style={{ padding: '0.65rem 0.5rem' }}>ID & Beneficiary</th>
                <th style={{ padding: '0.65rem 0.5rem' }}>Location</th>
                <th style={{ padding: '0.65rem 0.5rem' }}>Category</th>
                <th style={{ padding: '0.65rem 0.5rem' }}>NSQF Mapped Course</th>
                <th style={{ padding: '0.65rem 0.5rem' }}>Progress</th>
                <th style={{ padding: '0.65rem 0.5rem' }}>Status</th>
                <th style={{ padding: '0.65rem 0.5rem' }}>GIA Grant</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((ben) => (
                <tr key={ben.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{ padding: '0.65rem 0.5rem' }}>
                    <div style={{ fontWeight: '700', color: '#ffffff' }}>{ben.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{ben.id}</div>
                  </td>
                  <td style={{ padding: '0.65rem 0.5rem', color: '#cbd5e1' }}>
                    {ben.district}, {ben.state}
                  </td>
                  <td style={{ padding: '0.65rem 0.5rem' }}>
                    <div style={{ color: '#fed7aa' }}>{ben.category}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{ben.education}</div>
                  </td>
                  <td style={{ padding: '0.65rem 0.5rem' }}>
                    <strong style={{ color: '#38bdf8' }}>{ben.nsqf_mapped}</strong>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Outcome: {ben.expected_outcome}</div>
                  </td>
                  <td style={{ padding: '0.65rem 0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '45px', height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${ben.progress}%`, height: '100%', background: ben.progress === 100 ? '#10b981' : '#f97316' }} />
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{ben.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.65rem 0.5rem' }}>
                    <span className={`badge ${ben.status_code === 'placed' ? 'badge-green' : ben.status_code === 'training' ? 'badge-saffron' : 'badge-blue'}`}>
                      {ben.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.5rem' }}>
                    <div style={{ fontWeight: '700', color: '#34d399' }}>{ben.grant_sanctioned}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Paid: {ben.disbursed}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
