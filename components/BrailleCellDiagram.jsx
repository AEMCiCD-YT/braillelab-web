"use client";

import { useState } from "react";
import { brailleGridOrder, brailleLetterNames, letterForDots } from "../content/braille";
import { useLocale } from "./useLocale";
import styles from "./BrailleCellDiagram.module.css";

const copy = {
  es: {
    none: "ninguno",
    letter: "letra",
    noLetter: ": no corresponde a una letra del alfabeto básico",
    explorer: "Explorador de una celda Braille de seis puntos",
    title: "Explora una celda",
    clear: "Limpiar patrón",
    group: "Puntos Braille; activa o desactiva cada punto",
    dot: (dot, active) => `Punto ${dot}: ${active ? "activo" : "inactivo"}`,
    pattern: "Patrón actual:",
    dots: "puntos",
    hint: "Activa o desactiva puntos para descubrir qué letra forman.",
  },
  en: {
    none: "none",
    letter: "letter",
    noLetter: ": not a letter of the basic alphabet",
    explorer: "Six-dot Braille cell explorer",
    title: "Explore a cell",
    clear: "Clear pattern",
    group: "Braille dots; turn each dot on or off",
    dot: (dot, active) => `Dot ${dot}: ${active ? "raised" : "lowered"}`,
    pattern: "Current pattern:",
    dots: "dots",
    hint: "Turn dots on or off to discover which letter they form.",
  },
};

export default function BrailleCellDiagram() {
  const t = copy[useLocale()];
  const [activeDots, setActiveDots] = useState([1, 4]);
  const activeLabel = activeDots.length ? [...activeDots].sort((a, b) => a - b).join(", ") : t.none;
  const letter = letterForDots(activeDots);
  // Los nombres de las letras solo se muestran en español, donde evitan confundir «l» con «1».
  const letterName = letter && t === copy.es ? <> ({brailleLetterNames[letter]})</> : null;
  const letterLabel = !activeDots.length ? "" : letter ? <>: {t.letter} <b className={styles.letter}>«{letter}»</b>{letterName}</> : t.noLetter;

  function toggleDot(dot) {
    setActiveDots((current) => current.includes(dot) ? current.filter((item) => item !== dot) : [...current, dot]);
  }

  return <section className={styles.cell} aria-label={t.explorer}><div className={styles.header}><p>{t.title}</p><button type="button" onClick={() => setActiveDots([])}>{t.clear}</button></div><div className={styles.grid} role="group" aria-label={t.group}>{brailleGridOrder.map((dot) => <button key={dot} type="button" aria-pressed={activeDots.includes(dot)} aria-label={t.dot(dot, activeDots.includes(dot))} onClick={() => toggleDot(dot)}>{dot}</button>)}</div><p className={styles.state} aria-live="polite"><b>{t.pattern}</b> {t.dots} {activeLabel}{letterLabel}.</p><p className={styles.hint}>{t.hint}</p></section>;
}
