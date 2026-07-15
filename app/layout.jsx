import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { AuthProvider } from "@/lib/auth-context";
import FloatingSpamCheck from "@/components/floating-spam-check";
import GoogleTranslator from "@/components/GoogleTranslator";

export const metadata = {
  title: "EmpowerMSME — Funding & Growth Platform for Small Businesses",
  description:
    "EmpowerMSME connects small and medium enterprises with alternative financing, AI credit scoring, a learning academy, and an investor marketplace.",
  generator: "v0.app",
};

/**
 * Inline script that runs SYNCHRONOUSLY before the browser paints a single
 * pixel. It restores the `googtrans` cookie from localStorage so that when
 * the Google Translate engine loads, the cookie is already in place and
 * translation begins immediately — eliminating the Flash Of Untranslated
 * Content (FOUC) that causes the "slow translation" perception.
 */
const COOKIE_RESTORE_SCRIPT = `
(function () {
  try {
    var lang = localStorage.getItem('gt_preferred_lang');
    if (lang && lang !== 'en') {
      var v = '/en/' + lang;
      document.cookie = 'googtrans=' + encodeURIComponent(v) + '; path=/; SameSite=Lax';
      document.cookie = 'googtrans=' + encodeURIComponent(v) + '; path=/; domain=' + location.hostname + '; SameSite=Lax';
    } else if (!lang || lang === 'en') {
      // Clear any stale googtrans cookie so English is shown cleanly
      document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
      document.cookie = 'googtrans=; path=/; domain=' + location.hostname + '; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
         * ── PERFORMANCE: DNS prefetch + preconnect ──────────────────────────
         * These tell the browser to open a TCP+TLS connection to Google's
         * translation servers BEFORE the script is requested. This shaves
         * ~150–400ms off the first translation, making it feel instant.
         */}
        <link rel="dns-prefetch" href="//translate.google.com" />
        <link rel="dns-prefetch" href="//translate.googleapis.com" />
        <link rel="dns-prefetch" href="//www.gstatic.com" />
        <link
          rel="preconnect"
          href="https://translate.google.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://translate.googleapis.com"
          crossOrigin="anonymous"
        />

        {/*
         * ── PRE-PAINT COOKIE RESTORER ───────────────────────────────────────
         * Runs synchronously before any React hydration or Google script.
         * Ensures the googtrans cookie reflects localStorage on every page
         * load/navigation, so the headless engine translates immediately.
         *
         * Note: dangerouslySetInnerHTML is safe here — this is a static,
         * hard-coded string with no user input. The script contains no
         * dynamic values from user data.
         */}
        <script dangerouslySetInnerHTML={{ __html: COOKIE_RESTORE_SCRIPT }} />
      </head>
      <body>
        <AuthProvider>
          <LanguageProvider>
            {children}
            <FloatingSpamCheck />

            {/*
             * GoogleTranslator is a headless engine component.
             * It mounts once at the root, injects the translation script
             * in autoDisplay:false mode, and runs the MutationObserver
             * layout guard. It renders no visible UI.
             */}
            <GoogleTranslator />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
