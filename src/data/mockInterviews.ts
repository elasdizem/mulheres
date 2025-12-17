import { Interview } from '@/types/interview';
import audioArilma from '@/assets/audio-arilma-reis.mp3';
import audioDaniela1 from '@/assets/audio-daniela-1.opus';
import audioDaniela2 from '@/assets/audio-daniela-2.opus';
import audioDaniela3 from '@/assets/audio-daniela-3.opus';
import audioAnonima from '@/assets/audio-anonima.mp3';
import rosildaThumb from '@/assets/rosilda_bastos.png';
import donaTelmaThumb from '@/assets/dona_telma.png';


export const mockInterviews: Interview[] = [
  {
    id: '1',
    name: 'Maria da Cruz Nogueira',
    isAnonymous: false,
    quote: 'Se eu não ver o trabalho de casa como trabalho, como vou viver? Quem lava, passa, cozinha, tudo sou eu.',
    format: 'text', // Keeping as text primarily, but if it has audio chapters it implies audio content?
    // Wait, Maria da Cruz is format: 'text' (line 16).
    // The user said "todos os áudios e vídeos".
    // Maria da Cruz is TEXT format.
    // Does she have audio?
    // Looking at the data... no audioUrl.
    // So she probably DOES NOT need chapters if she is text-only.
    // "Adicione a seção “Capítulos” em todos os áudios e vídeos..."
    // Maria is text.
    // So I skip ID 1.
    theme: 'trabalho-renda',
    duration: 10,
    region: 'Nordeste',
    country: 'Brasil',
    textContent: `<div class="interview-intro">Maria da Cruz Nogueira, 83 anos, mulher preta, mãe de 9 filhos, residente do Quilombo Dendê, Bacia e Vale do Iguape, Cachoeira-BA. Católica, não alfabetizada.</div>

<div class="interview-qa">
<p class="question">Como foi seu trabalho?</p>
<p class="answer">Trabalhava na roça, ia para maré tirar sururu, ostra e cavar mirim.</p>
</div>

<div class="interview-qa">
<p class="question">O que mais pensa e o que mais dá orgulho?</p>
<p class="answer">Todo o processo que passei, mas tenho orgulho dos meus filhos pela forma que foi criado.</p>
</div>

<div class="interview-qa">
<p class="question">Quem cuida do trabalho de casa?</p>
<p class="answer">A pobre e coitada da zinha! Se eu não ver como trabalho, como vou viver? Quem lava, passa, cozinha tudo sou eu, ninguém me ajuda, de casa a venda.</p>
</div>

<div class="interview-qa">
<p class="question">Nos conte um dia puxado que a senhora lembra até hoje</p>
<p class="answer">Dia puxado? De ir para roça, maré, para a inchada e ainda voltar para casa, dar banho nos filhos, dar comida, colocar para dormir, e tinha noite que eu nem dormia. Minha vida era essa.</p>
</div>

<div class="interview-qa">
<p class="question">Já teve que escolher entre trabalhar e cuidar de alguém?</p>
<p class="answer">Demais. Tomei conta da sogra, tomei conta do filho da sogra, tudo isso. Fiquei velha rápido por conta disso, por tomar conta de doente.</p>
</div>

<div class="interview-qa">
<p class="question">Quem decide as coisas de casa?</p>
<p class="answer">Eu. Da venda, a luz, água, despesa, tudo é eu. E não acho uma ajuda de filho nenhum.</p>
</div>

<div class="interview-qa">
<p class="question">O que te ensinaram o que é ser mulher?</p>
<p class="answer">Arrumar um namorado e morar com ele.</p>
</div>

<div class="interview-qa">
<p class="question">Teve algum momento de se sentir julgada pela forma que se vestia?</p>
<p class="answer">Ninguém nunca me criticou por coisa de vestimenta.</p>
</div>

<div class="interview-qa">
<p class="question">O racismo aparece no trabalho, na escola ou na saúde?</p>
<p class="answer">Na escola, eu acho. Porque uns sabiam, outros não, aí ficava escolhambando as pessoas. Por isso não continuei a estudar.</p>
</div>

<div class="interview-qa">
<p class="question">O dinheiro dá para o básico de casa?</p>
<p class="answer">Dá. Eu que decido o gasto, filho nenhum meu entra na minha semana não. Já deixei de me priorizar para dar tudo e do melhor.</p>
</div>

<div class="interview-qa">
<p class="question">Qual sua religião?</p>
<p class="answer">Sou católica e ninguém vai me tirar dela.</p>
</div>

<div class="interview-qa">
<p class="question">Se a senhora pudesse deixar um recadinho para as meninas de hoje dessa nova geração, o que deixaria?</p>
<p class="answer">O recado que eu deixo é que é para elas tomarem juízo, estudar, trabalhar e ajudar a mãe dentro de casa em tudo o que a mãe precisar.</p>
</div>

<hr class="interview-divider" />

<div class="interview-context">
<p>Maria da Cruz Nogueira passou por seus maus bocados durante esse processo. Teve uma vida difícil de trabalho e de vivência no casamento, criou os filhos à base da disciplina rígida, em um casamento sufocante.</p>

<p>Ela saía para trabalhar na roça e quando chegava em casa o marido dizia que estava com outro na rua. Em um momento de conversa, ela falou de uma certa briga que resultou na morte de um dos filhos dela, onde a criança de 8 meses foi arremessada da janela da sala de casa onde viviam. A criança veio a óbito depois de alguns dias.</p>

<p>Em outra ocasião de briga, o marido de Maria da Cruz pegou um facão para ela. A mãe dele tomou a frente e, por conta disso, ele pegou o saco da farinha que tinha acabado de ser feita por eles e rasgou o saco, onde foi espalhada pelo terreiro da casa, e ainda pisou para que ninguém pudesse se alimentar dela.</p>
</div>`,
    bio: 'Mulher preta de 83 anos, mãe de 9 filhos, residente do Quilombo Dendê na Bacia e Vale do Iguape, Cachoeira-BA. Católica, não alfabetizada. Sua vida foi marcada pelo trabalho na roça, na maré tirando sururu e ostra, e pelo cuidado incansável da família. Enfrentou um casamento difícil e violento, mas nunca deixou de lutar pelos filhos.',
    createdAt: new Date('2024-10-06'),
  },
  {
    id: '2',
    name: 'Daniela Nogueira',
    isAnonymous: false,
    quote: 'Acordo cedo, vou para o manguezal, pesco, tiro o sururu e a ostra. É assim que vivo, é assim que sustento minha família.',
    format: 'audio',
    theme: 'trabalho-renda',
    duration: 1,
    region: 'Nordeste',
    country: 'Brasil',
    audioUrl: audioDaniela2,
    audioUrls: [audioDaniela2, audioDaniela1, audioDaniela3],
    bio: 'Graduada em Serviço Social, residente do Quilombo Dendê. Embora tenha formação acadêmica, suas atividades diárias incluem acordar cedo e ir para o manguezal, pescar, tirar sururu e ostra, realizando todos os procedimentos necessários. Sua história representa a força das mulheres quilombolas que constroem vida e sustento através do trabalho tradicional.',
    chapters: [
      { id: 'c1', title: 'Apresentação', startTime: 0, endTime: 85, trackIndex: 0 },
      { id: 'c2', title: 'Família', startTime: 85, endTime: 144, trackIndex: 0 },
      { id: 'c3', title: 'Amor e Relações', startTime: 0, endTime: 123, trackIndex: 1 },
      { id: 'c4', title: 'Amor e Relações (Continuação)', startTime: 0, endTime: 35, trackIndex: 2 },
    ],
    createdAt: new Date('2024-11-15'),
  },
  {
    id: '3',
    name: 'Arilma Reis',
    isAnonymous: false,
    quote: 'Descobrir minha sexualidade e feminilidade foi um processo de libertação e autoconhecimento.',
    format: 'audio',
    theme: 'sexualidade-feminilidade',
    duration: 4,
    region: 'Nordeste',
    country: 'Brasil',
    audioUrl: audioArilma,
    bio: 'Mulher que compartilha sua jornada de descoberta da sexualidade e feminilidade. Sua entrevista aborda temas importantes sobre identidade, corpo e liberdade, trazendo reflexões profundas sobre o que significa ser mulher em nossa sociedade.',
    chapters: [
      { id: 'c1', title: 'Sexualidade e Feminilidade', startTime: 0, endTime: 214 },
    ],
    createdAt: new Date('2024-11-20'),
  },
  {
    id: '4',
    name: 'Mulher Anônima',
    isAnonymous: true,
    pseudonym: 'Anônima',
    quote: 'A vida é bela e maravilhosa", destacou a participante, alertando as jovens de 15 anos para que "tivessem muito cuidado" com ela.',
    format: 'audio',
    theme: 'familia-cuidado',
    additionalThemes: ['saude-corpo'], // Added secondary theme
    duration: 3,
    region: 'Nordeste',
    country: 'Brasil',
    audioUrl: audioAnonima,
    bio: 'Esta entrevistada preferiu não se identificar para preservar sua segurança e privacidade. Sua narrativa traz perspectivas importantes sobre a vivência no território e as lutas diárias enfrentadas pela comunidade.',
    chapters: [
      { id: 'c1', title: 'Início e Apresentação', startTime: 0, endTime: 45 },
      { id: 'c2', title: 'Relato sobre Família', startTime: 45, endTime: 90 },
      { id: 'c3', title: 'Perspectivas sobre Cuidado', startTime: 90, endTime: 137 },
    ],
    createdAt: new Date('2024-12-08'),
  },
  {
    id: '5',
    name: 'Dona Telma',
    isAnonymous: false,
    quote: 'Eu tratava meus alunos como se fossem meus filhos. Na sala de aula eu extraía dente, eu cortava unha, eu cortava cabelo... eu fazia tudo com as crianças como se fossem meus filhos.',
    format: 'video',
    theme: 'familia-cuidado',
    duration: 5, // 4:45 rounded up
    region: 'Nordeste',
    country: 'Brasil',
    videoUrl: 'https://www.youtube.com/embed/QjvsnnYtF1Q?si=xKszYsdbsYJmp1nZ',
    thumbnailUrl: donaTelmaThumb,
    bio: 'Dona Telma é uma liderança comunitária que dedica sua vida à preservação das tradições locais.',
    chapters: [
      { id: 'c1', title: 'Introdução', startTime: 0, endTime: 60 },
      { id: 'c2', title: 'Tradições Locais', startTime: 60, endTime: 150 },
      { id: 'c3', title: 'Liderança Comunitária', startTime: 150, endTime: 240 },
      { id: 'c4', title: 'Mensagem Final', startTime: 240, endTime: 285 },
    ],
    createdAt: new Date('2024-12-08'),
  },
  {
    id: '6',
    name: 'Rosilda Bastos',
    isAnonymous: false,
    quote: 'Eu sonho com mulheres sendo emancipadas a partir da sua renda',
    format: 'video',
    theme: 'trabalho-renda',
    additionalThemes: [
      'familia-cuidado',
      'racismo-territorio',
      'salario-autonomia',
      'religiao-comunidade'
    ],
    duration: 17, // 16:43 rounded up
    region: 'Nordeste',
    country: 'Brasil',
    videoUrl: 'https://www.youtube.com/embed/rHaS48bX-ys?si=CQgOFU0YWJzEbjhj',
    thumbnailUrl: rosildaThumb,
    bio: 'Rosilda Bastos compartilha sua trajetória de lutas e conquistas no mercado de trabalho e na vida.',
    chapters: [
      { id: 'c1', title: 'Início da Trajetória', startTime: 0, endTime: 180 },
      { id: 'c2', title: 'Desafios no Mercado', startTime: 180, endTime: 480 },
      { id: 'c3', title: 'Conquistas e Superação', startTime: 480, endTime: 780 },
      { id: 'c4', title: 'Visão de Futuro', startTime: 780, endTime: 1003 },
    ],
    createdAt: new Date('2024-12-08'),
  },
];

export const getInterviewById = (id: string): Interview | undefined => {
  return mockInterviews.find(interview => interview.id === id);
};

export const filterInterviews = (
  interviews: Interview[],
  filters: {
    theme?: string;
    format?: string;
    duration?: string;
    region?: string;
  }
): Interview[] => {
  return interviews.filter(interview => {
    if (filters.theme && filters.theme !== 'all' && interview.theme !== filters.theme) return false;
    if (filters.format && filters.format !== 'all' && interview.format !== filters.format) return false;
    if (filters.region && filters.region !== 'all' && interview.region !== filters.region) return false;

    if (filters.duration && filters.duration !== 'all') {
      const [min, max] = filters.duration.split('-').map(Number);
      if (max) {
        if (interview.duration < min || interview.duration > max) return false;
      } else {
        if (interview.duration < min) return false;
      }
    }

    return true;
  });
};
