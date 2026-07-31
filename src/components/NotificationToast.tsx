import React from 'react';
import { useApp } from '../context/AppContext';
import { AppNotification } from '../types';
import { X, CheckCircle, Award, Sparkles, LogIn, GraduationCap, Flame, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DigitalHausaLogo } from './DigitalHausaLogo';

export const NotificationToast: React.FC = () => {
  const { language, notifications, dismissNotification } = useApp();

  if (!notifications || notifications.length === 0) return null;

  return (
    <div 
      className="fixed top-16 sm:top-20 right-3 sm:right-6 z-[100] flex flex-col gap-3 max-w-sm w-[calc(100vw-24px)] pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="popLayout">
        {notifications.map((notif) => {
          const isGlowingOrange = notif.variant === 'glowing_orange' || notif.type === 'quiz_correct';
          
          return (
            <motion.div
              key={notif.id}
              layout
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80 || info.velocity.x > 300) {
                  dismissNotification(notif.id);
                }
              }}
              initial={{ opacity: 0, y: -25, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, x: 120, scale: 0.85, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={`pointer-events-auto rounded-2xl p-4 flex items-start justify-between gap-3 text-left transition-shadow backdrop-blur-md relative overflow-hidden cursor-grab active:cursor-grabbing ${
                isGlowingOrange
                  ? 'bg-white/98 dark:bg-[#1F1B17]/98 border-2 border-[#FF6D00] shadow-[0_0_25px_rgba(255,109,0,0.45)] dark:shadow-[0_0_30px_rgba(255,109,0,0.6)]'
                  : 'bg-white/98 dark:bg-[#1A2327]/98 border-2 border-[#E2A021] dark:border-[#E2A021]/90 shadow-[0_10px_30px_rgba(226,160,33,0.22)]'
              }`}
            >
              {/* Subtle decorative glow accent line on top */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isGlowingOrange 
                    ? 'bg-gradient-to-r from-[#FF6D00] via-[#FF9800] to-[#FF6D00] animate-pulse' 
                    : 'bg-gradient-to-r from-[#E2A021] via-[#F5B83D] to-[#E2A021]'
                }`} 
              />

              <div className="flex items-start gap-3.5 flex-1 min-w-0 pt-0.5">
                {/* Icon Container */}
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 select-none text-xl ${
                    isGlowingOrange
                      ? 'bg-[#FF6D00]/12 text-[#FF6D00] border border-[#FF6D00]/30 shadow-[0_0_12px_rgba(255,109,0,0.3)]'
                      : 'bg-[#E2A021]/15 text-[#E2A021] border border-[#E2A021]/30'
                  }`}
                >
                  {notif.icon ? (
                    <span>{notif.icon}</span>
                  ) : notif.type === 'quiz_correct' ? (
                    <Sparkles className="w-5 h-5 text-[#FF6D00] animate-bounce" />
                  ) : notif.type === 'login' ? (
                    <DigitalHausaLogo className="w-5 h-5" />
                  ) : notif.type === 'lesson_complete' ? (
                    <GraduationCap className="w-5 h-5 text-[#E2A021]" />
                  ) : notif.type === 'achievement' ? (
                    <Award className="w-5 h-5 text-[#E2A021]" />
                  ) : (
                    <Bell className="w-5 h-5 text-[#E2A021]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col min-w-0 pr-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 
                      className={`font-black text-xs tracking-tight ${
                        isGlowingOrange 
                          ? 'text-[#E65100] dark:text-[#FF9800]' 
                          : 'text-[#263238] dark:text-[#ECEFF1]'
                      }`}
                    >
                      {language === 'HA' ? notif.title.ha : notif.title.en}
                    </h4>
                    {isGlowingOrange && (
                      <span className="inline-block w-2 h-2 rounded-full bg-[#FF6D00] animate-ping shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-[#607D8B] dark:text-[#B0BEC5] leading-relaxed break-words">
                    {language === 'HA' ? notif.message.ha : notif.message.en}
                  </p>
                </div>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={() => dismissNotification(notif.id)}
                className={`p-1 rounded-lg transition-all cursor-pointer shrink-0 mt-0.5 ${
                  isGlowingOrange
                    ? 'text-[#FF6D00]/70 hover:text-[#FF6D00] hover:bg-[#FF6D00]/10'
                    : 'text-[#E2A021]/80 hover:text-[#E2A021] hover:bg-[#E2A021]/10 dark:text-[#E2A021]'
                }`}
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
