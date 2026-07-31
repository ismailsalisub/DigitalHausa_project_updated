/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LandingView } from './components/LandingView';
import { DashboardView } from './components/DashboardView';
import { LearnView } from './components/LearnView';
import { DictionaryView } from './components/DictionaryView';
import { ProfileView } from './components/ProfileView';
import { AuthView } from './components/AuthView';
import { LessonView } from './components/LessonView';
import { NotificationToast } from './components/NotificationToast';
import { SplashScreen } from './components/SplashScreen';
import { AnimatePresence, motion } from 'motion/react';

const AppContent: React.FC = () => {
  const { route, user } = useApp();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  const isTabRoute = ['home', 'learn', 'dictionary', 'profile'].includes(route);

  const isLoggedIn = user && user.role === 'student';

  const renderActiveView = () => {
    switch (route) {
      case 'home':
        return isLoggedIn ? <DashboardView /> : <LandingView />;
      case 'learn':
        return <LearnView />;
      case 'dictionary':
        return <DictionaryView />;
      case 'profile':
        return <ProfileView />;
      case 'auth':
        return <AuthView />;
      default:
        // Any route that isn't a main tab is loaded inside the custom unified Lesson View
        return <LessonView />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] dark:bg-[#12181B] transition-colors">
      {/* Initial App Splash Screen */}
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {/* Toast Notifications */}
      <NotificationToast />

      {/* Shared Header (rendered only on main tabs, LessonView has its own breadcrumb header) */}
      {isTabRoute && <Header />}


      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col ${isTabRoute ? 'pb-24' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="flex-1 flex flex-col"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Global Sticky Tab bar */}
      {isTabRoute && <BottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
