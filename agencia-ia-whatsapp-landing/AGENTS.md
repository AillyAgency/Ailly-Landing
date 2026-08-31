# Ailly — Landing WhatsApp

Landing de una página para **Ailly** ("Tu aliado de IA para negocios"). Posicionamiento
ampliado (confirmado 2026-08-31, ver blueprint): Ailly no es solo un agente de
WhatsApp de atención/citas — es un sistema de IA que cubre 6 frentes del negocio:
comunicación y atención al cliente, agendamiento y coordinación, facturación/cobros,
inventario y operaciones, clientes y CRM, y administración/marketing. El caso de uso
más visible sigue siendo WhatsApp (clínicas, veterinarias, spas, salones, inmobiliarias
con alto volumen de atención), pero el copy de la landing ya no debe limitarse a
"agente de WhatsApp" — ver Sección 2 del plan maestro. Se distribuye por correo
directo a prospectos, no depende de SEO/tráfico orgánico.

**Ángulo de tono — lo más importante a respetar (actualizado 2026-08-31,
corrección repetida por el usuario):** Ailly se vende como el mejor aliado
para el negocio EN GENERAL, no como "responde mensajes rápido" ni como
instalar un "sistema". Responder por WhatsApp rápido es solo un ejemplo del
colaborador en acción, no el mensaje principal — si el copy suena a "Ailly =
bot que contesta rápido", está mal enfocado. El copy debe evitar lenguaje
técnico (sistema, automatización, IA como protagonista de la frase) y hablar
en términos de equipo/compañía: "tu aliado", "tu mejor colaborador", "alguien
más en el equipo que no se cansa". Ver Sección 1 del blueprint (marcada como
la más importante del documento) para el detalle — aplica a toda la landing,
no solo al Hero.

**Plan maestro vigente de la landing:** `agencia-ia-whatsapp-landing-blueprint.md`
(raíz del repo, un nivel arriba de este proyecto). Ese archivo es la fuente de verdad
de qué sección va dónde, qué está resuelto/pendiente, y por qué — consultarlo antes
de tocar la estructura de `index.astro` o el copy de cualquier sección. Se construye a
partir de `landing-rediseno.md` (notas del usuario) y `casos-exito-ailly.html`
(contenido fuente de los casos de éxito).

Ver `Ailly/Brandbook/ailly-brandbook.pdf` (fuera de este proyecto, en la carpeta padre) para el sistema de marca completo — tesis, pilares, tono de voz y aplicaciones.

## Commands

- `pnpm dev` — Start development server
- `pnpm build` — Production build
- `pnpm preview` — Preview production build localmente

## Tech Stack

Astro + TypeScript + Tailwind CSS v4 — sin React, sin CMS, sin base de datos. Deploy en Vercel (`output: 'server'` + adaptador `@astrojs/vercel`, con la página principal prerenderizada como estática). Único punto de servidor: `src/pages/api/chat.ts`, el endpoint de la demo interactiva de DemoSection.astro.

## Architecture

### Directory Structure
- `src/pages/index.astro` — única página, compone todas las secciones. Orden final
  del rediseño (2026-08-31): Hero → PainSection (dolores delegables) →
  BeforeAfterSection → HowItWorks → IndustryExamples → CaseStudies →
  PricingCalculator → FAQSection → CTASection.
- `src/components/layout/` — BaseLayout, Navbar, Footer. Los links de navegación
  apuntan a `#dolores`, `#como-funciona`, `#industrias`, `#precio`, `#faq`.
- `src/components/sections/` — una sección de la landing por archivo. El
  rediseño de 9 secciones (`agencia-ia-whatsapp-landing-blueprint.md`) está
  **completo**:
  - `Hero.astro` — 2 CTAs (WhatsApp + Calendly), línea de "para quién es".
  - `PainSection.astro` — Sección 2, reescrita: 6 bloques de dolores
    delegables (comunicación, agendamiento, facturación/cobros, inventario,
    CRM, administración/marketing), alcance ampliado de Ailly.
  - `BeforeAfterSection.astro` — Sección 3, antes/después con métricas reales.
  - `HowItWorks.astro` — Sección 4, reescrita: 4 pasos (llamada de diagnóstico
    → propuesta → demo → comparación).
  - `IndustryExamples.astro` — Sección 5, sin cambios estructurales (chat
    demo interactivo).
  - `CaseStudies.astro` — Sección 6, tabs con 3 casos reales + WhatsApp
    mockup + panel de sistemas.
  - `PricingCalculator.astro` — Sección 7, nuevo. Calculadora de 3 preguntas,
    sin formulario de captación — el botón de WhatsApp final con el resumen
    de respuestas prellenado ES la captación.
  - `FAQSection.astro` — Sección 8, con preguntas sumadas sobre la
    calculadora, el diagnóstico gratis y el alcance ampliado.
  - `CTASection.astro` — Sección 9, copy reescrito para conectar con el Hero.
  - **Eliminados** (deprecados, contenido absorbido por la Sección 2):
    `SolutionSection.astro`, `MoreThanChat.astro`.
- `src/components/ui/` — Button, AillyLogo, LiveAgentChat, Eyebrow,
  `WhatsAppMockup.astro` / `StatBar.astro` / `MiniStat.astro` (soporte de
  `CaseStudies.astro`, reutilizables si otra sección necesita el mismo patrón visual).
- `src/lib/constants.ts` — WHATSAPP_NUMBER, WHATSAPP_MESSAGE, CALENDLY_URL centralizados

