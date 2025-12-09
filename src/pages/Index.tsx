import { Link } from 'react-router-dom';
import { ArrowRight, Mic2, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroMosaic } from '@/components/HeroMosaic';
import { InterviewCard } from '@/components/InterviewCard';
import { ThemeLibrary } from '@/components/ThemeLibrary';
import { mockInterviews } from '@/data/mockInterviews';

const Index = () => {
  const videoInterviews = mockInterviews.filter(i => i.format === 'video');
  const mariaInterview = mockInterviews.find(i => i.id === '1');

  const featuredInterviews = [
    ...videoInterviews,
    ...(mariaInterview ? [mariaInterview] : [])
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="pt-8 md:pt-12 pb-12 md:pb-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-hero opacity-50 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-soft text-primary text-sm font-medium">
                  <Mic2 className="w-4 h-4" />
                  Histórias que transformam
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span className="text-gradient">Elas</span> Dizem
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Um espaço dedicado a registrar histórias de mulheres contadas por mulheres.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/galeria">
                    Ouvir histórias
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/sobre">
                    Conheça o projeto
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-3xl font-display font-bold text-foreground">6+</p>
                  <p className="text-sm text-muted-foreground">Entrevistas</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-display font-bold text-foreground">1</p>
                  <p className="text-sm text-muted-foreground">Região</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-display font-bold text-foreground">10</p>
                  <p className="text-sm text-muted-foreground">Temas</p>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="lg:pl-8 flex justify-end">
              <div className="relative w-full max-w-lg aspect-[3/4] flex items-center justify-center">
                {/* Placeholder for "Woman Illustration" - borderless */}
                <div className="absolute inset-0 bg-gradient-hero mix-blend-overlay opacity-50 mask-image-gradient" />
                <div className="relative z-10 text-right">
                  <span className="text-muted-foreground/30 font-display text-4xl font-bold tracking-widest uppercase writing-vertical-rl rotate-180">
                    Ilustração
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Mic2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Áudio & vídeo</h3>
              <p className="text-muted-foreground text-sm">
                Entrevistas em formatos variados, permitindo que cada mulher escolha como compartilhar sua história.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              <div className="w-16 h-16 rounded-2xl bg-lilac/20 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-lilac-deep" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Anonimato seguro</h3>
              <p className="text-muted-foreground text-sm">
                Opção de manter identidade preservada, permitindo que histórias sejam contadas com total segurança.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">Comunidade</h3>
              <p className="text-muted-foreground text-sm">
                Um espaço de conexão onde mulheres podem se inspirar e apoiar umas às outras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Interviews */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div className="space-y-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Histórias em destaque
              </h2>
              <p className="text-muted-foreground">
                Conheça algumas das vozes que fazem parte desta galeria
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/galeria">
                Ver todas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInterviews.map((interview, index) => (
              <div
                key={interview.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <InterviewCard interview={interview} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theme Library */}
      <ThemeLibrary />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-hero rounded-3xl p-8 md:p-16 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative text-center max-w-2xl mx-auto space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Sua voz também importa
              </h2>
              <p className="text-muted-foreground">
                Cada história é única e merece ser ouvida. Se você deseja compartilhar sua experiência,
                estamos aqui para ouvi-la — com total respeito à sua privacidade.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contato">
                    Compartilhe sua história
                  </Link>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link to="/sobre#anonimato">
                    Saiba mais sobre anonimato
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
