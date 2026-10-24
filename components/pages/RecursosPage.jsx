import SiteShell, { ArrowLink, EventActionLink } from "../SiteShell";
import PageHero from "../PageHero";
import Section from "../Section";
import { assetPath, getResourceGroups, getResources } from "../../content/site";
import Faq from "../Faq";
import resourceStyles from "./recursos.module.css";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "../../content/metadata";

export function metadataFor(locale = "es") {
  return buildMetadata(locale === "en" ? {
    path: "/recursos",
    locale,
    title: "Resources · BrailleTech 2027",
    description: "Download the official rules, call for applications, schedule, technical guide, rubric and protocols of BrailleTech Challenge Ecuador 2027.",
    keywords: ["BrailleTech 2027 rules", "BrailleTech technical guide"],
  } : {
    path: "/recursos",
    title: "Recursos · BrailleTech 2027",
    description: "Descarga las bases, convocatoria, cronograma, guía técnica, rúbrica y protocolos oficiales de BrailleTech Challenge Ecuador 2027.",
    keywords: ["bases BrailleTech 2027", "guía técnica BrailleTech"],
  });
}

const copy = {
  es: {
    descriptions: {
      bases: "Elegibilidad, alcance y reglas de participación.",
      convocatoria: "Resumen de la convocatoria, etapas y condiciones.",
      guia: "Alcance técnico para diseñar, construir y documentar.",
      cronograma: "Fases, hitos y fechas de la edición 2027.",
      rubrica: "Criterios de la evaluación competitiva.",
      formulario: "Preguntas de la inscripción para preparar las respuestas; el registro se hace en el formulario en línea.",
      bootcamp: "Sesiones del Bootcamp, office hours y cómo funciona la mentoría.",
      declaracion: "Marco de autoría, licencias, recursos y apoyos externos.",
      seguridad: "Prácticas de seguridad para el trabajo en laboratorios.",
      validacion: "Participación y validación con personas usuarias de Braille.",
    },
    available: "Disponible",
    pending: "Publicación pendiente",
    open: "Abrir PDF",
    heroEyebrow: "Recursos · edición 2027",
    heroTitle: "Documentos para cada etapa.",
    hero: "Bases, cronograma, guías, rúbrica y protocolos oficiales de la edición 2027, listos para descargar.",
    documents: {
      eyebrow: "Documentos 2027",
      title: "Empieza por reglas, sigue con diseño y termina con operación.",
      lede: "Cada grupo indica en qué etapa conviene leerlo. Todos los documentos están en PDF.",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Respuestas para preparar la edición 2027.",
      lede: "Información para preparar la inscripción. Las Bases y Reglamento, la Guía Técnica, la Rúbrica y el Cronograma Oficial desarrollan el alcance completo de la competencia.",
    },
    next: {
      eyebrow: "Usa la documentación según tu etapa",
      title: "Consulta solo versiones 2027 publicadas por los canales oficiales.",
      fallback: "Preparar participación",
      action: "Ver cronograma",
    },
  },
  en: {
    descriptions: {
      bases: "Eligibility, scope and participation rules.",
      convocatoria: "Summary of the call, its stages and conditions.",
      guia: "Technical scope for designing, building and documenting.",
      cronograma: "Phases, milestones and dates of the 2027 edition.",
      rubrica: "Criteria for the competitive evaluation.",
      formulario: "Registration questions so you can prepare your answers; registration itself is done through the online form.",
      bootcamp: "Bootcamp sessions, office hours and how mentoring works.",
      declaracion: "Framework for authorship, licenses, resources and external support.",
      seguridad: "Safety practices for laboratory work.",
      validacion: "Participation and validation with Braille users.",
    },
    available: "Available",
    pending: "Publication pending",
    open: "Open PDF",
    heroEyebrow: "Resources · 2027 edition",
    heroTitle: "Documents for every stage.",
    hero: "Official rules, schedule, guides, rubric and protocols of the 2027 edition, ready to download.",
    documents: {
      eyebrow: "2027 documents",
      title: "Start with the rules, continue with design and finish with operations.",
      lede: "Each group shows the stage when it is most useful. All documents are PDFs and are published in Spanish, which is the official version.",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Answers to prepare for the 2027 edition.",
      lede: "Information to help you prepare your registration. The Rules and Regulations, Technical Guide, Rubric and Official Schedule set out the full scope of the competition.",
    },
    next: {
      eyebrow: "Use the documentation for your stage",
      title: "Only rely on 2027 versions published through official channels.",
      fallback: "Get ready to take part",
      action: "View the schedule",
    },
  },
};

function DocumentCard({ document, index, t }) {
  return (
    <article className={resourceStyles.document}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{document.title}</h3>
      <p>{t.descriptions[document.id]}</p>
      <small>{document.version}</small>
      <div className={resourceStyles.documentStatus}>
        {document.href ? t.available : t.pending}
      </div>
      {document.href ? (
        <a href={assetPath(document.href)} target="_blank" rel="noreferrer">
          {t.open} <ArrowUpRight aria-hidden="true" size={17} />
        </a>
      ) : null}
    </article>
  );
}

export default function RecursosPage({ locale = "es" }) {
  const t = copy[locale] || copy.es;
  const resources = getResources(locale);

  return (
    <SiteShell>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} visual="resources" locale={locale}>
        {t.hero}
      </PageHero>

      <Section
        id="documentos"
        eyebrow={t.documents.eyebrow}
        title={t.documents.title}
        lede={t.documents.lede}
      >
        {getResourceGroups(locale).map((group) => {
          const documents = group.ids.map((id) => resources.find((item) => item.id === id)).filter(Boolean);
          return (
            <div className={resourceStyles.group} id={group.id} key={group.id}>
              <div className={resourceStyles.groupHeader}>
                <span>{group.label}</span>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
              </div>
              <div className={resourceStyles.library}>
                {documents.map((document, index) => <DocumentCard document={document} index={index} t={t} key={document.id} />)}
              </div>
            </div>
          );
        })}
      </Section>

      <Section
        id="preguntas-frecuentes"
        tone="soft"
        eyebrow={t.faq.eyebrow}
        title={t.faq.title}
        lede={t.faq.lede}
      >
        <Faq locale={locale} />
      </Section>

      <Section
        id="siguiente-paso"
        eyebrow={t.next.eyebrow}
        title={t.next.title}
        action={<>
          <EventActionLink primary avoid={["/cronograma"]} fallback={{ label: t.next.fallback, href: "/participar" }} />
          <ArrowLink href="/cronograma">{t.next.action}</ArrowLink>
        </>}
      />
    </SiteShell>
  );
}
