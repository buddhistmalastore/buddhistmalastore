"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SoundToggle from "@/components/entry/SoundToggle";
import EnvironmentEngine from "@/components/entry/environment/EnvironmentEngine";
import EntryContent from "@/components/entry/EntryContent";
import LuxuryCursor from "@/components/entry/LuxuryCursor";

export default function Page() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Enable luxury cursor only on intro page
    document.body.classList.add("intro-cursor");

    const introSeen = sessionStorage.getItem("introSeen");

    if (introSeen === "true") {
      document.body.classList.remove("intro-cursor");
      router.replace("/home");
      return;
    }

    setReady(true);

    return () => {
      document.body.classList.remove("intro-cursor");
    };
  }, [router]);

  if (!ready) return null;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Luxury Cursor (Intro Only) */}
      <LuxuryCursor />

      {/* Sound Control */}
      <SoundToggle />

      {/* Background Animation */}
      <EnvironmentEngine />

      {/* Intro Content */}
      <EntryContent />
    </main>
  );
}