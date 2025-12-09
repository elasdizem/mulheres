const fs = require('fs');
const path = require('path');

// Try to use jsmediatags to read audio metadata
try {
  const jsmediatags = require('jsmediatags');
  
  const audioDir = path.join(__dirname, 'src', 'assets');
  const audioFiles = fs.readdirSync(audioDir).filter(f => 
    f.startsWith('audio-') && (f.endsWith('.mp3') || f.endsWith('.opus'))
  );

  audioFiles.forEach(file => {
    const filePath = path.join(audioDir, file);
    new jsmediatags.Reader(filePath)
      .setTagsToRead(['duration'])
      .read({
        onSuccess: function(tag) {
          const duration = tag.tags.duration;
          console.log(`${file}: ${duration} segundos`);
        },
        onError: function(error) {
          console.log(`${file}: Erro ao ler - ${error.message}`);
        }
      });
  });
} catch (e) {
  console.log('jsmediatags não disponível. Alternativa: Use o navegador para extrair durações');
  console.log('Abra o dev tools do navegador e execute:');
  console.log(`
    const audios = ['audio-daniela-1.opus', 'audio-daniela-2.opus', 'audio-daniela-3.opus', 'audio-arilma-reis.mp3'];
    audios.forEach(name => {
      const audio = new Audio('/src/assets/' + name);
      audio.addEventListener('loadedmetadata', () => {
        console.log(name + ': ' + audio.duration + ' segundos');
      });
    });
  `);
}
