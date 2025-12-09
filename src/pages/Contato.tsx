
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Send, User } from 'lucide-react';
import { toast } from 'sonner';

const Contato = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Mensagem enviada com sucesso!', {
            description: 'Entraremos em contato em breve.'
        });

        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow pt-24 md:pt-32 pb-16">
                <div className="container mx-auto px-4">

                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12 animate-fade-in-up">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                <MessageSquare className="w-4 h-4" />
                                Participe do Projeto
                            </span>
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                                Compartilhe sua história
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Cada voz é única e importante. Se você deseja participar do projeto ou tem alguma dúvida, envie sua mensagem.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-[1fr,1.5fr] gap-8 md:gap-12">
                            {/* Contact Info Side */}
                            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                                    <h3 className="font-display text-xl font-semibold mb-4 text-foreground">
                                        Entre em contato
                                    </h3>
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground mb-6">
                                            Você pode nos enviar um e-mail diretamente ou usar o formulário ao lado.
                                        </p>

                                        <a
                                            href="mailto:contato@elasdizem.com.br"
                                            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-muted"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium">contato@elasdizem.com.br</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                                    <h3 className="font-semibold text-primary mb-2">Sobre a participação</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Você pode optar pelo anonimato e escolher o formato de entrevista que preferir (texto, áudio ou vídeo).
                                    </p>
                                </div>
                            </div>

                            {/* Form Side */}
                            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">
                                            Nome completo
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="name"
                                                placeholder="Como gostaria de ser chamada?"
                                                required
                                                className="pl-10"
                                            />
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">
                                            E-mail ou Telefone
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                placeholder="Seu contato principal"
                                                required
                                                className="pl-10"
                                            />
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">
                                            Mensagem
                                        </label>
                                        <Textarea
                                            id="message"
                                            placeholder="Conte um pouco sobre você ou tire suas dúvidas..."
                                            required
                                            className="min-h-[150px] resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full text-lg h-12"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            'Enviando...'
                                        ) : (
                                            <>
                                                Enviar mensagem
                                                <Send className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contato;
