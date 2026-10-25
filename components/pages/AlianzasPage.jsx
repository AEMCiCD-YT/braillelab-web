import SiteShell from "../SiteShell";
import PageHero from "../PageHero";
import Section from "../Section";
import { CampaignDataProvider } from "../campaign/CampaignDataProvider";
import CampaignProgress from "../campaign/CampaignProgress";
import ContributionReport from "../campaign/ContributionReport";
import PublishedSupporters from "../campaign/PublishedSupporters";
import TransferInstructions from "../campaign/TransferInstructions";
import { campaign, getBudgetGroups, getMilestone, getModalities, usd } from "../../content/campaign";
import { site } from "../../content/site";
import { coorganizers } from "../../content/brand";
import styles from "./alianzas.module.css";
import { buildMetadata } from "../../content/metadata";

const meta = {
  es: {
    title: "Apoya y colabora · BrailleLab Ecuador 2027",
    description:
      "Apoya BrailleLab Ecuador y BrailleTech Challenge Ecuador 2027: meta, presupuesto aprobado, donaciones, patrocinio, aportes en especie, mentoría y aviso de transferencia con comprobante.",
    keywords: ["donar BrailleLab", "apoyar BrailleTech 2027", "patrocinio BrailleTech 2027", "aporte en especie"],
  },
  en: {
    title: "Support us · BrailleLab Ecuador 2027",
    description:
      "Support BrailleLab Ecuador and BrailleTech Challenge Ecuador 2027: goal, approved budget, donations, sponsorship, in-kind contributions, mentoring and transfer reports with proof of payment.",
    keywords: ["donate BrailleLab", "support BrailleTech 2027", "sponsor BrailleTech 2027", "in-kind contribution"],
  },
};

export function metadataFor(locale = "es") {
  return buildMetadata({ path: "/alianzas", locale, ...meta[locale] });
}

