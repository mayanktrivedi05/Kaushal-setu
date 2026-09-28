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
  MapPin
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
  const [speechError, setSpeechError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const recognitionRef = useRef(null);

  const question = INTERVIEW_QUESTIONS[currentStep];

  // Initialize Web Speech API for voice recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError('');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setSpokenText(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError(language === 'hi' 
            ? 'माइक्रोफ़ोन अनुमति नहीं मिली। आप नीचे दिए गए सुझाव पर क्लिक कर सकते हैं।' 
            : 'Microphone access denied. You can also click the suggestions below.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  // Read question aloud when step changes
  useEffect(() => {
    speakQuestion();
    setSpokenText('');
  }, [currentStep, language]);

  const speakQuestion = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const textToSpeak = language === 'hi' ? question.question_hi : question.question_en;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      setSpeechError(language === 'hi' 
        ? 'आपके ब्राउज़र में वॉइस सपोर्ट नहीं है। कृपया सुझावों का उपयोग करें।' 
        : 'Web Speech is not supported in this browser. Please use suggestion chips.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAnswerSubmit = (customText) => {
    const answer = customText || spokenText;
    if (!answer.trim()) return;

    const key = question.key;
    const updatedProfile = { ...profile, [key]: answer };
    setProfile(updatedProfile);

    if (currentStep < INTERVIEW_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSpokenText('');
    } else {
      // Completed all questions
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
    setIsCompleted(false);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '840px', margin: '0 auto' }}>
      
      {/* SIH Context Hero Banner */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        marginBottom: '1.5rem',
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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-saffron">PM-AJAY GIA Component</span>
              <span className="badge badge-green">Voice-First AI Profiler</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff' }}>
              {language === 'hi' 
                ? 'कौशल सेतु AI: वॉयस आधारित आजीविका मैपिंग' 
                : 'Kaushal Setu AI: Conversational Livelihood Profiling'}
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
              {language === 'hi'
                ? 'अनुसूचित जाति (SC) युवाओं और कारीगरों के लिए सरल बोलचाल में कौशल पहचान एवं NSQF कोर्स सिफारिश।'
                : 'Empowering SC communities with multilingual voice-driven skill mapping and certified NSQF pathway matching.'}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{language === 'hi' ? 'प्रगति' : 'Progress'}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f97316' }}>
              {currentStep + 1} / {INTERVIEW_QUESTIONS.length}
            </div>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div style={{
          width: '100%',
          height: '6px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          marginTop: '1rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((currentStep + 1) / INTERVIEW_QUESTIONS.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #f97316, #10b981)',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* Main Interactive AI Voice Box */}
      <div className="glass-card" style={{
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        textAlign: 'center',
        position: 'relative'
      }}>

        {/* Bot Audio Indicator & Question */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(249, 115, 22, 0.12)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          marginBottom: '1.25rem'
        }}>
          <Sparkles size={16} color="#f97316" />
          <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fed7aa' }}>
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
              alignItems: 'center'
            }}
            title={language === 'hi' ? 'दोबारा सुनें' : 'Listen again'}
          >
            {isSpeaking ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        {/* Big Question Prompt */}
        <h2 style={{
          fontSize: '1.35rem',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '1.5rem',
          lineHeight: '1.4'
        }}>
          {language === 'hi' ? question.question_hi : question.question_en}
        </h2>

        {/* Big Animated Mic Action Button */}
        <div style={{ margin: '1.75rem 0' }}>
          <button
            onClick={toggleMic}
            className={`btn ${isListening ? 'btn-voice' : 'btn-primary'}`}
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              padding: 0,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
            title={isListening ? 'Stop Listening' : 'Click to Speak'}
          >
            {isListening ? <MicOff size={34} /> : <Mic size={34} />}
          </button>

          <div style={{ marginTop: '0.75rem' }}>
            {isListening ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.85rem', color: '#f87171', fontWeight: '600' }}>
                  {language === 'hi' ? '🔴 आपकी आवाज़ सुनी जा रही है... बोलिए' : '🔴 Listening to your voice... Speak now'}
                </span>
                <div className="sound-wave">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            ) : (
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {language === 'hi' ? '🎙️ बोलने के लिए माइक पर क्लिक करें' : '🎙️ Click mic to speak with AI'}
              </span>
            )}
          </div>
        </div>

        {/* Speech input or typed text fallback box */}
        <div style={{
          maxWidth: '560px',
          margin: '0 auto 1.5rem auto',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <input
            type="text"
            value={spokenText}
            onChange={(e) => setSpokenText(e.target.value)}
            placeholder={spokenText || (language === 'hi' ? question.placeholder : question.placeholder)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.95rem',
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
              padding: '6px 14px',
              fontSize: '0.85rem',
              opacity: spokenText.trim() ? 1 : 0.4
            }}
          >
            {language === 'hi' ? 'आगे बढ़ें' : 'Next'} <ArrowRight size={16} />
          </button>
        </div>

        {speechError && (
          <p style={{ fontSize: '0.8rem', color: '#f87171', marginBottom: '1rem' }}>
            {speechError}
          </p>
        )}

        {/* Quick Demo Suggestions / One-click Answers */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.65rem' }}>
            {language === 'hi' ? '✨ या तुरंत चुनने के लिए एक विकल्प पर क्लिक करें:' : '✨ Or select a quick suggestion for instant profiling:'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
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
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(249, 115, 22, 0.2)';
                  e.currentTarget.style.borderColor = '#f97316';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
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
          marginTop: '1.25rem',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span>
              <strong>{profile.name}</strong> • {profile.education || 'Education not set'} • {profile.skills || 'Skills mapping...'}
            </span>
          </div>
          <button
            onClick={handleReset}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RefreshCw size={12} /> {language === 'hi' ? 'शुरू से भरें' : 'Restart'}
          </button>
        </div>
      )}

    </div>
  );
}
