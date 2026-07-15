"use client";

/**
 * NavbarDropdown.tsx — Native Language Switcher UI
 *
 * MECHANISM (cookie-only, no widget interaction):
 *
 *  1. User picks a language → we write `googtrans=/en/{code}` cookie directly.
 *  2. Cookie is written to BOTH "/" path and domain root so every page sees it.
 *  3. We also persist the choice in localStorage.
 *  4. `window.location.reload()` triggers an immediate page reload.
 *  5. On reload, the headless Google Translate engine (GoogleTranslator.tsx)
 *     reads the cookie that is already in place and silently translates — no
 *     banner, no delay waiting for user interaction.
 *
 * WHY THIS IS FASTER than the widget approach:
 *  - No polling for `.goog-te-combo` select element
 *  - No dispatchEvent round-trip through the widget iframe
 *  - Cookie is set synchronously → reload → engine translates on DOMContentLoaded
 */

import { useState, useEffect, useCallback } from "react";
import { Globe } from "lucide-react";

// ─── Language list ─────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en",    label: "English",         flag: "en" },
  { code: "hi",    label: "हिन्दी",           flag: "🇮🇳" },
  { code: "mr",    label: "मराठी",            flag: "🇮🇳" },
  { code: "gu",    label: "ગુજરાતી",          flag: "🇮🇳" },
  { code: "pa",    label: "ਪੰਜਾਬੀ",          flag: "🇮🇳" },
  { code: "ta",    label: "தமிழ்",            flag: "🇮🇳" },
  { code: "te",    label: "తెలుగు",           flag: "🇮🇳" },
  { code: "kn",    label: "ಕನ್ನಡ",            flag: "🇮🇳" },
  { code: "ml",    label: "മലയാളം",           flag: "🇮🇳" },
  { code: "bn",    label: "বাংলা",            flag: "🇮🇳" },
  { code: "ur",    label: "اردو",             flag: "🇵🇰" },
  { code: "ar",    label: "العربية",          flag: "🇸🇦" },
  { code: "fr",    label: "Français",         flag: "🇫🇷" },
  { code: "de",    label: "Deutsch",          flag: "🇩🇪" },
  { code: "es",    label: "Español",          flag: "🇪🇸" },
  { code: "zh-CN", label: "中文 (简体)",       flag: "🇨🇳" },
  { code: "ja",    label: "日本語",            flag: "🇯🇵" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

const STORAGE_KEY = "gt_preferred_lang";
const DEFAULT_LANG: LangCode = "en";

// ─── Cookie helpers ────────────────────────────────────────────────────────────
/**
 * Write the googtrans cookie in two forms:
 *  • path-only  → picked up by Next.js on-page routes
 *  • domain     → picked up after hard reloads and across subdomains
 */
function writeGoogTransCookie(code: LangCode) {
  const value = code === DEFAULT_LANG ? "" : `/en/${code}`;
  const base = `googtrans=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
  document.cookie = base;
  // domain= version — harmless on localhost (browser ignores invalid domains)
  document.cookie = `${base}; domain=${location.hostname}`;
}

/** Expire the cookie on both forms to restore English. */
function clearGoogTransCookie() {
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = `googtrans=; path=/; ${expire}; SameSite=Lax`;
  document.cookie = `googtrans=; path=/; domain=${location.hostname}; ${expire}; SameSite=Lax`;
}

/** Read the target language from an existing cookie, if any. */
function readLangFromCookie(): LangCode | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((r) => r.startsWith("googtrans="));
  if (!raw) return null;
  const val = decodeURIComponent(raw.split("=").slice(1).join("="));
  // val looks like "/en/hi" or ""
  const parts = val.split("/").filter(Boolean);
  return (parts[1] as LangCode) || DEFAULT_LANG;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function NavbarDropdown() {
  const [current, setCurrent] = useState<LangCode>(DEFAULT_LANG);
  const [isChanging, setIsChanging] = useState(false);

  // Hydrate the dropdown value from localStorage / cookie (never from SSR)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    const fromCookie = readLangFromCookie();
    setCurrent(stored ?? fromCookie ?? DEFAULT_LANG);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const code = e.target.value as LangCode;

      setIsChanging(true);
      setCurrent(code);

      // 1. Persist choice
      localStorage.setItem(STORAGE_KEY, code);

      // 2. Write / clear the googtrans cookie
      if (code === DEFAULT_LANG) {
        clearGoogTransCookie();
      } else {
        writeGoogTransCookie(code);
      }

      // 3. Reload — Google Translate engine reads the cookie on DOMContentLoaded
      //    Use replace() so the translation page is not in browser history
      window.location.reload();
    },
    []
  );

  const selectedLang =
    LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  return (
    <div className="relative inline-flex items-center group notranslate" translate="no">
      {/* Globe icon */}
      <span className="pointer-events-none absolute left-2.5 flex items-center text-muted-foreground group-hover:text-primary transition-colors duration-150">
        <Globe size={14} strokeWidth={2} />
      </span>

      {/* Native <select> — styled with Tailwind */}
      <select
        id="navbar-lang-select"
        value={current}
        onChange={handleChange}
        disabled={isChanging}
        aria-label="Select site language"
        className={[
          // Layout
          "appearance-none pl-7 pr-7 py-1.5",
          // Shape
          "rounded-full border border-border",
          // Colors
          "bg-background/60 text-foreground text-[13px] font-medium",
          // Focus
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
          // Hover
          "hover:border-primary hover:bg-background/90",
          // Transition
          "transition-all duration-150 cursor-pointer",
          // Disabled
          isChanging ? "opacity-50 cursor-wait" : "",
        ].join(" ")}
      >
        {LANGUAGES.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            className="bg-card text-foreground"
          >
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>

      {/* Chevron icon */}
      <span className="pointer-events-none absolute right-2 flex items-center text-muted-foreground">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </span>
    </div>
  );
}
