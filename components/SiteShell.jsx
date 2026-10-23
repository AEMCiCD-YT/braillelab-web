"use client";

import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { challengeAction, challengeStatus, site } from "../content/site";
import { brandAssets } from "../content/brand";
import { counterpartPath, localeFromPath, localizePath } from "../lib/i18n.mjs";
import styles from "./SiteShell.module.css";

const copy = {
  es: {
    links: [
      ["/reto", "El reto"],
      ["/participar", "Participar"],
      ["/cronograma", "Cronograma"],
      ["/recursos", "Recursos"],
      ["/braillelab", "BrailleLab"],
      ["/alianzas", "Apoya y colabora"],
      ["/transparencia", "Transparencia"],
    ],
    contacts: ["Información general", "Participantes BrailleTech", "Alianzas y aportes", "Datos personales"],
    skip: "Saltar al contenido principal",
    syncing: "Sincronizando estado de la edición",
    open: "Abrir navegación",
    close: "Cerrar navegación",
    mainNav: "Navegación principal",
    tagline: "Investigación aplicada, aprendizaje y tecnología Braille accesible.",
    coorg: "BrailleTech Challenge Ecuador 2027 es una iniciativa de BrailleLab Ecuador, coorganizada por AEMCiCD e IEEE Student Branch — Universidad Yachay Tech.",
    contact: "Contacto",
    privacy: "Aviso de privacidad",
    switchLabel: "EN",
    switchLang: "en",
    switchAria: "Switch to English",
  },
  en: {
    links: [
      ["/reto", "The challenge"],
      ["/participar", "Participate"],
      ["/cronograma", "Schedule"],
      ["/recursos", "Resources"],
      ["/braillelab", "BrailleLab"],
      ["/alianzas", "Support us"],
      ["/transparencia", "Transparency"],
    ],
    contacts: ["General information", "BrailleTech participants", "Partnerships and contributions", "Personal data"],
    skip: "Skip to main content",
    syncing: "Syncing edition status",
    open: "Open navigation",
    close: "Close navigation",
    mainNav: "Main navigation",
    tagline: "Applied research, learning and accessible Braille technology.",
    coorg: "BrailleTech Challenge Ecuador 2027 is a BrailleLab Ecuador initiative, co-organized by AEMCiCD and the IEEE Student Branch — Yachay Tech University.",
    contact: "Contact",
    privacy: "Privacy notice",
    switchLabel: "ES",
    switchLang: "es",
    switchAria: "Ver en español",
  },
};

const contactEmails = [site.contacts.general, site.contacts.participants, site.contacts.partnerships, site.contacts.privacy];

// Con trailingSlash la ruta llega como "/reto/"; los enlaces usan "/reto".
function useCurrentPath() {
  return usePathname()?.replace(/(.)\/$/, "$1");
}

function useCurrentLocale() {
  return localeFromPath(useCurrentPath() || "/");
}

