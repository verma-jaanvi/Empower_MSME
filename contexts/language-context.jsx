"use client";

/**
 * language-context.jsx
 *
 * SHIM — kept for backwards-compatibility with all existing pages/components
 * that call `useLanguage()` / `t()`.
 *
 * Google Translate now handles all actual text translation automatically, so
 * t() simply returns the English key as-is. No JSON dictionaries needed.
 */

import { createContext, useContext } from "react";

const LanguageContext = createContext({
  /** Passthrough: return the key unchanged; Google Translate translates the DOM */
  t: (/** @type {string} */ key) => key,
  lang: "en",
});

/**
 * Wrap your app with this so any component can call useLanguage().
 * It doesn't need to do anything — it just prevents "no provider" errors.
 */
export function LanguageProvider({ children }) {
  return (
    <LanguageContext.Provider value={{ t: (key) => key, lang: "en" }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** @returns {{ t: (key: string) => string, lang: string }} */
export function useLanguage() {
  return useContext(LanguageContext);
}
