import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Mic2 } from 'lucide-react';
import { Interview } from '@/types/interview';
import { SoundWave } from './SoundWave';
import { AnonymousAvatar } from './AnonymousAvatar';
import { cn } from '@/lib/utils';

interface HeroMosaicProps {
  interviews: Interview[];
}

export const HeroMosaic = ({ interviews }: HeroMosaicProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Take first 6 interviews for the mosaic
  const mosaicInterviews = interviews.slice(0, 6);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {mosaicInterviews.map((interview, index) => (
        <Link
          key={interview.id}
          to={`/entrevista/${interview.id}`}
          className={cn(
            'relative group overflow-hidden rounded-2xl',
            index === 0 && 'md:col-span-2 md:row-span-2',
            'animate-fade-in-up',
            `animation-delay-${(index + 1) * 100}`
          )}
          style={{ 
            aspectRatio: index === 0 ? '1' : '4/3',
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
          onMouseEnter={() => setHoveredId(interview.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Background */}
          {interview.isAnonymous ? (
            <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center">
              <AnonymousAvatar 
                size={index === 0 ? 'xl' : 'lg'} 
                variant="waves" 
              />
            </div>
          ) : interview.format === 'video' && interview.thumbnailUrl ? (
            <img
              src={interview.thumbnailUrl}
              alt={interview.name}
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-transform duration-700',
                hoveredId === interview.id && 'scale-110'
              )}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center">
              <div className={cn(
                'rounded-full bg-primary/20 flex items-center justify-center',
                'border-4 border-primary/30',
                index === 0 ? 'w-32 h-32' : 'w-20 h-20'
              )}>
                <SoundWave 
                  isPlaying={hoveredId === interview.id} 
                  size={index === 0 ? 'lg' : 'md'} 
                />
              </div>
            </div>
          )}

          {/* Overlay */}
          <div className={cn(
            'absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent',
            'opacity-60 group-hover:opacity-80 transition-opacity duration-300'
          )} />

          {/* Content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-2">
              {interview.format === 'video' ? (
                <Play className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Mic2 className="w-4 h-4 text-primary-foreground" />
              )}
              <span className="text-xs text-primary-foreground/80">
                {interview.format === 'video' ? 'Vídeo' : 'Áudio'}
              </span>
            </div>
            <h3 className={cn(
              'font-display font-semibold text-primary-foreground',
              index === 0 ? 'text-xl md:text-2xl' : 'text-sm md:text-base'
            )}>
              {interview.isAnonymous 
                ? (interview.pseudonym || 'Voz Anônima')
                : interview.name}
            </h3>
            {index === 0 && (
              <p className="text-primary-foreground/80 text-sm mt-1 line-clamp-2 hidden md:block">
                "{interview.quote}"
              </p>
            )}
          </div>

          {/* Play indicator on hover */}
          <div className={cn(
            'absolute inset-0 flex items-center justify-center',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          )}>
            <div className={cn(
              'rounded-full bg-primary/90 flex items-center justify-center shadow-glow',
              index === 0 ? 'w-20 h-20' : 'w-12 h-12'
            )}>
              <Play className={cn(
                'text-primary-foreground ml-1',
                index === 0 ? 'w-10 h-10' : 'w-6 h-6'
              )} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
