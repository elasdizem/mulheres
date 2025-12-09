import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Clock, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AudioPlayer } from '@/components/AudioPlayer';
import { VideoPlayer } from '@/components/VideoPlayer';

import { InterviewCard } from '@/components/InterviewCard';
import { getInterviewById, mockInterviews } from '@/data/mockInterviews';
import { themeLabels, themeColors } from '@/types/interview';
import { cn } from '@/lib/utils';

const Entrevista = () => {
  const { id } = useParams<{ id: string }>();
  const [showBio, setShowBio] = useState(false);

  const interview = getInterviewById(id || '');

  if (!interview) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Entrevista não encontrada
            </h1>
            <Button variant="outline" asChild>
              <Link to="/galeria">
                <ArrowLeft className="w-4 h-4" />
                Voltar para galeria
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const displayName = interview.isAnonymous
    ? (interview.pseudonym || 'Voz anônima')
    : interview.name;

  const relatedInterviews = mockInterviews
    .filter(i => i.id !== interview.id && i.theme === interview.theme)
    .slice(0, 2);

  // For anonymous video interviews, show audio player with visual
  const showAudioPlayer = interview.format === 'audio' ||
    (interview.isAnonymous && interview.originalFormat === 'video');

  const showTextContent = interview.format === 'text';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 md:pt-32 pb-16">
        {/* Hero Header */}
        <section className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-hero" />

          {/* Background Image or Avatar */}
          {interview.thumbnailUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${interview.thumbnailUrl})` }}
            />
          )}

          <div className="container mx-auto px-4 relative py-16 md:py-24">
            {/* Back Button */}
            <Link
              to="/galeria"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para galeria
            </Link>

            <div className="max-w-4xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  themeColors[interview.theme]
                )}>
                  {themeLabels[interview.theme]}
                </span>

                {interview.additionalThemes?.map(theme => (
                  <span key={theme} className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    themeColors[theme]
                  )}>
                    {themeLabels[theme]}
                  </span>
                ))}
              </div>

              {/* Avatar and Name */}
              <div className="flex items-center gap-6 mb-6">
                {interview.thumbnailUrl && (
                  <img
                    src={interview.thumbnailUrl}
                    alt={displayName}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-background shadow-card"
                  />
                )}
                <div>
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                    {displayName}
                  </h1>
                  {interview.bio && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBio(true)}
                      className="mt-2 text-muted-foreground hover:text-foreground"
                    >
                      <User className="w-4 h-4" />
                      Sobre ela
                    </Button>
                  )}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-foreground/80 italic font-display leading-relaxed border-l-4 border-primary pl-6">
                "{interview.quote}"
              </blockquote>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {interview.format === 'text' ? `${interview.duration} min de leitura` : `${interview.duration} minutos`}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {interview.region}, {interview.country}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {interview.createdAt.toLocaleDateString('pt-BR', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Player Section or Text Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {showTextContent ? (
                <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
                  <style>{`
                    .interview-intro {
                      font-size: 1.125rem;
                      line-height: 1.75;
                      color: hsl(var(--muted-foreground));
                      margin-bottom: 3rem;
                      padding: 1.5rem;
                      background: hsl(var(--muted) / 0.3);
                      border-radius: 0.75rem;
                      border-left: 4px solid hsl(var(--primary));
                    }
                    .interview-qa {
                      margin-bottom: 2.5rem;
                    }
                    .interview-qa .question {
                      font-family: 'Playfair Display', serif;
                      font-size: 1.25rem;
                      font-weight: 600;
                      color: hsl(var(--primary));
                      margin-bottom: 0.75rem;
                      line-height: 1.5;
                    }
                    .interview-qa .answer {
                      font-size: 1.0625rem;
                      line-height: 1.75;
                      color: hsl(var(--foreground));
                      padding-left: 1.5rem;
                      border-left: 2px solid hsl(var(--border));
                    }
                    .interview-divider {
                      margin: 3rem 0;
                      border: none;
                      border-top: 2px solid hsl(var(--border));
                      opacity: 0.5;
                    }
                    .interview-context {
                      background: hsl(var(--muted) / 0.2);
                      padding: 2rem;
                      border-radius: 0.75rem;
                      font-size: 1.0625rem;
                      line-height: 1.75;
                      color: hsl(var(--muted-foreground));
                    }
                    .interview-context p {
                      margin-bottom: 1.25rem;
                    }
                    .interview-context p:last-child {
                      margin-bottom: 0;
                    }
                  `}</style>
                  <div dangerouslySetInnerHTML={{ __html: interview.textContent || '' }} />
                </div>
              ) : showAudioPlayer ? (
                <AudioPlayer
                  audioUrl={interview.audioUrl || ''}
                  audioUrls={interview.audioUrls}
                  chapters={interview.chapters}
                  isAnonymous={interview.isAnonymous}
                />
              ) : (
                <VideoPlayer
                  videoUrl={interview.videoUrl || ''}
                  thumbnailUrl={interview.thumbnailUrl}
                  chapters={interview.chapters}
                />
              )}
            </div>
          </div>
        </section>

        {/* Related Interviews */}
        {relatedInterviews.length > 0 && (
          <section className="py-12 md:py-16 bg-card">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Histórias relacionadas
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                {relatedInterviews.map((related) => (
                  <InterviewCard key={related.id} interview={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Bio Sidebar */}
      {showBio && interview.bio && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setShowBio(false)}
          />
          <aside className="relative w-full max-w-md bg-card border-l border-border p-8 overflow-y-auto animate-slide-up">
            <button
              onClick={() => setShowBio(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">

              {interview.thumbnailUrl && (
                <img
                  src={interview.thumbnailUrl}
                  alt={displayName}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-border"
                />
              )}

              <div className="text-center">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {displayName}
                </h3>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Sobre</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {interview.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {interview.region}, {interview.country}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs',
                    themeColors[interview.theme]
                  )}>
                    {themeLabels[interview.theme]}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Entrevista;
