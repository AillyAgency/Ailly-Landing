# Ailly — Landing WhatsApp — Plan Maestro (rediseño vigente)

> Actualizado 2026-08-30. Este documento reemplaza la versión original del blueprint
> (dirección visual dorada/navy, sin marca definida) — la marca vigente es **Ailly**
> (coral sobre carbón). El detalle técnico y de sistema de diseño vive en
> `agencia-ia-whatsapp-landing/CLAUDE.md`; este archivo es el **plan de contenido y
> estructura de la landing**, construido a partir de `landing-rediseno.md`.

---

## 0. Decisión de alcance (confirmada con el usuario)

El plan de 9 secciones de abajo **reemplaza toda la landing actual**, no se agrega
encima. Quedan deprecados:

- `SolutionSection.astro` ("Un solo sistema para atender y vender")
- `MoreThanChat.astro` (las 6 capacidades — reportes, memoria, ciclo de cita, etc.)
- La calculadora de "pérdida por no responder" dentro de `PainSection.astro`

Su contenido queda absorbido/reemplazado por las Secciones 2, 3 y 7 del plan nuevo,
que cubren el mismo terreno de forma más concreta y personalizada al negocio del
prospecto.

---

## 1. Producto y posicionamiento (resumen — ver CLAUDE.md para el detalle)

Ailly conecta un agente de IA al WhatsApp (y potencialmente Instagram/Facebook) de
negocios pequeños con alto volumen de atención — clínicas, veterinarias, spas,
salones, inmobiliarias, consultorios — para que no se pierda ninguna cita, pregunta
o venta por falta de respuesta a tiempo.

Dos CTAs conviven en toda la landing:
- **WhatsApp directo** (`WHATSAPP_URL` en `constants.ts`) — conversar sobre el
  negocio específico del prospecto.
- **Calendly** (`CALENDLY_URL` en `constants.ts`) — agendar una llamada de
  diagnóstico gratis.

---

## 2. Stack y estructura real (referencia rápida)

Astro + TypeScript + Tailwind v4, sin React. Output `server` en Vercel con la home
prerenderizada; único endpoint real es `src/pages/api/chat.ts` (demo de chat con
Claude). Sin CMS, sin base de datos, sin formularios con backend propio hoy.

```
src/pages/index.astro          # compone todas las secciones
src/components/layout/         # BaseLayout, Navbar, Footer
src/components/sections/       # una sección por archivo
src/components/ui/             # Button, AillyLogo, LiveAgentChat, Eyebrow
src/lib/constants.ts           # WHATSAPP_*, CALENDLY_*
```

Detalle completo (colores, tipografía, reglas no negociables) en
`agencia-ia-whatsapp-landing/CLAUDE.md` — no se duplica aquí.

---

## 3. Plan de secciones (el contenido a implementar)

Cada sección indica: objetivo, contenido/brief, componente destino, y qué queda
abierto antes de poder construirla.

### Sección 1 — Hero
- **Objetivo:** que cualquier dueño de negocio sienta "esto es para mí" en los
  primeros segundos.
- **Contenido:** mantiene el headline dolor→solución actual como base, y suma una
  mención muy simple de a quién sirve (ej. línea corta tipo "Para clínicas,
  veterinarias, spas, salones, inmobiliarias y más" o un chip rotativo de rubros) —
  sin volverse una lista pesada.
- **CTAs (2, siempre los mismos dos):**
  1. WhatsApp → conversar sobre su negocio específico.
  2. Calendly → agendar diagnóstico gratis.
  Ambos con copy persuasivo, no genérico ("Habla con nosotros" es plano).
- **Componente destino:** editar `Hero.astro` existente, no reescribir desde cero.
- **Abierto:** texto final de los 2 botones.

### Sección 2 — Dolores delegables ("te conozco sin haber hablado contigo")
- **Objetivo:** que el prospecto reconozca sus propias tareas manuales del día a
  día y entienda que son delegables a IA — genera la sensación de "me conocen".
- **Contenido:** 6 bloques ya redactados en `landing-rediseno.md` (comunicación y
  atención, agendamiento, facturación/cobros, inventario, clientes/CRM,
  administración/marketing), cada uno con 4 tareas puntuales.
- **Componente destino:** reemplaza `PainSection.astro` completo (se retiran las
  stats 78%/100x/5h+ y la calculadora de pérdida).
- **Resuelto (2026-08-31):** Ailly se posiciona ampliado — no se limita a "agente
  de WhatsApp de atención y agenda". Los 6 bloques (comunicación, agendamiento,
  facturación/cobros, inventario, CRM, administración/marketing) se presentan
  todos como parte del alcance real de Ailly. Esto cambia el posicionamiento de
  producto respecto a lo documentado en `CLAUDE.md` — ese archivo describe a Ailly
  solo como agente de WhatsApp para atención/citas, así que al implementar esta
  sección también hay que actualizar esa descripción para que quede consistente
  en todo el proyecto.

