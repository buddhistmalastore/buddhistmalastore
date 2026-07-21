"use client";

import { useEffect } from "react";

export default function useCamera() {
  useEffect(() => {
    const mouse = {
      x: 0,
      y: 0,
    };

    const handleMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);
}