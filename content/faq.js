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

export const faqGroupsEn = [
  { title: "Participation and registration", items: [
    ["What is BrailleTech Challenge Ecuador 2027?", "It is a national, interdisciplinary engineering competition to research, design, build and document refreshable electronic Braille technology. It is a BrailleLab Ecuador initiative, co-organized by AEMCiCD and the IEEE Student Branch — Yachay Tech University."],
    ["Who can participate?", "Students enrolled in higher education institutions in Ecuador who meet the requirements of the call for applications and the Rules."],
    ["How many people should a team have?", "Each team must have between 3 and 5 members. Each participant can belong to only one team."],
    ["Are interdisciplinary or multi-institution teams allowed?", "Yes. Teams may include students from different degree programs and from two or more higher education institutions."],
    ["Can I apply alone or without prior experience?", "Individual applications are not accepted: a team of at least three members is required. No prior experience with Braille technology is needed; admitted teams take part in the BrailleTech Design Bootcamp."],
    ["Does registering guarantee admission?", "No. Registration records the application; admission is confirmed only through official communication after the eligibility review."],
    ["When does registration open?", "The planned window runs from January 13, 2027 at 09:00 to January 31, 2027 at 23:59. The administrative review is planned for February 1–5, and admitted teams will be announced on February 8."],
  ]},
  { title: "The challenge and its stages", items: [
    ["What is the minimum technical requirement?", "Each finalist team must demonstrate a working, electronically controllable six-dot refreshable Braille cell. The dot layout is 1–4 / 2–5 / 3–6."],
    ["Do we have to use a specific architecture?", "No. The Technical Guide does not require a single mechanism, actuator or microcontroller. Each team must justify and document its solution and demonstrate safe electronic control."],
    ["Is a physical prototype required in Phase 1?", "No. Phase 1 focuses on a technically viable proposal through the Design Package and Design Review. Simulations or proofs of concept are optional."],
    ["What happens after the Design Review?", "Up to 10 finalists and 2 alternates may be selected. Finalists move on to prototyping, checkpoints, testing, authorized validation, technical submission and Demo Day."],
    ["Which dates should we save?", "Design Bootcamp: February 15–28; Design Package deadline: March 21; Design Review: March 27; finalists announced: March 30; Demo Day: June 12, 2027."],
    ["Where will Demo Day take place?", "Demo Day is planned for June 12, 2027 at Yachay Tech University. It starts at 10:00 and is planned to end at 17:00, possibly extended to 18:00 depending on the final agenda, sponsors and the flow of the event."],
  ]},
  { title: "Resources, safety and accessibility", items: [
    ["Will the organizers provide kits, travel support or prizes?", "Support, prototyping resources, travel or awards will be announced only once they are confirmed. Teams should not count on resources or sponsorships that have not been formalized."],
    ["How will testing with Braille users be carried out?", "Validation activities with Braille users must take place only within the protocol and framework authorized by the organizers."],
    ["Can we use artificial intelligence?", "Yes, as long as any relevant use is declared. The team remains responsible for review, understanding, technical validation, licenses and final decisions."],
    ["Which licenses apply?", "CERN-OHL-S for hardware and design files, GPLv3 for firmware and software, and CC BY-SA 4.0 for technical documentation. Third-party resources keep their own terms."],
  ]},
  { title: "Communication and data", items: [
    ["How will our data be used?", "To receive applications, verify eligibility, communicate with the team, organize the stages and plan resources in aggregate. Read the 2027 Privacy Notice before submitting the form, and do not include identity documents, addresses, medical information or bank details in open-ended answers."],
    ["How do we request a correction?", `The organizers will contact the team lead. For questions or data updates, write to ${site.contacts.participants} with the subject "BrailleTech — registration inquiry".`],
  ]},
];

export function getFaqGroups(locale = "es") {
  return locale === "en" ? faqGroupsEn : faqGroups;
}
