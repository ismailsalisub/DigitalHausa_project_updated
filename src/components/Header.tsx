import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Moon, Sun } from 'lucide-react';
import { DigitalHausaLogo } from './DigitalHausaLogo';
import { motion } from 'motion/react';

export const Header: React.FC = () => {
  const { language, toggleLanguage, darkMode, toggleDarkMode } = useApp();

  return (
    <header className="dash-app-bar bg-white/90 dark:bg-[#1A2327]/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/10 transition-colors">
      <div className="brand-identity flex items-center gap-2 group cursor-pointer">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 350 }}
        >
          <DigitalHausaLogo className="w-6 h-6" />
        </motion.div>
        <h1 className="brand-name font-extrabold text-lg text-[#263238] dark:text-[#ECEFF1] tracking-tight">
          DigitalHausa
        </h1>
      </div>
      
      <div className="header-controls flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.88, rotate: 180 }}
          whileHover={{ scale: 1.05 }}
          onClick={toggleDarkMode}
          className="dark-mode-toggle flex items-center justify-center bg-[#FAF9F6] dark:bg-[#263238] border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 p-2 rounded-full text-xs font-bold transition-all cursor-pointer text-[#263238] dark:text-[#ECEFF1]"
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? (
            <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-[#607D8B]" />
          )}
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.04 }}
          onClick={toggleLanguage}
          className="lang-toggle-badge flex items-center gap-1.5 bg-[#FAF9F6] dark:bg-[#263238] border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
          aria-label="Toggle language"
        >
          <Globe className="w-3.5 h-3.5 text-[#2E7D32] dark:text-[#4CAF50]" />
          <span className="lang-text text-[#263238] dark:text-[#ECEFF1]">{language}</span>
        </motion.button>
      </div>
    </header>
  );
};
