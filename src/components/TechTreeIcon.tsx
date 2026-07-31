import React from 'react';
import { 
  Code2, Palette, FileCode, Terminal, Globe, Server, 
  Monitor, MousePointer, Mail, Folder, Shield, 
  FileText, Table, Presentation, PenTool, Sparkles, 
  Printer, Layout, Brain, Film, Camera, Clapperboard, 
  Keyboard, Cpu, Layers
} from 'lucide-react';

interface TechTreeIconProps {
  subBranchId?: string;
  icon?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showLabel?: boolean;
}

export const TechTreeIcon: React.FC<TechTreeIconProps> = ({
  subBranchId,
  icon,
  size = 'md',
  className = '',
}) => {
  // Determine normalized target
  const key = (subBranchId || icon || '').toLowerCase();

  // Size mappings
  const sizeClasses = {
    xs: 'w-5 h-5 text-[10px] rounded-md',
    sm: 'w-6 h-6 text-xs rounded-lg',
    md: 'w-8 h-8 text-sm rounded-xl',
    lg: 'w-10 h-10 text-base rounded-2xl',
    xl: 'w-12 h-12 text-lg rounded-2xl'
  }[size];

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  }[size];

  // 1. HTML -> Logo badge with </ >
  if (key.includes('html') || icon === '</>') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#E34F26] text-white font-black tracking-tighter shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="HTML5">
        <span className="font-mono leading-none">&lt;/&gt;</span>
      </div>
    );
  }

  // 2. CSS -> Logo badge with {;}
  if (key.includes('css') || icon === '{;}') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#1572B6] text-white font-black tracking-tighter shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="CSS3">
        <span className="font-mono leading-none">&#123;;&#125;</span>
      </div>
    );
  }

  // 3. JavaScript -> Official JS badge style
  if (key.includes('javascript') || key.includes('js') || icon === 'JS') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#F7DF1E] text-black font-black tracking-tighter shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="JavaScript">
        <span className="font-sans leading-none font-extrabold">JS</span>
      </div>
    );
  }

  // 4. Python -> Official Python blue/gold style badge
  if (key.includes('python') || key === 'py' || icon === 'PY' || icon === '🐍') {
    return (
      <div className={`inline-flex items-center justify-center bg-gradient-to-br from-[#3776AB] to-[#1E415E] text-[#FFD43B] font-black tracking-tighter shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Python">
        <span className="font-mono leading-none font-black">Py</span>
      </div>
    );
  }

  // 5. Frontend
  if (key.includes('frontend') || key === 'web') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#2E7D32] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Frontend Development">
        <Code2 className={iconSizes} />
      </div>
    );
  }

  // 6. Backend
  if (key.includes('backend') || key === 'server') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#263238] text-[#81C784] font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Backend Development">
        <Server className={iconSizes} />
      </div>
    );
  }

  // 7. Computer Basics / Hardware
  if (key.includes('computer_basics') || key.includes('hardware') || key === 'pc') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#455A64] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Computer Basics">
        <Cpu className={iconSizes} />
      </div>
    );
  }

  // 8. Using Computer
  if (key.includes('using_computer') || key === 'mouse') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00838F] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Using a Computer">
        <MousePointer className={iconSizes} />
      </div>
    );
  }

  // 9. Internet
  if (key.includes('internet') || key === 'www') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#0288D1] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Internet">
        <Globe className={iconSizes} />
      </div>
    );
  }

  // 10. Email
  if (key.includes('email') || key === '@') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#EA4335] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Email">
        <Mail className={iconSizes} />
      </div>
    );
  }

  // 11. Files
  if (key.includes('files') || key === 'dir') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#F57C00] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Files & Folders">
        <Folder className={iconSizes} />
      </div>
    );
  }

  // 12. Typing
  if (key.includes('typing') || key === 'keys') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#6A1B9A] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Typing Skills">
        <Keyboard className={iconSizes} />
      </div>
    );
  }

  // 13. Digital Safety
  if (key.includes('safety') || key === 'shield') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#D32F2F] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Digital Safety">
        <Shield className={iconSizes} />
      </div>
    );
  }

  // 14. MS Word / Google Docs
  if (key.includes('word') || key.includes('docs') || key === 'doc') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#2B579A] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Word Processor">
        <FileText className={iconSizes} />
      </div>
    );
  }

  // 15. MS Excel / Google Sheets
  if (key.includes('excel') || key.includes('sheets') || key === 'xls') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#217346] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Spreadsheets">
        <Table className={iconSizes} />
      </div>
    );
  }

  // 16. MS PowerPoint / Google Slides
  if (key.includes('powerpoint') || key.includes('slides') || key === 'ppt') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#D24726] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Presentations">
        <Presentation className={iconSizes} />
      </div>
    );
  }

  // 17. CorelDRAW
  if (key.includes('coreldraw') || key === 'cdr') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00A859] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="CorelDRAW">
        <PenTool className={iconSizes} />
      </div>
    );
  }

  // 18. Canva
  if (key.includes('canva') || key === 'cv') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#00C4CC] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Canva">
        <Sparkles className={iconSizes} />
      </div>
    );
  }

  // 19. Printing
  if (key.includes('printing') || key === 'print') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#37474F] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Printing">
        <Printer className={iconSizes} />
      </div>
    );
  }

  // 20. Graphic Design
  if (key.includes('graphic_design') || key === 'art') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#8E24AA] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Graphic Design">
        <Palette className={iconSizes} />
      </div>
    );
  }

  // 21. UI Design
  if (key.includes('ui_design') || key === 'ui') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#3F51B5] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="UI Design">
        <Layout className={iconSizes} />
      </div>
    );
  }

  // 22. UX Design
  if (key.includes('ux_design') || key === 'ux') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#009688] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="UX Design">
        <Brain className={iconSizes} />
      </div>
    );
  }

  // 23. Video Editing
  if (key.includes('video') || key === 'vid') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#E53935] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Video Editing">
        <Film className={iconSizes} />
      </div>
    );
  }

  // 24. Photography
  if (key.includes('photo') || key === 'cam') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#37474F] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Photography">
        <Camera className={iconSizes} />
      </div>
    );
  }

  // 25. Animation
  if (key.includes('animation') || key === 'anim') {
    return (
      <div className={`inline-flex items-center justify-center bg-[#FF8F00] text-white font-bold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`} title="Animation">
        <Clapperboard className={iconSizes} />
      </div>
    );
  }

  // Fallback: Default code/layers icon
  if (icon && icon.length <= 4) {
    return (
      <div className={`inline-flex items-center justify-center bg-[#2E7D32] text-white font-extrabold shadow-xs shrink-0 select-none ${sizeClasses} ${className}`}>
        <span>{icon}</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center bg-[#2E7D32]/10 text-[#2E7D32] font-bold border border-[#2E7D32]/20 shadow-xs shrink-0 select-none ${sizeClasses} ${className}`}>
      {icon ? <span className="text-base">{icon}</span> : <Layers className={iconSizes} />}
    </div>
  );
};
