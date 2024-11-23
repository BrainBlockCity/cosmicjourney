import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const AUDIO_FILES = {
  ambient: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8b8b774d8.mp3?filename=ambient-space-124841.mp3',
  click: 'https://cdn.pixabay.com/download/audio/2022/03/19/audio_017a2f114f.mp3?filename=click-124112.mp3',
  success: 'https://cdn.pixabay.com/download/audio/2022/03/25/audio_c8531a01d5.mp3?filename=success-1-6297.mp3',
  energy: 'https://cdn.pixabay.com/download/audio/2022/03/22/audio_c147e4b458.mp3?filename=energy-90321.mp3'
};

export const useAudio = () => {
  const sounds = useRef<Record<string, Howl>>({});

  useEffect(() => {
    // Initialize sounds
    Object.entries(AUDIO_FILES).forEach(([key, src]) => {
      sounds.current[key] = new Howl({
        src: [src],
        loop: key === 'ambient',
        volume: key === 'ambient' ? 0.3 : 0.5,
      });
    });

    // Start ambient music
    sounds.current.ambient.play();

    return () => {
      // Cleanup sounds
      Object.values(sounds.current).forEach(sound => sound.unload());
    };
  }, []);

  const playSound = (name: keyof typeof AUDIO_FILES) => {
    sounds.current[name]?.play();
  };

  return { playSound };
};