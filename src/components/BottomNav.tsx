import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, BookOpen, Book, User } from 'lucide-react';
import { motion } from 'motion/react';

export const BottomNav: React.FC = () => {
  const { route, setRoute, user, language } = useApp();

  const isLoggedIn = user && user.role === 'student';

  const navItems = [
    { 
      id: 'home', 
      labelHa: isLoggedIn ? 'Dandali' : 'Gida', 
      labelEn: isLoggedIn ? 'Dashboard' : 'Home', 
      icon: Home 
    },
    { id: 'learn', labelHa: 'Koya', labelEn: 'Learn', icon: BookOpen },
    { id: 'dictionary', labelHa: 'Kamus', labelEn: 'Dictionary', icon: Book },
    { id: 'profile', labelHa: 'Tarihi', labelEn: 'Profile', icon: User },
  ];

  // Determine if active route maps to one of the tabs
  const getActiveTab = () => {
    if (['home', 'learn', 'dictionary', 'profile'].includes(route)) {
      return route;
    }
    // If we're inside a lesson, highlight the 'learn' tab
    if (route.startsWith('html_') || route === 'python_introduction') {
      return 'learn';
    }
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <nav className="app-bottom-nav fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1A2327]/95 backdrop-blur-md border-t border-black/5 dark:border-white/10 flex justify-around py-2.5 px-3 z-50 shadow-[0_-4px_25px_rgba(0,0,0,0.04)] transition-colors">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <motion.button
            key={item.id}
            id={`nav-tab-${item.id}`}
            onClick={() => setRoute(item.id)}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`nav-tab flex flex-col items-center justify-center gap-1 flex-1 min-w-0 transition-colors relative cursor-pointer py-1 ${
              isActive ? 'text-[#2E7D32] dark:text-[#81C784]' : 'text-[#607D8B] dark:text-[#90A4AE] hover:text-[#263238] dark:hover:text-[#ECEFF1]'
            }`}
          >
            {/* Active background pill */}
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-[#2E7D32]/8 dark:bg-[#81C784]/12 rounded-2xl"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            <span className="relative z-10 flex items-center justify-center">
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 -translate-y-0.5' : ''}`} />
              {isActive && (
                <motion.span
                  layoutId="bottomNavDot"
                  className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#E2A021] rounded-full shadow-[0_0_8px_#E2A021]"
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                />
              )}
            </span>
            <span className={`tab-text text-[10px] tracking-tight relative z-10 transition-all ${
              isActive ? 'font-black text-[#2E7D32] dark:text-[#81C784]' : 'font-bold'
            }`}>
              {language === 'HA' ? item.labelHa : item.labelEn}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};
