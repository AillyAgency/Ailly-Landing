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

**Ángulo de posicionamiento (actualizado 2026-08-31, pedido explícito del
usuario):** Ailly no se vende como "un sistema" o "un agente de IA" en
términos técnicos — se vende como sumar un colaborador a tu equipo. La idea
central es: *Ailly es tu socio de IA, el compañero de trabajo que nunca se
cansa* — se encarga de lo repetitivo (responder, agendar, cobrar, llevar el
inventario al día, hacer seguimiento) para que el dueño del negocio y su
equipo se dediquen a lo que de verdad necesita el toque humano. Este ángulo
"colaborador/socio" debe sentirse en el copy de toda la landing — evitar
lenguaje técnico ("sistema", "automatización", "IA" como protagonista de la
frase) a favor de lenguaje de equipo y compañía ("tu aliado", "tu mejor
colaborador", "alguien más en el equipo"). El nombre **Ailly** ya apunta a
esto (suena a "ally" — aliado), así que el copy debe reforzarlo, no
contradecirlo con tono de herramienta/software.

Detrás de ese ángulo, el producto real: Ailly conecta un agente de IA al
WhatsApp (y potencialmente Instagram/Facebook) de negocios pequeños con alto
volumen de atención — clínicas, veterinarias, spas, salones, inmobiliarias,
consultorios — y cubre 6 frentes del negocio (ver Sección 2), no solo
mensajes sin responder.

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
  - **Tiers de precio (COP/mes) — ajustados 2026-08-31:** los rangos originales
    (heredados de una sesión anterior sin fuente de investigación verificable)
    tenían un techo fijo de $3.500.000 para el tier Avanzado. El usuario notó
    que eso es bajo para un negocio de +15 personas / +100 msgs/día que además
    pide el sistema completo (los 6 frentes: comunicación, agendamiento,
    facturación, inventario, CRM, administración) — ese alcance es un proyecto
    de integración más grande que "un bot de WhatsApp", así que el tier
    Avanzado pasa a ser **abierto, sin techo** ("Desde $X"), reflejando que el
    precio final depende de cuántos de los 6 frentes se incluyan:
    | Tier | Perfil | Mensualidad estimada |
    |------|--------|----------------------|
    | Básico | Solo yo / 2-5 personas, <20-50 msgs/día | $1.300.000 – $1.800.000 |
    | Estándar | 6-15 personas, 50-100 msgs/día | $1.800.000 – $2.500.000 |
    | Avanzado | Más de 15 personas, >100 msgs/día | Desde $2.500.000, sin techo fijo |
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

## 5. Estado — rediseño completo (2026-08-31)

Las 9 secciones del plan están construidas e insertadas en `index.astro`, en el
orden final:

1. **Hero** — headline sin cambios, 2 CTAs (WhatsApp con copy persuasivo +
   Calendly "Agenda tu diagnóstico gratis"), línea corta de "para quién es".
2. **Dolores delegables** (`PainSection.astro`, reemplazado por completo) — 6
   bloques (comunicación, agendamiento, facturación/cobros, inventario, CRM,
   administración/marketing), 4 tareas cada uno, alcance ampliado de Ailly.
3. **Antes/Después** (`BeforeAfterSection.astro`) — sin cambios respecto a la
   versión construida antes.
4. **Cómo funciona** (`HowItWorks.astro`, reescrito) — 4 pasos: llamada de
   diagnóstico → propuesta a medida → demo del sistema → comparación antes/después.
5. **Industrias** (`IndustryExamples.astro`) — sin cambios estructurales.
6. **Casos de éxito** (`CaseStudies.astro`) — sin cambios respecto a la versión
   construida antes (tabs, 3 casos reales).
7. **Calculadora de precio** (`PricingCalculator.astro`, nuevo) — 3 preguntas,
   sin captación de datos por formulario, botón de WhatsApp con mensaje
   prellenado con las respuestas, tiers de precio según la tabla de la sección
   3.7 arriba.
8. **FAQ** (`FAQSection.astro`) — se sumaron 3 preguntas sobre la calculadora,
   la llamada de diagnóstico y el alcance ampliado de Ailly.
9. **CTA final** (`CTASection.astro`) — copy reescrito para conectar
   explícitamente con el mensaje del Hero.

**Deprecados y eliminados del código:** `SolutionSection.astro` y
`MoreThanChat.astro` — su contenido queda absorbido por la Sección 2.
`index.astro` ya no los importa ni los renderiza.

**Navegación actualizada:** `Navbar.astro` y `Footer.astro` apuntaban a
`#solucion` (id que dejó de existir); se actualizaron los links a
`#dolores`, `#como-funciona`, `#industrias`, `#precio`, `#faq`.

Verificado con `pnpm build` (sin errores) y en el navegador (todas las
secciones renderizan, la calculadora de precio calcula el tier correcto y
arma el link de WhatsApp con las respuestas).
