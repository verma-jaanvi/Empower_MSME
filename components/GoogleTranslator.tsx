"use client";

/**
 * GoogleTranslator.tsx — Headless Translation Engine (v2)
 *
 * ARCHITECTURE: Cookie-only, no widget.
 *
 * How it works:
 *  1. An inline <script> in layout.jsx (added separately) restores the
 *     googtrans cookie from localStorage BEFORE the page paints, eliminating
 *     the Flash Of Untranslated Content (FOUC).
 *  2. This component mounts the Google Translate script in "headless" mode —
 *     autoDisplay:false means ZERO banner, ZERO toolbar, ZERO layout shift.
 *  3. A MutationObserver watches the <body> style attribute in real-time and
 *     immediately reverts any `top` offset Google tries to inject.
 *  4. The actual language-switching UI lives in NavbarDropdown.tsx.
 */

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (opts: object, id: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

/** Injects the Google Translate JS engine once per page session. */
function injectGoogleTranslateScript() {
  if (document.getElementById("__gt-engine-script")) return;

  // Init callback — headless mode: no banner, no toolbar, no branding
  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,        // ← KEY: suppresses the banner entirely
        includedLanguages:
          "en,hi,mr,gu,pa,ta,te,kn,ml,bn,ur,ar,fr,de,es,zh-CN,ja",
      },
      "__gt-engine-container"
    );
  };

  const script = document.createElement("script");
  script.id = "__gt-engine-script";
  // Load ASYNC — non-blocking for page render
  script.src =
    "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.head.appendChild(script);
}

/**
 * MutationObserver guard — Google's script forces `top: 40px` on <body>.
 * This observer detects that mutation and reverts it within the same tick.
 */
function installLayoutGuard() {
  const reset = (el: HTMLElement) => {
    if (el.style.top && el.style.top !== "0px") {
      el.style.top = "0px";
    }
  };

  const observer = new MutationObserver(() => {
    reset(document.body);
    reset(document.documentElement);
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["style"],
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
  });

  return () => observer.disconnect();
}

export default function GoogleTranslator() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // 1. Boot the headless translation engine
    injectGoogleTranslateScript();

    // 2. Protect layout from Google's inline-style injection
    const cleanup = installLayoutGuard();

    return cleanup;
  }, []);

  // Render a hidden container where Google's engine anchors itself.
  // It is absolutely positioned off-screen and aria-hidden.
  return (
    <div
      id="__gt-engine-container"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
        visibility: "hidden",
      }}
    />
  );
}
