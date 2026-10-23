"use client";

import { useEffect, useState } from "react";
import { ArrowLink } from "./SiteShell";
import { useLocale } from "./useLocale";
import { registrationAction, registrationStatus } from "../content/site";
import { getTimelineState } from "../content/timeline";
import styles from "./ParticipationState.module.css";

const copy = {
  es: {
    soon: "Próximamente",
    soonCopy: "Puedes formar tu equipo y preparar la información antes de la apertura del formulario oficial.",
    open: "Convocatoria abierta",
    openCopy: "La ventana de inscripción 2027 está activa. Completa la postulación antes del cierre oficial.",
    closed: "Inscripciones cerradas",
    closedNext: (event) => `La inscripción terminó. El siguiente hito programado es ${event.title} · ${event.date}.`,
    closedEnd: "La edición 2027 terminó. Consulta BrailleLab Ecuador para conocer la continuidad del programa.",
    initialAction: "Revisar recursos 2027",
    initialLabel: "Estado de inscripción",
    initialCopy: "Sincronizando la ventana oficial de participación.",
    officialResources: "Revisar recursos oficiales",
    opens: "Apertura",
    opensDate: "13 ene. 2027",
    opensTime: "09h00",
    closes: "Cierre",
    closesDate: "31 ene. 2027",
    closesTime: "23h59",
  },
  en: {
    soon: "Coming soon",
    soonCopy: "You can form your team and prepare the information before the official form opens.",
    open: "Call for applications open",
    openCopy: "The 2027 registration window is open. Complete your application before the official deadline.",
    closed: "Registration closed",
    closedNext: (event) => `Registration has ended. The next scheduled milestone is ${event.title} · ${event.date}.`,
    closedEnd: "The 2027 edition has ended. Visit BrailleLab Ecuador to learn how the program continues.",
    initialAction: "Review 2027 resources",
    initialLabel: "Registration status",
    initialCopy: "Syncing the official participation window.",
    officialResources: "Review the official resources",
    opens: "Opens",
    opensDate: "Jan 13, 2027",
    opensTime: "09:00",
    closes: "Closes",
    closesDate: "Jan 31, 2027",
    closesTime: "23:59",
  },
};

function getRuntime(now, locale) {
  const t = copy[locale];
  const action = registrationAction(now, locale);
  const status = registrationStatus(now, locale);
  const timeline = getTimelineState(now, locale);

  let label = t.soon;
  let text = t.soonCopy;

  if (action.state === "open" || action.state === "open-pending") {
    label = t.open;
    text = t.openCopy;
  } else if (action.state === "closed") {
    label = t.closed;
    text = timeline.nextEvent ? t.closedNext(timeline.nextEvent) : t.closedEnd;
  }

  return { action, status, label, copy: text };
}

export default function ParticipationState() {
  const locale = useLocale();
  const t = copy[locale];
  const [runtime, setRuntime] = useState({
    action: { label: t.initialAction, href: "/recursos", external: false, state: "upcoming" },
    status: "BrailleTech Challenge Ecuador 2027",
    label: t.initialLabel,
    copy: t.initialCopy,
  });

  useEffect(() => {
    function refresh() {
      setRuntime(getRuntime(new Date(), locale));
    }

    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(interval);
  }, [locale]);

  const needsPreparationLink = runtime.action.state === "upcoming" || runtime.action.state === "open-pending";
  const fallbackHref = needsPreparationLink ? "/recursos" : runtime.action.href;
  const fallbackLabel = runtime.action.state === "open-pending"
    ? t.officialResources
    : runtime.action.state === "upcoming"
      ? t.initialAction
      : runtime.action.label;

  return (
    <div className={styles.state}>
      <div className={styles.copy}>
        <span>{runtime.label}</span>
        <h3>{runtime.status}</h3>
        <p>{runtime.copy}</p>
      </div>
      <div className={styles.window}>
        <div>
          <small>{t.opens}</small>
          <strong>{t.opensDate}</strong>
          <span>{t.opensTime}</span>
        </div>
        <div>
          <small>{t.closes}</small>
          <strong>{t.closesDate}</strong>
          <span>{t.closesTime}</span>
        </div>
      </div>
      <div className={styles.action}>
        <ArrowLink href={fallbackHref} primary external={runtime.action.external}>{fallbackLabel}</ArrowLink>
      </div>
    </div>
  );
}
