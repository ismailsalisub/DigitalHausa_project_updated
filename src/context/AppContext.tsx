import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, AppNotification } from '../types';
import { lessonsData } from '../data/lessons';

interface AppContextType {
  language: 'HA' | 'EN';
  darkMode: boolean;
  route: string;
  user: UserProfile | null;
  searchQuery: string;
  learnViewMode: 'path' | 'tree';
  notifications: AppNotification[];
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  setRoute: (route: string) => void;
  setSearchQuery: (query: string) => void;
  setLearnViewMode: (mode: 'path' | 'tree') => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp'>) => void;
  dismissNotification: (id: string) => void;
  signIn: () => void;
  loginUser: (emailOrId: string, name?: string) => void;
  registerUser: (name: string, email: string, studentId: string, selectedPathIds?: string[]) => void;
  updateUserGoal: (selectedPathIds: string[], primaryGoalId?: string) => void;
  signOut: () => void;
  completeLesson: (lessonId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'digitalhausa_user_profile';
const LANG_STORAGE_KEY = 'digitalhausa_lang_pref';
const THEME_STORAGE_KEY = 'digitalhausa_theme_pref';

const defaultGuest: UserProfile = {
  id: 'guest_user',
  name: 'Bako',
  role: 'guest',
  streakDays: 1,
  completedLessonIds: [],
  lessonsCompleted: 0,
  pathCompletionPct: 0,
  xpPerLesson: 20
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'HA' | 'EN'>('HA');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved !== null) {
      return saved === 'dark';
    }
    return false;
  });
  const [route, setRouteState] = useState<string>('home');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [learnViewMode, setLearnViewMode] = useState<'path' | 'tree'>('tree');
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp'>) => {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newNotif: AppNotification = {
      ...notif,
      id,
      timestamp: Date.now()
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 4));

    // Auto dismiss after 4.5s
    setTimeout(() => {
      dismissNotification(id);
    }, 4500);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Apply dark mode class to html & body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [darkMode]);

  // Load language preference and user session from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    if (savedLang === 'HA' || savedLang === 'EN') {
      setLanguage(savedLang);
    }

    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (parsed && parsed.role === 'student') {
          setLearnViewMode('path');
        } else {
          setLearnViewMode('tree');
        }
      } catch (e) {
        console.error('Failed to parse user profile', e);
        setUser(defaultGuest);
        setLearnViewMode('tree');
      }
    } else {
      setUser(defaultGuest);
      setLearnViewMode('tree');
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === 'HA' ? 'EN' : 'HA';
    setLanguage(nextLang);
    localStorage.setItem(LANG_STORAGE_KEY, nextLang);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const setRoute = (newRoute: string) => {
    setRouteState(newRoute);
    window.scrollTo(0, 0);
  };

  const signIn = () => {
    const defaultStudent: UserProfile = {
      id: 'FE/23/8813977',
      name: 'Ismail Salisu',
      email: 'ismailsalisub@gmail.com',
      role: 'student',
      streakDays: 5,
      completedLessonIds: ['html_introduction', 'html_elements'],
      lessonsCompleted: 2,
      pathCompletionPct: 15,
      xpPerLesson: 20,
      selectedPathIds: ['programming'],
      primaryGoalId: 'programming'
    };
    setUser(defaultStudent);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultStudent));
    setLearnViewMode('path');
    setRoute('home');

    addNotification({
      type: 'login',
      title: { ha: 'Barka da Zuwa!', en: 'Welcome Back!' },
      message: { 
        ha: `An shiga shafi a matsayin ${defaultStudent.name}`, 
        en: `Successfully signed in as ${defaultStudent.name}` 
      },
      icon: '👋',
      variant: 'golden'
    });
  };

  const loginUser = (emailOrId: string, customName?: string) => {
    const studentName = customName || (emailOrId.includes('@') ? emailOrId.split('@')[0].replace('.', ' ') : 'Ismail Salisu');
    const loggedInStudent: UserProfile = {
      id: emailOrId.includes('/') ? emailOrId : `DH-${Math.floor(100000 + Math.random() * 900000)}`,
      name: studentName,
      email: emailOrId.includes('@') ? emailOrId : 'ismailsalisub@gmail.com',
      role: 'student',
      streakDays: 1,
      completedLessonIds: ['html_introduction', 'html_elements'],
      lessonsCompleted: 2,
      pathCompletionPct: 15,
      xpPerLesson: 20,
      selectedPathIds: ['programming'],
      primaryGoalId: 'programming'
    };
    setUser(loggedInStudent);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInStudent));
    setLearnViewMode('path');
    setRoute('home');

    addNotification({
      type: 'login',
      title: { ha: 'Barka da Zuwa!', en: 'Welcome Back!' },
      message: { 
        ha: `An shiga cikin akwantin ${studentName} cikin nasara.`, 
        en: `Successfully logged in to ${studentName}'s account.` 
      },
      icon: '👋',
      variant: 'golden'
    });
  };

  const registerUser = (name: string, email: string, studentId: string, selectedPathIds?: string[]) => {
    const paths = selectedPathIds && selectedPathIds.length > 0 ? selectedPathIds : [];
    const studentName = name || 'Sabuwar Daliba';
    const newStudent: UserProfile = {
      id: studentId || `DH-${Math.floor(100000 + Math.random() * 900000)}`,
      name: studentName,
      email: email,
      role: 'student',
      streakDays: 1,
      completedLessonIds: [],
      lessonsCompleted: 0,
      pathCompletionPct: 0,
      xpPerLesson: 20,
      selectedPathIds: paths,
      primaryGoalId: paths[0] || undefined
    };
    setUser(newStudent);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newStudent));
    setLearnViewMode('path');
    setRoute('home');

    addNotification({
      type: 'login',
      title: { ha: 'Sabuwar Akwanti!', en: 'Account Created!' },
      message: { 
        ha: `Barka da zuwa DigitalHausa, ${studentName}!`, 
        en: `Welcome to DigitalHausa, ${studentName}!` 
      },
      icon: '🎉',
      variant: 'golden'
    });
  };

  const updateUserGoal = (selectedPathIds: string[], primaryGoalId?: string) => {
    if (!user) return;
    const updatedUser: UserProfile = {
      ...user,
      selectedPathIds,
      primaryGoalId: primaryGoalId || selectedPathIds[0] || undefined
    };
    setUser(updatedUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

    addNotification({
      type: 'achievement',
      title: { ha: 'An Sabunta Buri!', en: 'Goal Updated!' },
      message: { 
        ha: 'An sabunta hanyar karatunku cikin nasara.', 
        en: 'Your custom learning goal path has been updated.' 
      },
      icon: '🎯',
      variant: 'golden'
    });
  };

  const signOut = () => {
    setUser(defaultGuest);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultGuest));
    setLearnViewMode('tree');
    setRoute('home');

    addNotification({
      type: 'generic',
      title: { ha: 'An Fita', en: 'Signed Out' },
      message: { 
        ha: 'An fita daga akwanti. Kana shafin bako.', 
        en: 'You have signed out. Browsing as guest.' 
      },
      icon: '👋',
      variant: 'golden'
    });
  };

  const completeLesson = (lessonId: string) => {
    if (!user) return;

    if (user.completedLessonIds.includes(lessonId)) return; // Already completed

    const updatedLessonIds = [...user.completedLessonIds, lessonId];
    const completedCount = updatedLessonIds.length;
    
    // Dynamically calculate the total number of core HTML track lessons
    const totalTrackLessons = lessonsData.filter(l => l.id.startsWith('html_')).length || 13;
    const dynamicPct = Math.min(Math.round((completedCount / totalTrackLessons) * 100), 100);

    const updatedUser: UserProfile = {
      ...user,
      completedLessonIds: updatedLessonIds,
      lessonsCompleted: completedCount,
      pathCompletionPct: dynamicPct
    };

    setUser(updatedUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

    // 1. Trigger Lesson Completion Notification
    const currentLessonObj = lessonsData.find(l => l.id === lessonId);
    const lessonTitleHa = currentLessonObj?.title.ha || 'Darasi';
    const lessonTitleEn = currentLessonObj?.title.en || 'Lesson';

    addNotification({
      type: 'lesson_complete',
      title: { ha: 'Darasi An Kammala!', en: 'Lesson Completed!' },
      message: { 
        ha: `Masha Allah! Ka kammala "${lessonTitleHa}" (+20 XP).`, 
        en: `Great job! You finished "${lessonTitleEn}" (+20 XP).` 
      },
      icon: '🎓',
      variant: 'golden'
    });

    // 2. Trigger Achievement Notification if milestones are met
    if (completedCount === 1) {
      setTimeout(() => {
        addNotification({
          type: 'achievement',
          title: { ha: 'Sabuwar Nasara: Matakin Farko!', en: 'Achievement: First Step!' },
          message: { 
            ha: 'Taya murna! Ka kammala darasinka na farko.', 
            en: 'Congratulations! You completed your very first lesson.' 
          },
          icon: '🎖️',
          variant: 'golden'
        });
      }, 600);
    } else if (completedCount === 5) {
      setTimeout(() => {
        addNotification({
          type: 'achievement',
          title: { ha: 'Sabuwar Nasara: Zakaran Karatu!', en: 'Achievement: Star Learner!' },
          message: { 
            ha: 'Ka kammala darussa 5! Ci gaba da kokari.', 
            en: '5 lessons completed! Keep up the momentum.' 
          },
          icon: '🏆',
          variant: 'golden'
        });
      }, 600);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        darkMode,
        route,
        user,
        searchQuery,
        learnViewMode,
        notifications,
        toggleLanguage,
        toggleDarkMode,
        setRoute,
        setSearchQuery,
        setLearnViewMode,
        addNotification,
        dismissNotification,
        signIn,
        loginUser,
        registerUser,
        updateUserGoal,
        signOut,
        completeLesson
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

