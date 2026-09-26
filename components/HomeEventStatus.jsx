"use client";

import { useEffect, useMemo, useState } from "react";
import { EventActionLink } from "./SiteShell";
import { challengeStatus } from "../content/site";
import { getTimelineState } from "../content/timeline";
import styles from "./HomeEventStatus.module.css";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function getCountdown(target, now) {
  const targetMs = target ? Date.parse(target) : Number.NaN;
  if (!Number.isFinite(targetMs)) return null;

  const remaining = Math.max(0, targetMs - now.getTime());
  return {
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
  };
}

function getRuntime(now) {
  const timeline = getTimelineState(now);
  const status = challengeStatus(now);
  const target = timeline.nextEvent;

  let statusCopy = status.detail;
  if (status.state === "prelaunch") {
    statusCopy = "Preparación previa al lanzamiento público.";
  } else if (status.state === "between") {
    statusCopy = "El proceso se encuentra entre etapas programadas.";
  } else if (status.state === "active" && timeline.currentEvent) {
    statusCopy = `${timeline.currentEvent.date} · ${timeline.currentEvent.phaseLabel}`;
  }

  return {
    status,
    statusCopy,
    currentEvent: timeline.currentEvent,
    target,
    countdown: target ? getCountdown(target.startsAt, now) : null,
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function HomeEventStatus() {
  const initial = useMemo(() => ({
    status: {
      label: "Edición 2027 en preparación",
      detail: "Próximo hito: Predifusión nacional · 1–18 dic. 2026",
    },
    statusCopy: "Preparación previa al lanzamiento público.",
    currentEvent: null,
    target: null,
    countdown: null,
  }), []);
  const [runtime, setRuntime] = useState(initial);

  useEffect(() => {
    function refresh() {
      setRuntime(getRuntime(new Date()));
    }

    refresh();
    const interval = window.setInterval(refresh, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const values = [
    ["Días", runtime.countdown ? String(runtime.countdown.days).padStart(2, "0") : "--"],
    ["Horas", runtime.countdown ? pad(runtime.countdown.hours) : "--"],
    ["Min", runtime.countdown ? pad(runtime.countdown.minutes) : "--"],
    ["Seg", runtime.countdown ? pad(runtime.countdown.seconds) : "--"],
  ];

  return (
    <section className={styles.section} aria-labelledby="edition-status-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.status}>
          <span className={styles.eyebrow}>Estado de la edición</span>
          <h2 id="edition-status-title">{runtime.status.label}</h2>
          <p>{runtime.statusCopy}</p>
          <div className={styles.action}><EventActionLink /></div>
        </div>

        <div className={styles.countdown}>
          <div className={styles.countdownHeader}>
            <div>
              <span>Cuenta regresiva</span>
              <strong>{runtime.target ? runtime.target.title : "Edición 2027"}</strong>
            </div>
            <small>{runtime.target ? runtime.target.date : "Proceso finalizado"}</small>
          </div>

          {runtime.target ? (
            <>
              <p className="sr-only">
                Cuenta regresiva al próximo hito: {runtime.target.title}, {runtime.target.date}.
              </p>
              <div className={styles.units} aria-hidden="true">
                {values.map(([label, value]) => (
                  <div className={styles.unit} key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : runtime.currentEvent ? (
            <div className={styles.complete}>
              <strong>Última etapa en curso</strong>
              <span>{runtime.currentEvent.title} · {runtime.currentEvent.date}</span>
            </div>
          ) : (
            <div className={styles.complete}>
              <strong>Edición finalizada</strong>
              <span>Consulta BrailleLab Ecuador para conocer la continuidad del programa.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
