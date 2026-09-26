import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import { SolidPlaceholder } from "../../components/Visuals";

export const metadata = { title: "BrailleLab Ecuador" };

export default function BrailleLabPage() {
  return <SiteShell><PageHero eyebrow="BrailleLab Ecuador" title={<>Investigación aplicada para una tecnología más <em>accesible.</em></>} visual="Proceso de BrailleLab" accent="petrol">BrailleLab es la marca madre. BrailleTech Challenge Ecuador 2027 es una iniciativa de aprendizaje, diseño y demostración.</PageHero><section className="wrap two-column section"><div><p className="eyebrow">Cómo trabajamos</p><h2>Del aprendizaje a la documentación.</h2></div><ol className="process-list">{["Investigación aplicada", "Diseño", "Prueba y revisión", "Iteración", "Documentación"].map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</li>)}</ol></section><section className="cloud-section"><div className="wrap two-column"><SolidPlaceholder label="Galería editorial autorizada" accent="night" /><div><p className="eyebrow">Evidencia real</p><h2>El proceso se mostrará con contexto y autorización.</h2><p className="body-copy">Las fotografías, cuadernos, componentes y sesiones se incorporarán solo cuando cuenten con permiso, pie de foto y texto alternativo útil.</p></div></div></section></SiteShell>;
}
