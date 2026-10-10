import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Section from "../../components/Section";
import { CampaignDataProvider } from "../../components/campaign/CampaignDataProvider";
import CampaignProgress from "../../components/campaign/CampaignProgress";
import ContributionReport from "../../components/campaign/ContributionReport";
import PublishedSupporters from "../../components/campaign/PublishedSupporters";
import TransferInstructions from "../../components/campaign/TransferInstructions";
import { campaign, modalities, usd } from "../../content/campaign";
import { site } from "../../content/site";
import { coorganizers } from "../../content/brand";
import styles from "./alianzas.module.css";
import { buildMetadata } from "../../content/metadata";

export const metadata = buildMetadata({
  path: "/alianzas",
  title: "Apoya y colabora · BrailleLab Ecuador 2027",
  description:
    "Apoya BrailleLab Ecuador y BrailleTech Challenge Ecuador 2027: meta, presupuesto aprobado, donaciones, patrocinio, aportes en especie, mentoría y aviso de transferencia con comprobante.",
  keywords: ["donar BrailleLab", "apoyar BrailleTech 2027", "patrocinio BrailleTech 2027", "aporte en especie"],
});

const mail = (subject) => `mailto:${site.contacts.partnerships}?subject=${encodeURIComponent(subject)}`;

export default function AlianzasPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Apoya y colabora" title="Tu apoyo convierte prototipos en tecnología Braille accesible." visual="alliances" accent="signal">
        Personas, empresas e instituciones pueden financiar materiales, aportar bienes, patrocinar o acompañar a los equipos de
        BrailleTech Challenge Ecuador 2027, la edición 2027 de BrailleLab Ecuador.
      </PageHero>

      <CampaignDataProvider>
        <Section id="proposito" layout="split" eyebrow="Propósito" title="Materiales para que 10 equipos construyan y documenten prototipos Braille abiertos.">
          <div className={styles.purposeCopy}>
            <p>
              BrailleLab Ecuador es el programa permanente; el Challenge 2027 es su edición actual. La campaña financia kits,
              prototipado y continuidad técnica de los equipos que avancen tras la revisión de diseño, con resultados
              reproducibles: hardware abierto, documentación y validación con personas usuarias.
            </p>
            <p className={styles.note}>
              El presupuesto de operación del bootcamp y del Demo Day no forma parte de esta meta.
            </p>
          </div>
        </Section>

        <Section
          id="meta"
          tone="soft"
          eyebrow="Meta y avance"
          title={`Meta de ${usd(campaign.goal)} y primer hito de ${usd(campaign.firstMilestone)}.`}
          lede="El efectivo y los aportes en especie se muestran por separado. Solo cuenta el dinero verificado por Tesorería en la cuenta institucional; un aviso enviado o una promesa todavía no es un aporte confirmado."
        >
          <CampaignProgress />
        </Section>

        <Section id="presupuesto" eyebrow="Presupuesto aprobado" title="En qué se usa cada aporte.">
          <div className={styles.budget}>
            {campaign.budgetGroups.map((group) => (
              <article key={group.title}>
                <span>{usd(group.amount)}</span>
                <h3>{group.title}</h3>
                <p>{group.detail}</p>
              </article>
            ))}
          </div>
          <details className={styles.milestone}>
            <summary>Qué cubre el primer hito de {usd(campaign.firstMilestone)}</summary>
            <ul>
              {campaign.milestone.map(([label, amount]) => (
                <li key={label}>
                  <span>{label}</span>
                  <b>{usd(amount)}</b>
                </li>
              ))}
            </ul>
            <p>
              Son asignaciones dentro del presupuesto general, no un presupuesto adicional. Alcanzar el hito no garantiza 10
              dispositivos terminados.
            </p>
          </details>
        </Section>

        <Section id="modalidades" tone="soft" eyebrow="Modalidades" title="Elige cómo colaborar.">
          <div className={styles.modalities}>
            {modalities.map((modality) => (
              <article key={modality.id}>
                <h3>{modality.title}</h3>
                <p>{modality.copy}</p>
                <a className="button button-secondary" href={modality.href ?? mail(modality.subject)}>
                  {modality.action}
                </a>
              </article>
            ))}
          </div>
          <p className={styles.note}>
            Donación y patrocinio tienen reglas distintas: una donación no da derecho a logos, menciones comerciales ni otros
            beneficios. Cualquier contraprestación existe solo si está escrita en un acuerdo aprobado por la asociación.
          </p>
        </Section>

        <Section id="aviso" eyebrow="Cómo aportar" title="Transfiere y reporta tu aporte.">
          <div className={styles.contribute}>
            <div>
              <ol className={styles.steps}>
                <li>Transfiere a la cuenta institucional con las instrucciones autorizadas.</li>
                <li>Envía el aviso con tu comprobante. No necesitas cuenta ni inicio de sesión.</li>
                <li>Tesorería verifica el movimiento en el banco. Solo entonces cuenta en el avance.</li>
              </ol>
              <TransferInstructions />
            </div>
            <ContributionReport titleClassName={styles.formTitle} />
          </div>
        </Section>

        <Section
          id="apoyos"
          tone="soft"
          eyebrow="Apoyos publicados"
          title="Gracias a quienes autorizan su reconocimiento."
          lede="Nombres, logos y montos aparecen solo con autorización expresa. Las organizaciones con logo tienen un acuerdo vigente; la etiqueta «Patrocinador» corresponde únicamente a un patrocinio aprobado."
        >
          <PublishedSupporters />
        </Section>
      </CampaignDataProvider>

      <Section
        id="coorganizacion"
        layout="split"
        eyebrow="Coorganización 2027"
        title="El Challenge se articula desde la comunidad universitaria."
        lede={<>
          Los fondos se reciben en la cuenta institucional de AEMCiCD y su uso requiere las autorizaciones de la asociación.
          Propuestas de patrocinio, especie o mentoría: <a className={styles.inlineLink} href={mail("Apoya y colabora — BrailleLab 2027")}>{site.contacts.partnerships}</a>.
        </>}
      >
        <ul className={styles.coorganizers}>
          {coorganizers.map((org) => (
            <li key={org.id}>
              <img src={org.logo} alt={org.alt} width={org.width} height={org.height} loading="lazy" />
              <span>{org.name}</span>
            </li>
          ))}
        </ul>
      </Section>
    </SiteShell>
  );
}
