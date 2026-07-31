"use client";

import SceneEngine from "./SceneEngine";
import EnvironmentEngine from "./environment/EnvironmentEngine";
import EntryContent from "./EntryContent";

export default function IntroExperience() {
  return (
    <section className="fixed inset-0 overflow-hidden bg-black">
      <SceneEngine>

        <EnvironmentEngine />

        <EntryContent />

      </SceneEngine>
    </section>
  );
}