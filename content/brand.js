export const PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function asset(path) {
  return `${PUBLIC_BASE_PATH}${path}`;
}

export const brandAssets = {
  mark: asset("/brand/braillelab-isotipo.svg"),
  markNegative: asset("/brand/braillelab-isotipo-negativo.svg"),
  favicon: asset("/favicon.svg"),
};

// Logos de las organizaciones coorganizadoras (fondo transparente, para superficies claras).
export const coorganizers = [
  {
    id: "aemcicd",
    name: "AEMCiCD · Universidad Yachay Tech",
    alt: "Asociación de Estudiantes de Matemática, Ciencias Computacionales y Ciencia de Datos (AEMCiCD)",
    logo: asset("/brand/coorganizadores/aemcicd.png"),
    width: 614,
    height: 180,
  },
  {
    id: "ieee-sb",
    name: "IEEE Student Branch · Universidad Yachay Tech",
    alt: "IEEE Student Branch, Yachay Tech University",
    logo: asset("/brand/coorganizadores/ieee-sb-yachay-tech.png"),
    width: 484,
    height: 242,
  },
];
