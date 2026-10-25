import Link from "next/link";
import SiteShell from "../SiteShell";
import { Eyebrow } from "../Visuals";
import styles from "./privacidad.module.css";
import { buildMetadata } from "../../content/metadata";
import { CONTRIBUTION_PRIVACY_VERSION } from "../../content/campaign";
import { site } from "../../content/site";
import { GOOGLE_ADS_ID } from "../../lib/google-ads.mjs";

const meta = {
  es: {
    title: "Aviso de privacidad · BrailleTech 2027",
    description: "Aviso de privacidad y tratamiento de datos personales para la inscripción en BrailleTech Challenge Ecuador 2027 y para los avisos de aporte a la campaña BrailleLab Ecuador 2027.",
    keywords: ["privacidad BrailleTech 2027", "tratamiento de datos", "privacidad aportes BrailleLab"],
  },
  en: {
    title: "Privacy notice · BrailleTech 2027",
    description: "Privacy notice and personal data processing for registration in BrailleTech Challenge Ecuador 2027 and for contribution reports to the BrailleLab Ecuador 2027 campaign.",
    keywords: ["BrailleTech 2027 privacy", "data processing", "BrailleLab contributions privacy"],
  },
};

export function metadataFor(locale = "es") {
  return buildMetadata({ path: "/privacidad", locale, ...meta[locale] });
}

