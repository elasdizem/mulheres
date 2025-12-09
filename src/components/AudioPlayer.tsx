import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SoundWave } from './SoundWave';
import { Chapter } from '@/types/interview';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  audioUrl: string;
  audioUrls?: string[];
  chapters?: Chapter[];
  isAnonymous?: boolean;
}

export const AudioPlayer = ({ audioUrl, audioUrls, chapters, isAnonymous }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Initialize playlist
  const playlist = audioUrls && audioUrls.length > 0 ? audioUrls : [audioUrl];
  const currentAudioSource = playlist[currentTrackIndex];
  const hasMultipleTracks = playlist.length > 1;

  useEffect(() => {
    // Reset state when audio source changes
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [currentAudioSource]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      console.log(`[AudioPlayer] Track ${currentTrackIndex + 1}/${playlist.length} loaded - Duration: ${Math.round(audio.duration)}s`);
      if (isPlaying) {
        audio.play().catch(e => console.error("Playback failed:", e));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (currentTrackIndex < playlist.length - 1) {
        handleNextTrack();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, playlist.length]); // Re-bind when track changes

  // Auto-play when track index changes via controls (if it was already playing or intended to play)
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Auto-play next track failed:", e));
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (chapters && chapters.length > 0) {
      // Find the current chapter based on startTime and endTime
      // Note: Chapter logic currently assumes a single timeline. 
      // For multi-track, chapters would ideally map to specific tracks or cumulative time.
      // Keeping simple for now given current data.
      const current = chapters.find(ch => {
        const isAfterStart = currentTime >= ch.startTime;
        const isBeforeEnd = ch.endTime === undefined || currentTime < ch.endTime;
        return isAfterStart && isBeforeEnd;
      });
      setActiveChapter(current?.id || null);
    }
  }, [currentTime, chapters, currentTrackIndex]);

  const [pendingSeekTime, setPendingSeekTime] = useState<number | null>(null);

  useEffect(() => {
    if (pendingSeekTime !== null && audioRef.current && duration > 0) {
      audioRef.current.currentTime = pendingSeekTime;
      setPendingSeekTime(null);
      if (!isPlaying) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  }, [duration, pendingSeekTime]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleChapterClick = (chapter: Chapter) => {
    const targetTrack = chapter.trackIndex ?? 0;

    if (targetTrack !== currentTrackIndex) {
      setCurrentTrackIndex(targetTrack);
      setPendingSeekTime(chapter.startTime);
      setIsPlaying(true);
    } else {
      seek(chapter.startTime);
      if (!isPlaying) togglePlay();
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      seek(newTime);
    }
  };

  const handleNextTrack = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
      setIsPlaying(true); // Auto-play next
    }
  };

  const handlePrevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
      setIsPlaying(true);
    } else {
      seek(0); // Restart first track
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Player Card */}
      <div className={cn(
        'bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border'
      )}>
        <audio ref={audioRef} src={currentAudioSource} preload="metadata" />

        {/* Visual */}
        <div className="flex justify-center mb-8 relative">
          <div className={cn(
            'w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center',
            'bg-primary/10 border-4 border-primary/20 transition-all duration-500',
            isPlaying && 'border-primary/40 shadow-glow'
          )}>
            <SoundWave isPlaying={isPlaying} size="lg" />
          </div>

          {/* Track Indicator */}
          {hasMultipleTracks && (
            <div className="absolute top-0 right-0 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-border">
              Áudio {currentTrackIndex + 1} de {playlist.length}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <div
            className="h-2 bg-muted rounded-full cursor-pointer overflow-hidden group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              seek(percent * duration);
            }}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-100 group-hover:opacity-90"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-4 w-full">
            {/* Volume */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-muted-foreground hover:text-foreground hidden sm:flex"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            {/* Prev Track */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevTrack}
              disabled={currentTrackIndex === 0 && currentTime < 3} // Disable if first track and near start
              className={cn("text-muted-foreground hover:text-foreground",
                currentTrackIndex === 0 && currentTime < 3 && "opacity-50"
              )}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Seek Back */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(-15)}
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            {/* Play/Pause */}
            <Button
              variant="hero"
              size="icon"
              onClick={togglePlay}
              className="w-16 h-16 shadow-lg hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>

            {/* Seek Forward */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skip(15)}
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipForward className="w-5 h-5" />
            </Button>

            {/* Next Track */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextTrack}
              disabled={currentTrackIndex >= playlist.length - 1}
              className={cn("text-muted-foreground hover:text-foreground",
                currentTrackIndex >= playlist.length - 1 && "opacity-50"
              )}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="w-10 hidden sm:block" /> {/* Spacer */}
          </div>
        </div>
      </div>

      {/* Chapters */}
      {chapters && chapters.length > 0 && (
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Capítulos</h4>
          <div className="space-y-1">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterClick(chapter)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-xl transition-colors',
                  'flex items-center justify-between',
                  activeChapter === chapter.id
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="text-sm">{chapter.title}</span>
                <span className="text-xs">{formatTime(chapter.startTime)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
