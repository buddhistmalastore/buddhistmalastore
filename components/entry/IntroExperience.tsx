"use client";

import SceneEngine from "./SceneEngine";
import EnvironmentEngine from "./environment/EnvironmentEngine";

import BirdFlock from "./BirdFlock";
import FloatingParticles from "./FloatingParticles";
import LightRays from "./LightRays";
import TempleBell from "./TempleBell";

import EntryContent from "./EntryContent";
import IntroController from "./IntroController";
import TransitionOverlay from "./TransitionOverlay";

export default function IntroExperience() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">

      <SceneEngine>

  <EnvironmentEngine />

  <LightRays />

  <BirdFlock />

  <FloatingParticles />

  <TempleBell />

  <EntryContent />

</SceneEngine>

    </main>
  );
}