function useChallengeRuntime() {
  const locale = useCurrentLocale();
  const [runtime, setRuntime] = useState(null);

  useEffect(() => {
    function refresh() {
      const now = new Date();
      setRuntime({
        action: challengeAction(now, locale),
        status: challengeStatus(now, locale),
      });
    }

    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, [locale]);

  return runtime;
}

function BrandSignature({ footer = false, onClick, locale }) {
  return (
    <Link
      href={localizePath("/", locale)}
      className={footer ? `${styles.signature} ${styles.footerSignature}` : styles.signature}
      onClick={onClick}
      aria-label="BrailleLab Ecuador — BrailleTech Challenge Ecuador 2027"
    >
      <img
        className={styles.signatureMark}
        src={brandAssets.markNegative}
        alt=""
        aria-hidden="true"
      />
      <span className={styles.signatureWordmark} aria-hidden="true">
        <span className={styles.signatureName}><b>Braille</b><b>Lab</b></span>
        <span className={styles.signatureCountry}>ECUADOR</span>
      </span>
      <span className="sr-only">BrailleLab Ecuador</span>
    </Link>
  );
}

export default function SiteShell({ children }) {
  const pathname = useCurrentPath();
  const locale = localeFromPath(pathname || "/");
  const t = copy[locale];
  const links = t.links.map(([href, label]) => [localizePath(href, locale), label]);
  const footerGroups = [
    ["BrailleTech 2027", links.slice(0, 4)],
    ["BrailleLab", links.slice(4)],
  ];
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const mainRef = useRef(null);
  const runtime = useChallengeRuntime();
  // Solo se destaca en la barra cuando el formulario oficial de inscripción está abierto.
  const registration = runtime?.action?.state === "open" && runtime.action.external ? runtime.action : null;
  const status = runtime?.status || {
    label: site.event.name,
    detail: t.syncing,
  };

  useEffect(() => {
    if (!open) return undefined;

    const firstLink = navRef.current?.querySelector("a");
    window.requestAnimationFrame(() => firstLink?.focus());

    function handleKeyDown(event) {
      if (event.key !== "Escape") return;
      setOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function handleSkip(event) {
    event.preventDefault();
    mainRef.current?.focus();
    mainRef.current?.scrollIntoView({ block: "start" });
  }

  return <>
    <a className={styles.skipLink} href="#main" onClick={handleSkip}>{t.skip}</a>
    <div className={styles.statusBar}>
      <div className={`wrap ${styles.statusInner}`}>
        <span className={styles.statusDot} aria-hidden="true" />
        <b>{status.label}</b>
        <span>{status.detail}</span>
      </div>
    </div>
    <div className={styles.headerBar}>
      <header className={`wrap ${styles.header}`}>
        <BrandSignature locale={locale} onClick={() => setOpen(false)} />
        <button ref={menuButtonRef} className={styles.menuToggle} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav">
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? t.close : t.open}</span>
        </button>
        <nav ref={navRef} id="main-nav" className={open ? `${styles.nav} ${styles.navOpen}` : styles.nav} aria-label={t.mainNav}>
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          {registration ? (
            <a className={`button button-primary ${styles.navCta}`} href={registration.href}>
              {registration.label}<ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : null}
        </nav>
        <a
          className={styles.languageSwitch}
          href={counterpartPath(pathname || "/")}
          hrefLang={t.switchLang}
          lang={t.switchLang}
          aria-label={t.switchAria}
        >
          {t.switchLabel}
        </a>
      </header>
    </div>
    <main ref={mainRef} id="main" tabIndex="-1">{children}</main>
    <footer className={styles.footer}>
      <div className={`wrap ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <BrandSignature footer locale={locale} />
          <p>{t.tagline}</p>
          <p className={styles.footerCoorg}>{t.coorg}</p>
        </div>
        {footerGroups.map(([title, items]) => (
          <div key={title}>
            <p className={styles.footerTitle}>{title}</p>
            <div className={styles.footerLinks}>{items.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</div>
          </div>
        ))}
        <div>
          <p className={styles.footerTitle}>{t.contact}</p>
          <dl className={styles.contact}>
            {contactEmails.map((email, index) => [t.contacts[index], email]).map(([label, email]) => (
              <div key={email}>
                <dt>{label}</dt>
                <dd><a href={`mailto:${email}`}>{email}</a></dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className={`wrap ${styles.footerBottom}`}>
        <span suppressHydrationWarning>© {new Date().getFullYear()} BrailleLab Ecuador</span>
        <Link href={localizePath("/privacidad", locale)}>{t.privacy}</Link>
      </div>
    </footer>
  </>;
}

// Los enlaces internos se escriben con la ruta en español y se traducen al idioma de la página.
export function ArrowLink({ href, children, primary = false, external = false }) {
  const locale = useCurrentLocale();
  const className = `button ${primary ? "button-primary" : "button-secondary"}`;
  if (external) return <a href={href} className={className}>{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
  return <Link href={localizePath(href, locale)} className={className}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}

const scheduleLabels = { es: "Consultar cronograma", en: "View the schedule" };

// La acción cambia con la etapa; si apunta a la página actual o al destino del botón
// vecino (`avoid`), se muestra `fallback` para no repetir el mismo enlace.
export function EventActionLink({ primary = false, avoid = [], fallback }) {
  const pathname = useCurrentPath();
  const locale = localeFromPath(pathname || "/");
  const runtime = useChallengeRuntime();
  const scheduleAction = { label: scheduleLabels[locale], href: "/cronograma", external: false };
  let action = runtime?.action || scheduleAction;
  if (!action.external && (localizePath(action.href, locale) === pathname || avoid.includes(action.href))) action = fallback || scheduleAction;
  return <ArrowLink href={action.href} primary={primary} external={action.external}>{action.label}</ArrowLink>;
}

export function EventStatusLine() {
  const locale = useCurrentLocale();
  const runtime = useChallengeRuntime();
  const status = runtime?.status || {
    label: site.event.shortName,
    detail: copy[locale].syncing,
  };
  return <span aria-live="polite">{status.label} · {status.detail}</span>;
}
