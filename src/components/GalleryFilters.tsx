import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { themeLabels, InterviewTheme } from '@/types/interview';
import { cn } from '@/lib/utils';

interface GalleryFiltersProps {
  filters: {
    theme: string;
    format: string;
    duration: string;
    region: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const formatOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'video', label: 'Vídeo' },
  { value: 'audio', label: 'Áudio' },
];

const durationOptions = [
  { value: 'all', label: 'Todas' },
  { value: '0-15', label: 'Até 15 min' },
  { value: '15-30', label: '15-30 min' },
  { value: '30-60', label: '30-60 min' },
  { value: '60', label: '60+ min' },
];

const regionOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'Norte', label: 'Norte' },
  { value: 'Nordeste', label: 'Nordeste' },
  { value: 'Centro-Oeste', label: 'Centro-Oeste' },
  { value: 'Sudeste', label: 'Sudeste' },
  { value: 'Sul', label: 'Sul' },
];

export const GalleryFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  isOpen,
  onToggle
}: GalleryFiltersProps) => {
  const hasActiveFilters = Object.values(filters).some(v => v !== 'all');

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </span>
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {Object.values(filters).filter(v => v !== 'all').length}
            </span>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      <aside className={cn(
        'lg:block bg-card rounded-2xl border border-border p-6 space-y-6',
        isOpen ? 'block' : 'hidden'
      )}>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>

        {/* Theme Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Tema</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFilterChange('theme', 'all')}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                filters.theme === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              Todos
            </button>
            {Object.entries(themeLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onFilterChange('theme', key)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  filters.theme === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Format Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Formato</h4>
          <div className="flex flex-wrap gap-2">
            {formatOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange('format', option.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  filters.format === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Duração</h4>
          <div className="flex flex-wrap gap-2">
            {durationOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange('duration', option.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  filters.duration === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Region Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Região</h4>
          <div className="flex flex-wrap gap-2">
            {regionOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange('region', option.value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  filters.region === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
