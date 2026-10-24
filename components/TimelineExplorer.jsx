"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getHighlightedTimelineEvent, getTimelineEvents, getTimelineFilters, getTimelineState } from "../content/timeline";
import { useLocale } from "./useLocale";
import styles from "./TimelineExplorer.module.css";

const copy = {
  es: {
    explorer: "Explorador interactivo del cronograma",
    filters: "Filtrar cronograma por fase",
    events: "Hitos disponibles",
    selected: "Hito seleccionado",
    syncing: "Sincronizando cronograma",
    syncingDetail: "Calculando el hito relevante de la edición 2027.",
    edition: "Edición 2027",
    syncingCurrent: "Calculando el hito vigente.",
    current: "Hito actual",
    next: "Próximo hito",
    finished: "Proceso finalizado",
    finishedDetail: "Consulta BrailleLab Ecuador para conocer las siguientes actividades.",
  },
  en: {
    explorer: "Interactive schedule explorer",
    filters: "Filter the schedule by phase",
    events: "Milestones",
    selected: "Selected milestone",
    syncing: "Syncing the schedule",
    syncingDetail: "Finding the relevant milestone of the 2027 edition.",
    edition: "2027 edition",
    syncingCurrent: "Finding the current milestone.",
    current: "Current milestone",
    next: "Next milestone",
    finished: "Process completed",
    finishedDetail: "Visit BrailleLab Ecuador to learn about upcoming activities.",
  },
};

export default function TimelineExplorer() {
  const locale = useLocale();
  const t = copy[locale];
  const timelineEvents = useMemo(() => getTimelineEvents(locale), [locale]);
  const timelineFilters = getTimelineFilters(locale);
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const filtersRef = useRef(null);
  const visibleEvents = useMemo(() => timelineEvents.filter((event) => filter === "all" || event.phase === filter), [filter, timelineEvents]);
  const selected = selectedId ? (visibleEvents.find((event) => event.id === selectedId) || visibleEvents[0]) : null;

  useEffect(() => {
    const highlighted = getHighlightedTimelineEvent(new Date(), locale);
    if (highlighted) {
      setFilter(highlighted.phase);
      setSelectedId(highlighted.id);
    }
  }, [locale]);

  // En móvil los filtros son una fila desplazable: mantiene visible el filtro activo.
  useEffect(() => {
    const row = filtersRef.current;
    const active = row?.querySelector('[aria-pressed="true"]');
    if (row && active && row.scrollWidth > row.clientWidth) {
      row.scrollLeft = Math.max(0, active.offsetLeft - row.offsetLeft - 16);
    }
  }, [filter]);

  function selectFilter(id) {
    setFilter(id);
    const first = timelineEvents.find((event) => id === "all" || event.phase === id);
    if (first) setSelectedId(first.id);
  }

  return <section className={styles.explorer} aria-label={t.explorer}>
    <div ref={filtersRef} className={styles.filters} role="group" aria-label={t.filters}>
      {timelineFilters.map((item) => <button key={item.id} type="button" aria-pressed={filter === item.id} className={filter === item.id ? styles.selectedFilter : ""} onClick={() => selectFilter(item.id)}>{item.label}</button>)}
    </div>
    <div className={styles.grid}>
      <ol className={styles.eventList} aria-label={t.events}>
        {visibleEvents.map((event) => <li key={event.id}><button type="button" className={selected?.id === event.id ? styles.selectedEvent : ""} onClick={() => setSelectedId(event.id)} aria-pressed={selected?.id === event.id}><time>{event.date}</time><span>{event.title}</span><small>{event.phaseLabel}</small>{selected?.id === event.id ? <span className={styles.inlineDetail}>{event.copy}</span> : null}</button></li>)}
      </ol>
      <article className={styles.detail} aria-live="polite">
        <p>{t.selected}</p>
        {selected ? <>
          <time>{selected.date}</time>
          <h3>{selected.title}</h3>
          <p>{selected.copy}</p>
          <span>{selected.phaseLabel}</span>
        </> : <>
          <h3>{t.syncing}</h3>
          <p>{t.syncingDetail}</p>
        </>}
      </article>
    </div>
  </section>;
}

export function TimelineStatus() {
  const locale = useLocale();
  const t = copy[locale];
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    function refresh() {
      setTimeline(getTimelineState(new Date(), locale));
    }

    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, [locale]);

  if (!timeline) {
    return <div className={styles.statusHeader} aria-live="polite"><span className={styles.pill}>{t.edition}</span><h3>{t.syncing}</h3><p>{t.syncingCurrent}</p></div>;
  }

  const current = timeline.currentEvent || null;
  const next = timeline.nextEvent || null;

  if (current) {
    return <div className={styles.statusHeader} aria-live="polite"><span className={styles.pill}>{t.current}</span><h3>{current.title}</h3><p>{current.date}</p></div>;
  }

  if (next) {
    return <div className={styles.statusHeader} aria-live="polite"><span className={styles.pill}>{t.next}</span><h3>{next.title}</h3><p>{next.date}</p></div>;
  }

  return <div className={styles.statusHeader} aria-live="polite"><span className={styles.pill}>{t.edition}</span><h3>{t.finished}</h3><p>{t.finishedDetail}</p></div>;
}
