export const PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function asset(path) {
  return `${PUBLIC_BASE_PATH}${path}`;
}

export const brandAssets = {
  logoHorizontal: asset("/brand/braillelab-logotipo-horizontal.svg"),
  markNegative: asset("/brand/braillelab-isotipo-negativo.svg"),
  favicon: asset("/favicon.svg"),
};
