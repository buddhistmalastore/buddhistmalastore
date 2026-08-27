"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { translations } from "@/lib/translations";

export type LanguageCode =
  | "en"
  | "ne"
  | "hi"
  | "zh"
  | "ja"
  | "ko"
  | "fr"
  | "de"
  | "es";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext =
  createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "site-language";

const supportedLanguages: LanguageCode[] = [
  "en",
  "ne",
  "hi",
  "zh",
  "ja",
  "ko",
  "fr",
  "de",
  "es",
];

function getValue(
  object: unknown,
  path: string
): string | undefined {
  const value = path
    .split(".")
    .reduce<unknown>((current, key) => {
      if (
        current &&
        typeof current === "object" &&
        key in current
      ) {
        return (
          current as Record<string, unknown>
        )[key];
      }

      return undefined;
    }, object);

  return typeof value === "string"
    ? value
    : undefined;
}

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<LanguageCode>("en");

  useEffect(() => {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (
      saved &&
      supportedLanguages.includes(
        saved as LanguageCode
      )
    ) {
      setLanguageState(
        saved as LanguageCode
      );

      document.documentElement.lang = saved;
    } else {
      document.documentElement.lang = "en";
    }
  }, []);

  const setLanguage = (
    newLanguage: LanguageCode
  ) => {
    setLanguageState(newLanguage);

    localStorage.setItem(
      STORAGE_KEY,
      newLanguage
    );

    document.documentElement.lang =
      newLanguage;
  };

  const t = (key: string): string => {
    /*
     * Only languages that currently have
     * translations are read from the dictionary.
     *
     * Other languages automatically fall back
     * to English until their translations are added.
     */

    const languageTranslations =
      (
        translations as Partial<
          Record<
            LanguageCode,
            unknown
          >
        >
      )[language];

    const current = getValue(
      languageTranslations,
      key
    );

    if (current) {
      return current;
    }

    const english = getValue(
      translations.en,
      key
    );

    return english ?? key;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider."
    );
  }

  return context;
}