import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { treeBranches } from '../data/tree';
import { lessonsData } from '../data/lessons';
import { TreeSubBranch } from '../types';
import { TechTreeIcon } from './TechTreeIcon';
import { BookOpen, TreePine, ChevronRight, CheckCircle2, Play, Lock, Search, Folder, Sparkles, Layers, Info, LogIn, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LearnView: React.FC = () => {
  const { 
    language, 
    user, 
    learnViewMode, 
    setLearnViewMode, 
    setRoute,
    signIn
  } = useApp();

  const [expandedBranches, setExpandedBranches] = useState<string[]>(() => {
    const saved = localStorage.getItem('digitalhausa_expanded_branches');
    return saved ? JSON.parse(saved) : ['foundation'];
  });
  const [expandedSubBranches, setExpandedSubBranches] = useState<string[]>(() => {
    const saved = localStorage.getItem('digitalhausa_expanded_subbranches');
    return saved ? JSON.parse(saved) : ['computer_basics'];
  });
  const [selectedSubBranchModal, setSelectedSubBranchModal] = useState<TreeSubBranch | null>(null);
  const [highlightedBranchId, setHighlightedBranchId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Default 'tree' view mode for guests and 'path' view mode for logged-in users
  useEffect(() => {
    if (!user || user.role === 'guest') {
      setLearnViewMode('tree');
    } else {
      setLearnViewMode('path');
    }

    const savedBranches = localStorage.getItem('digitalhausa_expanded_branches');
    if (savedBranches) {
      try {
        setExpandedBranches(JSON.parse(savedBranches));
      } catch (e) {
        console.error('Failed to parse expanded branches', e);
      }
    }

    const targetBranchId = sessionStorage.getItem('digitalhausa_scroll_to_branch');
    if (targetBranchId) {
      sessionStorage.removeItem('digitalhausa_scroll_to_branch');
      setExpandedBranches(prev => 
        prev.includes(targetBranchId) ? prev : [...prev, targetBranchId]
      );
      setHighlightedBranchId(targetBranchId);

      const scrollToTarget = () => {
        const el = document.getElementById(`branch-${targetBranchId}`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      };

      const t1 = setTimeout(scrollToTarget, 100);
      const t2 = setTimeout(scrollToTarget, 350);

      const tHighlight = setTimeout(() => {
        setHighlightedBranchId(null);
      }, 3000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(tHighlight);
      };
    }
  }, [user?.role]);

  const toggleBranch = (branchId: string) => {
    setExpandedBranches(prev => {
      const next = prev.includes(branchId) ? prev.filter(id => id !== branchId) : [...prev, branchId];
      localStorage.setItem('digitalhausa_expanded_branches', JSON.stringify(next));
      return next;
    });
  };

  const toggleSubBranch = (subBranchId: string) => {
    setExpandedSubBranches(prev => {
      const next = prev.includes(subBranchId) ? prev.filter(id => id !== subBranchId) : [...prev, subBranchId];
      localStorage.setItem('digitalhausa_expanded_subbranches', JSON.stringify(next));
      return next;
    });
  };

  const expandAll = () => {
    const allBranchIds = treeBranches.map(b => b.id);
    const allSubBranchIds = treeBranches.flatMap(b => b.subBranches.map(sb => sb.id));
    setExpandedBranches(allBranchIds);
    setExpandedSubBranches(allSubBranchIds);
  };

  const collapseAll = () => {
    setExpandedBranches([]);
    setExpandedSubBranches([]);
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Determine user progress
  const completedIds = user ? user.completedLessonIds : [];
  const progressPct = user ? user.pathCompletionPct : 15;

  // Determine resume route
  const getResumeLessonId = () => {
    const nextUncompleted = lessonsData.find(l => !completedIds.includes(l.id) && l.id.startsWith('html_'));
    return nextUncompleted ? nextUncompleted.id : 'html_introduction';
  };

  const resumeLessonId = getResumeLessonId();

  // Search filter helper
  const matchesSearch = (textHa?: string, textEn?: string) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (textHa && textHa.toLowerCase().includes(q)) || (textEn && textEn.toLowerCase().includes(q));
  };

  // Filtered branches for Tree View
  const filteredTreeBranches = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return treeBranches;

    return treeBranches.map(branch => {
      const matchingSubBranches = branch.subBranches.map(subBranch => {
        const matchingLeaves = subBranch.leaves.filter(leaf => 
          matchesSearch(leaf.title.ha, leaf.title.en) ||
          matchesSearch(leaf.description?.ha, leaf.description?.en) ||
          matchesSearch(subBranch.title.ha, subBranch.title.en)
        );
        return { ...subBranch, leaves: matchingLeaves };
      }).filter(sb => sb.leaves.length > 0);

      return { ...branch, subBranches: matchingSubBranches };
    }).filter(b => b.subBranches.length > 0);
  }, [search]);

  // Auto expand when searching
  const isSearching = search.trim().length > 0;

  const isLoggedIn = user && user.role === 'student';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="learn-workspace max-w-4xl mx-auto px-3 md:px-4 py-6 md:py-10"
    >
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#263238] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-white/10"
          >
            <Info className="w-4 h-4 text-[#C99700]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="hub-header bg-transparent sticky top-0 z-40 pb-3 flex flex-col gap-3">
        {/* RELOCATED VIEW MODE SWITCHER - Prominently at the top for all users */}
        <div className="view-mode-selector bg-[#E3EAE5] p-1.5 rounded-2xl flex gap-1 shadow-inner border border-black/5">
          <button 
            onClick={() => setLearnViewMode('path')}
            className={`toggle-btn flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              learnViewMode === 'path' ? 'bg-white text-[#1E5235] shadow-sm' : 'text-[#607D8B] hover:text-[#263238]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === 'HA' ? 'Tafarki (Paths)' : 'Learning Paths'}</span>
            {!isLoggedIn && <Lock className="w-3.5 h-3.5 text-[#C99700] ml-0.5 shrink-0" />}
          </button>
          <button 
            onClick={() => setLearnViewMode('tree')}
            className={`toggle-btn flex-1 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              learnViewMode === 'tree' ? 'bg-white text-[#1E5235] shadow-sm' : 'text-[#607D8B] hover:text-[#263238]'
            }`}
          >
            <TreePine className="w-4 h-4" />
            <span>{language === 'HA' ? 'Bishiya (Tree View)' : 'Curriculum Tree'}</span>
          </button>
        </div>

        {/* Search & Tree Controls Toolbar */}
        <div className="header-toolbar flex flex-wrap items-center gap-2 w-full">
          <div className="search-wrapper relative flex-1 min-w-[220px] flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#607D8B]" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                learnViewMode === 'tree' 
                  ? (language === 'HA' ? "Bincika bishiyar ilimi..." : "Search curriculum tree...")
                  : (language === 'HA' ? "Bincika darussa..." : "Search lessons...")
              }
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs font-semibold outline-none focus:border-[#2E7D32] shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-all"
            />
          </div>

          {learnViewMode === 'tree' && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button 
                onClick={expandAll}
                className="px-3 py-2 bg-white hover:bg-black/5 border border-black/10 rounded-xl text-[11px] font-bold text-[#1E5235] cursor-pointer transition-all"
              >
                {language === 'HA' ? 'Faɗa Duka' : 'Expand All'}
              </button>
              <button 
                onClick={collapseAll}
                className="px-3 py-2 bg-white hover:bg-black/5 border border-black/10 rounded-xl text-[11px] font-bold text-[#607D8B] cursor-pointer transition-all"
              >
                {language === 'HA' ? 'Rage Duka' : 'Collapse'}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Progress card summary banner - Visible to student profiles */}
      {isLoggedIn && (
        <section className="progress-card mb-4 bg-gradient-to-br from-[#1E5235] to-[#2D7A4F] text-white p-5 rounded-2xl flex flex-col gap-4 shadow-[0_4px_15px_rgba(30,82,53,0.12)]">
          <div className="progress-info flex items-center gap-4">
            <div className="progress-percentage text-2xl font-black bg-white/20 px-3.5 py-2 rounded-xl">
              {progressPct}%
            </div>
            <div className="progress-text text-left">
              <p className="text-xs font-bold leading-normal">
                {language === 'HA' 
                  ? `Kuna da kyau! Kun kammala darussa ${completedIds.length}.` 
                  : `Looking good! You have completed ${completedIds.length} lessons.`}
              </p>
              <p className="text-[10px] opacity-75 mt-0.5">
                {language === 'HA' 
                  ? 'Mu ci gaba da koyon HTML don gina shafukan yanar gizo.' 
                  : "Let's continue learning HTML to build modern pages."}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setRoute(resumeLessonId)}
            className="resume-btn bg-white hover:bg-white/95 text-[#1e5235] border-none font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all"
          >
            {language === 'HA' ? 'Ci gaba' : 'Resume'}
          </button>
        </section>
      )}

      {/* Render View Mode content */}
      <div className="mt-2">
        {learnViewMode === 'path' ? (
          !isLoggedIn ? (
            /* Unregistered / Guest User Warning View */
            <div className="guest-path-warning bg-white border border-amber-500/20 rounded-3xl p-6 md:p-10 text-center flex flex-col items-center gap-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] my-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shadow-xs">
                <Lock className="w-8 h-8" />
              </div>
              <div className="max-w-md flex flex-col gap-2">
                <h3 className="font-black text-base md:text-lg text-[#263238] tracking-tight">
                  {language === 'HA' 
                    ? 'Shiga Shafi da Zaɓan Tafarki ake Bukata' 
                    : 'Sign In and Select Learning Path First'}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-[#607D8B] leading-relaxed">
                  {language === 'HA'
                    ? 'Don Allah ka shiga shafi ko kayi rajista ka zaɓi tafarkin koyonku da farko. Mutanen da suka yi rajista ne kawai za a iya ajiye bayanansu a tafarkin koyo.'
                    : 'Please sign in and select your learning path first. Custom learning paths and progress tracking are only available for registered user accounts.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-1 w-full max-w-sm">
                <button
                  onClick={signIn}
                  className="w-full sm:w-auto flex-1 py-3 px-5 bg-[#1E5235] hover:bg-[#1E5235]/90 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{language === 'HA' ? 'Shiga Shafi (Sign In)' : 'Sign In Now'}</span>
                </button>
                <button
                  onClick={() => setLearnViewMode('tree')}
                  className="w-full sm:w-auto flex-1 py-3 px-4 bg-[#FAF9F6] hover:bg-black/5 border border-black/10 text-[#607D8B] rounded-xl text-xs font-extrabold transition-all cursor-pointer"
                >
                  {language === 'HA' ? 'Bishiyar Ilimi (Tree View)' : 'Browse Tree View'}
                </button>
              </div>
            </div>
          ) : (
            /* Registered Student Tafarki Path View */
            <div className="view-container flex flex-col gap-6">
              <div className="active-track-section bg-white border border-black/5 rounded-2xl p-5 shadow-sm text-left">
                <div className="track-hierarchy-header flex items-center gap-1.5 text-[10px] font-bold text-[#607D8B] uppercase tracking-wider mb-4">
                  <span>💻 {language === 'HA' ? 'Sifari' : 'Programming'}</span>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                  <span className="text-[#2E7D32]">{language === 'HA' ? 'Gaban Shafi' : 'Frontend'}</span>
                </div>

                <div className="focused-tree-card pl-3 border-l-2 border-dashed border-[#2e7d32]/25 ml-2.5">
                  <div className="tree-branch-root font-black text-sm text-[#263238] mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#2E7D32]" />
                    <span>HTML & Web Core</span>
                  </div>
                  
                  <div className="tree-leaves-list flex flex-col gap-2">
                    {lessonsData.filter(l => l.id.startsWith('html_')).map((lesson) => {
                      const isCompleted = completedIds.includes(lesson.id);
                      const isCurrent = resumeLessonId === lesson.id;
                      const isLocked = !isCompleted && !isCurrent;

                      if (!matchesSearch(lesson.title.ha, lesson.title.en)) return null;

                      return (
                        <button
                          key={lesson.id}
                          disabled={isLocked && user?.role !== 'student'}
                          onClick={() => setRoute(lesson.id)}
                          className={`tree-leaf flex items-center gap-3 w-full py-2.5 px-3 rounded-xl border text-left transition-all ${
                            isCompleted 
                              ? 'bg-[#e8f5e9]/30 border-[#2e7d32]/10 text-[#2e7d32]' 
                              : isCurrent
                                ? 'bg-[#FAF9F6] border-[#2e7d32]/20 font-bold text-[#263238]'
                                : 'bg-white border-black/5 opacity-65 text-[#607D8B] hover:bg-black/5 cursor-pointer'
                          }`}
                        >
                          <span className="leaf-status text-sm flex items-center justify-center w-5">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                            ) : isCurrent ? (
                              <Play className="w-4 h-4 text-[#C99700] fill-[#C99700]" />
                            ) : (
                              <Lock className="w-3.5 h-3.5 opacity-55" />
                            )}
                          </span>
                          <span className="leaf-title text-xs font-semibold">
                            {language === 'HA' ? lesson.title.ha : lesson.title.en}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="active-track-section bg-white border border-black/5 rounded-2xl p-5 shadow-sm text-left">
                <div className="track-hierarchy-header flex items-center gap-1.5 text-[10px] font-bold text-[#607D8B] uppercase tracking-wider mb-4">
                  <span>💻 {language === 'HA' ? 'Sifari' : 'Programming'}</span>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                  <span className="text-[#2E7D32]">{language === 'HA' ? 'Bayan Shafi' : 'Backend'}</span>
                </div>

                <div className="focused-tree-card pl-3 border-l-2 border-dashed border-[#2e7d32]/25 ml-2.5">
                  <div className="tree-branch-root font-black text-sm text-[#263238] mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#2E7D32]" />
                    <span>Python Backend</span>
                  </div>
                  
                  <div className="tree-leaves-list flex flex-col gap-2">
                    {lessonsData.filter(l => l.id === 'python_introduction').map((lesson) => {
                      const isCompleted = completedIds.includes(lesson.id);

                      if (!matchesSearch(lesson.title.ha, lesson.title.en)) return null;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setRoute(lesson.id)}
                          className={`tree-leaf flex items-center gap-3 w-full py-2.5 px-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isCompleted 
                              ? 'bg-[#e8f5e9]/30 border-[#2e7d32]/10 text-[#2e7d32]' 
                              : 'bg-white border-black/5 font-bold text-[#263238]'
                          }`}
                        >
                          <span className="leaf-status text-sm flex items-center justify-center w-5">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                            ) : (
                              <Play className="w-4 h-4 text-[#2E7D32] fill-[#2E7D32]" />
                            )}
                          </span>
                          <span className="leaf-title text-xs font-semibold">
                            {language === 'HA' ? lesson.title.ha : lesson.title.en}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          /* EDITED CURRICULUM TREE VIEW */
          <div className="view-container flex flex-col gap-4">
            {filteredTreeBranches.length === 0 ? (
              <div className="p-8 text-center bg-white border border-black/5 rounded-2xl text-[#607D8B]">
                <p className="text-sm font-bold">
                  {language === 'HA' ? 'Babu darasin da aka samu.' : 'No matching lessons found.'}
                </p>
                <p className="text-xs mt-1 opacity-75">
                  {language === 'HA' ? 'Gada gyara bincikenka.' : 'Try adjusting your search query.'}
                </p>
              </div>
            ) : (
              filteredTreeBranches.map((branch) => {
                const isBranchExpanded = isSearching || expandedBranches.includes(branch.id);
                
                // Count total leaves in this branch
                const totalLeavesInBranch = branch.subBranches.reduce(
                  (acc, sb) => acc + sb.leaves.length, 0
                );
                
                // Count completed leaves in this branch
                const completedLeavesInBranch = branch.subBranches.reduce(
                  (acc, sb) => acc + sb.leaves.filter(l => completedIds.includes(l.lessonId)).length, 0
                );

                return (
                  <div 
                    key={branch.id} 
                    id={`branch-${branch.id}`}
                    className={`global-tree-branch scroll-mt-24 bg-white border rounded-2xl overflow-hidden transition-all duration-500 ${
                      highlightedBranchId === branch.id 
                        ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/50 shadow-xl scale-[1.01]' 
                        : 'border-black/10 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.04)] hover:border-black/15'
                    }`}
                  >
                    {/* Branch Header */}
                    <button 
                      onClick={() => toggleBranch(branch.id)}
                      className="branch-trigger group flex items-center justify-between w-full p-4 md:p-5 hover:bg-black/[0.015] transition-all text-left cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="branch-icon text-3xl md:text-4xl select-none leading-none p-2 bg-[#FAF9F6] rounded-xl border border-black/5 transition-transform duration-300 group-hover:scale-110">
                          {branch.icon}
                        </span>
                        <div>
                          <h3 className="branch-name font-black text-sm md:text-base text-[#263238] tracking-tight">
                            {language === 'HA' ? branch.title.ha : branch.title.en}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-[#607D8B] font-extrabold bg-[#E3EAE5]/60 px-2 py-0.5 rounded-md">
                              {branch.subBranches.length} {language === 'HA' ? 'Rassa (Sections)' : 'Sections'}
                            </span>
                            <span className="text-[10px] text-[#2E7D32] font-extrabold bg-[#2E7D32]/10 px-2 py-0.5 rounded-md">
                              {completedLeavesInBranch}/{totalLeavesInBranch} {language === 'HA' ? 'Kammala' : 'Completed'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className={`branch-chevron flex items-center justify-center w-8 h-8 rounded-full bg-black/[0.03] text-[#607D8B] transition-all duration-300 ${isBranchExpanded ? 'rotate-90 bg-[#2E7D32]/10 text-[#2E7D32]' : ''}`}>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </button>

                    {/* Branch Accordion Body */}
                    <AnimatePresence initial={false}>
                      {isBranchExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="branch-content bg-[#FAF9F6] border-t border-black/5 px-3 md:px-5 py-5 flex flex-col gap-4"
                        >
                          {/* Sub-branches Grid (Matching Landing Page Grid Style) */}
                          <div className="sub-branches-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
                            {branch.subBranches.map((subBranch) => {
                              return (
                                <div 
                                  key={subBranch.id} 
                                  onClick={() => setSelectedSubBranchModal(subBranch)}
                                  className="sub-branch-card border border-black/10 hover:border-[#2E7D32]/60 rounded-2xl overflow-hidden bg-white flex flex-col justify-between transition-all duration-300 cursor-pointer group shadow-xs hover:shadow-lg hover:-translate-y-1.5 hover:scale-[1.03]"
                                >
                                  {/* Top Vector Illustration / Thumbnail Header */}
                                  <div className="w-full h-24 sm:h-28 bg-[#FAF9F6] relative shrink-0 border-b border-black/5 overflow-hidden">
                                    {subBranch.illustrationImg ? (
                                      <img 
                                        src={subBranch.illustrationImg} 
                                        alt={subBranch.title.en}
                                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-gradient-to-br from-[#2E7D32]/10 via-[#FAF9F6] to-[#1E5235]/5 flex items-center justify-center text-3xl transition-transform duration-500 ease-out group-hover:scale-110">
                                        <TechTreeIcon subBranchId={subBranch.id} icon={subBranch.icon} size="xl" />
                                      </div>
                                    )}
                                    <div className="absolute top-2 left-2 z-10">
                                      <TechTreeIcon subBranchId={subBranch.id} icon={subBranch.icon} size="sm" />
                                    </div>
                                    <div className="absolute top-2 right-2 text-[9px] font-black text-[#2E7D32] bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-black/5 shadow-xs">
                                      {subBranch.leaves.length} {language === 'HA' ? 'Darussa' : 'Topics'}
                                    </div>
                                  </div>

                                  {/* Card Content */}
                                  <div className="p-3 w-full flex-1 flex flex-col justify-between gap-1 text-left">
                                    <h4 className="sub-card-title text-xs md:text-sm font-black text-[#263238] group-hover:text-[#2E7D32] transition-colors line-clamp-2">
                                      {language === 'HA' ? subBranch.title.ha : subBranch.title.en}
                                    </h4>
                                    <div className="flex items-center justify-between text-[10px] text-[#2E7D32] font-black mt-1">
                                      <span>{language === 'HA' ? 'Duba Darussa' : 'Explore Topics'}</span>
                                      <span className="w-5 h-5 rounded-full flex items-center justify-center bg-[#2E7D32]/10 group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
                                        <ChevronRight className="w-3 h-3" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Sub-branch Lessons Popup Modal */}
      <AnimatePresence>
        {selectedSubBranchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden w-full max-w-2xl max-h-[85vh] flex flex-col relative"
            >
              {/* Modal Header */}
              <div className="bg-[#FAF9F6] border-b border-black/5 p-4 sm:p-5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <TechTreeIcon subBranchId={selectedSubBranchModal.id} icon={selectedSubBranchModal.icon} size="lg" />
                  <div>
                    <h3 className="font-black text-base sm:text-lg text-[#263238]">
                      {language === 'HA' ? selectedSubBranchModal.title.ha : selectedSubBranchModal.title.en}
                    </h3>
                    <p className="text-xs text-[#607D8B] font-extrabold mt-0.5">
                      {selectedSubBranchModal.leaves.length} {language === 'HA' ? 'Darussa (Topics)' : 'Topics'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubBranchModal(null)}
                  className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#263238] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Lessons List / Grid */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-[#FAF9F6]/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {selectedSubBranchModal.leaves.map((leaf, index) => {
                    const isCompleted = completedIds.includes(leaf.lessonId);
                    const isAvailable = lessonsData.some(l => l.id === leaf.lessonId);

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedSubBranchModal(null);
                            setRoute(leaf.lessonId);
                          } else {
                            showNotification(
                              language === 'HA' 
                                ? 'Muna aiki kan wannan darasi! Zai zo nan ba da jimawa ba.' 
                                : 'This lesson is currently under development and coming soon!'
                            );
                          }
                        }}
                        className={`track-card bg-white border rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all duration-300 transform cursor-pointer text-left group hover:shadow-md hover:-translate-y-1 ${
                          isCompleted 
                            ? 'border-[#2E7D32]/40 bg-[#e8f5e9]/30 ring-1 ring-[#2E7D32]/20'
                            : isAvailable 
                              ? 'border-black/10 hover:border-[#2E7D32] hover:ring-2 hover:ring-[#2E7D32]/20' 
                              : 'border-black/5 opacity-80 hover:border-black/20'
                        }`}
                      >
                        <div className="track-badge-row flex justify-between items-center">
                          <span className={`track-meta-tag text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            isCompleted 
                              ? 'bg-[#2E7D32] text-white' 
                              : 'bg-[#e8f5e9] text-[#2e7d32]'
                          }`}>
                            {leaf.badge || 'Topic'}
                          </span>
                          <span className="track-lesson-count text-[10px] font-extrabold text-[#607D8B]">
                            {isCompleted ? (
                              <span className="text-[#2E7D32] flex items-center gap-1 font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {language === 'HA' ? 'Kammale' : 'Done'}
                              </span>
                            ) : isAvailable ? (
                              <span className="text-[#C99700] flex items-center gap-1 font-bold">
                                <Play className="w-3 h-3 fill-[#C99700]" />
                                {language === 'HA' ? 'Akwai' : 'Available'}
                              </span>
                            ) : (
                              <span className="text-[#607D8B]/70 flex items-center gap-1 font-semibold">
                                <Lock className="w-3 h-3" />
                                {language === 'HA' ? 'Musa' : 'Soon'}
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="track-card-content">
                          <h5 className="text-sm font-black text-[#263238] group-hover:text-[#2E7D32] transition-colors">
                            {language === 'HA' ? leaf.title.ha : leaf.title.en}
                          </h5>
                          {leaf.description && (
                            <p className="text-xs leading-relaxed text-[#607D8B] mt-1 line-clamp-2">
                              {language === 'HA' ? leaf.description.ha : leaf.description.en}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

