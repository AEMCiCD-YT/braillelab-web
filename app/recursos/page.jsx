import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import { assetPath, site } from "../../content/site";
import Faq from "../../components/Faq";
import styles from "./recursos.module.css";
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

export default function RecursosPage() {
  return <SiteShell>
    <PageHero eyebrow="Recursos · edición 2027" title="Documentos para cada etapa." visual="Biblioteca BrailleTech">La documentación 2027 se encuentra en preparación y se habilitará públicamente cuando cada versión esté aprobada.</PageHero>
    <section className={`section wrap ${styles.library}`} aria-label="Documentos de la edición 2027">{site.resources.map((document, index) => <article className={styles.document} key={document.id}><span>{String(index + 1).padStart(2, "0")}</span><h2>{document.title}</h2><p>{descriptions[document.id]}</p><small>{document.version}</small>{document.href ? <a href={assetPath(document.href)} target="_blank" rel="noreferrer">Abrir PDF <ArrowUpRight aria-hidden="true" size={17} /></a> : <small>Publicación pendiente</small>}</article>)}</section>
    <section className="cloud-section"><div className="wrap"><p className="eyebrow">Preguntas frecuentes</p><h2>Respuestas para preparar la edición 2027.</h2><Faq /></div></section>
  </SiteShell>;
}
