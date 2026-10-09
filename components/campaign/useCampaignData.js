"use client";

import { useCallback, useEffect, useState } from "react";
import { campaignApi } from "../../content/campaign";

/**
 * Lee la proyección pública de la campaña (aemcicd-platform#20). Estados distintos para
 * "cargando", "sin configurar", "no publicada" y "no disponible": ninguno se convierte en
 * cifras ni en ceros.
 *
 * state: "loading" | "unconfigured" | "not-published" | "unavailable" | "ready"
 */
export function useCampaignData(path = "") {
  const [result, setResult] = useState({ state: "loading", data: null });

  const load = useCallback(() => {
    const url = campaignApi(path);
    if (!url) {
      setResult({ state: "unconfigured", data: null });
      return () => {};
    }
    const controller = new AbortController();
    setResult((current) => ({ state: "loading", data: current.data }));
    fetch(url, { signal: controller.signal, credentials: "omit", cache: "no-cache", headers: { Accept: "application/json" } })
      .then(async (response) => {
        if (response.ok) {
          setResult({ state: "ready", data: await response.json() });
          return;
        }
        const body = await response.json().catch(() => null);
        if (response.status === 404 && (body?.code === "CAMPAIGN_NOT_PUBLISHED" || body?.code === "SECTION_NOT_PUBLISHED")) {
          setResult({ state: "not-published", data: null });
          return;
        }
        setResult({ state: "unavailable", data: null });
      })
      .catch((error) => {
        if (error?.name !== "AbortError") setResult({ state: "unavailable", data: null });
      });
    return () => controller.abort();
  }, [path]);

  useEffect(() => load(), [load]);

  return { ...result, retry: load };
}
