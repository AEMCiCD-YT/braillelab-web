"use client";

import { useEffect, useState } from "react";
import { ArrowLink } from "./SiteShell";
import { registrationAction, registrationStatus } from "../content/site";
import { getTimelineState } from "../content/timeline";
import styles from "./ParticipationState.module.css";

function getRuntime(now) {
  const action = registrationAction(now);
  const status = registrationStatus(now);
  const timeline = getTimelineState(now);

  let label = "Próximamente";
  let copy = "Puedes formar tu equipo y preparar la información antes de la apertura del formulario oficial.";

  if (action.state === "open" || action.state === "open-pending") {
    label = "Convocatoria abierta";
    copy = "La ventana de inscripción 2027 está activa. Completa la postulación antes del cierre oficial.";
  } else if (action.state === "closed") {
    label = "Inscripciones cerradas";
    copy = timeline.nextEvent
      ? `La inscripción terminó. El siguiente hito programado es ${timeline.nextEvent.title} · ${timeline.nextEvent.date}.`
      : "La edición 2027 terminó. Consulta BrailleLab Ecuador para conocer la continuidad del programa.";
  }

  return { action, status, label, copy };
}

export default function ParticipationState() {
  const [runtime, setRuntime] = useState({
    action: { label: "Preparar participación", href: "/recursos", external: false, state: "upcoming" },
    status: "Inscripciones: 13–31 de enero de 2027",
    label: "Próximamente",
    copy: "Puedes formar tu equipo y preparar la información antes de la apertura del formulario oficial.",
  });

  useEffect(() => {
    function refresh() {
      setRuntime(getRuntime(new Date()));
    }

    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const fallbackHref = runtime.action.state === "upcoming" ? "/recursos" : runtime.action.href;
  const fallbackLabel = runtime.action.state === "upcoming" ? "Revisar recursos 2027" : runtime.action.label;

  return (
    <section className={styles.state} aria-labelledby="participation-state-title">
      <div className={styles.copy}>
        <span>{runtime.label}</span>
        <h2 id="participation-state-title">{runtime.status}</h2>
        <p>{runtime.copy}</p>
      </div>
      <div className={styles.window}>
        <div>
          <small>Apertura</small>
          <strong>13 ene. 2027</strong>
          <span>09h00</span>
        </div>
        <div>
          <small>Cierre</small>
          <strong>31 ene. 2027</strong>
          <span>23h59</span>
        </div>
      </div>
      <div className={styles.action}>
        <ArrowLink href={fallbackHref} primary external={runtime.action.external}>{fallbackLabel}</ArrowLink>
      </div>
    </section>
  );
}
