
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
  Info,
  Menu as MenuIcon,
  X,
  LogOut,
  LayoutDashboard,
  Settings,
  MessageSquare,
  Music
} from 'lucide-react';
import { Language, Screen } from './types';
import { TRANSLATIONS, HEALTH_CATEGORIES, EMERGENCY_SERVICES, HOSPITALS } from './constants';
import { VoiceProvider, useVoice } from './components/VoiceContext';

// Helper for translations
const t = (key: string, lang: Language) => TRANSLATIONS[key]?.[lang] || key;

export default function App() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  // Handle initial language selection
  if (!language) {
    return <LanguageSelector onSelect={(lang) => setLanguage(lang)} />;
  }

  // Handle Login
  if (!isLoggedIn) {
    return <LoginSelector language={language} onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <VoiceProvider language={language}>
      <MainLayout 
        language={language} 
        currentScreen={currentScreen} 
        setScreen={setCurrentScreen} 
        setLanguage={setLanguage}
        setIsLoggedIn={setIsLoggedIn}
      />
    </VoiceProvider>
  );
}

function MainLayout({ 
  language, 
  currentScreen, 
  setScreen, 
  setLanguage,
  setIsLoggedIn
}: { 
  language: Language; 
  currentScreen: Screen; 
  setScreen: (s: Screen) => void;
  setLanguage: (l: Language | null) => void;
  setIsLoggedIn: (b: boolean) => void;
}) {
  const { speak, stop } = useVoice();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBack = () => {
    stop();
    setScreen('home');
  };

  const menuItems = [
    { id: 'home', label: t('home', language), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'health-info', label: t('health_info', language), icon: <Plus className="w-5 h-5" /> },
    { id: 'emergency', label: t('emergency', language), icon: <ShieldAlert className="w-5 h-5" /> },
    { id: 'medicine-reminder', label: t('medicine_reminder', language), icon: <Bell className="w-5 h-5" /> },
    { id: 'hospital-locator', label: t('hospital_locator', language), icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-900 safe-area-inset flex overflow-hidden">
      {/* Sidebar (Desktop) / Drawer (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <span className="font-black tracking-tight text-lg">Arogya</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-4 flex flex-col gap-1">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setScreen(item.id as Screen);
                      setIsSidebarOpen(false);
                      speak(item.label);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${currentScreen === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-slate-100">
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 font-bold text-sm transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="bg-white text-slate-800 p-5 shadow-sm border-b border-slate-200 sticky top-0 z-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 border border-slate-200 shadow-sm"
              aria-label="Menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">
                {t('app_name', language)}
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button 
              onClick={() => { setLanguage(null); setIsLoggedIn(false); setScreen('home'); }}
              className="text-[9px] border border-slate-200 bg-white px-3 py-2 rounded-xl uppercase tracking-widest font-black text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm"
            >
              {language === 'mr' ? 'मराठी' : language === 'hi' ? 'हिंदी' : 'English'}
            </button>
            <div className="w-10 h-10 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Screen Content */}
        <main className="p-6 max-w-2xl mx-auto pb-32 flex-1 w-full">
          <AnimatePresence mode="wait">
            {currentScreen === 'home' && (
              <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <HomeScreen language={language} setScreen={setScreen} />
              </motion.div>
            )}
            {currentScreen === 'health-info' && (
              <motion.div key="health" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <HealthInfoScreen language={language} />
              </motion.div>
            )}
            {currentScreen === 'emergency' && (
              <motion.div key="emergency" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <EmergencyScreen language={language} />
              </motion.div>
            )}
            {currentScreen === 'doctor-call' && (
              <motion.div key="doctor" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <DoctorCallScreen language={language} />
              </motion.div>
            )}
            {currentScreen === 'medicine-reminder' && (
              <motion.div key="reminder" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <MedicineReminderScreen language={language} />
              </motion.div>
            )}
            {currentScreen === 'hospital-locator' && (
              <motion.div key="hospitals" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <HospitalLocatorScreen language={language} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Floating Voice Assistant Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => speak("How can I help you today?")}
          className="fixed bottom-24 right-6 w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-2xl shadow-indigo-300 flex items-center justify-center z-50 border-4 border-white/20"
        >
          <Mic className="w-6 h-6" />
        </motion.button>

        {/* Navigation Helper */}
        <footer className="fixed bottom-0 left-0 right-0 py-3 px-6 flex justify-around bg-white border-t border-slate-200 lg:hidden shadow-[0_-8px_20px_rgba(0,0,0,0.03)] z-40">
          <NavButton icon={<Bell className="w-5 h-5" />} label={t('medicine_reminder', language)} active={currentScreen === 'medicine-reminder'} onClick={() => setScreen('medicine-reminder')} />
          <NavButton icon={<LayoutDashboard className="w-5 h-5" />} label="Home" active={currentScreen === 'home'} onClick={() => setScreen('home')} />
          <NavButton icon={<MapPin className="w-5 h-5" />} label={t('hospital_locator', language)} active={currentScreen === 'hospital-locator'} onClick={() => setScreen('hospital-locator')} />
        </footer>
      </div>
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
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
      {/* Abstract background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-lime-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-600 rounded-full blur-[150px] opacity-30" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/20 ring-4 ring-white/10">
          <Stethoscope className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">ग्रामीण आरोग्य</h1>
        <p className="text-emerald-300 uppercase tracking-[0.3em] text-[10px] font-bold">Rural Health Initiative</p>
      </motion.div>

      <div className="grid gap-3 w-full max-w-sm relative z-10">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(lang.code)}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:border-emerald-500/50 transition-all group backdrop-blur-sm"
          >
            <div className="text-left">
              <span className="block text-xl font-bold tracking-tight">{lang.native}</span>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-300/60 font-bold">{lang.name}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-600/30 transition-colors">
              <ChevronRight className="w-5 h-5 text-emerald-500 group-hover:text-emerald-300" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-20 text-center text-[10px] text-emerald-500/50 uppercase tracking-[0.2em] font-black space-y-2 relative z-10">
        <p>Government of Maharashtra</p>
        <p>© 2026 DIGITAL HEALTH</p>
      </div>
    </div>
  );
}

function LoginSelector({ language, onLogin }: { language: Language, onLogin: () => void }) {
  const [loading, setLoading] = useState(false);
  
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -mr-32 -mt-32 opacity-60" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-50 rounded-full blur-[100px] -ml-32 -mb-32 opacity-40" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] mx-auto mb-8 shadow-2xl shadow-indigo-200 flex items-center justify-center text-white ring-8 ring-indigo-50">
          <Stethoscope className="w-12 h-12" />
        </div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Arogya Portal</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Rural Health Management</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Access Code</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="text" 
                defaultValue="ADMIN_USER_01"
                className="w-full bg-slate-50 border border-slate-100 p-5 pl-12 rounded-3xl text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Passkey</label>
            <div className="relative">
              <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="password" 
                defaultValue="••••••••"
                className="w-full bg-slate-50 border border-slate-100 p-5 pl-12 rounded-3xl text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-10 bg-slate-900 text-white p-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 relative overflow-hidden"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Enter Dashboard
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </motion.button>

        <div className="mt-12 flex items-center justify-center gap-6">
           <div className="flex flex-col items-center gap-1 opacity-40">
             <div className="p-3 bg-slate-100 rounded-xl"><Mic className="w-4 h-4" /></div>
             <span className="text-[8px] font-black uppercase tracking-widest">Voice</span>
           </div>
           <div className="flex flex-col items-center gap-1 opacity-40">
             <div className="p-3 bg-slate-100 rounded-xl"><ShieldAlert className="w-4 h-4" /></div>
             <span className="text-[8px] font-black uppercase tracking-widest">Secure</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

function HomeScreen({ language, setScreen }: { language: Language; setScreen: (s: Screen) => void }) {
  const { speak } = useVoice();

  useEffect(() => {
    speak(t('welcome', language));
  }, [language, speak]);

  const cards = [
    { id: 'health-info' as Screen, label: t('health_info', language), icon: <Plus className="w-6 h-6" />, color: 'blue' },
    { id: 'medicine-reminder' as Screen, label: t('medicine_reminder', language), icon: <Bell className="w-6 h-6" />, color: 'emerald' },
    { id: 'hospital-locator' as Screen, label: t('hospital_locator', language), icon: <MapPin className="w-6 h-6" />, color: 'indigo' },
    { id: 'doctor-call' as Screen, label: t('doctor_call', language), icon: <Phone className="w-6 h-6" />, color: 'slate' },
  ];

  return (
    <div className="space-y-8">
      {/* Search Bar Placeholder */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Info className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Search symptoms or health topics..."
          className="w-full bg-[#f8fafc] border border-slate-200 p-5 pl-12 rounded-[2rem] text-sm font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Health Vitals Summary */}
      <div className="bg-white p-1 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-[#f8fafc] flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">My Vitals</span>
          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Live Sync</span>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight leading-none">72</p>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">BPM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight leading-none">98%</p>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Oxygen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Quick Action */}
      <motion.button 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setScreen('emergency')}
        className="w-full bg-red-600 p-6 rounded-[2.5rem] flex items-center justify-between text-white shadow-2xl shadow-red-200 group"
      >
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="text-left">
            <span className="block text-xl font-black uppercase tracking-tight">SOS Emergency</span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Immediate Medical Help</span>
          </div>
        </div>
        <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-all">
          <ChevronRight className="w-6 h-6" />
        </div>
      </motion.button>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map(card => (
          <motion.button
            key={card.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScreen(card.id)}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-8 text-left group"
          >
            <div className={`p-4 rounded-2xl w-fit transition-all ${
              card.color === 'blue' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600' :
              card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600' :
              card.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600' :
              'bg-slate-50 text-slate-600 group-hover:bg-slate-900'
            } group-hover:text-white group-hover:shadow-lg transition-all`}>
              {card.icon}
            </div>
            <div>
              <span className="block text-lg font-black tracking-tight leading-tight">{card.label}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 group-hover:text-slate-400">Section</span>
            </div>
          </motion.button>
        ))}
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight">{t('health_info', language)}</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Knowledge</p>
        </div>
        <div className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
          <Info className="w-5 h-5" />
        </div>
      </div>
      
      <div className="grid gap-4">
        {HEALTH_CATEGORIES.map((cat) => (
          <motion.div 
            key={cat.id} 
            layout
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm transition-all"
          >
            <button
              onClick={() => {
                if (selected === cat.id) {
                  setSelected(null);
                } else {
                  setSelected(cat.id);
                  speak(cat.title[language] + ". " + cat.description[language]);
                }
              }}
              className={`w-full p-8 flex items-center justify-between active:bg-[#f8fafc] transition-colors ${selected === cat.id ? 'bg-[#f8fafc]' : ''}`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl shadow-sm transition-all ${selected === cat.id ? 'bg-indigo-600 text-white scale-110' : 'bg-slate-100 text-slate-500'}`}>
                  {getIcon(cat.icon)}
                </div>
                <div className="text-left">
                  <span className="block text-lg font-black tracking-tight leading-none">{cat.title[language]}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 mt-1">Health Topic</span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${selected === cat.id ? 'rotate-90 bg-indigo-100 text-indigo-600' : 'bg-slate-50 text-slate-300'}`}>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
            <AnimatePresence>
              {selected === cat.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-8 pb-8"
                >
                  <div className="h-px bg-slate-100 mb-6" />
                  <p className="text-slate-600 leading-relaxed font-bold text-sm tracking-wide">
                    {cat.description[language]}
                  </p>
                  
                  <div className="mt-8 flex gap-3">
                    <button 
                      onClick={() => speak(cat.description[language])}
                      className="flex-1 flex items-center justify-center gap-3 bg-indigo-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
                    >
                      <Mic className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                      {language === 'mr' ? 'ऐका (Listen)' : 'Suniye (Listen)'}
                    </button>
                    <button className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:bg-slate-200 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm transition-all hover:shadow-md">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-8">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          {t('emergency', language)}
        </h2>
        
        <div className="grid gap-5">
          {EMERGENCY_SERVICES.map((service) => (
            <div key={service.id} className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-100 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-100">
                    {service.icon === 'Ambulance' ? <Ambulance className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                  </div>
                  <div className="text-left">
                    <span className="block text-lg font-black tracking-tight">{service.name[language]}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-red-500/60">24/7 Available</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleCall(service.number, service.name[language])}
                  className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 active:scale-95 transition-all shadow-lg shadow-slate-200"
                >
                  <Phone className="w-4 h-4" />
                  {service.number}
                </button>
              </div>
              
              <button 
                onClick={() => {
                  speak(service.instructions[language]);
                  setActiveInstruction(service.id === activeInstruction ? null : service.id);
                }}
                className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all font-black text-[10px] uppercase tracking-widest ${activeInstruction === service.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' : 'bg-white border border-slate-100 text-slate-500 hover:bg-white hover:shadow-sm'}`}
              >
                <span>{t('first_aid_title', language)}</span>
                <Mic className={`w-4 h-4 ${activeInstruction === service.id ? 'animate-bounce' : 'text-slate-300'}`} />
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
      
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 text-center space-y-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
        
        <div className="relative inline-block mt-4">
          <div className="bg-[#f8fafc] p-12 rounded-[3.5rem] text-slate-400 shadow-inner ring-1 ring-slate-100">
            <UserRound className="w-20 h-20" />
          </div>
          <div className="absolute top-4 right-4 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-lg" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-black tracking-tight text-slate-800">Dr. Sameer Patil</h3>
          <p className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.4em]">General Practitioner</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">Available Now</span>
            <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest">Exp: 12+ Yrs</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setIsCalling(true)}
            className="flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-[#f8fafc] border border-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95 shadow-sm"
          >
            <div className="p-4 bg-white rounded-2xl shadow-sm"><Phone className="w-8 h-8" /></div>
            <span className="font-black text-[10px] uppercase tracking-[0.2em] opacity-60">Voice Call</span>
          </button>
          <button 
            onClick={() => setIsCalling(true)}
            className="flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-[#f8fafc] border border-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-100 transition-all active:scale-95 shadow-sm"
          >
            <div className="p-4 bg-white rounded-2xl shadow-sm"><Video className="w-8 h-8" /></div>
            <span className="font-black text-[10px] uppercase tracking-[0.2em] opacity-60">Video Call</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-50">
          <p className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.4em]">Record Symptoms (Offline)</p>
          <div className="flex items-center justify-center gap-8">
            <button 
              onClick={() => setRecording(!recording)}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl ${recording ? 'bg-red-500 animate-pulse scale-110 shadow-red-200 ring-8 ring-red-50' : 'bg-slate-900 border-[6px] border-slate-800'}`}
            >
              <Mic className="w-10 h-10 text-white" />
            </button>
          </div>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight">{t('medicine_reminder', language)}</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Schedule</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
          <Bell className="w-6 h-6" />
        </div>
      </div>
      
      <div className="space-y-4">
        {reminders.map(r => (
          <div key={r.id} className={`p-6 rounded-[2rem] border transition-all ${r.active ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#f8fafc] border-slate-100 grayscale opacity-40'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl shadow-sm ${r.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-200 text-slate-400'}`}>
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-black tracking-tight">{r.name}</p>
                    {r.active && <span className="text-[8px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{r.dose}</span>}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">{getTimeLabel(r.time)}</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const update = reminders.map(rem => rem.id === r.id ? { ...rem, active: !rem.active } : rem);
                  setReminders(update);
                }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${r.active ? 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'}`}
              >
                {r.active ? <X className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
        
        <button className="w-full p-8 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all mt-6 active:scale-95">
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight">{t('hospital_locator', language)}</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Healthcare Services</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
          <MapPin className="w-6 h-6" />
        </div>
      </div>
      
      {/* Map View */}
      <div className="bg-slate-200 h-60 rounded-[2.5rem] overflow-hidden relative shadow-inner flex items-center justify-center border border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-slate-200 opacity-50" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <MapPin className="w-8 h-8 text-indigo-600 animate-bounce" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full">Positioning...</span>
        </div>
      </div>

      <div className="space-y-3">
        {HOSPITALS.map(h => (
          <button key={h.id} className="w-full bg-white p-6 rounded-[2rem] border border-slate-200 text-left flex items-center justify-between group active:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:border-indigo-100">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-base font-black tracking-tight">{h.name[language]}</span>
                <span className="text-[8px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest">{h.type[language]}</span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/20" />
                {h.location} • <span className="text-indigo-600 font-black">{h.distance}</span>
              </p>
            </div>
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:bg-indigo-600 transition-all">
              <Phone className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