### Sección 3 — Antes / Después
- **Objetivo:** mostrar que, para los dolores de la Sección 2, existe una versión
  con IA que hace el mismo trabajo mejor, más rápido, liberando al equipo para
  tareas de mayor valor.
- **Componente destino:** nuevo, `BeforeAfterSection.astro`.
- **Abierto:** (1) ¿se ilustran los 6 bloques o solo 3-4 destacados? (2) formato
  visual — ¿tabla comparativa, tarjetas lado a lado, o tabs por categoría? Sin
  definir todavía.

### Sección 4 — Cómo funciona (diagnóstico → propuesta → demo → comparación)
- **Objetivo:** explicar el proceso real de trabajar con Ailly: llamada gratis de
  diagnóstico → propuesta a medida según la situación del negocio → demo del
  sistema específico que le sirve → comparación de "antes y después" de
  implementarlo en su equipo.
- **Componente destino:** nuevo `HowItWorks.astro` (el del blueprint original no
  aplica, describía otro flujo genérico de 3 pasos).
- **Abierto:** ¿4 pasos visuales (llamada / propuesta / demo / resultados) o menos?

### Sección 5 — Industrias
- **Objetivo:** tarjetas o íconos por industria (clínicas, odontología,
  veterinarias, salones, barberías, consultorios, inmobiliarias), cada una con el
  dolor específico de esa industria + qué automatiza Ailly ahí. Casos concretos,
  no una lista genérica.
- **Componente destino:** `IndustryExamples.astro` actual.
- **Resuelto (2026-08-31):** se mantiene el formato interactivo (selector de
  categorías + demo de chat animado) tal como está hoy. No se simplifica a
  tarjetas estáticas — solo revisar/ajustar copy si hace falta, no la estructura.

### Sección 6 — Casos de éxito (capturas reales de WhatsApp)
- **Objetivo:** mostrar 3 casos de éxito reales con más contexto que solo la
  captura de conversación — mostrar también el sistema completo que se implementó
  en cada negocio.
- **Resuelto (2026-08-31) — spec de layout (según mockup compartido):**
  - **Carrusel horizontal desplazable** (scroll lateral, no grid estático) — las
    tarjetas de los 3 casos se deslizan hacia los lados.
  - Cada tarjeta: imagen de la conversación/automatización arriba (como ya existe
    hoy), y **debajo, recuadros adicionales con información del sistema completo**
    que se le implementó a ese negocio (no solo el resultado de una conversación
    — el alcance real de lo que se construyó: qué automatizó, qué canales, qué
    integró, etc.).
  - Referencia visual: mockup con rectángulos de distinto tamaño en fila
    horizontal + recuadros más chicos debajo de cada uno.
- **Componente destino:** reescribe `CaseStudies.astro` (ya existe con 3 casos:
  Clínica Lumière, Clínica Dental Sonrisa Total, Veterinaria Huellitas — imágenes
  ya están en la carpeta raíz del proyecto) — pasa de grid estático a carrusel, y
  suma los recuadros de detalle del sistema por caso.
- **Abierto:** falta el contenido de qué va en cada recuadro de "sistema completo"
  por caso (qué se automatizó específicamente en cada uno de los 3 negocios) —
  pendiente de que el usuario lo comparta.
- **Estado: DIFERIDO explícitamente por el usuario** para el orden de trabajo —
  el layout ya queda especificado arriba, pero no se construye todavía, se retoma
  al final del rediseño.

### Sección 7 — Calculadora de precio estimado
- **Objetivo:** como el precio es 100% personalizado según el negocio, dar un
  "estimado" vía mini-cuestionario en vez de una tabla de precios fija.
