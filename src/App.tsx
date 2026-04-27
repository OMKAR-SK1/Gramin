
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Phone, 
  Plus, 
  Baby, 
  UserRound, 
  User, 
  ShieldCheck, 
  Ambulance, 
  ShieldAlert, 
  MapPin, 
  Bell, 
  ArrowLeft,
  Video,
  Mic,
  Stethoscope,
  ChevronRight,
  Info
} from 'lucide-react';
import { Language, Screen } from './types';
import { TRANSLATIONS, HEALTH_CATEGORIES, EMERGENCY_SERVICES, HOSPITALS } from './constants';
import { VoiceProvider, useVoice } from './components/VoiceContext';

// Helper for translations
const t = (key: string, lang: Language) => TRANSLATIONS[key]?.[lang] || key;

export default function App() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  // Handle initial language selection
  if (!language) {
    return <LanguageSelector onSelect={(lang) => setLanguage(lang)} />;
  }

  return (
    <VoiceProvider language={language}>
      <MainLayout 
        language={language} 
        currentScreen={currentScreen} 
        setScreen={setCurrentScreen} 
        setLanguage={setLanguage}
      />
    </VoiceProvider>
  );
}

function MainLayout({ 
  language, 
  currentScreen, 
  setScreen, 
  setLanguage 
}: { 
  language: Language; 
  currentScreen: Screen; 
  setScreen: (s: Screen) => void;
  setLanguage: (l: Language | null) => void;
}) {
  const { speak, stop } = useVoice();

  const handleBack = () => {
    stop();
    setScreen('home');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 safe-area-inset">
      {/* Header */}
      <header className="bg-white text-slate-800 p-5 shadow-sm border-b border-slate-200 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentScreen !== 'home' && (
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              {t('app_name', language)}
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Offline Active</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => { setLanguage(null); setScreen('home'); }}
          className="text-[10px] border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg uppercase tracking-widest font-black text-slate-600 hover:bg-slate-100 transition-colors"
        >
          {language === 'mr' ? 'मराठी' : language === 'hi' ? 'हिंदी' : 'English'}
        </button>
      </header>

      {/* Screen Content */}
      <main className="p-6 max-w-2xl mx-auto pb-28">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomeScreen language={language} setScreen={setScreen} />
            </motion.div>
          )}
          {currentScreen === 'health-info' && (
            <motion.div key="health" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HealthInfoScreen language={language} />
            </motion.div>
          )}
          {currentScreen === 'emergency' && (
            <motion.div key="emergency" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EmergencyScreen language={language} />
            </motion.div>
          )}
          {currentScreen === 'doctor-call' && (
            <motion.div key="doctor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DoctorCallScreen language={language} />
            </motion.div>
          )}
          {currentScreen === 'medicine-reminder' && (
            <motion.div key="reminder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MedicineReminderScreen language={language} />
            </motion.div>
          )}
          {currentScreen === 'hospital-locator' && (
            <motion.div key="hospitals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HospitalLocatorScreen language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Helper (Visual Feed for Accessibility) */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 px-6 flex justify-around bg-white border-t border-slate-100 lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-40">
        <NavButton icon={<Bell className="w-5 h-5" />} label={t('medicine_reminder', language)} active={currentScreen === 'medicine-reminder'} onClick={() => setScreen('medicine-reminder')} />
        <NavButton icon={<MapPin className="w-5 h-5" />} label={t('hospital_locator', language)} active={currentScreen === 'hospital-locator'} onClick={() => setScreen('hospital-locator')} />
      </footer>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all outline-none ${active ? 'text-blue-600' : 'text-slate-400'}`}>
      <div className={`p-2 rounded-xl transition-all ${active ? 'bg-blue-50 shadow-sm' : 'bg-transparent'}`}>{icon}</div>
      <span className={`text-[9px] uppercase tracking-wider ${active ? 'font-black' : 'font-bold'}`}>{label}</span>
    </button>
  );
}

// --- Screens ---

function LanguageSelector({ onSelect }: { onSelect: (lang: Language) => void }) {
  const languages: { code: Language; name: string; native: string }[] = [
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'en', name: 'English', native: 'English' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
      {/* Abstract background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20">
          <Stethoscope className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">ग्रामीण आरोग्य</h1>
        <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold">Rural Health Initiative</p>
      </motion.div>

      <div className="grid gap-3 w-full max-w-sm relative z-10">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(lang.code)}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:border-blue-500/50 transition-all group"
          >
            <div className="text-left">
              <span className="block text-xl font-bold tracking-tight">{lang.native}</span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold">{lang.name}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-20 text-center text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black space-y-2">
        <p>Government of Maharashtra</p>
        <p>© 2026 DIGITAL HEALTH</p>
      </div>
    </div>
  );
}

function HomeScreen({ language, setScreen }: { language: Language; setScreen: (s: Screen) => void }) {
  const { speak } = useVoice();

  useEffect(() => {
    speak(t('welcome', language));
  }, [language, speak]);

  const buttons = [
    { id: 'health-info' as Screen, label: t('health_info', language), icon: <Plus className="w-7 h-7" />, color: 'text-blue-600', bg: 'bg-blue-50', voice: t('health_info', language) },
    { id: 'emergency' as Screen, label: t('emergency', language), icon: <ShieldAlert className="w-7 h-7" />, color: 'text-white', bg: 'bg-red-600', voice: t('emergency', language), alert: true },
    { id: 'doctor-call' as Screen, label: t('doctor_call', language), icon: <Phone className="w-7 h-7" />, color: 'text-slate-700', bg: 'bg-slate-100', voice: t('doctor_call', language) },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
        <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shadow-inner">
          <Heart className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('welcome', language)}!</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">{t('app_name', language)}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {buttons.map((btn) => (
          <motion.button
            key={btn.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              speak(btn.voice);
              setScreen(btn.id);
            }}
            onMouseEnter={() => speak(btn.voice)}
            className={`w-full ${btn.id === 'emergency' ? 'bg-red-600 text-white shadow-xl shadow-red-200' : 'bg-white text-slate-800 border border-slate-200'} p-7 rounded-[2rem] flex items-center gap-6 shadow-sm relative overflow-hidden group`}
          >
            <div className={`p-4 rounded-2xl transition-colors ${btn.id === 'emergency' ? 'bg-white/20' : 'bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
              {btn.id === 'emergency' ? <ShieldAlert className="w-8 h-8" /> : 
               btn.id === 'health-info' ? <Plus className="w-8 h-8" /> : <Phone className="w-8 h-8" />}
            </div>
            <div className="text-left">
              <span className="block text-xl font-black uppercase tracking-tight">{btn.label}</span>
              {btn.id === 'emergency' && <span className="text-[10px] opacity-70 font-black uppercase tracking-widest">{t('emergency_btn_desc', language)}</span>}
            </div>
            
            {btn.id !== 'emergency' && (
              <div className="ml-auto opacity-20 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Quick stats / Offline notice */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-100/50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Offline Active</span>
        </div>
        <div className="bg-slate-100/50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">PHC: 2.1km</span>
        </div>
      </div>
    </div>
  );
}

function HealthInfoScreen({ language }: { language: Language }) {
  const { speak, isSpeaking } = useVoice();
  const [selected, setSelected] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Baby': return <Baby className="w-5 h-5" />;
      case 'UserRound': return <UserRound className="w-5 h-5" />;
      case 'User': return <User className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-slate-400">{t('health_info', language)}</h2>
      
      <div className="grid gap-3">
        {HEALTH_CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm">
            <button
              onClick={() => {
                if (selected === cat.id) {
                  setSelected(null);
                } else {
                  setSelected(cat.id);
                  speak(cat.title[language] + ". " + cat.description[language]);
                }
              }}
              onMouseEnter={() => speak(cat.title[language])}
              className={`w-full p-6 flex items-center justify-between active:bg-slate-50 transition-colors ${selected === cat.id ? 'bg-slate-50' : ''}`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-3.5 rounded-2xl shadow-sm transition-colors ${selected === cat.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600'}`}>
                  {getIcon(cat.icon)}
                </div>
                <span className="text-lg font-bold text-left tracking-tight">{cat.title[language]}</span>
              </div>
              <div className={`w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center transition-transform ${selected === cat.id ? 'rotate-90 bg-blue-50 border-blue-100 text-blue-600' : 'text-slate-300'}`}>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
            <AnimatePresence>
              {selected === cat.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="px-8 pb-8 pt-2"
                >
                  <p className="text-slate-600 leading-relaxed font-medium text-sm">
                    {cat.description[language]}
                  </p>
                  <button 
                    onClick={() => speak(cat.description[language])}
                    className="mt-6 flex items-center gap-3 text-blue-600 font-bold bg-blue-50 px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest"
                  >
                    <Mic className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce' : ''}`} />
                    Aika (Listen)
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmergencyScreen({ language }: { language: Language }) {
  const { speak } = useVoice();
  const [activeInstruction, setActiveInstruction] = useState<string | null>(null);

  const handleCall = (num: string, name: string) => {
    speak("Calling " + name);
    alert("Simulating call to: " + num);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-7 rounded-[2rem] border border-slate-200">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-8">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          {t('emergency', language)}
        </h2>
        
        <div className="grid gap-5">
          {EMERGENCY_SERVICES.map((service) => (
            <div key={service.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-600 text-white rounded-xl shadow-lg shadow-red-200">
                    {service.icon === 'Ambulance' ? <Ambulance className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                  </div>
                  <span className="text-lg font-black tracking-tight">{service.name[language]}</span>
                </div>
                <button 
                  onClick={() => handleCall(service.number, service.name[language])}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {service.number}
                </button>
              </div>
              
              <button 
                onClick={() => {
                  speak(service.instructions[language]);
                  setActiveInstruction(service.id === activeInstruction ? null : service.id);
                }}
                className={`w-full text-left p-4 rounded-xl flex items-center justify-between transition-all font-bold text-[10px] uppercase tracking-widest ${activeInstruction === service.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-slate-100 text-slate-500'}`}
              >
                <span>{t('first_aid_title', language)}</span>
                <Mic className={`w-3.5 h-3.5 ${activeInstruction === service.id ? 'animate-bounce' : 'text-slate-300'}`} />
              </button>
              
              <AnimatePresence>
                {activeInstruction === service.id && (
                  <motion.p 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-xs font-semibold text-slate-600 bg-white p-4 rounded-xl border border-slate-100 leading-relaxed overflow-hidden"
                  >
                    {service.instructions[language]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-slate-400 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          Nearby Hospital (Offline)
        </h3>
        <div className="space-y-4">
          {HOSPITALS.map(h => (
            <div key={h.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center group">
              <div>
                <p className="font-bold text-slate-900 text-sm tracking-tight">{h.name[language]}</p>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">{h.type[language]} • {h.distance}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DoctorCallScreen({ language }: { language: Language }) {
  const [isCalling, setIsCalling] = useState(false);
  const [recording, setRecording] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-slate-400">{t('doctor_call', language)}</h2>
      
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 text-center space-y-10 shadow-sm">
        <div className="relative inline-block">
          <div className="bg-slate-50 p-12 rounded-[3rem] text-slate-400 shadow-inner">
            <UserRound className="w-16 h-16" />
          </div>
          <div className="absolute top-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-sm" />
        </div>
        
        <div className="space-y-1">
          <h3 className="text-2xl font-black tracking-tight text-slate-800">Dr. Sameer Patil</h3>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">General Physician</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setIsCalling(true)}
            className="flex flex-col items-center gap-3 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all active:scale-95"
          >
            <Phone className="w-7 h-7" />
            <span className="font-black text-[10px] uppercase tracking-widest">Voice Call</span>
          </button>
          <button 
            onClick={() => setIsCalling(true)}
            className="flex flex-col items-center gap-3 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95"
          >
            <Video className="w-7 h-7" />
            <span className="font-black text-[10px] uppercase tracking-widest">Video Call</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-50">
          <p className="text-[9px] font-black text-slate-300 mb-6 uppercase tracking-[0.4em]">Send symptoms via voice</p>
          <button 
            onClick={() => setRecording(!recording)}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${recording ? 'bg-red-500 animate-pulse scale-110 shadow-red-200' : 'bg-slate-900 border-4 border-slate-800'}`}
          >
            <Mic className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isCalling && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center text-white"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[200px]" />
            </div>

            <div className="text-center space-y-8 relative z-10">
              <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-[3rem] mx-auto p-10 flex items-center justify-center animate-pulse">
                <Phone className="w-full h-full text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-black tracking-tight">Connecting...</p>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">Secured Line</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsCalling(false)}
              className="absolute bottom-24 bg-red-600 p-8 rounded-full shadow-2xl shadow-red-500/40 active:scale-95 transition-transform"
            >
              <Phone className="w-8 h-8 rotate-[135deg]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MedicineReminderScreen({ language }: { language: Language }) {
  const [reminders, setReminders] = useState([
    { id: '1', name: 'Saridon', time: 'morning', active: true, dose: '1 Tablet' },
    { id: '2', name: 'Vitamin C', time: 'afternoon', active: true, dose: '500mg' },
    { id: '3', name: 'Calcium', time: 'night', active: false, dose: 'Post-meal' },
  ]);

  const getTimeLabel = (time: string) => {
    switch(time) {
      case 'morning': return language === 'mr' ? 'सकाळ' : 'सुबह';
      case 'afternoon': return language === 'mr' ? 'दुपार' : 'दोपहर';
      case 'night': return language === 'mr' ? 'रात्री' : 'रात';
      default: return time;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-slate-400">{t('medicine_reminder', language)}</h2>
      
      <div className="space-y-4">
        {reminders.map(r => (
          <div key={r.id} className={`p-6 rounded-[2rem] border transition-all ${r.active ? 'bg-white border-blue-100 shadow-md shadow-blue-500/5' : 'bg-slate-50 border-slate-200 grayscale opacity-40'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl shadow-sm ${r.active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-black tracking-tight">{r.name}</p>
                    {r.active && <span className="text-[8px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{r.dose}</span>}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-1">{getTimeLabel(r.time)}</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const update = reminders.map(rem => rem.id === r.id ? { ...rem, active: !rem.active } : rem);
                  setReminders(update);
                }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${r.active ? 'bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500' : 'bg-blue-600 text-white'}`}
              >
                {r.active ? <Phone className="w-5 h-5 rotate-[135deg]" /> : <Bell className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
        
        <button className="w-full p-8 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:border-blue-300 hover:text-blue-500 transition-all mt-6 active:scale-95">
          <Plus className="w-6 h-6" />
          Add To Schedule
        </button>
      </div>
    </div>
  );
}

function HospitalLocatorScreen({ language }: { language: Language }) {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-8 text-slate-400">{t('hospital_locator', language)}</h2>
      
      {/* Map View */}
      <div className="bg-slate-200 h-60 rounded-[2.5rem] overflow-hidden relative shadow-inner flex items-center justify-center border border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-slate-200 opacity-50" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
            <MapPin className="w-7 h-7 text-blue-600 animate-bounce" />
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Live GPS Positioning</span>
        </div>
      </div>

      <div className="space-y-3">
        {HOSPITALS.map(h => (
          <button key={h.id} className="w-full bg-white p-6 rounded-[2rem] border border-slate-200 text-left flex items-center justify-between group active:bg-slate-50 transition-all shadow-sm hover:shadow-md">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-base font-black tracking-tight">{h.name[language]}</span>
                <span className="text-[8px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest">{h.type[language]}</span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
                {h.location} • <span className="text-blue-600 font-black">{h.distance}</span>
              </p>
            </div>
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