const copy = {
  es: {
    heroEyebrow: "Apoya y colabora",
    heroTitle: "Tu apoyo construye tecnología Braille accesible.",
    heroCopy: <>
      Personas, empresas e instituciones pueden financiar materiales, aportar bienes, patrocinar o acompañar a los equipos de
      BrailleTech Challenge Ecuador 2027, la edición 2027 de BrailleLab Ecuador.
    </>,
    purposeEyebrow: "Propósito",
    purposeTitle: "Materiales para 10 equipos y sus prototipos abiertos.",
    purpose: <>
      BrailleLab Ecuador es el programa permanente; el Challenge 2027 es su edición actual. La campaña financia kits,
      prototipado y continuidad técnica de los equipos que avancen tras la revisión de diseño, con resultados
      reproducibles: hardware abierto, documentación y validación con personas usuarias.
    </>,
    purposeNote: "El presupuesto de operación del bootcamp y del Demo Day no forma parte de esta meta.",
    goalEyebrow: "Meta y avance",
    goalTitle: (goal, milestone) => `Meta de ${goal} y primer hito de ${milestone}.`,
    goalLede: "El efectivo y los aportes en especie se muestran por separado. Solo cuenta el dinero verificado por Tesorería en la cuenta institucional; un aviso enviado o una promesa todavía no es un aporte confirmado.",
    budgetEyebrow: "Presupuesto aprobado",
    budgetTitle: "En qué se usa cada aporte.",
    milestoneSummary: (amount) => `Qué cubre el primer hito de ${amount}`,
    milestoneNote: <>
      Son asignaciones dentro del presupuesto general, no un presupuesto adicional. Alcanzar el hito no garantiza 10
      dispositivos terminados.
    </>,
    modalitiesEyebrow: "Modalidades",
    modalitiesTitle: "Elige cómo colaborar.",
    modalitiesNote: <>
      Donación y patrocinio tienen reglas distintas: una donación no da derecho a logos, menciones comerciales ni otros
      beneficios. Cualquier contraprestación existe solo si está escrita en un acuerdo aprobado por la asociación.
    </>,
    contributeEyebrow: "Cómo aportar",
    contributeTitle: "Transfiere y reporta tu aporte.",
    steps: [
      "Transfiere a la cuenta institucional con las instrucciones autorizadas.",
      "Envía el aviso con tu comprobante. No necesitas cuenta ni inicio de sesión.",
      "Tesorería verifica el movimiento en el banco. Solo entonces cuenta en el avance.",
    ],
    international: null,
    supportersEyebrow: "Apoyos publicados",
    supportersTitle: "Gracias a quienes autorizan su reconocimiento.",
    supportersLede: "Nombres, logos y montos aparecen solo con autorización expresa. Las organizaciones con logo tienen un acuerdo vigente; la etiqueta «Patrocinador» corresponde únicamente a un patrocinio aprobado.",
    coorgEyebrow: "Coorganización 2027",
    coorgTitle: "El Challenge se articula desde la comunidad universitaria.",
    coorgLede: "Los fondos se reciben en la cuenta institucional de AEMCiCD y su uso requiere las autorizaciones de la asociación. Propuestas de patrocinio, especie o mentoría:",
    coorgSubject: "Apoya y colabora — BrailleLab 2027",
  },
  en: {
    heroEyebrow: "Support us",
    heroTitle: "Your support builds accessible Braille technology.",
    heroCopy: <>
      Individuals, companies and institutions can fund materials, contribute goods, sponsor or mentor the teams of
      BrailleTech Challenge Ecuador 2027, the 2027 edition of BrailleLab Ecuador.
    </>,
    purposeEyebrow: "Purpose",
    purposeTitle: "Materials for 10 teams and their open prototypes.",
    purpose: <>
      BrailleLab Ecuador is the permanent program; the 2027 Challenge is its current edition. The campaign funds kits,
      prototyping and technical continuity for the teams that advance after the design review, with reproducible
      results: open hardware, documentation and validation with Braille users.
    </>,
    purposeNote: "The operating budget for the bootcamp and Demo Day is not part of this goal.",
    goalEyebrow: "Goal and progress",
    goalTitle: (goal, milestone) => `A ${goal} goal and a first milestone of ${milestone}.`,
    goalLede: "Cash and in-kind contributions are shown separately. Only money verified by the Treasurer in the institutional account counts; a submitted report or a pledge is not yet a confirmed contribution.",
    budgetEyebrow: "Approved budget",
    budgetTitle: "How each contribution is used.",
    milestoneSummary: (amount) => `What the first ${amount} milestone covers`,
    milestoneNote: <>
      These are allocations within the overall budget, not an additional budget. Reaching the milestone does not guarantee 10
      finished devices.
    </>,
    modalitiesEyebrow: "Ways to help",
    modalitiesTitle: "Choose how to support.",
    modalitiesNote: <>
      Donations and sponsorships follow different rules: a donation does not grant logos, commercial mentions or other
      benefits. Any benefit exists only if it is set out in an agreement approved by the association.
    </>,
    contributeEyebrow: "How to contribute",
    contributeTitle: "Make a transfer and report your contribution.",
    steps: [
      "Transfer to the institutional account using the authorized instructions.",
      "Send the report with your proof of payment. No account or login needed.",
      "The Treasurer verifies the payment at the bank. Only then does it count toward progress.",
    ],
    international: (email) => <>
      Contributions are currently received by bank transfer to the association&apos;s account in Ecuador. If you are outside Ecuador,
      write to <a href={`mailto:${email}`}>{email}</a> and we will help you coordinate.
    </>,
    supportersEyebrow: "Published supporters",
    supportersTitle: "Thank you to everyone who authorized their recognition.",
    supportersLede: "Names, logos and amounts appear only with explicit permission. Organizations shown with a logo have a current agreement; the “Sponsor” label is used only for an approved sponsorship.",
    coorgEyebrow: "2027 co-organizers",
    coorgTitle: "The Challenge is organized from within the university community.",
    coorgLede: "Funds are received in AEMCiCD's institutional account and their use requires the association's authorization. Sponsorship, in-kind or mentoring proposals:",
    coorgSubject: "Support us — BrailleLab 2027",
  },
};

