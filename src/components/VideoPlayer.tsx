import { useState, useRef } from 'react';
import { Play, Pause, Maximize, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chapter } from '@/types/interview';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  chapters?: Chapter[];
}

export const VideoPlayer = ({ videoUrl, thumbnailUrl, chapters }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

  // Helper to get YouTube embed URL with time
  const getYouTubeUrl = (url: string, time: number) => {
    // Check if URL already has params
    const hasParams = url.includes('?');
    // Remove existing start/t param if any to avoid duplicates
    let cleanUrl = url.replace(/[?&](start|t)=\d+/, '');
    return `${cleanUrl}${hasParams ? '&' : '?'}start=${Math.floor(time)}`;
  };

  const togglePlay = () => {
    if (isYouTube) return; // Let YouTube player handle controls
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const traverseChapters = (time: number) => {
    setCurrentTime(time);
    if (chapters) {
      const current = chapters
        .filter(ch => time >= ch.startTime)
        .pop();
      setActiveChapter(current?.id || null);
    }
  };

  const seek = (time: number) => {
    if (isYouTube) {
      // For YouTube, we reload the iframe with the start param
      const iframe = document.getElementById('youtube-player') as HTMLIFrameElement;
      if (iframe) {
        iframe.src = getYouTubeUrl(videoUrl, time);
      }
      traverseChapters(time); // Manually update chapters highlight since we don't get timeupdate events easily from iframe without API
    } else if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
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
      {/* Video Container */}
      <div
        className="relative aspect-video bg-foreground rounded-2xl overflow-hidden group"
        onMouseEnter={() => !isYouTube && setShowControls(true)}
        onMouseLeave={() => !isYouTube && isPlaying && setShowControls(false)}
      >
        {isYouTube ? (
          <iframe
            id="youtube-player"
            src={videoUrl}
            className="w-full h-full"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              poster={thumbnailUrl}
              className="w-full h-full object-cover"
              onTimeUpdate={() => {
                if (videoRef.current) {
                  const time = videoRef.current.currentTime;
                  setCurrentTime(time);
                  // Extract chapter logic to reuse or keep inline?
                  // Keeping inline for now or reusing traverseChapters logic if I refactor fully.
                  if (chapters) {
                    const current = chapters
                      .filter(ch => time >= ch.startTime)
                      .pop();
                    setActiveChapter(current?.id || null);
                  }
                }
              }}
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  setDuration(videoRef.current.duration);
                }
              }}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Overlay Controls */}
            <div className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
              showControls ? 'opacity-100' : 'opacity-0'
            )}>
              {/* Play Button */}
              {!isPlaying && (
                <Button
                  variant="hero"
                  size="icon"
                  onClick={togglePlay}
                  className="w-20 h-20"
                >
                  <Play className="w-10 h-10 ml-1" />
                </Button>
              )}
            </div>

            {/* Bottom Controls */}
            <div className={cn(
              'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent',
              'transition-opacity duration-300',
              showControls ? 'opacity-100' : 'opacity-0'
            )}>
              {/* Progress Bar */}
              <div
                className="h-1 bg-primary-foreground/30 rounded-full cursor-pointer mb-4 overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  seek(percent * duration);
                }}
              >
                <div
                  className="h-full bg-primary rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>

                  <span className="text-xs text-primary-foreground ml-2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Chapters */}
      {chapters && chapters.length > 0 && (
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Capítulos</h4>
          <div className="space-y-1">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => seek(chapter.startTime)}
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
