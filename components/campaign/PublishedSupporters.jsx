"use client";

import { useEffect, useState } from "react";
import { campaignApi, usd } from "../../content/campaign";
import { useCampaign } from "./CampaignDataProvider";
import styles from "./Campaign.module.css";

/**
 * Apoyos publicados con autorización (aemcicd-platform#19/#20). El sitio no decide quién aparece:
 * muestra exactamente lo que la plataforma publica, y nada cuando no hay datos.
 */
export default function PublishedSupporters() {
  const campaignData = useCampaign();
  const published = campaignData.state === "ready" && Boolean(campaignData.data.links.supporters);
  const [result, setResult] = useState({ state: "idle", items: [] });

  useEffect(() => {
    if (!published) return undefined;
    const controller = new AbortController();
    setResult({ state: "loading", items: [] });
    fetch(campaignApi("/supporters"), { signal: controller.signal, credentials: "omit", cache: "no-cache" })
      .then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        const body = await response.json();
        setResult({ state: "ready", items: body.items });
      })
      .catch((error) => {
        if (error?.name !== "AbortError") setResult({ state: "unavailable", items: [] });
      });
    return () => controller.abort();
  }, [published]);

  if (campaignData.state === "loading" || result.state === "loading") {
    return <p className={styles.dataNotice} role="status">Cargando apoyos…</p>;
  }
  if (!published) {
    return <p className={styles.dataNotice}>Los apoyos se publican solo cuando la persona u organización lo autoriza por escrito. Aún no hay una lista publicada.</p>;
  }
  if (result.state === "unavailable") {
    return <p className={`${styles.dataNotice} ${styles.dataNoticeAlert}`} role="status">No pudimos cargar la lista de apoyos en este momento.</p>;
  }
  if (!result.items.length) {
    return <p className={styles.dataNotice}>Todavía no hay apoyos publicados.</p>;
  }

  const institutions = result.items.filter((item) => item.type === "institution");
  const people = result.items.filter((item) => item.type === "individual");
  return (
    <div className={styles.supporters}>
      {institutions.length > 0 && (
        <ul className={styles.institutions} aria-label="Organizaciones">
          {institutions.map((item) => (
            <li key={`${item.publicName}-${item.publishedAt}`}>
              {item.logoUrl && /^https:\/\//.test(item.logoUrl) ? (
                <img src={item.logoUrl} alt={item.publicName} loading="lazy" referrerPolicy="no-referrer" />
              ) : (
                <strong>{item.publicName}</strong>
              )}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
      {people.length > 0 && (
        <ul className={styles.people} aria-label="Personas">
          {people.map((item) => (
            <li key={`${item.publicName}-${item.publishedAt}`}>
              <strong>{item.publicName}</strong>
              <span>{item.label}{item.amount ? ` · ${usd(item.amount)}` : ""}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
