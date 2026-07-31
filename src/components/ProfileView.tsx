import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, Settings, Bell, Volume2, Save, 
  Edit3, KeyRound, LogIn, LogOut, Award, Flame, Zap
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProfileView: React.FC = () => {
  const { 
    language, 
    user, 
    setRoute,
    signOut 
  } = useApp();

  const isStudent = user && user.role === 'student';

  const completedCount = isStudent ? user.completedLessonIds.length : 0;
  const streak = isStudent ? user.streakDays : 0;
  
  // Dynamic formula calculation: 320 starting baseline + 20 XP per lesson completed
  const totalXp = isStudent ? (320 + completedCount * 20) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="profile-workspace max-w-4xl mx-auto px-4 py-6 md:py-12"
    >
      {/* Profile Identity Card */}
      <section className="profile-identity-card bg-white border border-black/5 rounded-3xl p-6 flex items-center gap-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
        <div className="avatar-frame w-16 h-16 bg-[#FAF9F6] border border-black/5 rounded-full flex items-center justify-center text-3xl select-none">
          👤
        </div>
        <div className="user-meta-details flex flex-col items-start text-left">
          <h2 className="profile-username font-black text-lg text-[#263238] tracking-tight">
            {isStudent ? user.name : (language === 'HA' ? 'Bako (Guest)' : 'Guest')}
          </h2>
          <p className="profile-role-badge mt-1.5 font-bold text-[10px] text-[#2E7D32] bg-[#2E7D32]/8 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {isStudent 
              ? (language === 'HA' ? 'Dalibi' : 'Student') 
              : (language === 'HA' ? 'Bako' : 'Guest')}
          </p>
        </div>
      </section>

      {/* Stats Card: Rendered if logged in as Student */}
      {isStudent ? (
        <section className="metric-card bg-white border border-black/5 rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] text-left">
          <div className="metric-header flex items-center gap-2.5 mb-4 border-b border-black/5 pb-3">
            <BarChart3 className="w-5 h-5 text-[#2E7D32]" />
            <h4 className="metric-label font-extrabold text-[10px] text-[#607D8B] uppercase tracking-widest">
              {language === 'HA' ? 'Ayyukan Shafi' : 'Activity Overview'}
            </h4>
          </div>

          <div className="profile-stats-grid grid grid-cols-3 gap-3 text-center">
            <div className="profile-stat-node flex flex-col items-center gap-1.5 py-1">
              <Award className="w-5 h-5 text-[#2E7D32] opacity-80" />
              <span className="profile-stat-val font-black text-base text-[#263238]">
                {completedCount}
              </span>
              <span className="profile-stat-lbl text-[9px] font-bold text-[#607D8B] leading-snug">
                {language === 'HA' ? 'Darussan da Aka Gama' : 'Completed Lessons'}
              </span>
            </div>

            <div className="profile-stat-node flex flex-col items-center gap-1.5 py-1 border-x border-black/5">
              <Flame className="w-5 h-5 text-[#C99700] opacity-80" />
              <span className="profile-stat-val font-black text-base text-[#263238]">
                {streak}
              </span>
              <span className="profile-stat-lbl text-[9px] font-bold text-[#607D8B] leading-snug">
                {language === 'HA' ? 'Kwanaki a Jere' : 'Day Streak'}
              </span>
            </div>

            <div className="profile-stat-node flex flex-col items-center gap-1.5 py-1">
              <Zap className="w-5 h-5 text-[#2196f3] opacity-80" />
              <span className="profile-stat-val font-black text-base text-[#263238]">
                {totalXp}
              </span>
              <span className="profile-stat-lbl text-[9px] font-bold text-[#607D8B] leading-snug">
                {language === 'HA' ? 'Jimillar Maki (XP)' : 'Total XP'}
              </span>
            </div>
          </div>
        </section>
      ) : (
        /* Guest warning card prompting them to login */
        <section 
          onClick={() => setRoute('auth')}
          className="bg-yellow-500/5 hover:bg-yellow-500/10 border border-yellow-500/20 rounded-3xl p-5 text-left flex items-center justify-between gap-4 shadow-xs cursor-pointer transition-all group"
        >
          <div className="flex items-start gap-3.5">
            <span className="text-2xl select-none">💡</span>
            <div className="flex flex-col">
              <h4 className="font-extrabold text-xs text-[#263238] uppercase tracking-wider mb-0.5">
                {language === 'HA' ? 'Shigar da Akwanti' : 'Student Account'}
              </h4>
              <p className="text-xs font-semibold text-[#607D8B] leading-relaxed">
                {language === 'HA'
                  ? 'Shiga ko bude sabon akwanti don adana tarihin koyonku da maki.'
                  : 'Sign in or register to save your learning history, streak points, and rank.'}
              </p>
            </div>
          </div>
          <button className="bg-[#2E7D32] hover:bg-[#256629] text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all shrink-0 shadow-xs group-hover:scale-105">
            {language === 'HA' ? 'Shiga / Rijista' : 'Sign In / Sign Up'}
          </button>
        </section>
      )}

      {/* App Preferences Settings list */}
      <section className="content-block-section flex flex-col gap-3">
        <h3 className="section-title text-[10px] font-black tracking-widest text-[#607D8B] uppercase pl-1 text-left">
          {language === 'HA' ? '📱 Tsarin Shafi' : '📱 App Settings'}
        </h3>
        
        <div className="settings-list-wrapper bg-white border border-black/5 rounded-2xl p-2 shadow-sm text-left">
          <div className="settings-row-item flex items-center justify-between p-3.5 hover:bg-black/3 transition-all rounded-xl cursor-pointer">
            <div className="settings-left-side flex items-center gap-3">
              <Bell className="w-4 h-4 text-[#607D8B]" />
              <span className="settings-label-text text-xs font-bold text-[#263238]">
                {language === 'HA' ? 'Sanarwa (Notifications)' : 'Notifications'}
              </span>
            </div>
            <span className="settings-arrow text-sm font-bold text-[#607D8B]">›</span>
          </div>

          <div className="settings-row-item flex items-center justify-between p-3.5 hover:bg-black/3 border-t border-black/5 transition-all rounded-xl cursor-pointer">
            <div className="settings-left-side flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-[#607D8B]" />
              <span className="settings-label-text text-xs font-bold text-[#263238]">
                {language === 'HA' ? 'Sautin Shafi' : 'Sound Effects'}
              </span>
            </div>
            <span className="settings-arrow text-sm font-bold text-[#607D8B]">›</span>
          </div>

          <div className="settings-row-item flex items-center justify-between p-3.5 hover:bg-black/3 border-t border-black/5 transition-all rounded-xl cursor-pointer">
            <div className="settings-left-side flex items-center gap-3">
              <Save className="w-4 h-4 text-[#607D8B]" />
              <span className="settings-label-text text-xs font-bold text-[#263238]">
                {language === 'HA' ? 'Ajiye Darasi (Offline)' : 'Offline Storage'}
              </span>
            </div>
            <span className="settings-arrow text-sm font-bold text-[#607D8B]">›</span>
          </div>
        </div>
      </section>

      {/* Account Preferences Settings list */}
      <section className="content-block-section flex flex-col gap-3">
        <h3 className="section-title text-[10px] font-black tracking-widest text-[#607D8B] uppercase pl-1 text-left">
          {language === 'HA' ? '⚙️ Tsarin Akwanti' : '⚙️ Account Settings'}
        </h3>
        
        <div className="settings-list-wrapper bg-white border border-black/5 rounded-2xl p-2 shadow-sm text-left">
          {isStudent && (
            <>
              <div className="settings-row-item flex items-center justify-between p-3.5 hover:bg-black/3 transition-all rounded-xl cursor-pointer">
                <div className="settings-left-side flex items-center gap-3">
                  <Edit3 className="w-4 h-4 text-[#607D8B]" />
                  <span className="settings-label-text text-xs font-bold text-[#263238]">
                    {language === 'HA' ? 'Gyara Suna' : 'Edit Profile Name'}
                  </span>
                </div>
                <span className="settings-arrow text-sm font-bold text-[#607D8B]">›</span>
              </div>

              <div className="settings-row-item flex items-center justify-between p-3.5 hover:bg-black/3 border-t border-black/5 transition-all rounded-xl cursor-pointer">
                <div className="settings-left-side flex items-center gap-3">
                  <KeyRound className="w-4 h-4 text-[#607D8B]" />
                  <span className="settings-label-text text-xs font-bold text-[#263238]">
                    {language === 'HA' ? 'Canza Kalmar Sirri' : 'Change Password'}
                  </span>
                </div>
                <span className="settings-arrow text-sm font-bold text-[#607D8B]">›</span>
              </div>
            </>
          )}

          {/* Dynamic login button row */}
          <div 
            onClick={isStudent ? signOut : () => setRoute('auth')}
            className={`settings-row-item flex items-center justify-between p-3.5 transition-all rounded-xl cursor-pointer ${
              isStudent 
                ? 'text-red-600 hover:bg-red-500/5 border-t border-black/5' 
                : 'text-[#2E7D32] hover:bg-[#2E7D32]/5 font-black'
            }`}
          >
            <div className="settings-left-side flex items-center gap-3">
              {isStudent ? (
                <LogOut className="w-4 h-4" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              <span className="settings-label-text text-xs font-bold">
                {isStudent 
                  ? (language === 'HA' ? 'Fita Daga Shafi' : 'Log Out') 
                  : (language === 'HA' ? 'Shiga Shafi' : 'Log In')}
              </span>
            </div>
            <span className="settings-arrow text-sm font-bold">›</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
