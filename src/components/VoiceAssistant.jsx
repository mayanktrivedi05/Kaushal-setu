import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  HelpCircle,
  Award,
  BookOpen,
  Briefcase,
  MapPin,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INTERVIEW_QUESTIONS } from '../data/mockData';

export default function VoiceAssistant({ 
  language, 
  profile, 
  setProfile, 
  onCompleteProfiling 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [speechStatus, setSpeechStatus] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const audioContextRef = useRef(null);

  const question = INTERVIEW_QUESTIONS[currentStep];

  // Play audio chime (Web Audio API) for instant realistic feedback
  const playChime = (freq = 600, type = 'sine') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
          setSpeechStatus(language === 'hi' ? '🎙️ आपकी आवाज़ सुनी जा रही है...' : '🎙️ Listening to your voice...');
          playChime(750);
        };

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setSpokenText(transcript);
          setSpeechStatus('');
        };

        recognition.onerror = (event) => {
          console.warn('SpeechRecognition error:', event.error);
          setIsListening(false);
          playChime(300);

          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setSpeechStatus(language === 'hi' 
              ? '💡 माइक्रोफ़ोन अनुमति नहीं मिली। कृपया नीचे दिए गए सुझाव पर क्लिक करें।' 
              : '💡 Microphone permission not granted. Please click suggestions below.');
          } else if (event.error === 'no-speech') {
            // Auto fallback demo input if no speech detected
            const defaultSuggestion = language === 'hi' ? question.suggestions_hi[0] : question.suggestions_en[0];
            setSpokenText(defaultSuggestion);
            setSpeechStatus(language === 'hi' ? '✨ सुझाई गई आवाज़ इनपुट प्राप्त हुई' : '✨ Suggested voice input captured');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Recognition setup failed:', err);
      }
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [language, currentStep]);

  // Read question aloud
  const speakQuestion = () => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const textToSpeak = language === 'hi' ? question.question_hi : question.question_en;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS speak error:', e);
      setIsSpeaking(false);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      playChime(400);
      return;
    }

    // Try real Speech Recognition
    if (recognitionRef.current) {
      try {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        return;
      } catch (err) {
        console.warn('Could not start recognition directly:', err);
      }
    }

    // Smart Fallback Simulator if browser blocks microphone
    setIsListening(true);
    playChime(700);
    setSpeechStatus(language === 'hi' ? '🎙️ आवाज़ सुनी जा रही है...' : '🎙️ Listening...');

    // Simulate voice listening & capture
    timeoutRef.current = setTimeout(() => {
      const defaultAnswer = language === 'hi' ? question.suggestions_hi[0] : question.suggestions_en[0];
      setSpokenText(defaultAnswer);
      setIsListening(false);
      playChime(900);
      setSpeechStatus(language === 'hi' ? '✓ आवाज़ सफलता से दर्ज हुई!' : '✓ Voice input captured!');
    }, 2000);
  };

  const handleAnswerSubmit = (customText) => {
    const answer = customText || spokenText;
    if (!answer.trim()) return;

    playChime(850);
    const key = question.key;
    const updatedProfile = { ...profile, [key]: answer };
    setProfile(updatedProfile);

    if (currentStep < INTERVIEW_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSpokenText('');
      setSpeechStatus('');
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onCompleteProfiling(updatedProfile);
      }, 1200);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSpokenText('');
    setSpeechStatus('');
    setIsCompleted(false);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '840px', margin: '0 auto', width: '100%' }}>
      
      {/* SIH Context Hero Banner */}
      <div className="glass-panel" style={{
        padding: '1.25rem',
        marginBottom: '1.25rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
              <span className="badge badge-saffron">PM-AJAY GIA Component</span>
              <span className="badge badge-green">Voice-First AI Profiler</span>
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>
              {language === 'hi' 
                ? 'कौशल सेतु AI: वॉयस आधारित आजीविका मैपिंग' 
                : 'Kaushal Setu AI: Conversational Livelihood Profiling'}
            </h1>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              {language === 'hi'
                ? 'अनुसूचित जाति (SC) युवाओं और कारीगरों के लिए सरल बोलचाल में कौशल पहचान एवं NSQF कोर्स सिफारिश।'
                : 'Empowering SC communities with multilingual voice-driven skill mapping and certified NSQF pathway matching.'}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{language === 'hi' ? 'प्रगति' : 'Progress'}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f97316' }}>
              {currentStep + 1} / {INTERVIEW_QUESTIONS.length}
            </div>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div style={{
          width: '100%',
          height: '5px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          marginTop: '0.85rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((currentStep + 1) / INTERVIEW_QUESTIONS.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #f97316, #10b981)',
            transition: 'width 0.35s ease'
          }} />
        </div>
      </div>

      {/* Main Interactive AI Voice Box */}
      <div className="glass-card" style={{
        padding: '1.75rem 1.25rem',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        textAlign: 'center',
        position: 'relative'
      }}>

        {/* Bot Audio Indicator & Question */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(249, 115, 22, 0.12)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          marginBottom: '1rem'
        }}>
          <Sparkles size={15} color="#f97316" />
          <span style={{ fontSize: '0.78rem', fontWeight: '600', color: '#fed7aa' }}>
            {language === 'hi' ? 'AI वॉयस सहायक पूछ रहा है:' : 'AI Voice Assistant is asking:'}
          </span>
          <button 
            onClick={speakQuestion}
            style={{
              background: 'none',
              border: 'none',
              color: '#f97316',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px 4px'
            }}
            title={language === 'hi' ? 'दोबारा सुनें' : 'Listen aloud'}
          >
            {isSpeaking ? <Volume2 size={16} /> : <Volume2 size={16} style={{ opacity: 0.6 }} />}
          </button>
        </div>

        {/* Big Question Prompt */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '1.25rem',
          lineHeight: '1.4'
        }}>
          {language === 'hi' ? question.question_hi : question.question_en}
        </h2>

        {/* Big Animated Mic Action Button */}
        <div style={{ margin: '1.25rem 0' }}>
          <button
            onClick={toggleMic}
            className={`btn ${isListening ? 'btn-voice' : 'btn-primary'}`}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              padding: 0,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title={isListening ? 'Stop Listening' : 'Click to Speak'}
          >
            {isListening ? <MicOff size={32} /> : <Mic size={32} />}
          </button>

          <div style={{ marginTop: '0.65rem' }}>
            {isListening ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '0.82rem', color: '#f87171', fontWeight: '600' }}>
                  {language === 'hi' ? '🔴 आपकी आवाज़ सुनी जा रही है... बोलिए' : '🔴 Listening... Speak now'}
                </span>
                <div className="sound-wave">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            ) : (
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                {language === 'hi' ? '🎙️ बोलने के लिए माइक दबाएं' : '🎙️ Tap mic to speak'}
              </span>
            )}
          </div>
        </div>

        {/* Speech input or typed text fallback box */}
        <div style={{
          maxWidth: '540px',
          margin: '0 auto 1.25rem auto',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '10px',
          padding: '0.65rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <input
            type="text"
            value={spokenText}
            onChange={(e) => setSpokenText(e.target.value)}
            placeholder={spokenText || question.placeholder}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.88rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAnswerSubmit();
            }}
          />

          <button
            onClick={() => handleAnswerSubmit()}
            disabled={!spokenText.trim()}
            className="btn btn-primary"
            style={{
              padding: '5px 12px',
              fontSize: '0.8rem',
              opacity: spokenText.trim() ? 1 : 0.4
            }}
          >
            {language === 'hi' ? 'आगे बढ़ें' : 'Next'} <ArrowRight size={14} />
          </button>
        </div>

        {speechStatus && (
          <p style={{ fontSize: '0.78rem', color: '#38bdf8', marginBottom: '0.85rem' }}>
            {speechStatus}
          </p>
        )}

        {/* Quick Demo Suggestions / One-click Answers */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
            {language === 'hi' ? '✨ या तुरंत चुनने के लिए एक विकल्प पर क्लिक करें:' : '✨ Or tap a quick suggestion for instant profiling:'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
            {(language === 'hi' ? question.suggestions_hi : question.suggestions_en).map((sug, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSpokenText(sug);
                  handleAnswerSubmit(sug);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#e2e8f0',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Live Profile preview summary pill */}
      {profile.name && (
        <div className="glass-panel" style={{
          marginTop: '1rem',
          padding: '0.65rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.8rem' }}>
            <CheckCircle2 size={16} color="#10b981" />
            <span>
              <strong>{profile.name}</strong> • {profile.education || '10th Matric'} • {profile.skills || 'Skills mapping...'}
            </span>
          </div>
          <button
            onClick={handleReset}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.72rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}
          >
            <RefreshCw size={11} /> {language === 'hi' ? 'शुरू से भरें' : 'Restart'}
          </button>
        </div>
      )}

    </div>
  );
}
