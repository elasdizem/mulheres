import { useEffect } from 'react';

export const AudioDurationExtractor = () => {
  useEffect(() => {
    const audioUrls = [
      { name: 'audio-daniela-1.opus', url: new URL('../assets/audio-daniela-1.opus', import.meta.url).href },
      { name: 'audio-arilma-reis.mp3', url: new URL('../assets/audio-arilma-reis.mp3', import.meta.url).href },
    ];

    const durations = {};

    audioUrls.forEach(({ name, url }) => {
      const audio = new Audio();
      audio.addEventListener('loadedmetadata', () => {
        const duration = Math.round(audio.duration);
        durations[name] = duration;
        console.log(`${name}: ${duration} segundos (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')})`);
        
        // Log all durations when all are loaded
        if (Object.keys(durations).length === audioUrls.length) {
          console.table(durations);
        }
      });
      audio.src = url;
    });
  }, []);

  return null;
};