### Data Flow
No hay data flow — todo el contenido es estático, hardcoded directamente en los componentes `.astro`. Los únicos "datos dinámicos" son los links de contacto, centralizados en `constants.ts`.

### Key Patterns
- **`ui/LiveAgentChat.astro` es el chat en vivo contra `/api/chat`.** Se usa dos veces en la página (Hero.astro y DemoSection.astro) — cada instancia se gobierna por sí sola vía `closest(".live-agent-chat")`, sin ids globales, para poder repetirse sin colisión. El caller pone el header/card exterior; el componente solo renderiza el log de mensajes y el input.
- **Un solo archivo para contacto.** Nunca hardcodear el número de WhatsApp o el link de Calendly directamente en un componente — siempre importar de `src/lib/constants.ts`.
- **Sin JS más allá de lo esencial.** Scripts propios: el toggle del menú hamburguesa móvil (Navbar.astro) y la lógica de LiveAgentChat.astro. El script de Calendly es la única excepción externa, necesaria para el embed del CTA final.

## Code Organization Rules

1. **Una sección por archivo** en `components/sections/`. No mezclar dos secciones de la landing en un mismo componente.
2. **Path alias:** usar `@/` para imports desde `src/`.
3. **Mobile-first.** Escribir estilos base para móvil, agregar `md:`/`lg:` para escalar hacia desktop — nunca al revés.
4. **Sin componentes React** salvo que surja una necesidad real de interactividad compleja — hoy no la hay.
5. **Todo el copy en español**, tono directo y de venta — no genérico ni corporativo vacío.

## Design System

**Pivote de dirección visual (2026-08-31):** el sistema coral/carbón del Ailly
Brandbook fue reemplazado por completo, por pedido explícito del usuario, al
copiar la identidad visual del template "Marble" (`MARBLE TEMPLATE.png`, raíz
del repo — un link-in-bio para creadores). El Brandbook oficial de Ailly
(`Ailly/Brandbook/ailly-brandbook.pdf`) queda desactualizado respecto a la
landing: ya no es la fuente de verdad de color/tipografía de este proyecto,
aunque el logo (monograma) y el tono de voz del copy se mantienen. Si el
usuario pide "volver a la marca oficial" o revisar el brandbook, aclarar este
desfase antes de asumir cuál paleta aplica.

### Colors (paleta vigente, copiada de Marble — ver `@theme` en `src/styles/globals.css`)
- Fondo (bg): `#130C22` — violeta casi negro
- Superficie (surface): `#1C1430`
- Superficie elevada / tarjetas (surface-elevated): `#241A38`
- Acento (accent): `#7C3AED` — hover `#8B5CF6`, muted `#A78BFA`
- Heading/texto principal: `#F5F3FA`
- Body/nav: `#B4ACC4` / `#9A8FB0`

### Logo
`src/components/ui/AillyLogo.astro` — el monograma coloreado vía
`var(--color-heading)`/`var(--color-accent)`, hereda el nuevo acento violeta
automáticamente sin tocar el SVG.

### Typography
- Headings (`font-serif`, h1–h4): **Baloo 2** (Google Font), redondeada y
  chunky — copiada del estilo de Marble. Peso 700, line-height 1.08.
- Body: Inter 400, line-height 1.75. Nav/Botones: Inter, peso **bold**
  (no medium), uppercase, letter-spacing 0.06em — más pesado que antes,
  siguiendo el estilo de botones de Marble.

### Style
- Esquinas muy redondeadas (`rounded-full` en botones/pills, `rounded-3xl`
  en tarjetas grandes) — copiado del lenguaje de tarjetas grandes y botones
  pill de Marble, más redondo que el sistema anterior.
- Botones CTA: pill shape, fondo acento violeta + texto blanco/heading en
  negrita, glow suave (`box-shadow ... rgba(124,58,237,0.55)`).
- Eyebrows: badge tipo pill con punto de acento (`ui/Eyebrow.astro`), no la
  línea con guiones del sistema anterior.
- Bordes finos violeta-apagado con opacidad baja para delimitar tarjetas.
- Spacing generoso entre secciones (`clamp(80px,10vw,160px)` vertical).
- Spacing base: 4px, escala 4/8/12/16/24/32/48/64/80/120.
- Breakpoint móvil: 700px.

## Environment Variables

- `ANTHROPIC_API_KEY` — usada solo por `src/pages/api/chat.ts` (demo interactiva). Nunca se expone al navegador. En local: copiar `.env.example` a `.env`. En producción: Vercel → Project Settings → Environment Variables.

## Reglas No Negociables

1. **Nunca hardcodear el número de WhatsApp o el link de Calendly fuera de `constants.ts`.**
2. **El system prompt del agente de demo vive solo en `src/pages/api/chat.ts`.** Si cambia el tono o las reglas de la IA, se edita ahí — nunca duplicarlo en otro archivo.
3. **Sin CMS ni base de datos, y sin backend más allá de `src/pages/api/chat.ts`** — ese único endpoint es la excepción deliberada para la demo interactiva; cualquier otra lógica de servidor es una señal de que se está sobre-construyendo esta landing.
4. **Mobile-first siempre** — el 50%+ del tráfico llega desde el celular vía el correo de la propuesta.
5. **Un componente por sección**, máximo ~150 líneas por archivo `.astro` — si crece más, extraer sub-componentes.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
