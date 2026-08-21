"use client";

import {
  useEffect,
  useState,
  RefObject,
} from "react";

export default function useStickyBuyBar(
  targetRef: RefObject<HTMLElement | null>
) {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!targetRef.current) return;

      const rect =
        targetRef.current.getBoundingClientRect();

      // Show sticky bar after the buy box
      // scrolls above the viewport.
      setVisible(rect.bottom < 0);
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, [targetRef]);

  return visible;
}