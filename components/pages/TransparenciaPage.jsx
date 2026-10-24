import SiteShell, { ArrowLink } from "../SiteShell";
import PageHero from "../PageHero";
import Section from "../Section";
import { CampaignDataProvider } from "../campaign/CampaignDataProvider";
import PublishedSupporters from "../campaign/PublishedSupporters";
import TransparencyReport from "../transparency/TransparencyReport";
import { buildMetadata } from "../../content/metadata";

const meta = {
  es: {
    title: "Transparencia · BrailleLab Ecuador 2027",
    description:
      "Presupuesto, ingresos confirmados, gastos pagados, compromisos, disponibilidad y aportes en especie de la campaña BrailleLab Ecuador 2027, con datos verificados por AEMCiCD.",
    keywords: ["transparencia BrailleLab", "presupuesto BrailleTech 2027", "rendición de cuentas"],
  },
  en: {
    title: "Transparency · BrailleLab Ecuador 2027",
    description:
      "Budget, confirmed income, paid expenses, commitments, available funds and in-kind contributions of the BrailleLab Ecuador 2027 campaign, with data verified by AEMCiCD.",
    keywords: ["BrailleLab transparency", "BrailleTech 2027 budget", "accountability"],
  },
};

export function metadataFor(locale = "es") {
  return buildMetadata({ path: "/transparencia", locale, ...meta[locale] });
}

const copy = {
  es: {
    heroEyebrow: "Transparencia · campaña 2027",
    heroTitle: "Lo recaudado, lo utilizado y lo que falta.",
    heroCopy: <>
      Cifras de la campaña BrailleLab Ecuador 2027 tomadas de los registros verificados de Tesorería de AEMCiCD. Se actualizan sin
      cambios en este sitio y nunca incluyen comprobantes originales ni datos personales.
    </>,
    eyebrow: "Apoyos publicados",
    title: "Reconocimientos autorizados.",
    lede: "Solo aparecen personas y organizaciones que autorizaron su reconocimiento, en orden de publicación y sin clasificarlas por monto.",
    action: "Apoya y colabora",
  },
  en: {
    heroEyebrow: "Transparency · 2027 campaign",
    heroTitle: "What was raised, what was spent and what is still needed.",
    heroCopy: <>
      Figures for the BrailleLab Ecuador 2027 campaign, taken from the verified records of AEMCiCD&apos;s Treasurer. They update without
      changes to this website and never include original receipts or personal data.
    </>,
    eyebrow: "Published supporters",
    title: "Authorized recognitions.",
    lede: "Only individuals and organizations that authorized their recognition are listed, in order of publication and not ranked by amount.",
    action: "Support us",
  },
};

export default function TransparenciaPage({ locale = "es" }) {
  const t = copy[locale];
  return (
    <SiteShell locale={locale}>
      <PageHero locale={locale} eyebrow={t.heroEyebrow} title={t.heroTitle} visual="transparency" accent="petrol">
        {t.heroCopy}
      </PageHero>

      <Section id="informe">
        <TransparencyReport />
      </Section>

      <Section
        id="apoyos-publicados"
        tone="soft"
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
        action={<ArrowLink href="/alianzas" primary>{t.action}</ArrowLink>}
      >
        <CampaignDataProvider>
          <PublishedSupporters />
        </CampaignDataProvider>
      </Section>
    </SiteShell>
  );
}
