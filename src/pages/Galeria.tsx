import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { InterviewCard } from '@/components/InterviewCard';
import { GalleryFilters } from '@/components/GalleryFilters';
import { mockInterviews, filterInterviews } from '@/data/mockInterviews';

const Galeria = () => {
  const [searchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    theme: searchParams.get('theme') || 'all',
    format: 'all',
    duration: 'all',
    region: 'all',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      theme: 'all',
      format: 'all',
      duration: 'all',
      region: 'all',
    });
    setSearchQuery('');
  };

  const filteredInterviews = useMemo(() => {
    let result = filterInterviews(mockInterviews, filters);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(interview =>
        interview.name.toLowerCase().includes(query) ||
        interview.quote.toLowerCase().includes(query) ||
        interview.pseudonym?.toLowerCase().includes(query) ||
        interview.bio?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [filters, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Galeria de vozes
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore entrevistas inspiradoras de mulheres de todo o Brasil.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome, história ou tema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-72 shrink-0">
              <GalleryFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isOpen={filtersOpen}
                onToggle={() => setFiltersOpen(!filtersOpen)}
              />
            </div>

            {/* Gallery Grid */}
            <div className="flex-1">
              {filteredInterviews.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    {filteredInterviews.length} {filteredInterviews.length === 1 ? 'entrevista encontrada' : 'entrevistas encontradas'}
                  </p>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredInterviews.map((interview, index) => (
                      <div
                        key={interview.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                      >
                        <InterviewCard interview={interview} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Nenhuma entrevista encontrada
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Tente ajustar os filtros ou a busca para encontrar mais histórias.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-primary hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Galeria;
