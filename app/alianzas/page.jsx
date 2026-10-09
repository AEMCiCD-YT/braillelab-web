import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import { Eyebrow } from "../../components/Visuals";
import { CampaignDataProvider } from "../../components/campaign/CampaignDataProvider";
import CampaignProgress from "../../components/campaign/CampaignProgress";
import ContributionNoticeForm from "../../components/campaign/ContributionNoticeForm";
import PublishedSupporters from "../../components/campaign/PublishedSupporters";
import TransferInstructions from "../../components/campaign/TransferInstructions";
import { campaign, modalities, usd } from "../../content/campaign";
import { site } from "../../content/site";
import layout from "../public.module.css";
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
        <section className={`wrap ${layout.section} ${styles.purpose}`} aria-labelledby="proposito">
          <div>
            <Eyebrow>Propósito</Eyebrow>
            <h2 id="proposito">Materiales para que 10 equipos construyan y documenten prototipos Braille abiertos.</h2>
          </div>
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
        </section>

        <section className={layout.surfaceSoft} aria-labelledby="meta">
          <div className="wrap">
            <Eyebrow>Meta y avance</Eyebrow>
            <h2 id="meta">Meta de {usd(campaign.goal)} y primer hito de {usd(campaign.firstMilestone)}.</h2>
            <p className={styles.lede}>
              El efectivo y los aportes en especie se muestran por separado. Solo cuenta el dinero verificado por Tesorería en la
              cuenta institucional; un aviso enviado o una promesa todavía no es un aporte confirmado.
            </p>
            <CampaignProgress />
          </div>
        </section>

        <section className={`wrap ${layout.section}`} aria-labelledby="presupuesto">
          <Eyebrow>Presupuesto aprobado</Eyebrow>
          <h2 id="presupuesto">En qué se usa cada aporte.</h2>
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
        </section>

        <section className={layout.surfaceSoft} aria-labelledby="modalidades">
          <div className="wrap">
            <Eyebrow>Modalidades</Eyebrow>
            <h2 id="modalidades">Elige cómo colaborar.</h2>
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
          </div>
        </section>

        <section className={`wrap ${layout.section} ${styles.contribute}`} id="aviso" aria-labelledby="como-aportar">
          <div>
            <Eyebrow>Cómo aportar</Eyebrow>
            <h2 id="como-aportar">Transfiere y reporta tu aporte.</h2>
            <ol className={styles.steps}>
              <li>Transfiere a la cuenta institucional con las instrucciones autorizadas.</li>
              <li>Envía el aviso con tu comprobante. No necesitas cuenta ni inicio de sesión.</li>
              <li>Tesorería verifica el movimiento en el banco. Solo entonces cuenta en el avance.</li>
            </ol>
            <TransferInstructions />
          </div>
          <div>
            <h3 className={styles.formTitle}>Reportar mi transferencia</h3>
            <ContributionNoticeForm />
          </div>
        </section>

        <section className={layout.surfaceSoft} aria-labelledby="apoyos">
          <div className={`wrap ${styles.supportersSection}`}>
            <div>
              <Eyebrow>Apoyos publicados</Eyebrow>
              <h2 id="apoyos">Gracias a quienes autorizan su reconocimiento.</h2>
              <p className={styles.lede}>
                Nombres, logos y montos aparecen solo con autorización expresa. Las organizaciones con logo tienen un acuerdo
                vigente; la etiqueta «Patrocinador» corresponde únicamente a un patrocinio aprobado.
              </p>
            </div>
            <PublishedSupporters />
          </div>
        </section>
      </CampaignDataProvider>

      <section className={`wrap ${layout.section} ${styles.coorg}`} aria-labelledby="coorganizacion">
        <div>
          <Eyebrow>Coorganización 2027</Eyebrow>
          <h2 id="coorganizacion">El Challenge se articula desde la comunidad universitaria.</h2>
          <p>
            Los fondos se reciben en la cuenta institucional de AEMCiCD y su uso requiere las autorizaciones de la asociación.
            Propuestas de patrocinio, especie o mentoría: <a href={mail("Apoya y colabora — BrailleLab 2027")}>{site.contacts.partnerships}</a>.
          </p>
        </div>
        <div className={styles.names}>
          <span>AEMCiCD · Universidad Yachay Tech</span>
          <span>IEEE Student Branch · Universidad Yachay Tech</span>
        </div>
      </section>
    </SiteShell>
  );
}
