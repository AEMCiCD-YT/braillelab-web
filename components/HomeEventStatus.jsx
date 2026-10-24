"use client";

import { useEffect, useMemo, useState } from "react";
import { challengeStatus } from "../content/site";
import { getTimelineState } from "../content/timeline";
import { useLocale } from "./useLocale";
import { Eyebrow } from "./Visuals";
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

const copy = {
  es: {
    prelaunch: "Preparación previa al lanzamiento público.",
    between: "El proceso se encuentra entre etapas programadas.",
    syncingStatus: "Sincronizando estado de la edición",
    syncingCopy: "Sincronizando el estado y el próximo hito.",
    units: ["Días", "Horas", "Min", "Seg"],
    eyebrow: "Estado de la edición",
    countdown: "Cuenta regresiva",
    edition: "Edición 2027",
    syncing: "Sincronizando…",
    finishedShort: "Proceso finalizado",
    syncingSchedule: "Sincronizando cronograma",
    syncingDetail: "Calculando el próximo hito de la edición 2027.",
    srCountdown: (event) => `Cuenta regresiva al próximo hito: ${event.title}, ${event.date}.`,
    lastStage: "Última etapa en curso",
    finished: "Edición finalizada",
    finishedDetail: "Consulta BrailleLab Ecuador para conocer la continuidad del programa.",
  },
  en: {
    prelaunch: "Preparing for the public launch.",
    between: "The process is between scheduled stages.",
    syncingStatus: "Syncing edition status",
    syncingCopy: "Syncing the status and the next milestone.",
    units: ["Days", "Hours", "Min", "Sec"],
    eyebrow: "Edition status",
    countdown: "Countdown",
    edition: "2027 edition",
    syncing: "Syncing…",
    finishedShort: "Process completed",
    syncingSchedule: "Syncing the schedule",
    syncingDetail: "Finding the next milestone of the 2027 edition.",
    srCountdown: (event) => `Countdown to the next milestone: ${event.title}, ${event.date}.`,
    lastStage: "Final stage in progress",
    finished: "Edition completed",
    finishedDetail: "Visit BrailleLab Ecuador to learn how the program continues.",
  },
};

function getRuntime(now, locale) {
  const t = copy[locale];
  const timeline = getTimelineState(now, locale);
  const status = challengeStatus(now, locale);
  const target = timeline.nextEvent;

  let statusCopy = status.detail;
  if (status.state === "prelaunch") {
    statusCopy = t.prelaunch;
  } else if (status.state === "between") {
    statusCopy = t.between;
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
  const locale = useLocale();
  const t = copy[locale];
  const initial = useMemo(() => ({
    status: {
      label: "BrailleTech Challenge Ecuador 2027",
      detail: copy[locale].syncingStatus,
    },
    statusCopy: copy[locale].syncingCopy,
    currentEvent: null,
    target: null,
    countdown: null,
  }), [locale]);
  const [runtime, setRuntime] = useState(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function refresh() {
      setRuntime(getRuntime(new Date(), locale));
      setReady(true);
    }

    refresh();
    const interval = window.setInterval(refresh, 1000);
    return () => window.clearInterval(interval);
  }, [locale]);

  const values = [
    [t.units[0], runtime.countdown ? String(runtime.countdown.days).padStart(2, "0") : "--"],
    [t.units[1], runtime.countdown ? pad(runtime.countdown.hours) : "--"],
    [t.units[2], runtime.countdown ? pad(runtime.countdown.minutes) : "--"],
    [t.units[3], runtime.countdown ? pad(runtime.countdown.seconds) : "--"],
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.status}>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h2>{runtime.status.label}</h2>
        <p>{runtime.statusCopy}</p>
      </div>

      <div className={styles.countdown}>
        <div className={styles.countdownHeader}>
          <div>
            <span>{t.countdown}</span>
            <strong>{runtime.target ? runtime.target.title : t.edition}</strong>
          </div>
          <small>{!ready ? t.syncing : runtime.target ? runtime.target.date : runtime.currentEvent ? runtime.currentEvent.date : t.finishedShort}</small>
        </div>

        {!ready ? (
          <div className={styles.complete}>
            <strong>{t.syncingSchedule}</strong>
            <span>{t.syncingDetail}</span>
          </div>
        ) : runtime.target ? (
          <>
            <p className="sr-only">{t.srCountdown(runtime.target)}</p>
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
            <strong>{t.lastStage}</strong>
            <span>{runtime.currentEvent.title} · {runtime.currentEvent.date}</span>
          </div>
        ) : (
          <div className={styles.complete}>
            <strong>{t.finished}</strong>
            <span>{t.finishedDetail}</span>
          </div>
        )}
      </div>
    </div>
  );
}
