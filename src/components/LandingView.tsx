import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { treeBranches } from '../data/tree';
import { lessonsData } from '../data/lessons';
import { dictionaryTerms } from '../data/dictionary';
import { TreeSubBranch } from '../types';
import { TechTreeIcon } from './TechTreeIcon';
import { 
  Search, Monitor, Globe, Mail, Folder, FileText, 
  BarChart3, Tv, Printer, FileCode, Palette, Cpu, Terminal,
  Compass, ArrowRight, ShieldCheck, TreePine, TrendingUp, Lightbulb, Sparkles,
  X, CheckCircle2, Play, Lock, BookOpen, GraduationCap, Layers, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import foundationVectorImg from '../assets/images/foundation_vector_1784697670205.jpg';
import officeVectorImg from '../assets/images/office_vector_1784697682879.jpg';
import programmingVectorImg from '../assets/images/programming_vector_1784697694312.jpg';
import heroTechVectorImg from '../assets/images/hero_tech_vector_1784697708166.jpg';

import computerBasicsImg from '../assets/images/computer_basics_vector_1784699007583.jpg';
import internetImg from '../assets/images/internet_vector_1784699020306.jpg';
import emailImg from '../assets/images/email_vector_1784699033325.jpg';
import filesFoldersImg from '../assets/images/files_folders_vector_1784699045062.jpg';
import wordImg from '../assets/images/word_vector_1784699062379.jpg';
import excelImg from '../assets/images/excel_vector_1784699072226.jpg';
import powerpointImg from '../assets/images/powerpoint_vector_1784699083369.jpg';
import gdocsImg from '../assets/images/gdocs_vector_1784699095362.jpg';
import htmlImg from '../assets/images/html_vector_1784699110383.jpg';
import cssImg from '../assets/images/css_vector_1784699120832.jpg';
import jsImg from '../assets/images/js_vector_1784699130731.jpg';
import pythonImg from '../assets/images/python_vector_1784699142114.jpg';

export const LandingView: React.FC = () => {
  const { language, user, setRoute } = useApp();
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'lesson' | 'dictionary' | 'path'>('all');
  const [selectedSubBranchModal, setSelectedSubBranchModal] = useState<TreeSubBranch | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const completedIds = user ? user.completedLessonIds : [];

  const query = search.trim().toLowerCase();

  const universalSearchResults = useMemo(() => {
    if (!query) return [];

    const results: Array<{
      id: string;
      type: 'lesson' | 'dictionary' | 'path';
      typeLabel: { ha: string; en: string };
      typeIcon: React.FC<{ className?: string }>;
      badgeClass: string;
      title: { ha: string; en: string };
      snippet?: { ha: string; en: string };
      breadcrumbs: Array<{ ha: string; en: string }>;
      onClick: () => void;
    }> = [];

    // 1. Search Lessons in lessonsData
    lessonsData.forEach((lesson) => {
      const titleHa = lesson.title.ha.toLowerCase();
      const titleEn = lesson.title.en.toLowerCase();
      const topicHa = lesson.topicTitle?.ha.toLowerCase() || '';
      const topicEn = lesson.topicTitle?.en.toLowerCase() || '';
      const metaHa = lesson.metaBadge?.ha.toLowerCase() || '';
      const metaEn = lesson.metaBadge?.en.toLowerCase() || '';
      const paragraphHa = lesson.paragraphs.map(p => p.ha).join(' ').toLowerCase();
      const paragraphEn = lesson.paragraphs.map(p => p.en).join(' ').toLowerCase();

      if (
        titleHa.includes(query) || titleEn.includes(query) ||
        topicHa.includes(query) || topicEn.includes(query) ||
        metaHa.includes(query) || metaEn.includes(query) ||
        paragraphHa.includes(query) || paragraphEn.includes(query)
      ) {
        // Resolve breadcrumbs in treeBranches
        let branchCrumb = { ha: 'Bishiyar Ilimi', en: 'Knowledge Tree' };
        let subBranchCrumb: { ha: string; en: string } | null = null;

        for (const b of treeBranches) {
          for (const sb of b.subBranches) {
            const hasLeaf = sb.leaves.some(l => l.lessonId === lesson.id);
            if (hasLeaf) {
              branchCrumb = { ha: b.title.ha, en: b.title.en };
              subBranchCrumb = { ha: sb.title.ha, en: sb.title.en };
              break;
            }
          }
          if (subBranchCrumb) break;
        }

        const crumbs: Array<{ ha: string; en: string }> = [
          { ha: 'Kurssuna', en: 'Lessons' },
          branchCrumb
        ];
        if (subBranchCrumb) crumbs.push(subBranchCrumb);

        const matchP = lesson.paragraphs.find(p => p.ha.toLowerCase().includes(query) || p.en.toLowerCase().includes(query));
        const snippetHa = matchP ? (matchP.ha.length > 90 ? matchP.ha.substring(0, 90) + '...' : matchP.ha) : (lesson.topicTitle?.ha || '');
        const snippetEn = matchP ? (matchP.en.length > 90 ? matchP.en.substring(0, 90) + '...' : matchP.en) : (lesson.topicTitle?.en || '');

        results.push({
          id: `lesson_${lesson.id}`,
          type: 'lesson',
          typeLabel: { ha: 'Darasi', en: 'Lesson' },
          typeIcon: GraduationCap,
          badgeClass: 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/30',
          title: lesson.title,
          snippet: { ha: snippetHa, en: snippetEn },
          breadcrumbs: crumbs,
          onClick: () => setRoute(lesson.id)
        });
      }
    });

    // 2. Search Dictionary Terms in dictionaryTerms
    dictionaryTerms.forEach((term) => {
      const eng = term.english.toLowerCase();
      const hausaTrans = term.hausaTranslation.toLowerCase();
      const tag = term.tag.toLowerCase();
      const defHa = term.definition.ha.toLowerCase();
      const defEn = term.definition.en.toLowerCase();

      if (
        eng.includes(query) || hausaTrans.includes(query) ||
        tag.includes(query) || defHa.includes(query) || defEn.includes(query)
      ) {
        results.push({
          id: `dict_${term.id}`,
          type: 'dictionary',
          typeLabel: { ha: 'Ƙamus', en: 'Dictionary' },
          typeIcon: BookOpen,
          badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
          title: {
            ha: `${term.english} (${term.hausaTranslation})`,
            en: `${term.english} — ${term.hausaTranslation}`
          },
          snippet: term.definition,
          breadcrumbs: [
            { ha: 'Ƙamus na Fasaha', en: 'Dictionary' },
            { ha: term.tag, en: term.tag },
            { ha: term.english, en: term.english }
          ],
          onClick: () => setRoute('dictionary')
        });
      }
    });

    // 3. Search Paths and SubBranches in treeBranches
    treeBranches.forEach((branch) => {
      branch.subBranches.forEach((subBranch) => {
        const sbHa = subBranch.title.ha.toLowerCase();
        const sbEn = subBranch.title.en.toLowerCase();
        const bHa = branch.title.ha.toLowerCase();
        const bEn = branch.title.en.toLowerCase();

        const leafMatches = subBranch.leaves.some(l => 
          l.title.ha.toLowerCase().includes(query) || 
          l.title.en.toLowerCase().includes(query)
        );

        if (sbHa.includes(query) || sbEn.includes(query) || bHa.includes(query) || bEn.includes(query) || leafMatches) {
          results.push({
            id: `subbranch_${subBranch.id}`,
            type: 'path',
            typeLabel: { ha: 'Hanyar Koyo', en: 'Learning Path' },
            typeIcon: Compass,
            badgeClass: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
            title: subBranch.title,
            snippet: {
              ha: `Darussa ${subBranch.leaves.length} karkashin ${branch.title.ha}`,
              en: `${subBranch.leaves.length} modules under ${branch.title.en}`
            },
            breadcrumbs: [
              { ha: 'Bishiyar Ilimi', en: 'Knowledge Tree' },
              branch.title,
              subBranch.title
            ],
            onClick: () => setSelectedSubBranchModal(subBranch)
          });
        }
      });
    });

    return results;
  }, [query]);

  const filteredSearchResults = useMemo(() => {
    if (searchFilter === 'all') return universalSearchResults;
    return universalSearchResults.filter(r => r.type === searchFilter);
  }, [universalSearchResults, searchFilter]);

  const lessonCount = useMemo(() => universalSearchResults.filter(r => r.type === 'lesson').length, [universalSearchResults]);
  const dictionaryCount = useMemo(() => universalSearchResults.filter(r => r.type === 'dictionary').length, [universalSearchResults]);
  const pathCount = useMemo(() => universalSearchResults.filter(r => r.type === 'path').length, [universalSearchResults]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const findSubBranch = (subBranchId?: string) => {
    if (!subBranchId) return null;
    for (const branch of treeBranches) {
      const found = branch.subBranches.find(sb => sb.id === subBranchId);
      if (found) return found;
    }
    return null;
  };

  const handleExploreCategory = (categoryId: string) => {
    localStorage.setItem('digitalhausa_expanded_branches', JSON.stringify([categoryId]));
    sessionStorage.setItem('digitalhausa_scroll_to_branch', categoryId);
    setRoute('learn');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Static structure of categories and lessons for the homepage paths
  const categories = [
    {
      id: 'foundation',
      titleHa: '🌱 Foundation',
      titleEn: '🌱 Foundation',
      taglineHa: '"Gina Tubalin Ilimi"',
      taglineEn: '"Building the Foundation of Knowledge"',
      illustrationImg: foundationVectorImg,
      subcards: [
        { titleHa: "Ka'idodin Kwamfuta", titleEn: 'Computer Basics', icon: Monitor, meta: '24 Lessons • Beginner', illustrationImg: computerBasicsImg, subBranchId: 'computer_basics' },
        { titleHa: 'Intanet', titleEn: 'Internet', icon: Globe, meta: '16 Lessons • Beginner', illustrationImg: internetImg, subBranchId: 'internet' },
        { titleHa: 'Imel (Email)', titleEn: 'Email', icon: Mail, meta: '12 Lessons • Beginner', illustrationImg: emailImg, subBranchId: 'email' },
        { titleHa: "Fayiloli & Juzu'u", titleEn: 'Files & Folders', icon: Folder, meta: '18 Lessons • Beginner', illustrationImg: filesFoldersImg, subBranchId: 'files' },
      ],
      exploreTextHa: 'Duba Foundation →',
      exploreTextEn: 'Explore Foundation →',
    },
    {
      id: 'office',
      titleHa: '💼 Office & Work',
      titleEn: '💼 Office & Work',
      taglineHa: '"Fasahohin Aiki na Zamani"',
      taglineEn: '"Modern Work Skills"',
      illustrationImg: officeVectorImg,
      subcards: [
        { titleHa: 'Microsoft Word', titleEn: 'Microsoft Word', icon: FileText, meta: 'Word Processing', illustrationImg: wordImg, subBranchId: 'ms_word' },
        { titleHa: 'Microsoft Excel', titleEn: 'Microsoft Excel', icon: BarChart3, meta: 'Spreadsheets', illustrationImg: excelImg, subBranchId: 'ms_excel' },
        { titleHa: 'Microsoft PowerPoint', titleEn: 'PowerPoint', icon: Tv, meta: 'Presentations', illustrationImg: powerpointImg, subBranchId: 'ms_powerpoint' },
        { titleHa: 'Google Docs & Sheets', titleEn: 'Google Docs & Sheets', icon: Printer, meta: 'Cloud Tools', illustrationImg: gdocsImg, subBranchId: 'google_docs' },
        { titleHa: 'CorelDRAW & Canva', titleEn: 'CorelDRAW & Canva', icon: Palette, meta: 'Graphic Design', illustrationImg: officeVectorImg, subBranchId: 'canva' },
        { titleHa: 'Bugu & Takardu', titleEn: 'Printing & Doc Prep', icon: Printer, meta: 'Printing & PDF', illustrationImg: officeVectorImg, subBranchId: 'printing_doc_prep' },
      ],
      exploreTextHa: 'Duba Office & Work →',
      exploreTextEn: 'Explore Office & Work →',
    },
    {
      id: 'programming',
      titleHa: '💻 Programming',
      titleEn: '💻 Programming',
      taglineHa: '"Gina Manhajoji da Lamba"',
      taglineEn: '"Building Software with Code"',
      illustrationImg: programmingVectorImg,
      subcards: [
        { titleHa: 'HTML', titleEn: 'HTML', icon: FileCode, meta: '34 Lessons • Beginner', highlight: true, illustrationImg: htmlImg, subBranchId: 'html' },
        { titleHa: 'CSS', titleEn: 'CSS', icon: Palette, meta: '27 Lessons • Beginner', illustrationImg: cssImg, subBranchId: 'css' },
        { titleHa: 'JavaScript', titleEn: 'JavaScript', icon: Cpu, meta: '61 Lessons • Intermediate', illustrationImg: jsImg, subBranchId: 'javascript' },
        { titleHa: 'Python', titleEn: 'Python', icon: Terminal, meta: '45 Lessons • Beginner', illustrationImg: pythonImg, subBranchId: 'python' },
      ],
      exploreTextHa: 'Fara Koyon Programming →',
      exploreTextEn: 'Explore Programming →',
    },
    {
      id: 'creative',
      titleHa: '🎨 Creative Skills',
      titleEn: '🎨 Creative Skills',
      taglineHa: '"Ado, Zane, da Fasaha na Zamani"',
      taglineEn: '"Design, Media & Visual Arts"',
      illustrationImg: officeVectorImg,
      subcards: [
        { titleHa: 'Graphic Design', titleEn: 'Graphic Design', icon: Palette, meta: 'Visual Arts', illustrationImg: officeVectorImg, subBranchId: 'graphic_design' },
        { titleHa: 'CorelDRAW & Canva', titleEn: 'CorelDRAW & Canva', icon: Sparkles, meta: 'Design Tools', illustrationImg: officeVectorImg, subBranchId: 'canva' },
        { titleHa: 'UI / UX Design', titleEn: 'UI / UX Design', icon: Monitor, meta: 'Digital Product Design', illustrationImg: officeVectorImg, subBranchId: 'ui_design' },
        { titleHa: 'Video & Animation', titleEn: 'Video & Animation', icon: Tv, meta: 'Video Editing & Motion', illustrationImg: officeVectorImg, subBranchId: 'video_editing' },
        { titleHa: 'Photography', titleEn: 'Photography', icon: Sparkles, meta: 'Camera & Editing', illustrationImg: officeVectorImg, subBranchId: 'photography' },
      ],
      exploreTextHa: 'Duba Creative Skills →',
      exploreTextEn: 'Explore Creative Skills →',
    }
  ];

  // Filtering based on search query
  const filteredCategories = categories.filter(category => {
    const q = search.toLowerCase().trim();
    if (!q) return true;

    // Matches category titles/taglines or any of the subcard titles
    const matchesHeader = 
      category.titleHa.toLowerCase().includes(q) || 
      category.titleEn.toLowerCase().includes(q) ||
      category.taglineHa.toLowerCase().includes(q) ||
      category.taglineEn.toLowerCase().includes(q);

    const matchesSubcard = category.subcards.some(card => 
      card.titleHa.toLowerCase().includes(q) || 
      card.titleEn.toLowerCase().includes(q)
    );

    return matchesHeader || matchesSubcard;
  });

  const journeySteps = [
    { num: 1, ha: 'Zabi Burin Koyo', en: 'Choose Goal' },
    { num: 2, ha: 'Koyi Darasi', en: 'Learn' },
    { num: 3, ha: 'Yi Gwaji (Practice)', en: 'Practice' },
    { num: 4, ha: 'Binciken Fahimta', en: 'Quick Check' },
    { num: 5, ha: 'Amsa Tambayoyi (Quiz)', en: 'Quiz' },
    { num: 6, ha: 'Maimaitawa', en: 'Review' },
    { num: 7, ha: 'Kwarewa (Master)', en: 'Master' },
  ];

  const whyCards = [
    {
      icon: '🇭🇦',
      titleHa: 'Hausa Na Fari',
      titleEn: 'Hausa First',
      descHa: 'Koyi fasaha cikin sauki ta amfani da yarenka na haihuwa.',
      descEn: 'Learn technology easily using your native mother tongue.'
    },
    {
      icon: TreePine,
      titleHa: 'Bishiyar Ilimi',
      titleEn: 'Knowledge Tree',
      descHa: 'Komai yana da alaka da juna. Koyi FROM matakin farko zuwa gaba.',
      descEn: 'Everything is connected. Learn from first principles step-by-step.'
    },
    {
      icon: TrendingUp,
      titleHa: 'Bibiyar Ci Gaba',
      titleEn: 'Track Progress',
      descHa: 'San ainihin inda ka tsaya da kuma abin da ya rage maka ka koya.',
      descEn: 'Know exactly where you left off and what is left for you to learn.'
    },
    {
      icon: Lightbulb,
      titleHa: 'Fahimta Kafin Hadda',
      titleEn: 'Learn by Understanding',
      descHa: 'Muna koyar da tushen yadda abubuwa ke aiki maimakon hadda lamba.',
      descEn: 'We teach the fundamentals of how concepts work instead of raw memorization.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="main-content max-w-6xl mx-auto px-4 py-6 md:py-12"
    >
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-12 md:mb-16">
        <div className="md:col-span-7 flex flex-col items-start text-left">
          <span className="hero-badge text-[#C99700] text-xs font-bold tracking-widest uppercase mb-3">
            {language === 'HA' ? '— Koyon Fasahan Zamani' : '— Modern Tech Education'}
          </span>
          
          <h1 className="hero-title text-3xl md:text-5xl font-extrabold text-[#263238] leading-tight mb-4 tracking-tight">
            {language === 'HA' ? 'Koyi da Kanka' : 'Learn by Yourself'}
          </h1>
          
          <p className="hero-description text-base text-[#607D8B] max-w-xl mb-8 leading-relaxed">
            {language === 'HA' 
              ? 'A cikin harshen Hausa da Ingilishi. Daga farkon kwamfuta har zuwa gina manhajoji na zamani.' 
              : 'In Hausa and English. From computer basics to building modern applications.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setRoute('learn')}
              className="btn-primary w-full sm:w-auto bg-[#2E7D32] hover:bg-[#225C25] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(46,125,50,0.2)] transition-all cursor-pointer"
            >
              {language === 'HA' ? '🚀 Fara Koyawa' : '🚀 Start Learning'}
            </button>
            <button 
              onClick={() => setRoute('learn')}
              className="btn-secondary w-full sm:w-auto bg-white hover:bg-black/5 text-[#263238] border border-black/15 px-8 py-3.5 rounded-full font-bold text-sm transition-all cursor-pointer"
            >
              {language === 'HA' ? '📚 Duba Kurssuna' : '📚 Browse Lessons'}
            </button>
          </div>
        </div>

        {/* Hero Visual Column */}
        <div className="md:col-span-5 flex justify-center">
          <div className="visual-card relative bg-white border border-black/5 rounded-3xl p-4 w-full max-w-sm shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-center items-center">
            <div className="ambient-glow absolute inset-0 bg-gradient-to-br from-[#2E7D32]/5 to-[#C99700]/3" />
            <div className="visual-content relative w-full text-center z-10 flex flex-col items-center">
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-black/5 shadow-sm">
                <img 
                  src={heroTechVectorImg} 
                  alt="Digital Hausa Tech Education Vector Illustration"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="tag-row flex gap-2 justify-center">
                <span className="tech-tag bg-[#FAF9F6] border border-black/5 px-3 py-1 rounded-md text-xs font-semibold text-[#263238]">HTML</span>
                <span className="tech-tag bg-[#FAF9F6] border border-black/5 px-3 py-1 rounded-md text-xs font-semibold text-[#263238]">Excel</span>
                <span className="tech-tag bg-[#FAF9F6] border border-black/5 px-3 py-1 rounded-md text-xs font-semibold text-[#263238]">Python</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universal Search Section */}
      <section className="search-section max-w-4xl mx-auto mb-12 md:mb-16">
        <div className="search-wrapper relative flex items-center mb-4">
          <Search className="search-icon absolute left-4 text-[#607D8B] w-5 h-5 pointer-events-none" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'HA' ? "Nemi komai a cikin manhajar: darussa, ƙamus, hanyoyin koyo..." : "Search everything: lessons, dictionary, learning paths..."}
            className="w-full pl-12 pr-12 py-4 bg-white border border-black/10 rounded-2xl text-sm font-semibold outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 text-[#607D8B] hover:text-[#263238] p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              title={language === 'HA' ? 'Goge neman' : 'Clear search'}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Live Universal Search Results Container */}
        <AnimatePresence>
          {query.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-black/10 rounded-3xl p-5 shadow-lg flex flex-col gap-4 text-left"
            >
              {/* Filter Pills & Summary Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-3">
                <div className="text-xs font-bold text-[#607D8B]">
                  {language === 'HA' ? (
                    <span>An samu sakamako <strong className="text-[#263238] font-black">{universalSearchResults.length}</strong> na &quot;{search}&quot;</span>
                  ) : (
                    <span>Found <strong className="text-[#263238] font-black">{universalSearchResults.length}</strong> results for &quot;{search}&quot;</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSearchFilter('all')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      searchFilter === 'all'
                        ? 'bg-[#263238] text-white shadow-xs'
                        : 'bg-black/5 text-[#607D8B] hover:bg-black/10'
                    }`}
                  >
                    {language === 'HA' ? `Duka (${universalSearchResults.length})` : `All (${universalSearchResults.length})`}
                  </button>
                  <button
                    onClick={() => setSearchFilter('lesson')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      searchFilter === 'lesson'
                        ? 'bg-[#2E7D32] text-white shadow-xs'
                        : 'bg-[#2E7D32]/10 text-[#2E7D32] hover:bg-[#2E7D32]/20'
                    }`}
                  >
                    <span>📚</span>
                    <span>{language === 'HA' ? `Darussa (${lessonCount})` : `Lessons (${lessonCount})`}</span>
                  </button>
                  <button
                    onClick={() => setSearchFilter('dictionary')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      searchFilter === 'dictionary'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20'
                    }`}
                  >
                    <span>📖</span>
                    <span>{language === 'HA' ? `Ƙamus (${dictionaryCount})` : `Dictionary (${dictionaryCount})`}</span>
                  </button>
                  <button
                    onClick={() => setSearchFilter('path')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      searchFilter === 'path'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-blue-500/10 text-blue-800 dark:text-blue-300 hover:bg-blue-500/20'
                    }`}
                  >
                    <span>🌿</span>
                    <span>{language === 'HA' ? `Hanyoyi (${pathCount})` : `Paths (${pathCount})`}</span>
                  </button>
                </div>
              </div>

              {/* Results List */}
              {filteredSearchResults.length > 0 ? (
                <div className="flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {filteredSearchResults.map((result) => {
                    const TypeIcon = result.typeIcon;
                    return (
                      <div
                        key={result.id}
                        onClick={result.onClick}
                        className="p-4 rounded-2xl border border-black/5 hover:border-[#2E7D32]/40 bg-[#FAF9F6] hover:bg-white transition-all cursor-pointer group flex flex-col gap-2 relative shadow-2xs"
                      >
                        {/* Header Row: Type Badge + Breadcrumbs */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${result.badgeClass}`}>
                            <TypeIcon className="w-3 h-3" />
                            <span>{language === 'HA' ? result.typeLabel.ha : result.typeLabel.en}</span>
                          </span>

                          {/* Breadcrumb Trail */}
                          <div className="flex items-center gap-1 flex-wrap text-[11px] font-semibold text-[#607D8B]">
                            {result.breadcrumbs.map((crumb, idx) => (
                              <React.Fragment key={idx}>
                                {idx > 0 && <ChevronRight className="w-3 h-3 text-black/30 shrink-0" />}
                                <span className={idx === result.breadcrumbs.length - 1 ? 'font-bold text-[#263238]' : 'opacity-80'}>
                                  {language === 'HA' ? crumb.ha : crumb.en}
                                </span>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        {/* Result Title & Snippet */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-0.5">
                            <h4 className="text-sm font-extrabold text-[#263238] group-hover:text-[#2E7D32] transition-colors">
                              {language === 'HA' ? result.title.ha : result.title.en}
                            </h4>
                            {result.snippet && (
                              <p className="text-xs text-[#607D8B] font-medium leading-relaxed line-clamp-2">
                                {language === 'HA' ? result.snippet.ha : result.snippet.en}
                              </p>
                            )}
                          </div>

                          <div className="w-8 h-8 rounded-full bg-white border border-black/5 flex items-center justify-center shrink-0 text-[#607D8B] group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-2xl mb-3">
                    🔍
                  </div>
                  <h4 className="text-sm font-black text-[#263238] mb-1">
                    {language === 'HA' ? 'Babu sakamako' : 'No matching results'}
                  </h4>
                  <p className="text-xs text-[#607D8B] max-w-sm">
                    {language === 'HA' 
                      ? `Muna ba da shawara ka gwada neman kalma guda daya kamar "HTML", "RAM", ko "Kwamfuta".`
                      : `Try searching for a single term like "HTML", "RAM", or "Computer".`}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Tracks Section */}
      <section className="mb-16">
        <div className="section-header text-center mb-10 flex flex-col items-center">
          <span className="section-badge bg-[#2E7D32]/5 text-[#2E7D32] text-[10px] font-bold tracking-widest px-3 py-1 rounded-md uppercase mb-3">
            {language === 'HA' ? '— FARA DAGA NAN' : '— START HERE'}
          </span>
          <h2 className="text-2xl font-extrabold text-[#263238] mb-2 tracking-tight">
            {language === 'HA' ? 'Hanyar Koyonka' : 'Your Learning Paths'}
          </h2>
          <p className="text-sm text-[#607D8B] max-w-lg">
            {language === 'HA' 
              ? 'Duba matakan koyo daga farko har zuwa kwarewa. Danna kowane hoton don fara.' 
              : 'Check your learning paths from basics up to expertise. Click any card to begin.'}
          </p>
        </div>

        {/* Dynamic Category Render */}
        <div className="flex flex-col gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="category-block bg-white border border-black/5 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all overflow-hidden"
              >
                {/* Header section with Vector Illustration side banner */}
                <div 
                  onClick={() => handleExploreCategory(category.id)}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6 cursor-pointer group"
                >
                  <div className="md:col-span-8 flex flex-col items-start text-left">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2E7D32] bg-[#2E7D32]/10 px-2.5 py-0.5 rounded-full mb-2">
                      {language === 'HA' ? 'Tafarkin Koyo' : 'Learning Path'}
                    </span>
                    <h3 className="category-name text-xl md:text-2xl font-extrabold text-[#263238] group-hover:text-[#2E7D32] transition-colors">
                      {language === 'HA' ? category.titleHa : category.titleEn}
                    </h3>
                    <p className="category-tagline text-xs font-semibold text-[#607D8B] italic mt-1">
                      {language === 'HA' ? category.taglineHa : category.taglineEn}
                    </p>
                  </div>

                  <div className="md:col-span-4 w-full h-36 md:h-28 rounded-2xl overflow-hidden border border-black/5 shadow-sm bg-[#FAF9F6] shrink-0">
                    <img 
                      src={category.illustrationImg} 
                      alt={`${category.titleEn} Vector Illustration`}
                      className="category-illustration-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="sub-cards-grid grid grid-cols-2 md:grid-cols-4 gap-3 mb-0">
                  {category.subcards.map((card, index) => {
                    const CardIcon = card.icon;
                    return (
                      <div 
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          const found = findSubBranch(card.subBranchId);
                          if (found) {
                            setSelectedSubBranchModal(found);
                          } else {
                            handleExploreCategory(category.id);
                          }
                        }}
                        className={`sub-card border rounded-2xl p-0 overflow-hidden flex flex-col items-start text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 hover:scale-[1.03] cursor-pointer group ${
                          card.highlight 
                            ? 'bg-[#2E7D32]/5 border-[#2E7D32]/30' 
                            : 'bg-[#FAF9F6] border-black/5 hover:border-black/20'
                        }`}
                      >
                        {/* Vector Illustration Thumbnail Header */}
                        <div className="w-full h-24 sm:h-28 bg-white relative shrink-0 border-b border-black/5 overflow-hidden">
                          <img 
                            src={card.illustrationImg} 
                            alt={card.titleEn}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 z-10">
                            <TechTreeIcon subBranchId={card.subBranchId} size="xs" />
                          </div>
                        </div>

                        <div className="p-2.5 w-full">
                          <h4 className="sub-card-title text-xs font-bold text-[#263238] line-clamp-1">
                            {language === 'HA' ? card.titleHa : card.titleEn}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExploreCategory(category.id);
                    }}
                    className={`explore-link text-xs font-extrabold flex items-center gap-1 cursor-pointer hover:underline ${
                      category.id === 'programming' ? 'text-[#2E7D32]' : 'text-[#C99700]'
                    }`}
                  >
                    {language === 'HA' ? category.exploreTextHa : category.exploreTextEn}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 bg-white border border-black/5 border-dashed rounded-3xl">
              <p className="text-[#607D8B] font-semibold text-sm">
                {language === 'HA' ? 'Babu darussan da suka dace.' : 'No matching learning paths found.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How Learning Works Section */}
      <section className="journey-section py-8 mb-12">
        <div className="section-header text-center mb-10 flex flex-col items-center">
          <span className="section-badge bg-[#2E7D32]/5 text-[#2E7D32] text-[10px] font-bold tracking-widest px-3 py-1 rounded-md uppercase mb-3">
            {language === 'HA' ? '— TSARIN KOYI' : '— LEARNING SYSTEM'}
          </span>
          <h2 className="text-2xl font-extrabold text-[#263238] tracking-tight">
            {language === 'HA' ? 'Yadda Tsarin Yake' : 'How Learning Works'}
          </h2>
        </div>

        {/* Steps Flow list */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap max-w-4xl mx-auto">
          {journeySteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="journey-step bg-white border border-black/5 p-4 rounded-2xl flex items-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.01)] min-w-[200px]">
                <div className="step-number w-7 h-7 bg-[#2E7D32] text-white rounded-full flex items-center justify-center font-bold text-xs">
                  {step.num}
                </div>
                <h4 className="text-xs font-bold text-[#263238]">
                  {language === 'HA' ? step.ha : step.en}
                </h4>
              </div>
              {idx < journeySteps.length - 1 && (
                <div className="flow-line hidden md:block w-4 h-0.5 bg-[#2E7D32]/30" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Why DigitalHausa Section */}
      <section className="why-section py-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="why-card bg-white border border-black/5 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.01)] text-left flex flex-col items-start">
                <div className="text-3xl mb-4 text-[#2E7D32]">
                  {typeof Icon === 'string' ? (
                    <span className="select-none">{Icon}</span>
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </div>
                <h3 className="text-sm font-extrabold text-[#263238] mb-2 tracking-tight">
                  {language === 'HA' ? card.titleHa : card.titleEn}
                </h3>
                <p className="text-xs font-semibold leading-relaxed text-[#607D8B]">
                  {language === 'HA' ? card.descHa : card.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="bg-[#1E5235] text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden mb-12 shadow-[0_20px_50px_rgba(30,82,53,0.15)]">
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent pointer-events-none" />
        <h2 className="text-xl md:text-3xl font-extrabold tracking-tight mb-3">
          {language === 'HA' ? 'Fara Tafiyar Koyonka Yau' : 'Start Your Learning Journey Today'}
        </h2>
        <p className="text-xs md:text-sm font-semibold opacity-90 max-w-md mx-auto mb-8">
          {language === 'HA' 
            ? 'Shiga cikin dubban masu koyon da suka riga suka fara.' 
            : 'Join thousands of learners who have already started.'}
        </p>
        <button 
          onClick={() => setRoute('profile')}
          className="btn-cta-footer bg-white text-[#1E5235] font-extrabold text-sm px-8 py-3 rounded-full hover:scale-105 active:scale-95 shadow-md transition-all cursor-pointer"
        >
          {language === 'HA' ? 'Yi Rajista a Kyauta' : 'Register for Free'}
        </button>
      </section>

      {/* Main Footer Links */}
      <footer className="border-t border-black/5 pt-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-left">
          <div className="footer-column flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#263238]">
              {language === 'HA' ? 'Dandalin' : 'Platform'}
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button onClick={() => setRoute('learn')} className="text-xs font-semibold text-[#607D8B] hover:text-[#2E7D32]">
                  {language === 'HA' ? 'Kurssuna' : 'Lessons'}
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('learn')} className="text-xs font-semibold text-[#607D8B] hover:text-[#2E7D32]">
                  {language === 'HA' ? 'Hanyar Koyo' : 'Learning Paths'}
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('dictionary')} className="text-xs font-semibold text-[#607D8B] hover:text-[#2E7D32]">
                  {language === 'HA' ? 'Kamus' : 'Almanac'}
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-column flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#263238]">
              {language === 'HA' ? "Al'umma" : 'Community'}
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#" className="text-xs font-semibold text-[#607D8B] hover:text-[#2E7D32]">
                  {language === 'HA' ? 'Taimako' : 'Help & Support'}
                </a>
              </li>
              <li>
                <a href="#" className="text-xs font-semibold text-[#607D8B] hover:text-[#2E7D32]">
                  {language === 'HA' ? 'Shawarwari' : 'Feedback'}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#263238]">
              {language === 'HA' ? 'Koyo' : 'Learning'}
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button onClick={() => setRoute('learn')} className="text-xs font-semibold text-[#607D8B] hover:text-[#2E7D32]">
                  {language === 'HA' ? "Ka'idodin Kwamfuta" : 'Computer Basics'}
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('learn')} className="text-xs font-semibold text-[#607D8B] hover:text-[#2E7D32]">
                  Programming
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-column flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#263238]">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#" className="text-xs font-semibold text-[#607D8B] hover:text-[#2E7D32]">
                  {language === 'HA' ? 'Sharuddan Aiki' : 'Terms of Service'}
                </a>
              </li>
              <li>
                <a href="#" className="text-xs font-semibold text-[#607D8B] hover:text-[#2E7D32]">
                  {language === 'HA' ? 'Tsare Sirri' : 'Privacy Policy'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-black/5 pt-6">
          <div className="footer-logo flex items-center gap-1.5 select-none">
            <span className="logo-icon text-xl">🎓</span>
            <span className="logo-text font-extrabold text-sm text-[#1E5235] tracking-widest uppercase">
              DIGITALHAUSA
            </span>
          </div>
          <p className="copyright-text text-xs text-[#607D8B] font-semibold">
            © 2026 DigitalHausa. {language === 'HA' ? 'Duk hakkin da aka kare.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>

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

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-[#263238] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-[#C99700]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
