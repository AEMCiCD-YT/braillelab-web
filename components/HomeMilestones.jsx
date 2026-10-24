"use client";

import { useEffect, useState } from "react";
import { getTimelineEvents, getTimelineState } from "../content/timeline";
import { useLocale } from "./useLocale";
import styles from "./HomeMilestones.module.css";

// `data-status` conserva el valor en español porque lo usa la hoja de estilos.
const statusLabels = {
  es: { Finalizado: "Finalizado", Ahora: "Ahora", Próximo: "Próximo", Después: "Después" },
  en: { Finalizado: "Completed", Ahora: "Now", Próximo: "Next", Después: "Later" },
};

const copy = {
  es: {
    loading: "Sincronizando próximos hitos de la edición 2027…",
    list: "Próximos hitos de BrailleTech Challenge Ecuador 2027",
  },
  en: {
    loading: "Syncing upcoming milestones of the 2027 edition…",
    list: "Upcoming milestones of BrailleTech Challenge Ecuador 2027",
  },
};

function buildMilestones(now, locale) {
  const timelineEvents = getTimelineEvents(locale);
  const time = now.getTime();
  const { currentEvent } = getTimelineState(now, locale);
  const relevant = timelineEvents.filter((event) => new Date(event.endsAt).getTime() >= time);

  if (!relevant.length) {
    const lastEvent = timelineEvents[timelineEvents.length - 1];
    return lastEvent ? [{ ...lastEvent, status: "Finalizado" }] : [];
  }

  const nextIndex = currentEvent ? 1 : 0;
  return relevant.slice(0, 4).map((event, index) => ({
    ...event,
    status: currentEvent?.id === event.id ? "Ahora" : index === nextIndex ? "Próximo" : "Después",
  }));
}

export default function HomeMilestones() {
  const locale = useLocale();
  const t = copy[locale];
  const [milestones, setMilestones] = useState(null);

  useEffect(() => {
    function refresh() {
      setMilestones(buildMilestones(new Date(), locale));
    }

    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, [locale]);

  if (!milestones) {
    return <p className={styles.loading} role="status">{t.loading}</p>;
  }

  return (
    <ol className={styles.list} aria-label={t.list}>
      {milestones.map((event) => (
        <li key={event.id} className={styles.item}>
          <div className={styles.meta}>
            <span data-status={event.status}>{statusLabels[locale][event.status]}</span>
            <time>{event.date}</time>
          </div>
          <div>
            <h3>{event.title}</h3>
            <p>{event.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
