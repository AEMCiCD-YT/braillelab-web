"use client";

import { useEffect, useState } from "react";
import { timelineEvents, getTimelineState } from "../content/timeline";
import styles from "./HomeMilestones.module.css";

function buildMilestones(now) {
  const time = now.getTime();
  const { currentEvent } = getTimelineState(now);
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
  const [milestones, setMilestones] = useState(null);

  useEffect(() => {
    function refresh() {
      setMilestones(buildMilestones(new Date()));
    }

    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  if (!milestones) {
    return <p className={styles.loading} role="status">Sincronizando próximos hitos de la edición 2027…</p>;
  }

  return (
    <ol className={styles.list} aria-label="Próximos hitos de BrailleTech Challenge Ecuador 2027">
      {milestones.map((event) => (
        <li key={event.id} className={styles.item}>
          <div className={styles.meta}>
            <span data-status={event.status}>{event.status}</span>
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
