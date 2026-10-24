import assert from "node:assert/strict";
import test from "node:test";
import { counterpartPath, localeFromPath, localizePath } from "../lib/i18n.mjs";

test("detecta el idioma por la ruta", () => {
  assert.equal(localeFromPath("/"), "es");
  assert.equal(localeFromPath("/alianzas/"), "es");
  assert.equal(localeFromPath("/en"), "en");
  assert.equal(localeFromPath("/en/support/"), "en");
  assert.equal(localeFromPath("/enlaces"), "es");
});

test("traduce rutas internas y conserva el ancla", () => {
  assert.equal(localizePath("/alianzas", "es"), "/alianzas");
  assert.equal(localizePath("/", "en"), "/en");
  assert.equal(localizePath("/alianzas", "en"), "/en/support");
  assert.equal(localizePath("/alianzas/", "en"), "/en/support");
  assert.equal(localizePath("/alianzas#aviso", "en"), "/en/support#aviso");
  assert.equal(localizePath("/privacidad", "en"), "/en/privacy");
});

test("no toca enlaces externos, anclas ni rutas desconocidas", () => {
  assert.equal(localizePath("https://aemcicd.org/colabora/", "en"), "https://aemcicd.org/colabora/");
  assert.equal(localizePath("mailto:info@braillelab.org", "en"), "mailto:info@braillelab.org");
  assert.equal(localizePath("#aviso", "en"), "#aviso");
  assert.equal(localizePath("/documentos/bases-y-reglamento-2027.pdf", "en"), "/documentos/bases-y-reglamento-2027.pdf");
});

test("el selector de idioma lleva a la página equivalente", () => {
  assert.equal(counterpartPath("/"), "/en");
  assert.equal(counterpartPath("/transparencia/"), "/en/transparency");
  assert.equal(counterpartPath("/en/transparency"), "/transparencia");
  assert.equal(counterpartPath("/en"), "/");
  assert.equal(counterpartPath("/en/challenge/"), "/reto");
  assert.equal(counterpartPath("/ruta-inexistente"), "/en");
});
