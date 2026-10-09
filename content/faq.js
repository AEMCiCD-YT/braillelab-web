import { site } from "./site";

export const faqGroups = [
  { title: "Participación e inscripción", items: [
    ["¿Qué es BrailleTech Challenge Ecuador 2027?", "Es una competencia nacional e interdisciplinaria de ingeniería para investigar, diseñar, construir y documentar tecnología Braille electrónica refrescable. Es una iniciativa de BrailleLab Ecuador, coorganizada por AEMCiCD y la IEEE Student Branch — Universidad Yachay Tech."],
    ["¿Quiénes pueden participar?", "Estudiantes matriculados en Instituciones de Educación Superior del Ecuador que cumplan los requisitos de la convocatoria y las Bases."],
    ["¿Cuántas personas debe tener un equipo?", "Cada equipo debe tener entre 3 y 5 integrantes. Cada participante puede formar parte de un solo equipo."],
    ["¿Se permiten equipos interdisciplinarios o inter-IES?", "Sí. Se permiten equipos de diferentes carreras y equipos formados por estudiantes de dos o más instituciones de educación superior."],
    ["¿Puedo postular solo/a o sin experiencia previa?", "No se puede postular individualmente: se requiere un equipo de al menos tres integrantes. No se exige experiencia previa en tecnología Braille; los equipos admitidos participarán en el BrailleTech Design Bootcamp."],
    ["¿La inscripción garantiza admisión?", "No. Registra la postulación; la admisión se confirma únicamente mediante comunicación oficial después de la revisión de elegibilidad."],
    ["¿Cuándo se abren las inscripciones?", "La ventana prevista es del 13 de enero de 2027 a las 09h00 al 31 de enero de 2027 a las 23h59. La revisión administrativa está prevista del 1 al 5 de febrero y los equipos admitidos se publicarán el 8 de febrero."],
  ]},
  { title: "El reto y las etapas", items: [
    ["¿Cuál es el requisito técnico mínimo?", "Cada equipo finalista debe demostrar una celda Braille refrescable de seis puntos, funcional y controlable electrónicamente. La disposición es 1–4 / 2–5 / 3–6."],
    ["¿Debemos usar una arquitectura específica?", "No. La Guía Técnica no impone mecanismo, actuador o microcontrolador único. El equipo debe justificar y documentar su solución y demostrar control electrónico seguro."],
    ["¿Es obligatorio llevar un prototipo físico en Fase 1?", "No. La Fase 1 se centra en una propuesta técnicamente viable mediante Design Package y Design Review. Las simulaciones o pruebas de concepto son voluntarias."],
    ["¿Qué ocurre después del Design Review?", "Podrán seleccionarse hasta 10 finalistas y 2 suplentes. Los finalistas avanzan a prototipado, checkpoints, pruebas, validación autorizada, entrega técnica y Demo Day."],
    ["¿Qué fechas debemos reservar?", "Design Bootcamp: 15–28 de febrero; entrega del Design Package: 21 de marzo; Design Review: 27 de marzo; publicación de finalistas: 30 de marzo; Demo Day: 12 de junio de 2027."],
    ["¿Dónde será el Demo Day?", "El Demo Day está previsto para el 12 de junio de 2027 en la Universidad Yachay Tech. La jornada iniciará a las 10h00 y se planifica hasta las 17h00, con posible extensión hasta las 18h00 según la agenda final, patrocinadores y dinámica del evento."],
  ]},
  { title: "Recursos, seguridad y accesibilidad", items: [
    ["¿La organización entregará kits, movilidad o premios?", "Los apoyos, recursos de prototipado, movilidad o reconocimientos se comunicarán únicamente cuando estén confirmados. La participación no debe asumir recursos o patrocinios todavía no formalizados."],
    ["¿Cómo se realizarán las pruebas con personas usuarias de Braille?", "Las actividades de validación con personas usuarias de Braille deberán realizarse únicamente dentro del protocolo y marco autorizado por la organización."],
    ["¿Se puede usar inteligencia artificial?", "Sí, si su uso relevante se declara. El equipo conserva responsabilidad sobre revisión, comprensión, validación técnica, licencias y decisiones finales."],
    ["¿Qué licencias se aplican?", "CERN-OHL-S para hardware y archivos de diseño, GPLv3 para firmware y software, y CC BY-SA 4.0 para documentación técnica. Los recursos de terceros conservan sus condiciones."],
  ]},
  { title: "Comunicación y datos", items: [
    ["¿Cómo se usarán nuestros datos?", "Para recibir postulaciones, verificar elegibilidad, comunicarse con el equipo, organizar etapas y planificar recursos de forma agregada. Revise el Aviso de Privacidad 2027 antes de enviar el formulario y no incluya documentos de identidad, direcciones, información médica ni datos bancarios en respuestas abiertas."],
    ["¿Cómo pedimos una corrección?", `La organización se comunicará con el responsable principal. Para consultas o actualización de datos, escriba a ${site.contacts.participants} con el asunto BrailleTech — consulta de inscripción.`],
  ]},
];
