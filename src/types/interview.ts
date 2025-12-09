export type InterviewFormat = 'video' | 'audio' | 'text';

export type InterviewTheme =
  | 'trabalho-renda'
  | 'familia-cuidado'
  | 'amor-relacoes'
  | 'sexualidade-feminilidade'
  | 'racismo-territorio'
  | 'salario-autonomia'
  | 'saude-corpo'
  | 'religiao-comunidade'
  | 'internet-midia'
  | 'feminismo';

export interface Interview {
  id: string;
  name: string;
  isAnonymous: boolean;
  pseudonym?: string;
  quote: string;
  format: InterviewFormat;
  originalFormat?: InterviewFormat; // For anonymous video converted to audio
  theme: InterviewTheme;
  additionalThemes?: InterviewTheme[];
  duration: number; // in minutes (for text, estimated reading time)
  region: string;
  country: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  audioUrls?: string[]; // For multiple audio files (playlist)
  textContent?: string; // For text-based interviews
  bio?: string;
  chapters?: Chapter[];
  createdAt: Date;
}

export interface Chapter {
  id: string;
  title: string;
  startTime: number; // in seconds
  endTime?: number; // in seconds (optional for backwards compatibility)
  trackIndex?: number; // 0-based index of the audio track for playlist support
}

export interface Message {
  id: string;
  interviewId: string;
  content: string;
  senderName: string;
  createdAt: Date;
}

export const themeLabels: Record<InterviewTheme, string> = {
  'trabalho-renda': 'Trabalho e renda',
  'familia-cuidado': 'Família e cuidado',
  'amor-relacoes': 'Amor e relações',
  'sexualidade-feminilidade': 'Sexualidade e feminilidade',
  'racismo-territorio': 'Racismo e território',
  'salario-autonomia': 'Salário e autonomia',
  'saude-corpo': 'Saúde, corpo e reprodução',
  'religiao-comunidade': 'Religião e comunidade',
  'internet-midia': 'Internet e mídia',
  'feminismo': 'Feminismo',
};

export const themeColors: Record<InterviewTheme, string> = {
  'trabalho-renda': 'bg-terracotta/20 text-terracotta',
  'familia-cuidado': 'bg-rose-soft text-primary',
  'amor-relacoes': 'bg-secondary text-secondary-foreground',
  'sexualidade-feminilidade': 'bg-lilac/20 text-lilac-deep',
  'racismo-territorio': 'bg-primary/10 text-primary',
  'salario-autonomia': 'bg-gold-light text-accent-foreground',
  'saude-corpo': 'bg-sage/20 text-sage-dark',
  'religiao-comunidade': 'bg-accent/20 text-accent-foreground',
  'internet-midia': 'bg-muted text-muted-foreground',
  'feminismo': 'bg-primary/20 text-primary',
};
