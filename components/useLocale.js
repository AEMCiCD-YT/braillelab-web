"use client";

import { usePathname } from "next/navigation";
import { localeFromPath } from "../lib/i18n.mjs";

/** Idioma de la página actual, deducido de la ruta (/en/... = inglés). */
export function useLocale() {
  return localeFromPath(usePathname() || "/");
}
