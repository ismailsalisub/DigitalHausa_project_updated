import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dictionaryTerms } from '../data/dictionary';
import { Search, ChevronDown, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DictionaryView: React.FC = () => {
  const { language } = useApp();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');
  const [expandedTermId, setExpandedTermId] = useState<string | null>('algorithm'); // Default expand algorithm on startup

  const chips = [
    { id: 'all', labelHa: 'Duka', labelEn: 'All' },
    { id: 'Programming', labelHa: 'Programming', labelEn: 'Programming' },
    { id: 'Yanar Gizo', labelHa: 'Yanar Gizo', labelEn: 'Web' },
    { id: 'Ka\'idodi', labelHa: "Ka'idodi", labelEn: 'Rules' },
  ];

  const handleToggleAccordion = (termId: string) => {
    setExpandedTermId(prev => (prev === termId ? null : termId));
  };

  // Main filtering logic: Search query + category chip filter
  const filteredTerms = dictionaryTerms.filter(term => {
    const q = search.toLowerCase().trim();
    const matchesSearch = 
      term.english.toLowerCase().includes(q) || 
      term.hausaTranslation.toLowerCase().includes(q) ||
      term.definition.ha.toLowerCase().includes(q) ||
      term.definition.en.toLowerCase().includes(q);

    const matchesTag = activeTag === 'all' || term.tag === activeTag;

    return matchesSearch && matchesTag;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dict-workspace max-w-4xl mx-auto px-4 py-6 md:py-12"
    >
      <div className="dict-meta-tag text-[#2E7D32] text-xs font-black tracking-widest uppercase mb-1.5 text-center">
        {language === 'HA' ? '— KAMUSUN FASAHA' : '— TECHNICAL GLOSSARY'}
      </div>
      <h2 className="dict-main-title text-3xl font-black text-[#263238] tracking-tight mb-2 text-center">
        {language === 'HA' ? 'Ƙamus' : 'Dictionary'}
      </h2>
      <p className="dict-description text-sm leading-relaxed text-[#607D8B] mb-6 text-center max-w-md mx-auto">
        {language === 'HA' 
          ? 'Nemi kalmomin fasaha a Turanci da ma\'anarsu da Hausa.' 
          : 'Search technical terms in English and their meanings in Hausa.'}
      </p>

      {/* Dictionary Search Box */}
      <div className="search-box-wrapper relative w-full mb-4">
        <Search className="search-icon absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#607D8B] opacity-50" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === 'HA' ? "Bincika kalma..." : "Search terms..."}
          className="dict-search-input w-full pl-12 pr-4 py-3.5 bg-white border border-black/10 rounded-2xl text-sm font-semibold outline-none focus:border-[#2E7D32] shadow-[0_10px_30px_rgba(0,0,0,0.01)] transition-all"
        />
      </div>

      {/* Filter Chips carousel wrapper */}
      <div className="filter-chips-carousel flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {chips.map((chip) => {
          const isActive = activeTag === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveTag(chip.id)}
              className={`chip whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all cursor-pointer ${
                isActive 
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32]' 
                  : 'bg-white border border-black/5 text-[#263238] hover:bg-black/5'
              }`}
            >
              {language === 'HA' ? chip.labelHa : chip.labelEn}
            </button>
          );
        })}
      </div>

      {/* Results count indicator */}
      <div className="results-counter text-xs font-bold text-[#607D8B] mb-4 text-left px-1">
        <span className="count-num text-[#263238] mr-1">{filteredTerms.length}</span>
        <span>{language === 'HA' ? 'sakamako' : 'results'}</span>
      </div>

      {/* Terms list rendering */}
      <div className="dict-accordion-stack flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filteredTerms.map((term) => {
            const isExpanded = expandedTermId === term.id;
            return (
              <motion.div
                key={term.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`dict-card bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm transition-colors duration-200 ${
                  isExpanded ? 'border-[#2E7D32]/25' : ''
                }`}
              >
                <div 
                  onClick={() => handleToggleAccordion(term.id)}
                  className="dict-card-header flex items-center justify-between p-4 hover:bg-[#2E7D32]/3 transition-colors cursor-pointer select-none"
                >
                  <div className="header-left flex items-center gap-3">
                    <BookOpen className="term-book-icon w-4.5 h-4.5 text-[#2E7D32] opacity-80" />
                    <div className="term-title-block flex flex-col text-left">
                      <div className="term-english font-black text-sm text-[#263238] flex items-center gap-2">
                        <span>{term.english}</span>
                        <span className="term-tag text-[9px] font-bold bg-[#FAF9F6] border border-black/5 text-[#607D8B] px-2 py-0.5 rounded-full">
                          {term.tag}
                        </span>
                      </div>
                      <div className="term-hausa-translation font-extrabold text-xs text-[#2E7D32]">
                        {term.hausaTranslation}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`accordion-arrow w-4 h-4 text-[#607D8B] font-bold transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-dashed border-black/5"
                    >
                      <div className="dict-card-body p-4 pl-12 flex flex-col items-start text-left">
                        <div className="body-section-label text-[9px] font-extrabold text-[#607D8B] tracking-wider mb-1.5 uppercase">
                          {language === 'HA' ? 'MA\'ANA' : 'DEFINITION'}
                        </div>
                        <p className="definition-text text-xs leading-relaxed font-bold text-[#263238] mb-4">
                          {language === 'HA' ? term.definition.ha : term.definition.en}
                        </p>

                        <div className="body-section-label text-[9px] font-extrabold text-[#607D8B] tracking-wider mb-1.5 uppercase">
                          {language === 'HA' ? 'MISALI' : 'EXAMPLE'}
                        </div>
                        <div className="example-code-block bg-[#1e1e24] border border-black/5 rounded-xl px-4 py-3 w-full font-mono text-[11px] leading-relaxed text-white">
                          {language === 'HA' ? term.example.ha : term.example.en}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12 bg-white border border-black/5 border-dashed rounded-2xl">
            <p className="text-[#607D8B] font-semibold text-sm">
              {language === 'HA' ? 'Babu kalmomin da suka dace.' : 'No matching terms found.'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
