# Transparencia (`/transparencia/`)

Implementa braillelab-web#23 con la API pública de AEMCiCD Platform (aemcicd-platform#20). Todo se lee en el
navegador. Un ingreso o gasto aprobado aparece sin editar código ni volver a desplegar el sitio.

## Contenido

1. **Resumen**: ingresos netos confirmados (con bruto y devoluciones), gasto pagado, compromisos pendientes,
   disponible y necesidad pendiente, con su definición. También la fecha de corte, la versión, el estado de la
   campaña y el avance de la meta. Cada barra va acompañada del mismo dato en texto.
2. **Presupuesto general** (15 rubros agrupados), con lo recibido, comprometido, pagado y cubierto en especie por
   rubro, y la fila de total. Una nota indica que el bootcamp y el Demo Day no están financiados por esta meta.
3. **Primer hito**: asignaciones y total de USD 1.000. Se explica que el hito es acumulativo, es decir, parte de la
   meta y no un presupuesto adicional.
4. **Ingresos y disponibilidad**: bruto, devoluciones, reversos y neto. También la disponibilidad por destino
   (recibido − pagado − comprometido) y los movimientos por mes según la fecha de operación.
5. **Aportes en especie**: valor aceptado, costo sustituido y valor no aplicado, siempre separados del efectivo.
   Las promesas, la financiación solicitada o aprobada que aún no llegó y los avisos pendientes no se cuentan, y la
   página lo dice explícitamente.
6. **Gastos publicados**: fecha de operación y fecha de publicación, concepto aprobado, rubro, monto, estado
   (pagado o revertido) y copias redactadas. Se filtran por periodo y rubro, con paginación. Los filtros quedan en
   la URL (`?desde=…&hasta=…&rubro=…&pagina=…`).
7. **Avances y documentos públicos**: informes y copias revisadas que sirve la plataforma. Nunca se publican
   originales.
8. **Reconocimientos autorizados**: en orden de publicación, sin clasificarlos por monto.

## Estados

- **Sin configurar o no publicada:** se muestra el presupuesto aprobado (contenido estático) sin cifras de avance.
- **Fallo:** aviso con «Reintentar» y la fecha del último dato válido de esa misma visita, guardada solo en
  memoria. No se muestran montos.
- **Corte desactualizado** (`freshness: "stale"`): se ve el último corte con su fecha.
- **Sin movimientos:** se aclara que los ceros son reales.

## Consistencia y retirada

- **Un solo corte:** la campaña y la transparencia se leen juntas. Si la versión cambió entre ambas lecturas, se
  vuelven a pedir para no mezclar cortes.
- **Retiradas inmediatas:** las peticiones usan `cache: "no-cache"`, así que el navegador revalida cada vez (con
  ETag, un 304 cuando nada cambió). Una retirada de reconocimiento, gasto o documento se ve en la siguiente carga,
  y el enlace al documento deja de funcionar.

## Verificación

[`qa/transparencia.md`](qa/transparencia.md).