// El aviso en español es la versión que rige; la traducción al inglés es informativa.
function SpanishNotice() {
  return <>
    <Eyebrow>Versión 1.1 · 25 de octubre de 2026</Eyebrow>
    <h1>Aviso de privacidad y tratamiento de datos</h1>
    <p className={styles.lede}>
      Este aviso cubre la inscripción en BrailleTech Challenge Ecuador 2027 (secciones 1 a 5), los{" "}
      <a href="#aportes">avisos de aporte a la campaña BrailleLab Ecuador 2027</a> (sección 6) y la{" "}
      <a href="#medicion">medición de anuncios en este sitio</a> (sección 7).
    </p>
    <p className={styles.lede}>
      Inscripción BrailleTech Challenge Ecuador 2027. Vigencia propuesta desde la apertura del formulario hasta su sustitución por una versión posterior publicada en los canales oficiales.
    </p>

    <section>
      <h2>1. Responsable y contacto</h2>
      <p>La Asociación de Estudiantes de Matemática, Ciencias Computacionales y Ciencia de Datos de la Universidad Yachay Tech (AEMCiCD), en el marco de BrailleLab Ecuador y de la coorganización con IEEE Student Branch — Universidad Yachay Tech, es responsable de las decisiones sobre la finalidad y medios esenciales del tratamiento.</p>
      <p>Consultas, derechos o actualización: <a href={`mailto:${site.contacts.privacy}`}>{site.contacts.privacy}</a>.</p>
    </section>

    <section>
      <h2>2. Datos y finalidades</h2>
      <p>El formulario puede solicitar identificación y contacto del equipo, institución, carrera, ciudad de referencia, capacidades, motivación, experiencia, recursos, apoyos potenciales, necesidades de apoyo y movilidad, y las declaraciones necesarias. No incluir dirección domiciliaria, documento de identidad, datos bancarios, información médica ni categorías especiales de datos en la inscripción ordinaria.</p>
      <p>Los datos se usarán para recibir y organizar postulaciones, verificar elegibilidad, comunicarse sobre admisión y etapas, planificar recursos de forma agregada, gestionar el Challenge y atender solicitudes relacionadas con los datos. No se venden datos ni se toman decisiones exclusivamente automatizadas de admisión.</p>
    </section>

    <section>
      <h2>3. Base, acceso y plataforma</h2>
      <p>El tratamiento se basa en la solicitud voluntaria de inscripción y en la aceptación informada. El responsable principal declara haber informado a los integrantes registrados.</p>
      <p>El formulario se administrará mediante Microsoft Forms desde una cuenta institucional autorizada. El acceso quedará limitado a las personas autorizadas que necesiten la información para las finalidades descritas.</p>
    </section>

    <section>
      <h2>4. Conservación y seguridad</h2>
      <p>Los datos se conservarán durante inscripción, desarrollo y cierre administrativo; como regla operativa, se eliminarán o anonimizarán a más tardar el 31 de diciembre de 2028, salvo conservación mínima necesaria por obligaciones legales, auditoría, informes institucionales o atención de controversias.</p>
      <p>La organización aplicará cuenta institucional, contraseña robusta, autenticación multifactor cuando esté disponible, acceso restringido, copias locales mínimas y revisión de incidentes.</p>
    </section>

    <section>
      <h2>5. Derechos, menores y cambios</h2>
      <p>Las personas pueden solicitar información, acceso, actualización, rectificación, eliminación, oposición o suspensión del tratamiento cuando corresponda. Escribe a <a href={`mailto:${site.contacts.privacy}`}>{site.contacts.privacy}</a> con el asunto <code>Datos personales — BrailleTech</code>.</p>
      <p>Si una persona inscrita es menor de edad, la organización evaluará el caso y solicitará la participación o autorización de su representante legal cuando corresponda. Los cambios relevantes de este aviso se comunicarán antes de aplicar finalidades incompatibles.</p>
    </section>
    <section id="aportes" aria-labelledby="aportes-title">
      <h2 id="aportes-title">6. Avisos de aporte a la campaña BrailleLab Ecuador 2027</h2>
      <p><strong>Versión {CONTRIBUTION_PRIVACY_VERSION} · aprobada por la Presidencia de AEMCiCD el 10 de octubre de 2026.</strong> El formulario de aviso solo se habilita cuando la plataforma usa esta misma versión.</p>
      <p><strong>Responsable.</strong> AEMCiCD, titular de la cuenta institucional que recibe los aportes. Consultas: <a href={`mailto:${site.contacts.privacy}`}>{site.contacts.privacy}</a>, asunto <code>Datos personales — Aportes BrailleLab</code>.</p>
      <p><strong>Datos.</strong> Nombre y correo de contacto; monto, fecha y referencia bancaria de la transferencia (o el motivo de no tenerla); destino elegido; el comprobante que adjuntas; y, solo si lo marcas, el nombre público y la autorización para mostrar el monto. No pedimos documento de identidad, número de cuenta de origen ni usuario institucional.</p>
      <p><strong>Finalidades.</strong> Identificar tu transferencia y verificarla en el banco, responderte sobre su estado, llevar la contabilidad y la rendición de cuentas de la campaña, y publicar tu reconocimiento únicamente si lo autorizaste. Un aviso no es un aporte confirmado: el aporte cuenta cuando Tesorería lo verifica.</p>
      <p><strong>Acceso y almacenamiento.</strong> Los datos se registran en AEMCiCD Platform y el comprobante en el almacenamiento documental institucional de Microsoft 365 de la asociación, con acceso limitado a Tesorería y a las personas autorizadas. El comprobante nunca se publica. Este sitio no guarda tus datos ni el archivo en tu navegador y no los envía a herramientas de analítica. Cuando la plataforma acepta tu aviso, el sitio solo registra en Google Ads una conversión anónima con un identificador aleatorio del envío, sin tu nombre, correo, monto, referencia ni comprobante (ver <a href="#medicion">sección 7</a>).</p>
      <p><strong>Publicación.</strong> Por defecto tu aporte es anónimo. Nombre público y monto son autorizaciones separadas; puedes retirarlas escribiendo al correo de contacto. Retirarlas quita tu nombre o monto de las páginas públicas, pero no elimina el registro contable del aporte.</p>
      <p><strong>Conservación.</strong> Los registros financieros y sus soportes se conservan el tiempo que exijan las obligaciones contables, legales y de rendición de cuentas de la asociación. El plazo exacto se fijará en la versión aprobada de este aviso. Los avisos que no correspondan a una transferencia real se depuran tras su revisión.</p>
      <p><strong>Derechos.</strong> Puedes solicitar acceso, rectificación, actualización, eliminación cuando no exista una obligación de conservar, oposición o suspensión, y retirar tus autorizaciones de publicación.</p>
    </section>
    <section id="medicion" aria-labelledby="medicion-title">
      <h2 id="medicion-title">7. Medición de anuncios en este sitio (Google Ads)</h2>
      <p><strong>Qué usamos.</strong> braillelab.org carga la etiqueta de Google (gtag.js) de la cuenta de Google Ads de AEMCiCD ({GOOGLE_ADS_ID}), que usamos para medir los anuncios del programa Google Ad Grants. El servicio lo presta Google LLC.</p>
      <p><strong>Qué datos se tratan.</strong> Al visitar el sitio, Google puede recibir la página visitada, la página de origen, el identificador del clic si llegaste desde un anuncio, datos técnicos del navegador y del dispositivo, y tu dirección IP. La etiqueta guarda cookies propias de medición en tu navegador y relaciona las visitas entre aemcicd.org y braillelab.org. Google trata estos datos en servidores fuera del Ecuador, según sus propias políticas de privacidad.</p>
      <p><strong>Para qué.</strong> Saber cuántas visitas llegan desde los anuncios y cuántas terminan en una acción del sitio, para decidir dónde invertir el presupuesto de anuncios. Hoy la única acción medida es un aviso de aporte aceptado por la plataforma, que se registra con un identificador aleatorio del envío.</p>
      <p><strong>Qué no enviamos.</strong> Los datos que escribes en formularios (nombre, correo, monto, referencia bancaria, comprobante o respuestas de la inscripción) no se envían a Google Ads. La inscripción se hace en Microsoft Forms, fuera de este sitio.</p>
      <p><strong>Cómo evitarlo.</strong> Puedes bloquear las cookies de terceros o borrar las cookies del sitio en tu navegador, navegar en modo privado, usar un bloqueador de rastreo o ajustar la personalización de anuncios en tu cuenta de Google. El sitio funciona igual sin la etiqueta.</p>
      <p><strong>Consultas y derechos.</strong> Escribe a <a href={`mailto:${site.contacts.privacy}`}>{site.contacts.privacy}</a> con el asunto <code>Datos personales — Medición del sitio</code>.</p>
    </section>
  </>;
}

