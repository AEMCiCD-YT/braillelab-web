import SiteShell, { ArrowLink, EventActionLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Section from "../../components/Section";
import { assetPath, resourceGroups, site } from "../../content/site";
import Faq from "../../components/Faq";
import resourceStyles from "./recursos.module.css";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "../../content/metadata";

export const metadata = buildMetadata({
  path: "/recursos",
  title: "Recursos · BrailleTech 2027",
  description: "Descarga las bases, convocatoria, cronograma, guía técnica, rúbrica y protocolos oficiales de BrailleTech Challenge Ecuador 2027.",
  keywords: ["bases BrailleTech 2027", "guía técnica BrailleTech"],
});

const descriptions = {
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
};


function DocumentCard({ document, index }) {
  return (
    <article className={resourceStyles.document}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{document.title}</h3>
      <p>{descriptions[document.id]}</p>
      <small>{document.version}</small>
      <div className={resourceStyles.documentStatus}>
        {document.href ? "Disponible" : "Publicación pendiente"}
      </div>
      {document.href ? (
        <a href={assetPath(document.href)} target="_blank" rel="noreferrer">
          Abrir PDF <ArrowUpRight aria-hidden="true" size={17} />
        </a>
      ) : null}
    </article>
  );
}

export default function RecursosPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Recursos · edición 2027" title="Documentos para cada etapa." visual="resources">
        Bases, cronograma, guías, rúbrica y protocolos oficiales de la edición 2027, listos para descargar.
      </PageHero>

      <Section
        id="documentos"
        eyebrow="Documentos 2027"
        title="Empieza por reglas, sigue con diseño y termina con operación."
        lede="Cada grupo indica en qué etapa conviene leerlo. Todos los documentos están en PDF."
      >
        {resourceGroups.map((group) => {
          const documents = group.ids.map((id) => site.resources.find((item) => item.id === id)).filter(Boolean);
          return (
            <div className={resourceStyles.group} id={group.id} key={group.id}>
              <div className={resourceStyles.groupHeader}>
                <span>{group.label}</span>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
              </div>
              <div className={resourceStyles.library}>
                {documents.map((document, index) => <DocumentCard document={document} index={index} key={document.id} />)}
              </div>
            </div>
          );
        })}
      </Section>

      <Section
        id="preguntas-frecuentes"
        tone="soft"
        eyebrow="Preguntas frecuentes"
        title="Respuestas para preparar la edición 2027."
        lede="Información para preparar la inscripción. Las Bases y Reglamento, la Guía Técnica, la Rúbrica y el Cronograma Oficial desarrollan el alcance completo de la competencia."
      >
        <Faq />
      </Section>

      <Section
        id="siguiente-paso"
        eyebrow="Usa la documentación según tu etapa"
        title="Consulta solo versiones 2027 publicadas por los canales oficiales."
        action={<>
          <EventActionLink primary avoid={["/cronograma"]} fallback={{ label: "Preparar participación", href: "/participar" }} />
          <ArrowLink href="/cronograma">Ver cronograma</ArrowLink>
        </>}
      />
    </SiteShell>
  );
}
