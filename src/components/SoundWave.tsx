import { cn } from '@/lib/utils';

interface SoundWaveProps {
  isPlaying?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'primary' | 'accent' | 'muted';
}

export const SoundWave = ({ 
  isPlaying = true, 
  size = 'md', 
  className,
  color = 'primary'
}: SoundWaveProps) => {
  const heights = {
    sm: ['h-2', 'h-3', 'h-4', 'h-3', 'h-5', 'h-3', 'h-2'],
    md: ['h-3', 'h-5', 'h-8', 'h-6', 'h-10', 'h-5', 'h-4'],
    lg: ['h-4', 'h-8', 'h-12', 'h-10', 'h-14', 'h-8', 'h-6'],
  };

  const colorClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    muted: 'bg-muted-foreground',
  };

  return (
    <div className={cn('flex items-end gap-0.5', className)}>
      {heights[size].map((_, index) => (
        <div
          key={index}
          className={cn(
            'w-1 rounded-full h-10 transition-all duration-300',
            colorClasses[color],
            isPlaying && 'sound-wave-bar'
          )}
          style={{
            transform: isPlaying ? undefined : 'scaleY(0.2)',
            transformOrigin: 'center bottom',
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};