const mail = (subject) => `mailto:${site.contacts.partnerships}?subject=${encodeURIComponent(subject)}`;

export default function AlianzasPage({ locale = "es" }) {
  const t = copy[locale];
  const money = (amount) => usd(amount, locale);
  return (
    <SiteShell locale={locale}>
      <PageHero locale={locale} eyebrow={t.heroEyebrow} title={t.heroTitle} visual="alliances" accent="signal">
        {t.heroCopy}
      </PageHero>

      <CampaignDataProvider>
        <Section id="proposito" layout="split" eyebrow={t.purposeEyebrow} title={t.purposeTitle}>
          <div className={styles.purposeCopy}>
            <p>{t.purpose}</p>
            <p className={styles.note}>{t.purposeNote}</p>
          </div>
        </Section>

        <Section
          id="meta"
          tone="soft"
          eyebrow={t.goalEyebrow}
          title={t.goalTitle(money(campaign.goal), money(campaign.firstMilestone))}
          lede={t.goalLede}
        >
          <CampaignProgress />
        </Section>

        <Section id="presupuesto" eyebrow={t.budgetEyebrow} title={t.budgetTitle}>
          <div className={styles.budget}>
            {getBudgetGroups(locale).map((group) => (
              <article key={group.title}>
                <span>{money(group.amount)}</span>
                <h3>{group.title}</h3>
                <p>{group.detail}</p>
              </article>
            ))}
          </div>
          <details className={styles.milestone}>
            <summary>{t.milestoneSummary(money(campaign.firstMilestone))}</summary>
            <ul>
              {getMilestone(locale).map(([label, amount]) => (
                <li key={label}>
                  <span>{label}</span>
                  <b>{money(amount)}</b>
                </li>
              ))}
            </ul>
            <p>{t.milestoneNote}</p>
          </details>
        </Section>

        <Section id="modalidades" tone="soft" eyebrow={t.modalitiesEyebrow} title={t.modalitiesTitle}>
          <div className={styles.modalities}>
            {getModalities(locale).map((modality) => (
              <article key={modality.id}>
                <h3>{modality.title}</h3>
                <p>{modality.copy}</p>
                <a className="button button-secondary" href={modality.href ?? mail(modality.subject)}>
                  {modality.action}
                </a>
              </article>
            ))}
          </div>
          <p className={styles.note}>{t.modalitiesNote}</p>
        </Section>

        <Section id="aviso" eyebrow={t.contributeEyebrow} title={t.contributeTitle}>
          <div className={styles.contribute}>
            <div>
              <ol className={styles.steps}>
                {t.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              {t.international ? <p className={styles.note}>{t.international(site.contacts.partnerships)}</p> : null}
              <TransferInstructions />
            </div>
            <ContributionReport titleClassName={styles.formTitle} />
          </div>
        </Section>

        <Section
          id="apoyos"
          tone="soft"
          eyebrow={t.supportersEyebrow}
          title={t.supportersTitle}
          lede={t.supportersLede}
        >
          <PublishedSupporters />
        </Section>
      </CampaignDataProvider>

      <Section
        id="coorganizacion"
        layout="split"
        eyebrow={t.coorgEyebrow}
        title={t.coorgTitle}
        lede={<>
          {t.coorgLede} <a className={styles.inlineLink} href={mail(t.coorgSubject)}>{site.contacts.partnerships}</a>.
        </>}
      >
        <ul className={styles.coorganizers}>
          {coorganizers.map((org) => (
            <li key={org.id}>
              <img src={org.logo} alt={org.alt} width={org.width} height={org.height} loading="lazy" />
              <span>{locale === "en" ? org.nameEn : org.name}</span>
            </li>
          ))}
        </ul>
      </Section>
    </SiteShell>
  );
}
