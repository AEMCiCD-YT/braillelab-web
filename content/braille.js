// Alfabeto Braille básico (a–z y ñ), coincidente con el Braille español.
// Cada letra lista sus puntos: 1-2-3 en la columna izquierda, 4-5-6 en la derecha.
export const brailleLetters = {
  a: [1],
  b: [1, 2],
  c: [1, 4],
  d: [1, 4, 5],
  e: [1, 5],
  f: [1, 2, 4],
  g: [1, 2, 4, 5],
  h: [1, 2, 5],
  i: [2, 4],
  j: [2, 4, 5],
  k: [1, 3],
  l: [1, 2, 3],
  m: [1, 3, 4],
  n: [1, 3, 4, 5],
  ñ: [1, 2, 4, 5, 6],
  o: [1, 3, 5],
  p: [1, 2, 3, 4],
  q: [1, 2, 3, 4, 5],
  r: [1, 2, 3, 5],
  s: [2, 3, 4],
  t: [2, 3, 4, 5],
  u: [1, 3, 6],
  v: [1, 2, 3, 6],
  w: [2, 4, 5, 6],
  x: [1, 3, 4, 6],
  y: [1, 3, 4, 5, 6],
  z: [1, 3, 5, 6],
};

// Nombres en español, para que letras como «l» no se confundan con «1» o «I».
export const brailleLetterNames = {
  a: "a", b: "be", c: "ce", d: "de", e: "e", f: "efe", g: "ge", h: "hache", i: "i",
  j: "jota", k: "ka", l: "ele", m: "eme", n: "ene", ñ: "eñe", o: "o", p: "pe", q: "cu",
  r: "erre", s: "ese", t: "te", u: "u", v: "uve", w: "uve doble", x: "equis", y: "ye", z: "zeta",
};

// Orden de lectura en una retícula de 2 columnas recorrida por filas.
export const brailleGridOrder = [1, 4, 2, 5, 3, 6];

export function letterDots(letter) {
  return brailleLetters[letter] || [];
}

export function letterForDots(dots) {
  const key = [...dots].sort((a, b) => a - b).join("-");
  return Object.keys(brailleLetters).find((letter) => brailleLetters[letter].join("-") === key) || null;
}
