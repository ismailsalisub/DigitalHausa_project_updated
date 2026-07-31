import React from 'react';
import { motion } from 'motion/react';
import { DigitalHausaLogo } from './DigitalHausaLogo';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { language } = useApp();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-between py-12 px-6 bg-[#FAF9F6] dark:bg-[#12181B] text-[#263238] dark:text-[#ECEFF1] select-none"
    >
      <div />

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center text-center">
        {/* Animated Logo Container */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Subtle Golden/Green Aura Glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 1],
              opacity: [0.25, 0.45, 0.25]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-[#2E7D32]/25 via-[#E2A021]/30 to-[#2E7D32]/10 blur-2xl"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="relative z-10 bg-white dark:bg-[#1A2327] p-5 rounded-3xl shadow-[0_15px_40px_rgba(46,125,50,0.15)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/10"
          >
            <DigitalHausaLogo className="w-20 h-20 md:w-24 md:h-24" />
          </motion.div>
        </div>

        {/* Brand Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-2xl md:text-3xl font-black tracking-tight text-[#263238] dark:text-[#ECEFF1] mb-1.5"
        >
          DigitalHausa
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-xs md:text-sm font-semibold text-[#607D8B] dark:text-[#90A4AE] tracking-wide"
        >
          {language === 'HA' 
            ? 'Hanyar Koyo da Fasahar Kwamfuta' 
            : 'Digital Hausa Computer Learning Platform'
          }
        </motion.p>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <div className="w-full h-1.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[#2E7D32] via-[#E2A021] to-[#2E7D32] rounded-full shadow-[0_0_10px_#E2A021]"
          />
        </div>
        <p className="text-[11px] font-bold text-[#607D8B]/80 dark:text-[#90A4AE]/80 tracking-wider uppercase">
          {language === 'HA' ? 'Ana Shiryawa...' : 'Loading...'}
        </p>
      </div>
    </motion.div>
  );
};