function EnglishNotice() {
  return <>
    <Eyebrow>Version 1.1 · October 25, 2026</Eyebrow>
    <h1>Privacy and data processing notice</h1>
    <p className={styles.lede}>
      <strong>This is a courtesy translation.</strong> The <Link href="/privacidad" hrefLang="es">Spanish version</Link> of this notice is the one that applies.
    </p>
    <p className={styles.lede}>
      This notice covers registration in BrailleTech Challenge Ecuador 2027 (sections 1 to 5),{" "}
      <a href="#aportes">contribution reports to the BrailleLab Ecuador 2027 campaign</a> (section 6) and{" "}
      <a href="#medicion">ad measurement on this website</a> (section 7).
    </p>
    <p className={styles.lede}>
      BrailleTech Challenge Ecuador 2027 registration. Proposed validity from the opening of the form until it is replaced by a later version published on the official channels.
    </p>

    <section>
      <h2>1. Data controller and contact</h2>
      <p>The Association of Students of Mathematics, Computational Sciences and Data Science of Yachay Tech University (AEMCiCD), within BrailleLab Ecuador and the co-organization with the IEEE Student Branch — Yachay Tech University, is responsible for decisions about the purpose and essential means of the processing.</p>
      <p>Questions, rights or updates: <a href={`mailto:${site.contacts.privacy}`}>{site.contacts.privacy}</a>.</p>
    </section>

    <section>
      <h2>2. Data and purposes</h2>
      <p>The form may request the team&apos;s identification and contact details, institution, degree program, reference city, skills, motivation, experience, resources, potential support, support and travel needs, and the required declarations. Do not include your home address, identity document, bank details, medical information or special categories of data in the ordinary registration.</p>
      <p>The data will be used to receive and organize applications, verify eligibility, communicate about admission and stages, plan resources in aggregate, manage the Challenge and handle data-related requests. Data is not sold, and no admission decisions are made solely by automated means.</p>
    </section>

    <section>
      <h2>3. Legal basis, access and platform</h2>
      <p>The processing is based on the voluntary registration request and informed acceptance. The lead team member declares that they have informed the registered members.</p>
      <p>The form will be managed through Microsoft Forms from an authorized institutional account. Access will be limited to authorized people who need the information for the purposes described.</p>
    </section>

    <section>
      <h2>4. Retention and security</h2>
      <p>Data will be kept during registration, development and administrative closing; as an operating rule, it will be deleted or anonymized no later than December 31, 2028, except for the minimum retention required by legal obligations, audits, institutional reports or the handling of disputes.</p>
      <p>The organization will use an institutional account, a strong password, multi-factor authentication when available, restricted access, minimal local copies and incident review.</p>
    </section>

    <section>
      <h2>5. Rights, minors and changes</h2>
      <p>People may request information, access, updating, rectification, deletion, objection or suspension of the processing where applicable. Write to <a href={`mailto:${site.contacts.privacy}`}>{site.contacts.privacy}</a> with the subject <code>Datos personales — BrailleTech</code>.</p>
      <p>If a registered person is a minor, the organization will assess the case and request the participation or authorization of their legal representative where applicable. Relevant changes to this notice will be communicated before any incompatible purposes are applied.</p>
    </section>
    <section id="aportes" aria-labelledby="aportes-title">
      <h2 id="aportes-title">6. Contribution reports to the BrailleLab Ecuador 2027 campaign</h2>
      <p><strong>Version {CONTRIBUTION_PRIVACY_VERSION} · approved by the AEMCiCD Presidency on October 10, 2026.</strong> The report form is enabled only when the platform uses this same version.</p>
      <p><strong>Controller.</strong> AEMCiCD, holder of the institutional account that receives contributions. Questions: <a href={`mailto:${site.contacts.privacy}`}>{site.contacts.privacy}</a>, subject <code>Datos personales — Aportes BrailleLab</code>.</p>
      <p><strong>Data.</strong> Contact name and email; amount, date and bank reference of the transfer (or the reason for not having it); the chosen allocation; the proof of payment you attach; and, only if you check the boxes, the public name and the authorization to show the amount. We do not ask for an identity document, the originating account number or an institutional username.</p>
      <p><strong>Purposes.</strong> To identify your transfer and verify it at the bank, reply to you about its status, keep the campaign&apos;s accounts and accountability records, and publish your recognition only if you authorized it. A report is not a confirmed contribution: the contribution counts once the Treasurer verifies it.</p>
      <p><strong>Access and storage.</strong> The data is recorded in AEMCiCD Platform and the proof of payment in the association&apos;s institutional Microsoft 365 document storage, with access limited to the Treasurer and authorized people. The proof of payment is never published. This website does not store your data or the file in your browser and does not send them to analytics tools. When the platform accepts your report, the website only records an anonymous conversion in Google Ads with a random submission identifier, without your name, email, amount, reference or proof of payment (see <a href="#medicion">section 7</a>).</p>
      <p><strong>Publication.</strong> By default your contribution is anonymous. Public name and amount are separate authorizations; you can withdraw them by writing to the contact email. Withdrawing them removes your name or amount from the public pages, but does not delete the accounting record of the contribution.</p>
      <p><strong>Retention.</strong> Financial records and their supporting documents are kept for as long as the association&apos;s accounting, legal and accountability obligations require. The exact period will be set in the approved version of this notice. Reports that do not correspond to a real transfer are removed after review.</p>
      <p><strong>Rights.</strong> You can request access, rectification, updating, deletion when there is no obligation to retain, objection or suspension, and withdraw your publication authorizations.</p>
    </section>
    <section id="medicion" aria-labelledby="medicion-title">
      <h2 id="medicion-title">7. Ad measurement on this website (Google Ads)</h2>
      <p><strong>What we use.</strong> braillelab.org loads the Google tag (gtag.js) of AEMCiCD&apos;s Google Ads account ({GOOGLE_ADS_ID}), which we use to measure the ads of the Google Ad Grants program. The service is provided by Google LLC.</p>
      <p><strong>What data is processed.</strong> When you visit the website, Google may receive the page visited, the referring page, the click identifier if you arrived from an ad, technical data about your browser and device, and your IP address. The tag stores its own measurement cookies in your browser and links visits between aemcicd.org and braillelab.org. Google processes this data on servers outside Ecuador, under its own privacy policies.</p>
      <p><strong>Why.</strong> To know how many visits come from the ads and how many end in an action on the website, so we can decide where to invest the ad budget. Today the only action measured is a contribution report accepted by the platform, recorded with a random submission identifier.</p>
      <p><strong>What we do not send.</strong> The data you type into forms (name, email, amount, bank reference, proof of payment or registration answers) is not sent to Google Ads. Registration takes place in Microsoft Forms, outside this website.</p>
      <p><strong>How to avoid it.</strong> You can block third-party cookies or delete this website&apos;s cookies in your browser, browse in private mode, use a tracking blocker or adjust ad personalization in your Google account. The website works the same without the tag.</p>
      <p><strong>Questions and rights.</strong> Write to <a href={`mailto:${site.contacts.privacy}`}>{site.contacts.privacy}</a> with the subject <code>Datos personales — Medición del sitio</code>.</p>
    </section>
  </>;
}

export default function PrivacidadPage({ locale = "es" }) {
  return (
    <SiteShell locale={locale}>
      <article className={`wrap ${styles.article}`}>
        {locale === "en" ? <EnglishNotice /> : <SpanishNotice />}
      </article>
    </SiteShell>
  );
}
