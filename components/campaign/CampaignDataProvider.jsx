"use client";

import { createContext, useContext } from "react";
import { useCampaignData } from "./useCampaignData";

const CampaignContext = createContext(null);

/** Una sola lectura de la proyección pública para todas las secciones de la página. */
export function CampaignDataProvider({ children }) {
  const value = useCampaignData();
  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
}

export function useCampaign() {
  const value = useContext(CampaignContext);
  if (!value) throw new Error("useCampaign must be used inside CampaignDataProvider");
  return value;
}
