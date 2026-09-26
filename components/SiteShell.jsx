"use client";

import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { challengeAction, challengeStatus, site } from "../content/site";
import styles from "./SiteShell.module.css";

const links = [
  ["/reto", "El reto"],
  ["/participar", "Participar"],
  ["/cronograma", "Cronograma"],
  ["/recursos", "Recursos"],
  ["/braillelab", "BrailleLab"],
  ["/alianzas", "Aliados"],
];

function useChallengeRuntime() {
  const [runtime, setRuntime] = useState(null);

  useEffect(() => {
    function refresh() {
      const now = new Date();
      setRuntime({
        action: challengeAction(now),
        status: challengeStatus(now),
      });
    }

    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return runtime;
}

function BrandSignature({ footer = false, onClick }) {
  return (
    <Link
      href="/"
      className={footer ? `${styles.signature} ${styles.footerSignature}` : styles.signature}
      onClick={onClick}
      aria-label="BrailleLab Ecuador — BrailleTech Challenge Ecuador 2027"
    >
      <span className={styles.signatureCopy}>
        <b>BrailleLab Ecuador</b>
        <small>
          BrailleTech Challenge Ecuador <span className={styles.edition}>2027</span>
        </small>
      </span>
    </Link>
  );
}

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const mainRef = useRef(null);
  const runtime = useChallengeRuntime();
  const status = runtime?.status || {
    label: site.event.name,
    detail: "Edición 2027 en preparación",
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
    <a className={styles.skipLink} href="#main" onClick={handleSkip}>Saltar al contenido principal</a>
    <div className={styles.statusBar}>
      <div className={`wrap ${styles.statusInner}`}>
        <span className={styles.statusDot} aria-hidden="true" />
        <b>{status.label}</b>
        <span>{status.detail}</span>
      </div>
    </div>
    <header className={`wrap ${styles.header}`}>
      <BrandSignature onClick={() => setOpen(false)} />
      <button ref={menuButtonRef} className={styles.menuToggle} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav">
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span className="sr-only">{open ? "Cerrar" : "Abrir"} navegación</span>
      </button>
      <nav ref={navRef} id="main-nav" className={open ? `${styles.nav} ${styles.navOpen}` : styles.nav} aria-label="Navegación principal">
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
      </nav>
    </header>
    <main ref={mainRef} id="main" tabIndex="-1">{children}</main>
    <footer className={styles.footer}>
      <div className={`wrap ${styles.footerGrid}`}>
        <div>
          <BrandSignature footer />
          <p>Investigación aplicada, aprendizaje y tecnología Braille accesible.</p>
        </div>
        <div>
          <p className={styles.footerTitle}>Explora</p>
          <div className={styles.footerLinks}>{links.slice(0, 4).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</div>
        </div>
        <div>
          <p className={styles.footerTitle}>Datos y contacto</p>
          <div className={styles.contact}>
            <a href={`mailto:${site.contact}`}>{site.contact}</a>
            <Link href="/privacidad">Aviso de privacidad</Link>
          </div>
        </div>
      </div>
      <div className={`wrap ${styles.footerBottom}`}>
        <span>Actualizado el {site.updatedAtLabel}</span>
        <span>{site.event.name}</span>
      </div>
    </footer>
  </>;
}

export function ArrowLink({ href, children, primary = false, external = false }) {
  const className = `button ${primary ? "button-primary" : "button-secondary"}`;
  if (external) return <a href={href} className={className}>{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
  return <Link href={href} className={className}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}

export function EventActionLink({ primary = false }) {
  const runtime = useChallengeRuntime();
  const action = runtime?.action || { label: "Consultar cronograma", href: "/cronograma", external: false };
  return <ArrowLink href={action.href} primary={primary} external={action.external}>{action.label}</ArrowLink>;
}

export function EventStatusLine() {
  const runtime = useChallengeRuntime();
  const status = runtime?.status || {
    label: "Edición 2027 en preparación",
    detail: "Predifusión nacional: 1–18 de diciembre de 2026",
  };
  return <span aria-live="polite">{status.label} · {status.detail}</span>;
}
