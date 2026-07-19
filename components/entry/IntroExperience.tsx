"use client";

import EntryBackground from "./EntryBackground";
import Sunrise from "./Sunrise";
import LightRays from "./LightRays";
import AnimatedMist from "./AnimatedMist";
import FloatingParticles from "./FloatingParticles";
import EntryContent from "./EntryContent";
import TransitionOverlay from "./TransitionOverlay";
import IntroController from "./IntroController";
import CameraMotion from "./CameraMotion";

export default function IntroExperience() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">

      <IntroController />

      <CameraMotion>

        <EntryBackground />

        <Sunrise />

        <LightRays />

        <AnimatedMist />

        <FloatingParticles />

        <EntryContent />

      </CameraMotion>

      <TransitionOverlay />

    </main>
  );
}