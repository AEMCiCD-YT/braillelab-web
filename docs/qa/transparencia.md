# QA · Transparencia (braillelab-web#23)

El 9 de octubre de 2026 se ejecutó con Playwright (Chromium) contra el export estático servido bajo
`/braillelab-web/` y AEMCiCD Platform local. Los datos eran sintéticos:

- un ingreso verificado de USD 250 para KITS;
- un pago verificado de USD 117,38 con descripción pública y una copia redactada aprobada por una segunda persona;
- un informe público;
- un reconocimiento publicado.

| Comprobación | Resultado |
|---|---|
| Resumen: neto 250,00, pagado 117,38, disponible 132,62, compromisos sin doble conteo | OK |
| Presupuesto: 15 rubros, total 6.500,00, y nota de bootcamp y Demo Day no financiados | OK |
| Hito: asignaciones con total 1.000,00 y avance acumulativo del 25 % | OK |
| Gasto publicado con copia redactada servida por la plataforma (200, PDF) | OK |
| Informe público y reconocimientos autorizados | OK |
| Filtro por rubro: estado vacío, reflejado en la URL y conservado al recargar; quitar filtros | OK |
| Ninguna referencia bancaria, proveedor, descripción privada, correo ni clave de almacenamiento en el HTML ni en el JSON | OK |
| Retirada del gasto: desaparece en la siguiente carga, su documento responde 404 y los totales no cambian | OK |
| API caída: ningún monto en cero y se muestra el presupuesto aprobado | OK |
| Móvil a 390 px sin desplazamiento horizontal de la página (las tablas se desplazan dentro de su región) | OK |
| Enlace desde «Apoya y colabora» conserva `basePath`; «Transparencia» en la navegación y el pie | OK |
| Sin errores de consola | OK |

La prueba de `/alianzas/` (braillelab-web#22) se repitió tras estos cambios: 19 de 19 comprobaciones OK.

Pendiente para el lanzamiento (aemcicd-platform#21): lectores de pantalla reales y la API desplegada.
