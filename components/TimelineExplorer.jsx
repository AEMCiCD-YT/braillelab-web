"use client";

import { useEffect, useMemo, useState } from "react";
import { getHighlightedTimelineEvent, getTimelineState, timelineEvents, timelineFilters } from "../content/timeline";
import styles from "./TimelineExplorer.module.css";

export default function TimelineExplorer() {
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(timelineEvents[0]?.id);
  const visibleEvents = useMemo(() => timelineEvents.filter((event) => filter === "all" || event.phase === filter), [filter]);
  const selected = visibleEvents.find((event) => event.id === selectedId) || visibleEvents[0];

  useEffect(() => {
    const highlighted = getHighlightedTimelineEvent(new Date());
    if (highlighted) setSelectedId(highlighted.id);
  }, []);

  function selectFilter(id) {
    setFilter(id);
    const first = timelineEvents.find((event) => id === "all" || event.phase === id);
    if (first) setSelectedId(first.id);
  }

  return <section className={styles.explorer} aria-label="Explorador interactivo del cronograma">
    <div className={styles.filters} role="group" aria-label="Filtrar cronograma por fase">
      {timelineFilters.map((item) => <button key={item.id} type="button" aria-pressed={filter === item.id} className={filter === item.id ? styles.selectedFilter : ""} onClick={() => selectFilter(item.id)}>{item.label}</button>)}
    </div>
    <div className={styles.grid}>
      <ol className={styles.eventList} aria-label="Hitos disponibles">
        {visibleEvents.map((event) => <li key={event.id}><button type="button" className={selected?.id === event.id ? styles.selectedEvent : ""} onClick={() => setSelectedId(event.id)} aria-pressed={selected?.id === event.id}><time>{event.date}</time><span>{event.title}</span><small>{event.phaseLabel}</small></button></li>)}
      </ol>
      {selected && <article className={styles.detail} aria-live="polite">
        <p>Hito seleccionado</p>
        <time>{selected.date}</time>
        <h2>{selected.title}</h2>
        <p>{selected.copy}</p>
        <span>{selected.phaseLabel}</span>
      </article>}
    </div>
  </section>;
}

export function TimelineStatus() {
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    setTimeline(getTimelineState(new Date()));
  }, []);

  const current = timeline?.currentEvent || null;
  const next = timeline?.nextEvent || timelineEvents[0] || null;

  if (current) {
    return <div className={styles.statusHeader} aria-live="polite"><span className={styles.pill}>Hito actual</span><h2>{current.title}</h2><p>{current.date}</p></div>;
  }

  if (next) {
    return <div className={styles.statusHeader} aria-live="polite"><span className={styles.pill}>Próximo hito</span><h2>{next.title}</h2><p>{next.date}</p></div>;
  }

  return <div className={styles.statusHeader} aria-live="polite"><span className={styles.pill}>Edición 2027</span><h2>Proceso finalizado</h2><p>Consulta BrailleLab Ecuador para conocer las siguientes actividades.</p></div>;
}
