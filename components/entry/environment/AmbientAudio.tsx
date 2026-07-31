"use client";

import { useEffect, useRef } from "react";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.18;

    const playAudio = async () => {
      try {
        await audioRef.current?.play();
      } catch (e) {
        console.log("Waiting for user interaction...");
      }
    };

    playAudio();
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/ambience.mp3"
      loop
      preload="auto"
    />
  );
}