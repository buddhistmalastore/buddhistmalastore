"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import WhiteFlash from "./WhiteFlash";
import { templeBell } from "@/lib/audio";

type Props = {
  children: React.ReactNode;
};

export default function EnterTransition({ children }: Props) {
  const router = useRouter();

  const [leaving, setLeaving] = useState(false);

  const handleClick = () => {
    if (leaving) return;

    setLeaving(true);

    // Play bell
    templeBell.stop();
    templeBell.play();

    // Flash starts after bell begins
    setTimeout(() => {
      document.body.classList.add("intro-leaving");
    }, 150);

    // Navigate
    setTimeout(() => {
  sessionStorage.setItem("introSeen", "true");
  router.push("/home");
}, 1100);
  };

  return (
    <>
      <WhiteFlash active={leaving} />

      <div
        onClick={handleClick}
        style={{
          display: "inline-block",
          cursor: "none",
        }}
      >
        {children}
      </div>
    </>
  );
}