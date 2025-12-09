import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeLibrary } from '@/components/ThemeLibrary';

const Temas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 md:pt-28 pb-16">


        <ThemeLibrary />
      </main>

      <Footer />
    </div>
  );
};

export default Temas;