- **Resuelto (2026-08-31) — versión liviana, reemplaza la propuesta original de
  6 preguntas + captación de nombre/WhatsApp:**
  1. ¿Cuántas personas trabajan en tu negocio? (Solo yo / 2-5 / 6-15 / Más de 15)
  2. ¿Cuántos mensajes de WhatsApp recibe al día? (<20 / 20-50 / 50-100 / >100)
  3. ¿Qué te gustaría automatizar primero? (Agendar citas / Responder preguntas
     frecuentes / Seguimiento a clientes / Todo lo anterior)
  - **Resultado:** rango de mensualidad estimada en COP según el tier que arrojen
    las respuestas 1-2 (ver tabla abajo), con nota "estimado preliminar, el precio
    real se define en tu diagnóstico gratuito" + botón de WhatsApp con las
    respuestas ya incluidas en el mensaje prellenado.
  - **Sin captación de nombre/WhatsApp por formulario** — el botón de WhatsApp
    final ES la captación real (abre una conversación), evita necesitar backend o
    guardar datos en ningún lado. Coherente con la regla no negociable de
    `CLAUDE.md` de mantener el sitio sin backend de formularios.
  - **Tiers de precio (COP/mes), investigados en mercado real de Colombia para
    agentes de IA en WhatsApp para pymes — confirmados con el usuario:**
    | Tier | Perfil | Mensualidad estimada |
    |------|--------|----------------------|
    | Básico | Solo yo / 2-5 personas, <20-50 msgs/día | $1.300.000 – $1.800.000 |
    | Estándar | 6-15 personas, 50-100 msgs/día | $1.800.000 – $2.500.000 |
    | Avanzado | Más de 15 personas, >100 msgs/día | $2.500.000 – $3.500.000 |
- **Componente destino:** nuevo `PricingCalculator.astro`, reemplaza la
  calculadora de pérdida actual dentro de `PainSection.astro` (que desaparece con
  esa sección).

### Sección 8 — FAQ
- **Objetivo:** cortar toda la fricción del dueño de negocio, tono amable y
  persuasivo.
- **Componente destino:** `FAQSection.astro` ya existe con 5 preguntas. Revisar si
  cubren las objeciones reales del nuevo flujo (ej. dudas sobre la calculadora de
  precio, sobre el diagnóstico gratis) o si hay que sumar/ajustar preguntas.

### Sección 9 — CTA final
- **Objetivo:** cerrar con la misma energía con que abre el Hero — retomar su
  mensaje. Un solo CTA principal: **"Agenda tu diagnóstico gratuito"**, con opción
  de hacerlo por WhatsApp o por Calendly.
- **Componente destino:** `CTASection.astro` ya existe con estructura similar
  (doble botón WhatsApp/Calendly) — ajustar el copy para que conecte
  explícitamente con el Hero en vez de ser un cierre genérico.

---

## 4. Deprecado / a eliminar del código actual

- `src/components/sections/SolutionSection.astro`
- `src/components/sections/MoreThanChat.astro`
- El bloque calculadora dentro de `PainSection.astro` (todo el archivo se
  reemplaza por la Sección 2 nueva)

---

## 5. Preguntas abiertas antes de pasar a implementación

1. ~~Sección 2~~ — **Resuelto:** se amplía el alcance de Ailly a los 6 bloques
   completos (ver sección 3.2 arriba). Pendiente: actualizar la descripción de
   producto en `CLAUDE.md` para que quede consistente.
2. ~~Sección 3~~ — **Construida (2026-08-31):** `BeforeAfterSection.astro`, formato
   de tarjetas con "antes" tachado/muted → flecha → "después" en acento, usando
   las mismas métricas reales de los 3 casos de éxito (inasistencia, horas
   liberadas, etc.) para consistencia. Insertada en `index.astro` después de
   `PainSection` (temporalmente — se reordena cuando se construya la Sección 2
   real que reemplaza a `PainSection`).
3. ~~Sección 5~~ — **Resuelto:** se mantiene el chat demo interactivo actual, sin
   cambios de estructura.
4. ~~Sección 7~~ — **Resuelto:** calculadora liviana de 3 preguntas, sin
   captación de datos por formulario, tiers de precio confirmados (ver sección
   3.7 arriba).
5. ~~Sección 6~~ — **Construida (2026-08-31), antes de lo previsto:** el usuario
   entregó `casos-exito-ailly.html` con contenido completo y real de los 3 casos.
   Layout final terminó siendo **tabs** (no el carrusel especificado antes) —
   `CaseStudies.astro` reescrito con esa estructura, cada caso con header +
   métricas + WhatsApp mockup + panel de sistemas (dashboard/reportes/
   recordatorios) + miniaturas de automatizaciones extra. Componentes nuevos de
   soporte: `ui/WhatsAppMockup.astro`, `ui/StatBar.astro`, `ui/MiniStat.astro`.

---

## 6. Orden de trabajo sugerido

Todo lo que no tiene bloqueo puede avanzar ya: Secciones 1, 2 (con la decisión de
alcance resuelta), 4, 8, 9. Las Secciones 3, 5 y 7 necesitan una respuesta rápida a
las preguntas abiertas antes de poder construirse sin retrabajo. La Sección 6 se
deja para el final por pedido explícito del usuario.
