"use client";

import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

function Mark() {
  return <span className="brand-mark" aria-hidden="true">{Array.from({ length: 6 }).map((_, index) => <i key={index} />)}</span>;
}

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

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const runtime = useChallengeRuntime();
  const status = runtime?.status || {
    label: site.event.name,
    detail: "Edición 2027 en preparación",
  };

  return <>
    <a className="skip-link" href="#main">Saltar al contenido principal</a>
    <div className="status-bar"><div className="wrap status-inner"><span aria-hidden="true" /><b>{status.label}</b><span>{status.detail}</span></div></div>
    <header className="header wrap">
      <Link href="/" className="brand" onClick={() => setOpen(false)}><Mark /><span><b>BrailleLab Ecuador</b><small>BrailleTech Challenge 2027</small></span></Link>
      <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav">{open ? <X /> : <Menu />}<span className="sr-only">{open ? "Cerrar" : "Abrir"} navegación</span></button>
      <nav id="main-nav" className={open ? "open" : ""} aria-label="Navegación principal">
        {links.map(([href, label]) => <Link key={href} href={href} className={pathname === href ? "active" : ""} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
    </header>
    <main id="main" tabIndex="-1">{children}</main>
    <footer className="footer"><div className="wrap footer-grid"><div><Link href="/" className="brand footer-brand"><Mark /><span><b>BrailleLab Ecuador</b><small>BrailleTech Challenge 2027</small></span></Link><p>Investigación aplicada, aprendizaje y tecnología Braille accesible.</p></div><div><p className="footer-title">Explora</p>{links.slice(0, 4).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</div><div><p className="footer-title">Datos y contacto</p><div className={styles.contact}><a href={`mailto:${site.contact}`}>{site.contact}</a><Link href="/privacidad">Aviso de privacidad</Link></div></div></div><div className="wrap footer-bottom"><span>Actualizado el {site.updatedAtLabel}</span><span>{site.event.name}</span></div></footer>
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
