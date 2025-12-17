
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, MessageSquare } from 'lucide-react';

const Contato = () => {
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

                        <div className="max-w-xl mx-auto space-y-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center">
                                <h3 className="font-display text-xl font-semibold mb-4 text-foreground">
                                    Entre em contato
                                </h3>
                                <div className="space-y-4">
                                    <div className="text-muted-foreground mb-8 text-left max-w-sm mx-auto">
                                        <p className="mb-4">Para participar, envie um e-mail com:</p>
                                        <ul className="list-disc pl-5 space-y-2 bg-muted/30 p-4 rounded-xl">
                                            <li>Nome completo</li>
                                            <li>Telefone para contato</li>
                                            <li>Cidade onde mora</li>
                                            <li>Um breve resumo da sua história</li>
                                        </ul>
                                    </div>

                                    <a
                                        href="mailto:contato@elasdizem.com.br"
                                        className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-muted"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">contato@elasdizem.com.br</span>
                                    </a>
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center">
                                <h3 className="font-semibold text-primary mb-2">Sobre a participação</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Você pode optar pelo anonimato e escolher o formato de entrevista que preferir (texto, áudio ou vídeo).
                                </p>
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
