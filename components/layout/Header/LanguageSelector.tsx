"use client";

import { useEffect, useRef, useState } from "react";
import { Globe2, Check, ChevronDown } from "lucide-react";

const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
  },
  {
    code: "ne",
    name: "Nepali",
    nativeName: "नेपाली",
    flag: "🇳🇵",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
  },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  const selectorRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((item) => item.code === language) || languages[0];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language");

    if (savedLanguage && languages.some((item) => item.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function selectLanguage(code: string) {
    setLanguage(code);
    localStorage.setItem("site-language", code);
    setOpen(false);

    /*
      English is the master language.

      Translation system will be connected here next.
      For now the selected language is persisted so
      the site remembers the customer's choice.
    */
  }

  return (
    <div ref={selectorRef} className="relative">
      {/* Selector Button */}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="
          flex
          items-center
          gap-1.5
          text-sm
          text-[#6B6257]
          transition-colors
          duration-300
          hover:text-[#B88620]
        "
      >
        <Globe2 size={16} strokeWidth={1.8} />

        <span>{currentLanguage.nativeName}</span>

        <ChevronDown
          size={13}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div
          role="listbox"
          className="
            absolute
            right-0
            top-[calc(100%+12px)]
            z-[100]
            w-60
            overflow-hidden
            rounded-2xl
            border
            border-[#E5D9C8]
            bg-[#FFFDF9]
            p-2
            shadow-[0_18px_50px_rgba(50,40,25,0.15)]
          "
        >
          {/* Dropdown Header */}

          <div className="px-3 pb-2 pt-2">
  <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#B88620]">
    Select Language
  </p>
</div>
          <div className="my-1 h-px bg-[#E9E2D8]" />

          {/* Languages */}

          {languages.map((item) => {
            const selected = item.code === language;

            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => selectLanguage(item.code)}
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-left
                  transition-all
                  duration-200
                  ${
                    selected
                      ? "bg-[#F3EBDD] text-[#B88620]"
                      : "text-[#4F4941] hover:bg-[#F8F3EB] hover:text-[#B88620]"
                  }
                `}
              >
                <span className="text-lg">{item.flag}</span>

                <span className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">
                    {item.nativeName}
                  </span>

                  {item.code !== "en" && (
                    <span className="text-[10px] text-[#9A9185]">
                      {item.name}
                    </span>
                  )}
                </span>

                {selected && (
                  <Check
                    size={16}
                    className="text-[#B88620]"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}