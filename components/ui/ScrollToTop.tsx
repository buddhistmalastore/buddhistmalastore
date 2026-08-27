"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`
        fixed
        bottom-[100px]
        right-6
        z-[80]

        flex
        h-12
        w-12
        items-center
        justify-center

        rounded-full

        border
        border-[#C79B2A]

        bg-[#1A1A1A]
        text-[#F5D98A]

        shadow-[0_10px_30px_rgba(0,0,0,0.18)]

        transition-all
        duration-500

        hover:-translate-y-1
        hover:bg-[#C79B2A]
        hover:text-white
        hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]

        ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }
      `}
    >
      <FiArrowUp
        size={20}
        strokeWidth={2}
      />
    </button>
  );
}