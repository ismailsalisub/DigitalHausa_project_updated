export interface LocalizedString {
  ha: string;
  en: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role: 'student' | 'guest';
  streakDays: number;
  completedLessonIds: string[];
  lessonsCompleted: number;
  pathCompletionPct: number;
  xpPerLesson: number;
  selectedPathIds?: string[];
  primaryGoalId?: string;
}

export interface QuizOption {
  marker: string;
  label: LocalizedString;
  isCorrect: boolean;
}

export interface Quiz {
  question: LocalizedString;
  options: QuizOption[];
}

export interface LessonExplanation {
  term: string;
  ha: string;
  en: string;
}

export interface CodeExample {
  header: string;
  code: string;
}

export interface Lesson {
  id: string;
  title: LocalizedString;
  metaBadge: LocalizedString;
  topicTitle: LocalizedString;
  paragraphs: LocalizedString[];
  codeExample: CodeExample;
  explanationsHeader: LocalizedString;
  explanations: LessonExplanation[];
  quiz: Quiz;
  progress: number;
  prevLessonId: string | null;
  nextLessonId: string | null;
}

export interface DictionaryTerm {
  id: string;
  english: string;
  hausaTranslation: string;
  tag: string;
  definition: LocalizedString;
  example: LocalizedString;
}

export interface TreeLeaf {
  title: LocalizedString;
  lessonId: string;
  badge?: string;
  lessonCount?: number;
  description?: LocalizedString;
  illustrationImg?: string;
}

export interface TreeSubBranch {
  id: string;
  title: LocalizedString;
  icon: string;
  illustrationImg?: string;
  leaves: TreeLeaf[];
}

export interface TreeBranch {
  id: string;
  title: LocalizedString;
  icon: string;
  subBranches: TreeSubBranch[];
}

export interface AppNotification {
  id: string;
  type: 'login' | 'lesson_complete' | 'achievement' | 'quiz_correct' | 'generic';
  title: LocalizedString;
  message: LocalizedString;
  icon?: string;
  variant?: 'golden' | 'glowing_orange';
  timestamp: number;
}

