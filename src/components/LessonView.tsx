import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { lessonsData } from '../data/lessons';
import { treeBranches } from '../data/tree';
import { DigitalHausaLogo } from './DigitalHausaLogo';
import { 
  ArrowLeft, Globe, Menu, X, ChevronRight, 
  Check, Play, Lock, AlertCircle, HelpCircle,
  Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LessonView: React.FC = () => {
  const { 
    language, 
    darkMode,
    route, 
    setRoute, 
    toggleLanguage, 
    toggleDarkMode,
    completeLesson, 
    user,
    setLearnViewMode,
    addNotification
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionId] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Look up active lesson based on current route ID
  const lesson = lessonsData.find(l => l.id === route);

  // Reset quiz states when lesson switches
  useEffect(() => {
    setSelectedOptionId(null);
    setShowFeedback(false);
  }, [route]);

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4 animate-bounce" />
        <h3 className="font-extrabold text-[#263238] text-base mb-2">Darasi Bai Samu Ba</h3>
        <p className="text-[#607D8B] text-xs">Ayi hakuri, dandalin bai sami wannan darasin ba.</p>
        <button 
          onClick={() => setRoute('learn')}
          className="btn-primary mt-4 bg-[#2E7D32] hover:bg-[#225C25] text-white px-6 py-2.5 rounded-full text-xs font-bold"
        >
          Koma Koya
        </button>
      </div>
    );
  }

  const completedIds = user ? user.completedLessonIds : [];

  const handleOptionClick = (optionIdx: number, isCorrect: boolean) => {
    if (showFeedback) return; // Prevent double taps

    setSelectedOptionId(optionIdx);
    setShowFeedback(true);

    if (isCorrect) {
      // Trigger completion tracking and update progress metrics dynamically
      completeLesson(lesson.id);

      // Trigger glowing orange notification for correct answer
      addNotification({
        type: 'quiz_correct',
        title: { ha: 'Amsa Daidai!', en: 'Correct Answer!' },
        message: { 
          ha: 'Masha Allah! Ka zaɓi amsar da kuka dace.', 
          en: 'Spot on! Excellent work on this question.' 
        },
        icon: '✨',
        variant: 'glowing_orange'
      });
    }
  };

  const activeIndex = lessonsData.findIndex(l => l.id === lesson.id);

  const prevLesson = lesson.prevLessonId ? lessonsData.find(l => l.id === lesson.prevLessonId) : null;
  const nextLesson = lesson.nextLessonId ? lessonsData.find(l => l.id === lesson.nextLessonId) : null;

  // Find the hierarchy of the current lesson in the tree
  const findLessonHierarchy = () => {
    let foundBranch = null;
    let foundSubBranch = null;
    let foundLeaf = null;

    for (const b of treeBranches) {
      for (const sb of b.subBranches) {
        for (const lf of sb.leaves) {
          const isMatch = lf.lessonId === lesson.id || 
                          (lesson.id.startsWith('html_') && lf.lessonId.startsWith('html_')) ||
                          (lesson.id.startsWith('computer_') && lf.lessonId.startsWith('computer_')) ||
                          (lesson.id.startsWith('using_') && lf.lessonId.startsWith('using_')) ||
                          (lesson.id.startsWith('word_') && lf.lessonId.startsWith('word_')) ||
                          (lesson.id.startsWith('excel_') && lf.lessonId.startsWith('excel_'));
          
          if (isMatch) {
            foundBranch = b;
            foundSubBranch = sb;
            foundLeaf = lf;
            break;
          }
        }
        if (foundLeaf) break;
      }
      if (foundLeaf) break;
    }

    return { branch: foundBranch, subBranch: foundSubBranch, leaf: foundLeaf };
  };

  const { branch, subBranch, leaf } = findLessonHierarchy();

  // Helper to remove emojis for cleaner breadcrumbs
  const stripEmojis = (str: string) => {
    return str.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
  };

  const branchId = branch?.id || 'programming';
  const branchName = branch 
    ? stripEmojis(language === 'HA' ? branch.title.ha : branch.title.en)
    : (language === 'HA' ? 'Sifari' : 'Programming');

  const subBranchId = subBranch?.id || 'frontend';
  const subBranchName = subBranch 
    ? stripEmojis(language === 'HA' ? subBranch.title.ha : subBranch.title.en)
    : (language === 'HA' ? 'Gaban Shafi' : 'Frontend');

  const leafName = leaf 
    ? stripEmojis(language === 'HA' ? leaf.title.ha : leaf.title.en)
    : 'HTML';

  const currentLessonTitle = language === 'HA' ? lesson.title.ha : lesson.title.en;

  return (
    <div className="lesson-page-body flex flex-col min-h-screen bg-[#FAF9F6]">
      {/* Top Fixed Header Panel */}
      <header className="lesson-header lg:ml-[280px] bg-white border-b border-b-black/5 flex items-center justify-between px-4 py-3 sticky top-0 z-40 shadow-sm">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button 
            onClick={() => setRoute('learn')}
            className="nav-back-arrow flex items-center justify-center p-1.5 mt-0.5 text-[#263238] hover:bg-black/5 rounded-full cursor-pointer transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col gap-1 min-w-0">
            {/* Current Lesson Title */}
            <span className="text-xs font-black text-[#263238] uppercase tracking-wider truncate max-w-[150px] sm:max-w-[280px]">
              {currentLessonTitle}
            </span>

            {/* Left-aligned Course Progress Bar */}
            <div className="flex items-center gap-2 w-full max-w-[160px] sm:max-w-[200px]">
              <div className="progress-container flex-1 h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden shadow-inner">
                <div 
                  className="progress-fill h-full bg-[#2E7D32] transition-all duration-500 ease-out" 
                  style={{ width: `${user?.pathCompletionPct ?? 0}%` }}
                />
              </div>
              <span className="text-[9px] font-black text-[#2E7D32] shrink-0">
                {user?.pathCompletionPct ?? 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="header-controls flex items-center gap-2 shrink-0 ml-2">
          <button 
            onClick={toggleDarkMode}
            className="dark-mode-toggle flex items-center justify-center bg-[#FAF9F6] dark:bg-[#263238] border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 p-1.5 rounded-md text-xs font-bold text-[#263238] dark:text-[#ECEFF1] cursor-pointer transition-all"
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#607D8B]" />
            )}
          </button>

          <button 
            onClick={toggleLanguage}
            className="lang-toggle bg-[#FAF9F6] dark:bg-[#263238] border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-[#263238] dark:text-[#ECEFF1] cursor-pointer transition-all"
          >
            {language}
          </button>
        </div>
      </header>

      {/* Main Grid Layout Container */}
      <div className="lesson-main-layout flex-1 flex flex-col lg:flex-row">
        
        {/* Left Sidebar outline drawer (always visible on desktop, drawer on mobile) */}
        <aside className={`contents-left-sidebar fixed top-0 bottom-0 left-0 w-[280px] bg-white border-r border-black/5 flex flex-col z-50 lg:z-30 transition-transform duration-300 shadow-lg lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="sidebar-header flex justify-between items-center px-5 py-4 border-b border-black/5">
            <h3 className="font-extrabold text-sm text-[#263238] flex items-center gap-1.5 uppercase tracking-wider">
              <DigitalHausaLogo className="w-5 h-5 shrink-0" />
              <span>{language === 'HA' ? 'Tsarin HTML' : 'HTML Outline'}</span>
            </h3>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="close-sidebar-btn lg:hidden text-[#607D8B] hover:text-[#263238] p-1 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Overview */}
          <div className="sidebar-progress-panel p-5 bg-[#FAF9F6] border-b border-black/5 flex flex-col gap-2">
            <div className="sidebar-progress-meta flex justify-between text-[10px] font-bold">
              <span className="text-[#607D8B]">{language === 'HA' ? 'Ci gaba' : 'Progress'}</span>
              <span className="text-[#2E7D32]">{user?.pathCompletionPct ?? 0}%</span>
            </div>
            <div className="sidebar-progress-bar w-full h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div 
                className="sidebar-progress-fill h-full bg-[#2E7D32] transition-all duration-500"
                style={{ width: `${user?.pathCompletionPct ?? 0}%` }}
              />
            </div>
          </div>

          {/* Lessons Scroll List */}
          <div className="sidebar-scroll-body flex-1 overflow-y-auto px-4 py-4">
            <ul className="sidebar-nodes-list flex flex-col gap-2">
              {lessonsData.filter(l => l.id.startsWith('html_')).map((outlineItem) => {
                const isCompleted = completedIds.includes(outlineItem.id);
                const isActive = lesson.id === outlineItem.id;
                const isLocked = !isCompleted && !isActive;

                return (
                  <li key={outlineItem.id}>
                    <button
                      disabled={isLocked && user?.role !== 'student'}
                      onClick={() => {
                        setRoute(outlineItem.id);
                        setSidebarOpen(false);
                      }}
                      className={`node-item flex items-center gap-3 w-full py-2 px-3 rounded-xl border text-left transition-all ${
                        isActive 
                          ? 'bg-[#2E7D32]/5 border-[#2E7D32]/25 font-bold text-[#2E7D32]'
                          : isCompleted
                            ? 'bg-[#e8f5e9]/20 border-transparent text-[#2e7d32] hover:bg-[#e8f5e9]/40 cursor-pointer'
                            : 'bg-transparent border-transparent text-[#607D8B] opacity-65 hover:bg-black/3 cursor-pointer'
                      }`}
                    >
                      <span className="node-status text-xs flex items-center justify-center w-4">
                        {isCompleted ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : isActive ? (
                          <Play className="w-3 h-3 fill-[#2E7D32]" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                      </span>
                      <span className="text-xs">
                        {language === 'HA' ? outlineItem.title.ha : outlineItem.title.en}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Sidebar Overlay (Mobile/Tablet only) */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="sidebar-overlay fixed inset-0 bg-black/50 z-40 lg:hidden opacity-100 visible"
          />
        )}

        {/* Main scroll workspace area */}
        <main className="lesson-workspace lg:ml-[280px] w-full flex-1 px-4 py-6 md:py-10 max-w-3xl mx-auto flex flex-col gap-6 text-left">
          
          {/* Breadcrumb Navigation at top of page content */}
          <nav className="flex items-center flex-wrap gap-1.5 text-xs font-bold text-[#607D8B]">
            <button 
              onClick={() => setRoute('learn')}
              className="hover:text-[#2E7D32] transition-colors cursor-pointer shrink-0"
            >
              {language === 'HA' ? 'Koya' : 'Learn'}
            </button>
            
            <span className="text-black/25 font-light text-sm select-none shrink-0">›</span>

            <button 
              onClick={() => {
                localStorage.setItem('digitalhausa_expanded_branches', JSON.stringify([branchId]));
                localStorage.setItem('digitalhausa_expanded_subbranches', JSON.stringify([]));
                setLearnViewMode('tree');
                setRoute('learn');
              }}
              className="hover:text-[#2E7D32] transition-colors cursor-pointer text-left shrink-0"
            >
              {branchName}
            </button>

            <span className="text-black/25 font-light text-sm select-none shrink-0">›</span>

            <button 
              onClick={() => {
                localStorage.setItem('digitalhausa_expanded_branches', JSON.stringify([branchId]));
                localStorage.setItem('digitalhausa_expanded_subbranches', JSON.stringify([subBranchId]));
                setLearnViewMode('tree');
                setRoute('learn');
              }}
              className="hover:text-[#2E7D32] transition-colors cursor-pointer text-left shrink-0"
            >
              {subBranchName}
            </button>

            <span className="text-black/25 font-light text-sm select-none shrink-0">›</span>

            <button 
              onClick={() => {
                localStorage.setItem('digitalhausa_expanded_branches', JSON.stringify([branchId]));
                localStorage.setItem('digitalhausa_expanded_subbranches', JSON.stringify([subBranchId]));
                setLearnViewMode('tree');
                setRoute('learn');
              }}
              className="hover:text-[#2E7D32] transition-colors cursor-pointer text-left shrink-0"
            >
              {leafName}
            </button>

            <span className="text-black/25 font-light text-sm select-none shrink-0">›</span>

            <span className="text-[#263238]/60 font-medium select-none">
              {currentLessonTitle}
            </span>
          </nav>

          {/* Topic header */}
          <div className="lesson-topic-header">
            <h2 className="topic-title text-xs font-black text-[#607D8B] uppercase tracking-widest">
              {language === 'HA' ? lesson.topicTitle.ha : lesson.topicTitle.en}
            </h2>
          </div>

          {/* Central lesson card */}
          <article className="lesson-card bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
            <div className="lesson-meta-badge inline-block text-[9px] font-black uppercase text-[#2563EB] bg-[#2563EB]/8 px-2.5 py-1 rounded-md tracking-wider mb-4">
              {language === 'HA' ? lesson.metaBadge.ha : lesson.metaBadge.en}
            </div>

            <h1 className="lesson-title text-xl md:text-2xl font-black text-[#263238] tracking-tight leading-snug mb-4">
              {language === 'HA' ? lesson.title.ha : lesson.title.en}
            </h1>

            <hr className="divider border-none h-px bg-black/5 my-4" />

            <section className="lesson-content text-sm leading-relaxed text-[#263238]">
              {lesson.paragraphs.map((p, index) => (
                <p key={index} className="mb-4">
                  {language === 'HA' ? p.ha : p.en}
                </p>
              ))}

              {/* Code Example block terminal */}
              <div className="code-example-container bg-[#1E1E24] rounded-2xl overflow-hidden my-6 border border-white/5 shadow-md">
                <div className="code-header bg-[#2D2D34] text-[#A6ACCD] text-[9px] font-black uppercase px-4 py-2 border-b border-white/5 tracking-wider text-left">
                  {lesson.codeExample.header}
                </div>
                <pre className="code-display p-4 overflow-x-auto text-left leading-relaxed">
                  <code className="font-mono text-white text-xs whitespace-pre">
                    {lesson.codeExample.code}
                  </code>
                </pre>
              </div>

              {/* Explanations section */}
              <div className="explanation-box bg-[#FAF9F6] border-l-4 border-[#2563EB] rounded-2xl p-5 text-left">
                <h3 className="text-xs font-black text-[#263238] uppercase tracking-wider mb-3">
                  {language === 'HA' ? lesson.explanationsHeader.ha : lesson.explanationsHeader.en}
                </h3>
                <ul className="flex flex-col gap-3 list-none pl-0 margin-0">
                  {lesson.explanations.map((exp, idx) => (
                    <li key={idx} className="flex gap-2 text-xs">
                      <strong className="code-inline font-mono bg-black/5 text-[#263238] px-1.5 py-0.5 rounded h-fit shrink-0">
                        {exp.term}
                      </strong>
                      <span className="leading-relaxed">
                        : {language === 'HA' ? exp.ha : exp.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </article>

          {/* Quiz / Quick Check Section */}
          <section className="quick-check-container text-left">
            <div className="quick-check-header flex items-center gap-2 mb-4 pl-1">
              <HelpCircle className="w-5 h-5 text-[#2E7D32]" />
              <h2 className="text-sm font-black text-[#263238] uppercase tracking-wider">
                {language === 'HA' ? 'Gwajin Fahimta' : 'Quick Check'}
              </h2>
            </div>

            <div className="quiz-card bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
              <p className="quiz-question text-sm font-extrabold text-[#263238] leading-snug mb-5">
                {language === 'HA' ? lesson.quiz.question.ha : lesson.quiz.question.en}
              </p>

              <div className="quiz-options-list flex flex-col gap-3">
                {lesson.quiz.options.map((option, optIdx) => {
                  const isSelected = selectedOptionIndex === optIdx;
                  const isCorrect = option.isCorrect;
                  
                  let optionClass = 'bg-[#FAF9F6] border-black/5 text-[#263238] hover:bg-black/3';
                  if (showFeedback && isSelected) {
                    optionClass = isCorrect 
                      ? 'bg-green-500/10 border-green-500/30 text-[#1B5E20]' 
                      : 'bg-red-500/10 border-red-500/30 text-[#B71C1C]';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showFeedback}
                      onClick={() => handleOptionClick(optIdx, isCorrect)}
                      className={`option-btn flex items-center gap-3 w-full p-4 rounded-xl border font-semibold text-xs transition-all text-left cursor-pointer ${optionClass}`}
                    >
                      <span className={`option-marker font-bold text-[10px] px-2.5 py-1 rounded-md transition-colors ${
                        showFeedback && isSelected
                          ? isCorrect 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                          : 'bg-black/5 text-[#263238]'
                      }`}>
                        {option.marker}
                      </span>
                      <span className="leading-snug">
                        {language === 'HA' ? option.label.ha : option.label.en}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Floating Outline fab switcher (mobile/tablet only) */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="contents-floating-fab lg:hidden fixed bottom-24 right-5 w-12 h-12 rounded-full bg-[#2E7D32] hover:bg-[#225C25] text-white border-none flex items-center justify-center cursor-pointer shadow-[0_4px_14px_rgba(76,175,80,0.35)] z-40"
        aria-label="Open lessons outline"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Floating bottom pagination controller */}
      <footer className="lesson-control-panel lg:ml-[280px] bg-white border-t border-black/5 px-6 py-4 flex flex-col z-40 sticky bottom-0 shadow-lg">
        <div className="navigation-row flex justify-between gap-3 max-w-3xl mx-auto w-full">
          <button 
            disabled={!prevLesson}
            onClick={() => setRoute(prevLesson!.id)}
            className={`control-btn py-3 px-6 rounded-xl font-bold text-xs flex-1 transition-all text-center ${
              prevLesson 
                ? 'bg-[#FAF9F6] border border-black/10 text-[#263238] hover:bg-black/5 cursor-pointer' 
                : 'opacity-40 text-[#607D8B] cursor-not-allowed border border-transparent'
            }`}
          >
            {language === 'HA' ? '← Baya' : '← Previous'}
          </button>
          
          <button 
            onClick={() => {
              if (nextLesson) {
                setRoute(nextLesson.id);
              } else {
                setRoute('learn');
              }
            }}
            className="control-btn next-btn py-3 px-6 rounded-xl font-bold text-xs flex-1 bg-[#2E7D32] hover:bg-[#225C25] text-white border-none cursor-pointer text-center"
          >
            {nextLesson 
              ? (language === 'HA' ? 'Gaba →' : 'Next →') 
              : (language === 'HA' ? 'Kammala' : 'Finish')}
          </button>
        </div>
      </footer>
    </div>
  );
};
