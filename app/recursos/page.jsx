import SiteShell, { ArrowLink, EventActionLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import { Eyebrow } from "../../components/Visuals";
import { assetPath, site } from "../../content/site";
import Faq from "../../components/Faq";
import resourceStyles from "./recursos.module.css";
import layout from "../public.module.css";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Recursos 2027" };

const descriptions = {
  bases: "Elegibilidad, alcance y reglas de participación.",
  guia: "Alcance técnico para diseñar, construir y documentar.",
  cronograma: "Fases, hitos y fechas de la edición 2027.",
  rubrica: "Criterios de la evaluación competitiva.",
  formulario: "Preguntas y declaraciones de la inscripción.",
  declaracion: "Marco de autoría, licencias, recursos y apoyos externos.",
  seguridad: "Prácticas de seguridad para el trabajo en laboratorios.",
  validacion: "Participación y validación con personas usuarias de Braille.",
};

const groups = [
  {
    id: "normativa",
    label: "01 · Marco de participación",
    title: "Primero, entiende las reglas y las fechas.",
    copy: "Bases, cronograma y formulario definen quién participa, cuándo y bajo qué condiciones.",
    ids: ["bases", "cronograma", "formulario"],
  },
  {
    id: "tecnica",
    label: "02 · Diseño y evaluación",
    title: "Después, trabaja sobre el alcance técnico.",
    copy: "Guía, rúbrica y declaración de autoría orientan la propuesta y la evaluación.",
    ids: ["guia", "rubrica", "declaracion"],
  },
  {
    id: "operacion",
    label: "03 · Seguridad y validación",
    title: "Finalmente, prepara pruebas responsables.",
    copy: "Los protocolos operativos se vuelven relevantes durante prototipado y validación.",
    ids: ["seguridad", "validacion"],
  },
];

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
        La documentación 2027 se encuentra en preparación y se habilitará públicamente cuando cada versión esté aprobada.
      </PageHero>

      <section className={layout.surfaceSoft}>
        <div className="wrap">
          <Eyebrow>Orden de lectura recomendado</Eyebrow>
          <h2>Empieza por reglas, sigue con diseño y termina con operación.</h2>
          <div className={resourceStyles.order}>
            {groups.map((group, index) => (
              <article key={group.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`wrap ${layout.section}`} aria-label="Documentos de la edición 2027">
        {groups.map((group) => {
          const documents = group.ids.map((id) => site.resources.find((item) => item.id === id)).filter(Boolean);
          return (
            <div className={resourceStyles.group} key={group.id}>
              <div className={resourceStyles.groupHeader}>
                <span>{group.label}</span>
                <h2>{group.title}</h2>
                <p>{group.copy}</p>
              </div>
              <div className={resourceStyles.library}>
                {documents.map((document, index) => <DocumentCard document={document} index={index} key={document.id} />)}
              </div>
            </div>
          );
        })}

        <p className={resourceStyles.archiveNote}>
          La documentación 2026 no se presenta como vigente. Cualquier material histórico se mantendrá separado de los documentos operativos de 2027.
        </p>
      </section>

      <section className={layout.surfaceSoft}>
        <div className="wrap">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2>Respuestas para preparar la edición 2027.</h2>
          <Faq />
        </div>
      </section>

      <section className={layout.darkCta}>
        <div className={`wrap ${layout.ctaContent}`}>
          <div>
            <Eyebrow tone="dark">Usa la documentación según tu etapa</Eyebrow>
            <h2>Consulta solo versiones 2027 publicadas por los canales oficiales.</h2>
          </div>
          <div>
            <EventActionLink primary />
            <ArrowLink href="/cronograma">Ver cronograma</ArrowLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
