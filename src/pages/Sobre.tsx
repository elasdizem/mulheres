import { useEffect } from 'react';
import { replace, useLocation } from 'react-router-dom'; // Placeholder to avoid unused var? No, I need Link.
import { Link } from 'react-router-dom';
import { Heart, Shield, Mic2, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Sobre = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 md:pt-32 pb-16">
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-50" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Sobre a <span className="text-gradient">Galeria Viva de Vozes</span>
              </h1>
              <p className="text-xl font-medium text-foreground/80 mb-8 max-w-3xl mx-auto">
                Projeto vinculado ao componente curricular optativo "História da Mulher e Relações de Gênero" da Universidade Federal do Recôncavo da Bahia (UFRB).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-justify md:text-center">
                Esta iniciativa é um exercício documental voltado ao registro de narrativas orais de mulheres. Orientada pelo professor Henrique Sena dos Santos, a disciplina possibilitou analisar a História das Mulheres, promovendo um diálogo crítico com diferentes vertentes do feminismo e com os estudos de gênero.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-bold text-foreground">
                  Nossa missão
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Partimos da premissa de que a memória individual é uma ferramenta essencial para a compreensão da história coletiva. A Galeria Viva de Vozes foi concebida como um espaço de pesquisa e escuta sensível, onde relatos de vida são tratados como fontes primárias fundamentais para a análise das relações de gênero.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Seja através de registros audiovisuais ou sonoros, cada entrevista compõe um corpus documental que busca elucidar as tensões, resistências e a agência feminina na sociedade, convidando à reflexão hermenêutica sobre as experiências que conectam as mulheres através do tempo e do espaço.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Empatia</h3>
                  <p className="text-sm text-muted-foreground">Ouvir com o coração aberto</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-lilac/20 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-lilac-deep" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Segurança</h3>
                  <p className="text-sm text-muted-foreground">Proteção total da identidade</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <Mic2 className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Autenticidade</h3>
                  <p className="text-sm text-muted-foreground">Histórias reais e genuínas</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-rose-soft flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Comunidade</h3>
                  <p className="text-sm text-muted-foreground">Juntas somos mais fortes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="anonimato" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-full bg-lilac/20 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-lilac-deep" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Compromisso com o anonimato
                </h2>
                <p className="text-muted-foreground">
                  Entendemos que algumas histórias precisam ser contadas sem revelar quem as conta.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-background rounded-2xl p-6 border border-border">
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    Como funciona o anonimato?
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      Substituímos fotos por avatares artísticos que respeitam a identidade visual do projeto
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      Usamos pseudônimos ou "Voz anônima" no lugar do nome real
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      Entrevistas em vídeo podem ser convertidas para apenas áudio
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      Localização é mostrada apenas de forma ampla (região/país)
                    </li>
                  </ul>
                </div>

                <div className="bg-background rounded-2xl p-6 border border-border">
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    Tag "Identidade preservada"
                  </h3>
                  <p className="text-muted-foreground">
                    Todas as entrevistas anônimas são claramente identificadas com a tag
                    "Identidade preservada", garantindo transparência para quem ouve e
                    proteção para quem conta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Quer fazer parte desta galeria?
              </h2>
              <p className="text-muted-foreground">
                Se você deseja compartilhar sua história, entre em contato conosco.
                Garantimos um processo acolhedor e respeitoso do início ao fim.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" variant="hero" asChild className="w-full sm:w-auto">
                  <Link to="/contato">
                    Quero participar
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;
