# Conversión: aviso de aporte recibido

Destino: `AW-18480905412/284iCKjIkpgdEMT5sOxE`.

Esta acción mide un aviso aceptado por la plataforma, pendiente de revisión de Tesorería. No mide una donación verificada ni utiliza el monto reportado como valor de donación.

## Implementación

- La etiqueta base se inicializa una vez desde el layout raíz, con cola disponible antes de la interacción.
- El formulario emite el evento únicamente tras HTTP 202 y un `noticeCode` no vacío.
- Los errores de validación, del servidor o de red no emiten conversiones.
- La clave aleatoria de idempotencia se usa como `transaction_id`. Se deduplica también en memoria; no se envían nombre, correo, comprobante, referencia bancaria ni monto.
- La ausencia de Google Ads o un error de analítica no impiden mostrar el aviso recibido.
- Ambos dominios configuran el linker antes de `config` para conservar atribución al pasar de AEMCiCD a BrailleLab.

## Pruebas automatizadas

Ejecutar `node --test tests/google-ads.test.mjs`.

## Verificación tras publicar

1. Publicar primero esta integración de BrailleLab y después retirar el evento del clic en AEMCiCD. Mantener la campaña pausada hasta completar ambas publicaciones y esta comprobación.
2. En Tag Assistant, conectar AEMCiCD, seguir el enlace a BrailleLab y verificar que se detecta `AW-18480905412` en ambos dominios. Comprobar el parámetro linker al navegar entre ellos.
3. Abrir el formulario y probar datos inválidos: no debe emitirse la conversión de reporte.
4. En un entorno de prueba, simular errores de red/servidor: no debe emitirse la conversión. No crear transferencias ficticias en producción.
5. Con un aviso de prueba controlado o un reporte legítimo, completar el envío y comprobar un solo evento al recibir la confirmación. Doble clic o respuesta repetida no deben duplicarlo.
6. Bloquear gtag para comprobar que el envío y la confirmación siguen funcionando.
7. En Google Ads, revisar el objetivo de la campaña para usar el reporte recibido como acción significativa. Los clics de navegación deben tratarse por separado; revisar el efecto en las otras campañas antes de cambiar objetivos predeterminados de la cuenta.

El historial anterior de esta acción correspondía al clic en el enlace; anotar la fecha de publicación al interpretar resultados. La validación de Tag Assistant confirma el disparo, pero el estado en Google Ads puede tardar en actualizarse. Abrir el sitio sin un clic publicitario no garantiza una conversión atribuida en los informes.
