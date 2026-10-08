import SiteShell from "../../components/SiteShell";
import { Eyebrow } from "../../components/Visuals";
import styles from "./privacidad.module.css";
import { buildMetadata } from "../../content/metadata";
import { CONTRIBUTION_PRIVACY_VERSION } from "../../content/campaign";

export const metadata = buildMetadata({
  path: "/privacidad",
  title: "Aviso de privacidad · BrailleTech 2027",
  description: "Aviso de privacidad y tratamiento de datos personales para la inscripción en BrailleTech Challenge Ecuador 2027 y para los avisos de aporte a la campaña BrailleLab Ecuador 2027.",
  keywords: ["privacidad BrailleTech 2027", "tratamiento de datos", "privacidad aportes BrailleLab"],
});

export default function PrivacidadPage() {
  return (
    <SiteShell>
      <article className={`wrap ${styles.article}`}>
        <Eyebrow>Borrador 0.1 · edición 2027</Eyebrow>
        <h1>Aviso de privacidad y tratamiento de datos</h1>
        <p className={styles.lede}>
          Este aviso cubre dos tratamientos: la inscripción en BrailleTech Challenge Ecuador 2027 (secciones 1 a 5) y los{" "}
          <a href="#aportes">avisos de aporte a la campaña BrailleLab Ecuador 2027</a> (sección 6).
        </p>
        <p className={styles.lede}>
          Inscripción BrailleTech Challenge Ecuador 2027. Vigencia propuesta desde la apertura del formulario hasta su sustitución por una versión posterior publicada en los canales oficiales.
        </p>

        <section>
          <h2>1. Responsable y contacto</h2>
          <p>La Asociación de Estudiantes de Matemática, Ciencias Computacionales y Ciencia de Datos de la Universidad Yachay Tech (AEMCiCD), en el marco de BrailleLab Ecuador y de la coorganización con IEEE Student Branch — Universidad Yachay Tech, es responsable de las decisiones sobre la finalidad y medios esenciales del tratamiento.</p>
          <p>Consultas, derechos o actualización: <a href="mailto:asoemc@yachaytech.edu.ec">asoemc@yachaytech.edu.ec</a>.</p>
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
          <p>Las personas pueden solicitar información, acceso, actualización, rectificación, eliminación, oposición o suspensión del tratamiento cuando corresponda. Escribe a <a href="mailto:asoemc@yachaytech.edu.ec">asoemc@yachaytech.edu.ec</a> con el asunto <code>Datos personales — BrailleTech</code>.</p>
          <p>Si una persona inscrita es menor de edad, la organización evaluará el caso y solicitará la participación o autorización de su representante legal cuando corresponda. Los cambios relevantes de este aviso se comunicarán antes de aplicar finalidades incompatibles.</p>
        </section>
        <section id="aportes" aria-labelledby="aportes-title">
          <h2 id="aportes-title">6. Avisos de aporte a la campaña BrailleLab Ecuador 2027</h2>
          <p><strong>Versión {CONTRIBUTION_PRIVACY_VERSION} · borrador pendiente de aprobación por la asociación.</strong> El formulario de aviso solo se habilita cuando la plataforma usa esta misma versión.</p>
          <p><strong>Responsable.</strong> AEMCiCD, titular de la cuenta institucional que recibe los aportes. Consultas: <a href="mailto:asoemc@yachaytech.edu.ec">asoemc@yachaytech.edu.ec</a>, asunto <code>Datos personales — Aportes BrailleLab</code>.</p>
          <p><strong>Datos.</strong> Nombre y correo de contacto; monto, fecha y referencia bancaria de la transferencia (o el motivo de no tenerla); destino elegido; el comprobante que adjuntas; y, solo si lo marcas, el nombre público y la autorización para mostrar el monto. No pedimos documento de identidad, número de cuenta de origen ni usuario institucional.</p>
          <p><strong>Finalidades.</strong> Identificar tu transferencia y verificarla en el banco, responderte sobre su estado, llevar la contabilidad y la rendición de cuentas de la campaña, y publicar tu reconocimiento únicamente si lo autorizaste. Un aviso no es un aporte confirmado: el aporte cuenta cuando Tesorería lo verifica.</p>
          <p><strong>Acceso y almacenamiento.</strong> Los datos se registran en AEMCiCD Platform y el comprobante en el almacenamiento documental institucional de Microsoft 365 de la asociación, con acceso limitado a Tesorería y a las personas autorizadas. El comprobante nunca se publica. Este sitio no guarda tus datos ni el archivo en tu navegador y no los envía a herramientas de analítica.</p>
          <p><strong>Publicación.</strong> Por defecto tu aporte es anónimo. Nombre público y monto son autorizaciones separadas; puedes retirarlas escribiendo al correo de contacto. Retirarlas quita tu nombre o monto de las páginas públicas, pero no elimina el registro contable del aporte.</p>
          <p><strong>Conservación.</strong> Los registros financieros y sus soportes se conservan el tiempo que exijan las obligaciones contables, legales y de rendición de cuentas de la asociación. El plazo exacto se fijará en la versión aprobada de este aviso. Los avisos que no correspondan a una transferencia real se depuran tras su revisión.</p>
          <p><strong>Derechos.</strong> Puedes solicitar acceso, rectificación, actualización, eliminación cuando no exista una obligación de conservar, oposición o suspensión, y retirar tus autorizaciones de publicación.</p>
        </section>
      </article>
    </SiteShell>
  );
}
