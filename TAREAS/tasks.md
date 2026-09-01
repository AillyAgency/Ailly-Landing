## Tarea 1: Formulario basado en precios.md
**Qué hacer:** Revisar el archivo `precios.md` del proyecto y reconstruir el mini formulario de contacto/cotización del negocio usando exactamente los campos, servicios y estructura que ahí se definen. Eliminar cualquier referencia a "planes" fijos o packs que no coincidan con `precios.md`.
**Resultado esperado:** El formulario en la landing muestra únicamente los campos y opciones de servicio definidos en `precios.md` (sin planes inventados ni datos que no estén en ese archivo). Al enviarse, los valores seleccionables (dropdown/checkbox de servicios) coinciden 1:1 con los ítems listados en `precios.md`.
**Archivos involucrados:** `precios.md`, componente del formulario (Claude Code debe ubicarlo en el proyecto)

---

## Tarea 2: Preguntas Frecuentes orientadas a reducir fricción de leads (pymes Colombia)
**Qué hacer:** Reemplazar la sección de Preguntas Frecuentes actual por preguntas generales aplicables a **todas** las automatizaciones que ofrece la agencia (no solo WhatsApp), enfocadas en reducir la fricción de decisión de dueños de pymes en Colombia. Incluir como mínimo estas 4 preguntas con su respuesta:
- "¿Se integra con mis sistemas?"
- "¿Cuánto cuesta?"
- "¿Cuánto tiempo toma implementarlo?"
- "¿Qué pasa si algo falla?"

Agregar además preguntas adicionales que resuelvan objeciones típicas de dueños de pyme colombianos (ej. seguridad de datos, necesidad de conocimientos técnicos, soporte post-entrega, permanencia/contrato, resultados garantizados, etc.), a criterio de Claude Code, pero siempre en el mismo tono y enfoque de reducir fricción.
**Resultado esperado:** La sección FAQ de la landing muestra al menos 8 preguntas, incluyendo las 4 obligatorias listadas arriba, todas redactadas en términos de "procesos repetitivos automatizables" en general (no exclusivas a WhatsApp), visibles y legibles en el navegador.
**Archivos involucrados:** Componente/sección FAQ de la landing

---

## Tarea 3: Reenfoque de textos de la landing (de "WhatsApp" a "automatización general")
**Qué hacer:** Revisar todos los textos de la landing page (hero, secciones, subtítulos, CTAs) y reemplazar cualquier mensaje centrado únicamente en "automatizar WhatsApp" por un mensaje centrado en eliminar tareas y procesos repetitivos en general, cubriendo todas las funcionalidades/automatizaciones que ofrece la agencia según `precios.md`.
**Resultado esperado:** Ningún texto visible de la landing menciona "WhatsApp" como el único caso de uso; el mensaje central en el hero y secciones clave comunica "elimina tareas repetitivas de tu negocio" o equivalente, reflejando el conjunto completo de servicios de `precios.md`.
**Archivos involucrados:** Componentes de landing (hero, secciones de texto), `precios.md` como referencia

---

## Tarea 4: Reemplazo del mockup de chat de WhatsApp por capturas reales de Casos de Éxito
**Qué hacer:** En la sección "Casos de Éxito", eliminar el HTML que simula una captura de chat de WhatsApp y reemplazarlo por las 3 capturas de pantalla reales que están en la carpeta `CDE` (Casos de Éxito) del proyecto, una por cada caso/negocio.
**Resultado esperado:** La sección de Casos de Éxito muestra las 3 imágenes reales de la carpeta `CDE` (una por caso), sin ningún elemento HTML que simule una interfaz de chat. Los 3 casos son visibles al cargar la landing en el navegador.
**Archivos involucrados:** Carpeta `CDE` (o como se llame la carpeta de capturas), componente de la sección "Casos de Éxito"
