"use client";

import { useState } from "react";
import { brailleGridOrder, brailleLetterNames, letterForDots } from "../content/braille";
import styles from "./BrailleCellDiagram.module.css";

export default function BrailleCellDiagram() {
  const [activeDots, setActiveDots] = useState([1, 4]);
  const activeLabel = activeDots.length ? [...activeDots].sort((a, b) => a - b).join(", ") : "ninguno";
  const letter = letterForDots(activeDots);
  const letterLabel = !activeDots.length ? "" : letter ? <>: letra <b className={styles.letter}>«{letter}»</b> ({brailleLetterNames[letter]})</> : ": no corresponde a una letra del alfabeto básico";

  function toggleDot(dot) {
    setActiveDots((current) => current.includes(dot) ? current.filter((item) => item !== dot) : [...current, dot]);
  }

  return <section className={styles.cell} aria-label="Explorador de una celda Braille de seis puntos"><div className={styles.header}><p>Explora una celda</p><button type="button" onClick={() => setActiveDots([])}>Limpiar patrón</button></div><div className={styles.grid} role="group" aria-label="Puntos Braille; activa o desactiva cada punto">{brailleGridOrder.map((dot) => <button key={dot} type="button" aria-pressed={activeDots.includes(dot)} aria-label={`Punto ${dot}: ${activeDots.includes(dot) ? "activo" : "inactivo"}`} onClick={() => toggleDot(dot)}>{dot}</button>)}</div><p className={styles.state} aria-live="polite"><b>Patrón actual:</b> puntos {activeLabel}{letterLabel}.</p><p className={styles.hint}>Activa o desactiva puntos para descubrir qué letra forman.</p></section>;
}
