import React, { useState } from 'react';
import { 
  Send, 
  Mic, 
  Phone, 
  Video, 
  MoreVertical, 
  CheckCheck, 
  Play, 
  Pause,
  Bot,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function WhatsAppSimulator({ language }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      type: 'text',
      text: 'नमस्ते! मैं कौशल सेतु AI (PM-AJAY) वॉयस बॉट हूँ। आप बोलकर या लिखकर बताएं कि आप कौन सा काम जानते हैं या सीखना चाहते हैं?',
      time: '10:02 AM'
    },
    {
      id: 2,
      sender: 'user',
      type: 'audio',
      duration: '0:14',
      transcript: 'मेरा नाम रमेश है। मैं वाराणसी से हूँ और मुझे बिजली और सोलर पैनल का थोड़ा काम आता है। मुझे सरकारी सर्टिफिकेट और दुकान के लिए मदद चाहिए।',
      time: '10:03 AM'
    },
    {
      id: 3,
      sender: 'bot',
      type: 'card',
      title: '🎯 आपकी डिजिटल प्रोफ़ाइल व NSQF सिफारिश तैयार है!',
      course: 'Solar PV Installer (Level 4)',
      grant: 'PM-AJAY GIA Grant: 100% Free + ₹3,500/Month Stipend + ₹50,000 Tool Kit Subsidy',
      center: 'PMKK Varanasi (6.4 km)',
      time: '10:03 AM'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputVal('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        type: 'text',
        text: `कौशल सेतु AI: आपका अनुरोध दर्ज कर लिया गया है। आपके जिले (PM-AJAY GIA) में संबंधित NSQF बैच 3 दिनों में शुरू हो रहा है। अधिकृत अधिकारी जल्द संपर्क करेंगे।`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '680px', margin: '0 auto' }}>
      
      {/* Intro Banner */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <span className="badge badge-green">Multichannel Access</span>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginTop: '0.25rem' }}>
          {language === 'hi' ? 'व्हाट्सएप एवं IVR वॉयस सिमुलेटर' : 'WhatsApp & IVR Voice Assistant Simulator'}
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          {language === 'hi' 
            ? 'कम पढ़े-लिखे या बिना स्मार्टफोन वाले नागरिकों के लिए व्हाट्सएप ऑडियो मैसेज और 1800-IVR कॉल सपोर्ट।' 
            : 'Simulated WhatsApp voice note interaction for low-literacy beneficiaries.'}
        </p>
      </div>

      {/* WhatsApp Frame */}
      <div style={{
        background: '#0b141a',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
      }}>
        
        {/* WhatsApp Top Bar */}
        <div style={{
          background: '#202c33',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 'bold'
            }}>
              <Bot size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#e9edef', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Kaushal Setu AI (PM-AJAY) <Sparkles size={13} color="#25D366" />
              </div>
              <div style={{ fontSize: '0.72rem', color: '#25D366' }}>
                Official Verified Govt. Assistant
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#aebac1' }}>
            <Phone size={18} style={{ cursor: 'pointer' }} />
            <Video size={18} style={{ cursor: 'pointer' }} />
            <MoreVertical size={18} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Chat Messages Body */}
        <div style={{
          height: '380px',
          overflowY: 'auto',
          padding: '1rem',
          background: 'linear-gradient(rgba(11, 20, 26, 0.95), rgba(11, 20, 26, 0.95)), repeating-linear-gradient(45deg, #111b21 0, #111b21 10px, #0b141a 10px, #0b141a 20px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: msg.sender === 'user' ? '#005c4b' : '#202c33',
                color: '#e9edef',
                borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                padding: '0.65rem 0.85rem',
                fontSize: '0.85rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Text Message */}
              {msg.type === 'text' && (
                <div>{msg.text}</div>
              )}

              {/* Audio Message */}
              {msg.type === 'audio' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#25D366',
                        border: 'none',
                        color: '#0b141a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      {isPlayingAudio ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}>
                        <div style={{ width: isPlayingAudio ? '60%' : '15%', height: '100%', background: '#25D366', transition: 'width 0.3s' }} />
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#8696a0' }}>{msg.duration}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#d1fae5', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4px' }}>
                    🎙️ AI Voice Transcript: "{msg.transcript}"
                  </div>
                </div>
              )}

              {/* Card Recommendation Message */}
              {msg.type === 'card' && (
                <div>
                  <div style={{ fontWeight: '700', color: '#f97316', marginBottom: '0.25rem' }}>
                    {msg.title}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#ffffff' }}>
                    📖 {msg.course}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#34d399', margin: '4px 0' }}>
                    💰 {msg.grant}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    📍 Center: {msg.center}
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '3px',
                fontSize: '0.68rem',
                color: '#8696a0',
                marginTop: '4px'
              }}>
                <span>{msg.time}</span>
                {msg.sender === 'user' && <CheckCheck size={14} color="#53bdeb" />}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSend}
          style={{
            background: '#202c33',
            padding: '0.65rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a message or record voice note..."
            style={{
              flex: 1,
              background: '#2a3942',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#e9edef',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              background: '#00a884',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <Send size={16} />
          </button>
        </form>

      </div>

    </div>
  );
}
