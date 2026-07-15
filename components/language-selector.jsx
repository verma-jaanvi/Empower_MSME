/**
 * language-selector.jsx — Drop-in shim
 *
 * All existing imports of LanguageSelector across sidebars and public-navbar
 * now resolve to the new NavbarDropdown (cookie-only, no widget).
 */
export { default } from "@/components/NavbarDropdown";
