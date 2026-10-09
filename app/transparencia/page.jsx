import SiteShell, { ArrowLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Section from "../../components/Section";
import { CampaignDataProvider } from "../../components/campaign/CampaignDataProvider";
import PublishedSupporters from "../../components/campaign/PublishedSupporters";
import TransparencyReport from "../../components/transparency/TransparencyReport";
import { buildMetadata } from "../../content/metadata";

export const metadata = buildMetadata({
  path: "/transparencia",
  title: "Transparencia · BrailleLab Ecuador 2027",
  description:
    "Presupuesto, ingresos confirmados, gastos pagados, compromisos, disponibilidad y aportes en especie de la campaña BrailleLab Ecuador 2027, con datos verificados por AEMCiCD.",
  keywords: ["transparencia BrailleLab", "presupuesto BrailleTech 2027", "rendición de cuentas"],
});

export default function TransparenciaPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Transparencia · campaña 2027" title="Lo recaudado, lo utilizado y lo que falta." visual="transparency" accent="petrol">
        Cifras de la campaña BrailleLab Ecuador 2027 tomadas de los registros verificados de Tesorería de AEMCiCD. Se actualizan sin
        cambios en este sitio y nunca incluyen comprobantes originales ni datos personales.
      </PageHero>

      <Section id="informe">
        <TransparencyReport />
      </Section>

      <Section
        id="apoyos-publicados"
        tone="soft"
        eyebrow="Apoyos publicados"
        title="Reconocimientos autorizados."
        lede="Solo aparecen personas y organizaciones que autorizaron su reconocimiento, en orden de publicación y sin clasificarlas por monto."
        action={<ArrowLink href="/alianzas" primary>Apoya y colabora</ArrowLink>}
      >
        <CampaignDataProvider>
          <PublishedSupporters />
        </CampaignDataProvider>
      </Section>
    </SiteShell>
  );
}
