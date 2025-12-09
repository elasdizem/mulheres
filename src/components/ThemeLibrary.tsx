import { Link } from 'react-router-dom';
import { themeLabels, themeColors, InterviewTheme } from '@/types/interview';
import { mockInterviews } from '@/data/mockInterviews';
import { cn } from '@/lib/utils';
import { BookOpen, Briefcase, Heart, Sparkles, Rocket, Trophy, Palette, Users, Globe, Laptop, Megaphone, Coins } from 'lucide-react';

const themeIcons: Record<InterviewTheme, React.ComponentType<{ className?: string }>> = {
  'trabalho-renda': Briefcase,
  'familia-cuidado': Heart,
  'amor-relacoes': Heart,
  'sexualidade-feminilidade': Sparkles,
  'racismo-territorio': Globe,
  'salario-autonomia': Coins,
  'saude-corpo': Heart,
  'religiao-comunidade': Users,
  'internet-midia': Laptop,
  'feminismo': Megaphone,
};

export const ThemeLibrary = () => {
  const themes = Object.entries(themeLabels) as [InterviewTheme, string][];

  const getInterviewCount = (theme: InterviewTheme) => {
    return mockInterviews.filter(i => i.theme === theme).length;
  };

  return (
    <section className="pb-16 md:pb-24 pt-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Biblioteca Temática
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore por Temas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Navegue pelas histórias organizadas em temas que tocam a vida de mulheres em diferentes momentos e contextos.
          </p>
        </div>

        {/* Bookshelf */}
        <div className="relative">
          {/* Shelf */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {themes.map(([key, label], index) => {
              const Icon = themeIcons[key];
              const count = getInterviewCount(key);

              return (
                <Link
                  key={key}
                  to={`/galeria?theme=${key}`}
                  className={cn(
                    'group relative bg-card rounded-2xl p-6 border border-border',
                    'hover:shadow-card hover:-translate-y-1 transition-all duration-300',
                    'animate-fade-in-up'
                  )}
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                >
                  {/* Book spine effect */}
                  <div className={cn(
                    'absolute left-0 top-4 bottom-4 w-1.5 rounded-full',
                    themeColors[key].replace('text-', 'bg-').split(' ')[0]
                  )} />

                  <div className="pl-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                      themeColors[key]
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {label}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {count} {count === 1 ? 'entrevista' : 'entrevistas'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Shelf shadow */}
          <div className="h-4 bg-gradient-to-b from-border/50 to-transparent rounded-b-3xl -mt-2" />
        </div>
      </div>
    </section>
  );
};
