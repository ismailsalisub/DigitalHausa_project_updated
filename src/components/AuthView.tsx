import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, Lock, User, IdCard, Eye, EyeOff, 
  ArrowLeft, CheckCircle2, Sparkles, LogIn, UserPlus, ShieldCheck, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DigitalHausaLogo } from './DigitalHausaLogo';
import { TechTreeIcon } from './TechTreeIcon';

export const AuthView: React.FC = () => {
  const { language, setRoute, loginUser, registerUser, signIn } = useApp();
  
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  // Login form state
  const [loginEmailOrId, setLoginEmailOrId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupStudentId] = useState(() => `FE/26/${Math.floor(100000 + Math.random() * 900000)}`);
  const [selectedPaths, setSelectedPaths] = useState<string[]>(['programming']);
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI status
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!loginEmailOrId.trim()) {
      setErrorMsg(
        language === 'HA' 
          ? 'Shigar da adireshin imel ko lambar ID dinki.' 
          : 'Please enter your email address or student ID.'
      );
      return;
    }

    if (!loginPassword) {
      setErrorMsg(
        language === 'HA' 
          ? 'Shigar da kalmar sirri.' 
          : 'Please enter your password.'
      );
      return;
    }

    setSuccessMsg(
      language === 'HA' ? 'An yi nasara! Ana shiga...' : 'Success! Logging in...'
    );

    setTimeout(() => {
      loginUser(loginEmailOrId.trim());
    }, 600);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!signupName.trim()) {
      setErrorMsg(
        language === 'HA' ? 'Shigar da cikakken sunanka.' : 'Please enter your full name.'
      );
      return;
    }

    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMsg(
        language === 'HA' ? 'Shigar da adireshin imel mai kyau.' : 'Please enter a valid email address.'
      );
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMsg(
        language === 'HA' 
          ? 'Kalmar sirri ta kasance akalla haruffa 6.' 
          : 'Password must be at least 6 characters long.'
      );
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg(
        language === 'HA' ? 'Kalmomin sirri ba su yi daidai ba.' : 'Passwords do not match.'
      );
      return;
    }

    if (!agreeTerms) {
      setErrorMsg(
        language === 'HA' 
          ? 'Dole ne ka yarda da tsarin amfani da DigitalHausa.' 
          : 'You must agree to the DigitalHausa terms.'
      );
      return;
    }

    setSuccessMsg(
      language === 'HA' ? 'An bude akwanti! Ana shiga...' : 'Account created! Logging in...'
    );

    setTimeout(() => {
      registerUser(signupName.trim(), signupEmail.trim(), signupStudentId, selectedPaths);
    }, 600);
  };

  const handleDemoLogin = () => {
    setSuccessMsg(
      language === 'HA' ? 'Shiga da akwantin Demo...' : 'Signing in with Demo account...'
    );
    setTimeout(() => {
      signIn();
    }, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="auth-workspace max-w-md mx-auto px-4 py-6 md:py-10 flex flex-col items-center w-full"
    >
      {/* Top Navigation Bar */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => setRoute('profile')}
          className="flex items-center gap-2 text-xs font-black text-[#607D8B] hover:text-[#2E7D32] bg-white border border-black/5 hover:border-black/15 px-3.5 py-2 rounded-full shadow-xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'HA' ? 'Koma Shafi' : 'Back to Profile'}</span>
        </button>

        <div className="flex items-center gap-1.5 bg-[#2E7D32]/10 border border-[#2E7D32]/20 px-3 py-1 rounded-full text-[11px] font-black text-[#2E7D32]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DigitalHausa Auth</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full bg-white border border-black/10 rounded-3xl p-6 md:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col items-center">
        {/* Logo and Greeting Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 bg-[#FAF9F6] border border-black/5 rounded-2xl flex items-center justify-center shadow-xs mb-3">
            <DigitalHausaLogo className="w-8 h-8" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#263238] tracking-tight">
            {mode === 'login' 
              ? (language === 'HA' ? 'Barka da Dawowa!' : 'Welcome Back!')
              : (language === 'HA' ? 'Bude Sabon Akwanti' : 'Create New Account')}
          </h2>
          <p className="text-xs font-extrabold text-[#607D8B] mt-1">
            {mode === 'login'
              ? (language === 'HA' ? 'Shigar da bayananki don cigaba da koyo' : 'Sign in to sync your learning progress')
              : (language === 'HA' ? 'Shiga tsarin don samun cikakken horo' : 'Join thousands learning tech in Hausa')}
          </p>
        </div>

        {/* Tab Switcher: Log In vs Sign Up */}
        <div className="w-full bg-[#FAF9F6] p-1.5 rounded-2xl border border-black/5 flex items-center mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#2E7D32] shadow-sm border border-black/5'
                : 'text-[#607D8B] hover:text-[#263238]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{language === 'HA' ? 'Shiga Shafi' : 'Log In'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-[#2E7D32] shadow-sm border border-black/5'
                : 'text-[#607D8B] hover:text-[#263238]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{language === 'HA' ? 'Rijista (Sign Up)' : 'Sign Up'}</span>
          </button>
        </div>

        {/* Error / Success Notifications */}
        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-extrabold p-3 rounded-2xl mb-4 flex items-center gap-2 text-left"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-[#2E7D32] text-xs font-extrabold p-3 rounded-2xl mb-4 flex items-center gap-2 text-left"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Log In Form */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="w-full space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#607D8B] mb-1.5">
                {language === 'HA' ? 'Imel ko Lamba / ID' : 'Email or Student ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#607D8B]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={loginEmailOrId}
                  onChange={(e) => setLoginEmailOrId(e.target.value)}
                  placeholder={language === 'HA' ? 'Mani: ismail@gmail.com ko FE/23/8813977' : 'e.g. ismail@gmail.com or FE/23/8813977'}
                  className="w-full bg-[#FAF9F6] border border-black/10 focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold text-[#263238] outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#607D8B] mb-1.5">
                {language === 'HA' ? 'Kalmar Sirri (Password)' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#607D8B]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF9F6] border border-black/10 focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 rounded-2xl py-2.5 pl-10 pr-10 text-xs font-bold text-[#263238] outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#607D8B] hover:text-[#263238] cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-[#607D8B] select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#2E7D32] w-4 h-4 rounded-md"
                />
                <span>{language === 'HA' ? 'Tuna da ni' : 'Remember me'}</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setErrorMsg(
                    language === 'HA' 
                      ? 'Lambar watsawa za ta zo ta imel. Ko zaka iya shiga da Demo button na kasa.' 
                      : 'Password reset link sent to email. Or use Demo sign in below.'
                  );
                }}
                className="font-bold text-[#2E7D32] hover:underline cursor-pointer"
              >
                {language === 'HA' ? 'Manta Kalmar Sirri?' : 'Forgot Password?'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2E7D32] hover:bg-[#256629] text-white font-black text-xs py-3.5 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{language === 'HA' ? 'Shiga Akwanti' : 'Sign In Now'}</span>
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignupSubmit} className="w-full space-y-3.5 text-left">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#607D8B] mb-1">
                {language === 'HA' ? 'Cikakken Suna' : 'Full Name'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#607D8B]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder={language === 'HA' ? 'Mani: Ismail Salisu' : 'e.g. Ismail Salisu'}
                  className="w-full bg-[#FAF9F6] border border-black/10 focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold text-[#263238] outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#607D8B] mb-1">
                {language === 'HA' ? 'Adireshin Imel (Email)' : 'Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#607D8B]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#FAF9F6] border border-black/10 focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold text-[#263238] outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#607D8B]">
                  {language === 'HA' ? 'Lambar ID ta Dalibi' : 'Student ID'}
                </label>
                <span className="text-[10px] font-extrabold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {language === 'HA' ? 'Ta Atomatik (Auto)' : 'Auto-Generated'}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2E7D32]">
                  <IdCard className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={signupStudentId}
                  readOnly
                  disabled
                  className="w-full bg-[#FAF9F6] border border-black/10 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-black text-[#263238] select-none opacity-90 cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] font-medium text-[#607D8B] mt-1">
                {language === 'HA' 
                  ? 'An samar da wannan lambar ID ta atomatik don adana tarihin karatunka.'
                  : 'This unique Student ID is automatically generated for your account.'}
              </p>
            </div>

            {/* Path Selection / Goal Choosing Section */}
            <div className="pt-1">
              <label className="block text-[10px] font-black uppercase tracking-wider text-[#607D8B] mb-1.5">
                {language === 'HA' ? 'Abin da Kake So Ka Koya (Zabi Tafarki)' : 'What Do You Want to Learn?'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'foundation', icon: '🌱', titleHa: 'Asasi (Basics)', titleEn: 'Computer Basics' },
                  { id: 'programming', icon: '💻', titleHa: 'Sifari (Coding)', titleEn: 'Web & Programming' },
                  { id: 'office', icon: '💼', titleHa: 'Ofis (Office)', titleEn: 'MS Office & Work' },
                  { id: 'creative', icon: '🎨', titleHa: 'Fasahar Zane', titleEn: 'Creative & Design' }
                ].map((path) => {
                  const isSelected = selectedPaths.includes(path.id);
                  return (
                    <button
                      key={path.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedPaths(selectedPaths.filter(p => p !== path.id));
                        } else {
                          setSelectedPaths([...selectedPaths, path.id]);
                        }
                      }}
                      className={`p-2.5 rounded-2xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32] font-black shadow-2xs'
                          : 'bg-[#FAF9F6] border-black/10 hover:border-black/20 text-[#607D8B]'
                      }`}
                    >
                      <TechTreeIcon subBranchId={path.id} icon={path.icon} size="xs" />
                      <span className="text-[11px] leading-tight">
                        {language === 'HA' ? path.titleHa : path.titleEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#607D8B] mb-1">
                  {language === 'HA' ? 'Kalmar Sirri' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FAF9F6] border border-black/10 focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 rounded-2xl py-2.5 px-3.5 text-xs font-bold text-[#263238] outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-[#607D8B] mb-1">
                  {language === 'HA' ? 'Tabbatar da Password' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FAF9F6] border border-black/10 focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 rounded-2xl py-2.5 px-3.5 text-xs font-bold text-[#263238] outline-hidden transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-extrabold text-[#607D8B] select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="accent-[#2E7D32] w-4 h-4 rounded-md shrink-0"
                />
                <span>
                  {language === 'HA' 
                    ? 'Na yarda da Tsarin Amfani da DigitalHausa' 
                    : 'I agree to the DigitalHausa Terms & Conditions'}
                </span>
              </label>

              <button
                type="button"
                onClick={() => setShowSignupPassword(!showSignupPassword)}
                className="text-xs text-[#2E7D32] font-bold shrink-0 ml-1"
              >
                {showSignupPassword ? (language === 'HA' ? 'Boye' : 'Hide') : (language === 'HA' ? 'Nuna' : 'Show')}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2E7D32] hover:bg-[#256629] text-white font-black text-xs py-3.5 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-3"
            >
              <UserPlus className="w-4 h-4" />
              <span>{language === 'HA' ? 'Kammala Rijista (Create Account)' : 'Create Account'}</span>
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="w-full flex items-center my-6">
          <div className="flex-1 border-t border-black/5"></div>
          <span className="px-3 text-[10px] font-black uppercase tracking-widest text-[#607D8B]">
            {language === 'HA' ? 'KO' : 'OR'}
          </span>
          <div className="flex-1 border-t border-black/5"></div>
        </div>

        {/* Quick Demo Login Option */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full bg-[#FAF9F6] border border-black/10 hover:border-[#2E7D32]/50 hover:bg-white text-[#263238] font-black text-xs py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs group"
        >
          <ShieldCheck className="w-4 h-4 text-[#2E7D32] group-hover:scale-110 transition-transform" />
          <span>
            {language === 'HA' 
              ? 'Shiga da Akwantin Demo (Ismail Salisu)' 
              : 'Sign In as Demo Student (Ismail Salisu)'}
          </span>
        </button>
      </div>
    </motion.div>
  );
};
