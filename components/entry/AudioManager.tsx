"use client";

import { useEffect } from "react";
import { ambience } from "@/lib/audio";

export default function AudioManager() {
  useEffect(() => {
    const unlock = async () => {
      if (!ambience.playing()) {
        ambience.play();

        ambience.fade(0, 0.18, 5000);
      }

      window.removeEventListener("pointerdown", unlock);
    };

    window.addEventListener("pointerdown", unlock);

    return () =>
      window.removeEventListener("pointerdown", unlock);
  }, []);

  return null;
}