import { useState } from 'react';
import { Play, Mic2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Interview, themeLabels, themeColors } from '@/types/interview';
import { SoundWave } from './SoundWave';

import { IdentityBadge } from './IdentityBadge';
import { cn } from '@/lib/utils';

interface InterviewCardProps {
  interview: Interview;
}

export const InterviewCard = ({ interview }: InterviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const displayName = interview.isAnonymous
    ? (interview.pseudonym || 'Voz Anônima')
    : interview.name;

  const getYouTubeThumbnail = (url: string) => {
    if (!url) return null;
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    if (!isYouTube) return null;
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match && match[1] ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
  };

  const youTubeThumbnail = interview.format === 'video' ? getYouTubeThumbnail(interview.videoUrl!) : null;

  return (
    <Link
      to={`/entrevista/${interview.id}`}
      className="block"
    >
      <article
        className={cn(
          'group bg-card rounded-3xl overflow-hidden card-hover',
          'border border-border/40 hover:border-primary/20 shadow-sm hover:shadow-card'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail / Avatar Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {interview.thumbnailUrl ? (
            <>
              <img
                src={interview.thumbnailUrl}
                alt={displayName}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-700',
                  isHovered && 'scale-105'
                )}
              />
              <div className={cn(
                'absolute inset-0 bg-foreground/20 flex items-center justify-center',
                'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              )}>
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-glow">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </div>
            </>
          ) : youTubeThumbnail ? (
            <>
              <img
                src={youTubeThumbnail}
                alt={displayName}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-700',
                  isHovered && 'scale-105'
                )}
              />
              <div className={cn(
                'absolute inset-0 bg-foreground/20 flex items-center justify-center',
                'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              )}>
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-glow">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </div>
            </>
          ) : interview.format === 'video' && interview.videoUrl ? (
            <>
              <video
                src={interview.videoUrl}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-700',
                  isHovered && 'scale-105'
                )}
                muted
                loop
                playsInline
                onMouseOver={(e) => e.currentTarget.play()}
                onMouseOut={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
              <div className={cn(
                'absolute inset-0 bg-foreground/20 flex items-center justify-center',
                'opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
              )}>
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-glow">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </div>
            </>
          ) : interview.format === 'audio' ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-hero">
              <div className={cn(
                'w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center',
                'border-2 border-primary/20'
              )}>
                <SoundWave isPlaying={isHovered} size="lg" />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-hero">
              <div className={cn(
                'w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center',
                'border-2 border-primary/20'
              )}>
                <FileText className="w-10 h-10 text-primary/80" strokeWidth={1.5} />
              </div>
            </div>
          )}

          {/* Format Badge */}
          <div className="absolute top-3 right-3">
            <span className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
              'bg-background/80 backdrop-blur-sm text-foreground'
            )}>
              {interview.format === 'video' ? (
                <Play className="w-3 h-3" />
              ) : interview.format === 'audio' ? (
                <Mic2 className="w-3 h-3" />
              ) : (
                <FileText className="w-3 h-3" />
              )}
              {interview.format === 'video' ? 'Vídeo' : interview.format === 'audio' ? 'Áudio' : 'Texto'}
            </span>
          </div>

          {/* Anonymous Badge */}
          {interview.isAnonymous && (
            <div className="absolute top-3 left-3">
              <IdentityBadge />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          {/* Theme Tag */}
          <span className={cn(
            'inline-block px-3 py-1 rounded-full text-xs font-medium',
            themeColors[interview.theme]
          )}>
            {themeLabels[interview.theme]}
          </span>

          {/* Name */}
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {displayName}
          </h3>

          {/* Quote */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 italic">
            "{interview.quote}"
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
            <span>{interview.format === 'text' ? `${interview.duration} min de leitura` : `${interview.duration} min`}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>{interview.region}, {interview.country}</span>
          </div>
        </div>
      </article>
    </Link >
  );
};
