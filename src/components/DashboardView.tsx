import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { lessonsData } from '../data/lessons';
import { DigitalHausaLogo } from './DigitalHausaLogo';
import { TechTreeIcon } from './TechTreeIcon';
import { 
  Award, Flame, Target, Sparkles, ChevronRight, 
  Check, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PathConfig {
  id: string;
  icon: string;
  title: { ha: string; en: string };
  goalName: { ha: string; en: string };
  prefixes: string[];
}

const PATH_CONFIGS: PathConfig[] = [
  {
    id: 'foundation',
    icon: '🌱',
    title: { ha: 'Asasi na Kwamfuta', en: 'Computer Basics' },
    goalName: { ha: 'Kware a Kwamfuta da Intanet', en: 'Master Computer Basics & Digital Skills' },
    prefixes: ['computer_', 'using_', 'internet_', 'email_', 'files_', 'typing_', 'safety_']
  },
  {
    id: 'programming',
    icon: '💻',
    title: { ha: 'Sifari da Gizo (Programming)', en: 'Programming & Web Dev' },
    goalName: { ha: 'Zama Injinijan Yanar Gizo (Web Developer)', en: 'Become a Web Developer' },
    prefixes: ['html_', 'css_', 'js_', 'python_']
  },
  {
    id: 'office',
    icon: '💼',
    title: { ha: 'Aikin Ofis (MS Office)', en: 'Office & Work Tools' },
    goalName: { ha: 'Kware a MS Word, Excel da Google Docs', en: 'Master MS Office, Word & Excel' },
    prefixes: ['word_', 'excel_', 'powerpoint_', 'gdocs_', 'gsheets_', 'gslides_', 'printing_']
  },
  {
    id: 'creative',
    icon: '🎨',
    title: { ha: 'Fasahar Zane (Creative)', en: 'Creative & Design' },
    goalName: { ha: 'Kware a Graphic Design da UI/UX', en: 'Master Graphic & Visual Design' },
    prefixes: ['graphic_', 'coreldraw_', 'canva_', 'ui_', 'ux_', 'video_', 'photography_', 'animation_']
  }
];

export const DashboardView: React.FC = () => {
  const { language, setRoute, user, updateUserGoal } = useApp();
  const [showGoalModal, setShowGoalModal] = useState(false);

  if (!user) return null;

  // 1. Dynamic Points (XP) Calculation
  const completedCount = user.completedLessonIds.length;
  const additionalLessons = Math.max(0, completedCount - 2);
  const totalXP = 320 + additionalLessons * (user.xpPerLesson || 20);

  // 2. Next Lesson to Resume
  const nextLesson = lessonsData.find(l => !user.completedLessonIds.includes(l.id)) || lessonsData[lessonsData.length - 1];

  // 3. User Path / Goal Determination
  const userSelectedPaths = user.selectedPathIds || [];
  const primaryGoalId = user.primaryGoalId || userSelectedPaths[0] || 'programming';

  // Find active path config if selected
  const activePathConfig = PATH_CONFIGS.find(p => p.id === primaryGoalId) || PATH_CONFIGS[1];

  // Calculate lessons for active path config
  const activePathLessons = lessonsData.filter(l => 
    activePathConfig.prefixes.some(prefix => l.id.startsWith(prefix))
  );
  const activePathTotal = activePathLessons.length > 0 ? activePathLessons.length : 10;
  const activePathCompleted = activePathLessons.filter(l => user.completedLessonIds.includes(l.id)).length;
  const goalPercentage = Math.round((activePathCompleted / activePathTotal) * 100);

  // 4. Chapters Learned Calculation
  const learnedPathStats = PATH_CONFIGS.map(path => {
    const pathLessons = lessonsData.filter(l => 
      path.prefixes.some(prefix => l.id.startsWith(prefix))
    );
    const completed = pathLessons.filter(l => user.completedLessonIds.includes(l.id)).length;
    const total = pathLessons.length > 0 ? pathLessons.length : 10;
    const pct = Math.round((completed / total) * 100);
    return {
      ...path,
      completed,
      total,
      pct
    };
  });

  const hasSelectedPaths = userSelectedPaths.length > 0;
  const hasLearnedChapters = completedCount > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const firstName = user.name.split(' ')[0] || 'Dalibi';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="dash-workspace page-workspace max-w-4xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6 text-left"
    >
      {/* Localized User Welcome Surface Card */}
      <motion.section 
        variants={itemVariants}
        className="welcome-surface-card bg-gradient-to-br from-[#1E5235] to-[#2E7D32] text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-20 select-none pointer-events-none text-white">
          <DigitalHausaLogo className="w-20 h-20 text-white fill-white" monochrome />
        </div>
        <h2 className="user-greeting text-xl md:text-2xl font-black mb-2 flex items-center gap-2">
          <span>👋</span>
          {language === 'HA' ? `Barka da kwana, ${firstName}!` : `Welcome back, ${firstName}!`}
        </h2>
        <p className="welcome-caption text-xs md:text-sm font-medium opacity-90 max-w-md leading-relaxed">
          {language === 'HA' 
            ? '"Mu ci gaba da koyo domin cimma burinmu na haɓaka kwarewa."' 
            : '"Let\'s continue learning to achieve your personalized digital tech goals."'}
        </p>
      </motion.section>

      {/* Stats Overview Panel */}
      <motion.section 
        variants={itemVariants}
        className="stats-overview-grid grid grid-cols-2 gap-4"
      >
        <div className="stat-card bg-white border border-black/5 rounded-2xl p-4 md:p-5 flex items-center gap-4 shadow-xs hover:border-[#2E7D32]/10 transition-all">
          <span className="stat-icon text-3xl select-none flex items-center justify-center bg-orange-500/10 text-orange-600 w-12 h-12 rounded-xl">
            <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
          </span>
          <div className="stat-info">
            <div className="stat-value text-xl md:text-2xl font-black text-[#263238]">
              {user.streakDays}
            </div>
            <div className="stat-label text-[10px] md:text-xs font-bold text-[#607D8B] uppercase tracking-wider">
              {language === 'HA' ? 'Kwanaki a Jere' : 'Day Streak'}
            </div>
          </div>
        </div>

        <div className="stat-card bg-white border border-black/5 rounded-2xl p-4 md:p-5 flex items-center gap-4 shadow-xs hover:border-[#2E7D32]/10 transition-all">
          <span className="stat-icon text-3xl select-none flex items-center justify-center bg-yellow-500/10 text-yellow-600 w-12 h-12 rounded-xl">
            <Award className="w-6 h-6 text-yellow-600" />
          </span>
          <div className="stat-info">
            <div className="stat-value text-xl md:text-2xl font-black text-[#263238]">
              {totalXP}
            </div>
            <div className="stat-label text-[10px] md:text-xs font-bold text-[#607D8B] uppercase tracking-wider">
              {language === 'HA' ? 'Maki (XP)' : 'Total Points (XP)'}
            </div>
          </div>
        </div>
      </motion.section>

      {/* NEW USER NO PATH & NO LESSONS: Path Chooser Banner */}
      {!hasSelectedPaths && !hasLearnedChapters && (
        <motion.section 
          variants={itemVariants}
          className="bg-white border-2 border-dashed border-[#2E7D32]/30 rounded-3xl p-6 md:p-8 shadow-sm text-left flex flex-col gap-4 relative overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center text-xl font-black shrink-0">
              🎯
            </div>
            <div>
              <h3 className="text-base font-black text-[#263238]">
                {language === 'HA' ? 'Zaɓi Abin da Kake So Ka Koya' : 'What Would You Like to Learn?'}
              </h3>
              <p className="text-xs font-bold text-[#607D8B]">
                {language === 'HA'
                  ? 'Kowace hanyar koyo tana tsara darussanku domin dacewa da burinku.'
                  : 'Select your preferred goal path to customize your learning dashboard.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {PATH_CONFIGS.map((path) => (
              <button
                key={path.id}
                onClick={() => updateUserGoal([path.id])}
                className="bg-[#FAF9F6] hover:bg-[#2E7D32]/5 border border-black/10 hover:border-[#2E7D32]/40 rounded-2xl p-4 text-left flex items-start gap-3 transition-all cursor-pointer group"
              >
                <TechTreeIcon subBranchId={path.id} icon={path.icon} size="md" />
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#263238] group-hover:text-[#2E7D32] transition-colors">
                    {language === 'HA' ? path.title.ha : path.title.en}
                  </span>
                  <span className="text-[10px] font-semibold text-[#607D8B] mt-0.5 leading-tight">
                    {language === 'HA' ? path.goalName.ha : path.goalName.en}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.section>
      )}

      {/* GOAL MATRIX / REFLECTED CHAPTERS CARD */}
      {(hasSelectedPaths || hasLearnedChapters) && (
        <motion.section 
          variants={itemVariants}
          className="metric-card bg-white border border-black/10 rounded-3xl p-6 shadow-xs text-left"
        >
          <div className="metric-header flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3.5">
              <span className="metric-icon text-3xl bg-[#2E7D32]/10 text-[#2E7D32] w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-[#2E7D32]" />
              </span>
              <div className="metric-title-block">
                <h4 className="metric-label text-[10px] font-black text-[#607D8B] uppercase tracking-wider">
                  {hasSelectedPaths 
                    ? (language === 'HA' ? 'Zabaɓɓen Burinku' : 'Your Selected Goal')
                    : (language === 'HA' ? 'Karatun da Kuka Koya' : 'Chapters You\'ve Learned')}
                </h4>
                <h3 className="metric-value text-base font-black text-[#263238]">
                  {hasSelectedPaths
                    ? (language === 'HA' ? activePathConfig.goalName.ha : activePathConfig.goalName.en)
                    : (language === 'HA' ? 'Karatun da Ake Ciki' : 'Reflected Progress Across Chapters')}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setShowGoalModal(true)}
              className="text-[11px] font-black text-[#2E7D32] bg-[#2E7D32]/10 hover:bg-[#2E7D32]/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{language === 'HA' ? 'Sauya Buri' : 'Change Goal'}</span>
            </button>
          </div>

          <div className="goal-progress-container flex items-center gap-4 mb-4">
            <div className="goal-progress-bar flex-1 h-3 bg-[#E0E0E0] rounded-full overflow-hidden shadow-inner">
              <div 
                className="goal-progress-fill h-full bg-[#2E7D32] transition-all duration-500" 
                style={{ width: `${goalPercentage}%` }}
              />
            </div>
            <span className="goal-percent-text text-xs font-black text-[#2E7D32] min-w-[32px]">
              {goalPercentage}%
            </span>
          </div>

          <div className="goal-stats-footer flex justify-between border-t border-black/5 pt-4 text-[10px] font-bold">
            <div className="stat-sub-node flex flex-col items-start gap-0.5">
              <span className="stat-count text-sm font-black text-[#263238]">
                {activePathCompleted} / {activePathTotal}
              </span>
              <span className="stat-sub-label text-[#607D8B] uppercase tracking-wider">
                {language === 'HA' ? 'Darussa An Kammala' : 'Lessons Completed'}
              </span>
            </div>
            <div className="stat-sub-node align-right flex flex-col items-end gap-0.5">
              <span className="stat-count text-sm font-black text-[#263238]">
                {Math.max(0, activePathTotal - activePathCompleted)}
              </span>
              <span className="stat-sub-label text-[#607D8B] uppercase tracking-wider">
                {language === 'HA' ? 'Sauran Darussa' : 'Remaining'}
              </span>
            </div>
          </div>
        </motion.section>
      )}

      {/* Dynamic Resume / Quick Track Container */}
      {nextLesson && (
        <motion.section 
          variants={itemVariants}
          onClick={() => setRoute(nextLesson.id)}
          className="resume-learning-panel bg-white border border-[#2E7D32]/20 hover:border-[#2E7D32]/40 rounded-3xl p-6 shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 text-[#2E7D32]/10 pointer-events-none select-none text-5xl">
            💻
          </div>
          <div className="panel-tag text-[9px] font-black text-[#2E7D32] uppercase tracking-widest mb-3 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#2E7D32]" />
            <span>{language === 'HA' ? '▶ CIGABA DA KOYO' : '▶ CONTINUE LEARNING'}</span>
          </div>

          <div className="resume-leaf text-base font-extrabold text-[#263238] mb-4 flex items-center gap-2">
            <DigitalHausaLogo className="w-5 h-5 shrink-0" />
            <span>{language === 'HA' ? nextLesson.title.ha : nextLesson.title.en}</span>
          </div>

          <div className="resume-action-row flex justify-start">
            <button className="resume-btn bg-[#2E7D32] hover:bg-[#225C25] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer">
              {language === 'HA' ? 'Ci gaba' : 'Continue'}
            </button>
          </div>
        </motion.section>
      )}

      {/* Modular Learning Paths Outline Grid */}
      <motion.section 
        variants={itemVariants}
        className="content-block-section text-left flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="section-title text-xs font-black text-[#263238] uppercase tracking-wider pl-1">
            📚 {language === 'HA' ? 'Hanyoyin Koyo da Babi-Babi' : 'Learning Paths & Chapters'}
          </h3>
          <button
            onClick={() => setShowGoalModal(true)}
            className="text-[10px] font-bold text-[#2E7D32] hover:underline cursor-pointer"
          >
            {language === 'HA' ? 'Zaɓi Hanya' : 'Customize Paths'}
          </button>
        </div>

        <div className="paths-list-wrapper bg-white border border-black/5 rounded-3xl p-5 flex flex-col gap-4 shadow-xs">
          {learnedPathStats.map((path) => {
            const isUserTarget = userSelectedPaths.includes(path.id);
            return (
              <div key={path.id} className="path-row-item flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <TechTreeIcon subBranchId={path.id} icon={path.icon} size="sm" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#263238] flex items-center gap-1.5">
                      {language === 'HA' ? path.title.ha : path.title.en}
                      {isUserTarget && (
                        <span className="text-[9px] font-black text-[#2E7D32] bg-[#2E7D32]/10 px-1.5 py-0.5 rounded-md">
                          {language === 'HA' ? 'Buri' : 'Goal'}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="path-progress-metric flex items-center gap-3">
                  <div className="mini-bar w-20 h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <div 
                      className="mini-fill h-full bg-[#2E7D32] transition-all" 
                      style={{ width: `${path.pct}%` }} 
                    />
                  </div>
                  <span className="path-percent-label text-[10px] font-black text-[#2E7D32] min-w-[28px] text-right">
                    {path.pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Daily Review Queue */}
      <motion.section 
        variants={itemVariants}
        className="content-block-section text-left flex flex-col gap-3"
      >
        <h3 className="section-title text-xs font-black text-[#263238] uppercase tracking-wider pl-1">
          🔔 {language === 'HA' ? 'Maimaitawa na Yau' : 'Reviews Today'}
        </h3>
        <div className="review-chips-grid flex flex-wrap gap-2.5">
          <button 
            onClick={() => setRoute('dictionary')}
            className="review-chip bg-white hover:bg-black/3 border border-black/5 hover:border-[#2E7D32]/20 px-4 py-2.5 rounded-full text-xs font-bold text-[#263238] shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>🧠</span>
            <span>RAM</span>
          </button>
          
          <button 
            onClick={() => setRoute('html_elements')}
            className="review-chip bg-white hover:bg-black/3 border border-black/5 hover:border-[#2E7D32]/20 px-4 py-2.5 rounded-full text-xs font-bold text-[#263238] shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>🧱</span>
            <span>{language === 'HA' ? 'Sifofin Gida na HTML' : 'HTML Elements'}</span>
          </button>
        </div>
      </motion.section>

      {/* Achievements Hub */}
      <motion.section 
        variants={itemVariants}
        className="content-block-section text-left flex flex-col gap-3 memory-margin mb-8"
      >
        <h3 className="section-title text-xs font-black text-[#263238] uppercase tracking-wider pl-1">
          🏆 {language === 'HA' ? 'Nasarori' : 'Achievements'}
        </h3>
        <div className="achievements-empty-container bg-white border border-black/5 rounded-3xl p-6 shadow-xs flex flex-col items-center justify-center min-h-[100px]">
          <div className="flex gap-4 items-center">
            {completedCount > 0 && (
              <div className="achievement-badge flex flex-col items-center gap-1 bg-[#FAF9F6] border border-black/5 rounded-2xl p-3 text-center min-w-[80px]">
                <span className="empty-icon text-3xl select-none">🎖️</span>
                <span className="text-[9px] font-black text-[#2E7D32] uppercase">{language === 'HA' ? 'Tafiya' : 'First Step'}</span>
              </div>
            )}
            {user.streakDays >= 5 && (
              <div className="achievement-badge flex flex-col items-center gap-1 bg-[#FAF9F6] border border-black/5 rounded-2xl p-3 text-center min-w-[80px]">
                <span className="empty-icon text-3xl select-none">🔥</span>
                <span className="text-[9px] font-black text-[#E65100] uppercase">{language === 'HA' ? 'Kwazo' : 'Dedicated'}</span>
              </div>
            )}
            {goalPercentage >= 100 && (
              <div className="achievement-badge flex flex-col items-center gap-1 bg-[#FAF9F6] border border-black/5 rounded-2xl p-3 text-center min-w-[80px]">
                <span className="empty-icon text-3xl select-none">🏆</span>
                <span className="text-[9px] font-black text-yellow-600 uppercase">{language === 'HA' ? 'Gwani' : 'Graduate'}</span>
              </div>
            )}
            {completedCount === 0 && (
              <span className="empty-icon text-3xl select-none opacity-40">🎖️</span>
            )}
          </div>
          {completedCount === 0 && (
            <p className="text-[10px] text-[#607D8B] font-bold mt-2 uppercase tracking-wide">
              {language === 'HA' ? 'Kammala darasi don samun nasara!' : 'Complete lessons to unlock badges!'}
            </p>
          )}
        </div>
      </motion.section>

      {/* Goal Selector Modal Overlay */}
      <AnimatePresence>
        {showGoalModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-black/10 p-6 max-w-md w-full shadow-2xl flex flex-col text-left"
            >
              <h3 className="text-lg font-black text-[#263238] mb-1">
                {language === 'HA' ? 'Zabi Burin Koyo' : 'Choose Your Learning Goal'}
              </h3>
              <p className="text-xs font-bold text-[#607D8B] mb-4">
                {language === 'HA'
                  ? 'Zabi hanyoyin da kake so ka maida hankali akai.'
                  : 'Select the primary paths you wish to focus on for your dashboard.'}
              </p>

              <div className="flex flex-col gap-2.5 mb-6">
                {PATH_CONFIGS.map((path) => {
                  const isSelected = userSelectedPaths.includes(path.id);
                  return (
                    <button
                      key={path.id}
                      type="button"
                      onClick={() => {
                        let newPaths: string[];
                        if (isSelected) {
                          newPaths = userSelectedPaths.filter(p => p !== path.id);
                        } else {
                          newPaths = [...userSelectedPaths, path.id];
                        }
                        updateUserGoal(newPaths, newPaths[0]);
                      }}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32] font-black'
                          : 'bg-[#FAF9F6] border-black/10 hover:border-black/20 text-[#607D8B]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <TechTreeIcon subBranchId={path.id} icon={path.icon} size="md" />
                        <div className="flex flex-col">
                          <span className="text-xs font-black">
                            {language === 'HA' ? path.title.ha : path.title.en}
                          </span>
                          <span className="text-[10px] font-semibold opacity-80">
                            {language === 'HA' ? path.goalName.ha : path.goalName.en}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="bg-[#2E7D32] hover:bg-[#256629] text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {language === 'HA' ? 'An Kammala' : 'Done'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
