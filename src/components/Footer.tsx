import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">G</span>
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                Galeria Viva de Vozes
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Um espaço dedicado a registrar histórias de mulheres contadas por mulheres.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Navegação</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/galeria" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Galeria de Entrevistas
              </Link>
              <Link to="/temas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Biblioteca Temática
              </Link>
              <Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sobre o Projeto
              </Link>
              <Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Galeria Viva de Vozes. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> para todas as mulheres
          </p>
        </div>
      </div>
    </footer>
  );
};
