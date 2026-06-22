"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "pm-theme";

type ThemeMode = "light" | "dark";

const getDocumentTheme = (): ThemeMode => {
  if (typeof document === "undefined") {
    return "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const subscribe = (onStoreChange: () => void): (() => void) => {
  const obs = new MutationObserver(onStoreChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
};

const getServerSnapshot = (): ThemeMode => "light";

export const useTheme = (): {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggle: () => void;
} => {
  const theme = useSyncExternalStore(subscribe, getDocumentTheme, getServerSnapshot);

  const setTheme = useCallback((mode: ThemeMode) => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored === "dark" || stored === "light") {
        document.documentElement.classList.toggle("dark", stored === "dark");
      }
    } catch {
      /* ignore */
    }
  }, []);

  return { theme, setTheme, toggle };
};
