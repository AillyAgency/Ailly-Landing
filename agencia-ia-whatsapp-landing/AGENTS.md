# Ailly — Landing WhatsApp

Landing de una página para **Ailly** ("Tu aliado de IA para negocios"), que conecta agentes de IA al WhatsApp de negocios pequeños con alto volumen de atención (clínicas, veterinarias, spas, estudios de belleza) para que nunca se pierda una cita, una pregunta o una venta por falta de respuesta a tiempo. Se distribuye por correo directo a prospectos, no depende de SEO/tráfico orgánico.

Ver `Ailly/Brandbook/ailly-brandbook.pdf` (fuera de este proyecto, en la carpeta padre) para el sistema de marca completo — tesis, pilares, tono de voz y aplicaciones.

## Commands

- `pnpm dev` — Start development server
- `pnpm build` — Production build
- `pnpm preview` — Preview production build localmente

## Tech Stack

Astro + TypeScript + Tailwind CSS v4 — sin React, sin CMS, sin base de datos. Deploy en Vercel (`output: 'server'` + adaptador `@astrojs/vercel`, con la página principal prerenderizada como estática). Único punto de servidor: `src/pages/api/chat.ts`, el endpoint de la demo interactiva de DemoSection.astro.

## Architecture

### Directory Structure
- `src/pages/index.astro` — única página, compone todas las secciones
- `src/components/layout/` — BaseLayout, Navbar, Footer
- `src/components/sections/` — una sección de la landing por archivo (Hero, Pain, Solution, IndustryExamples, CaseStudies, FAQ, CTA)
- `src/components/ui/` — Button, AillyLogo, LiveAgentChat, Eyebrow reutilizables
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

Sistema de marca oficial: **Ailly Brandbook** (`Ailly/Brandbook/ailly-brandbook.pdf`). Fondo casi negro que transmite seriedad tecnológica, acento coral cálido que rompe la frialdad típica de las marcas de IA. Tono de voz: cercanía real, sin jerga técnica — hablamos del dolor y el resultado primero, la tecnología después.

### Colors (paleta oficial, ver `@theme` en `src/styles/globals.css`)
- Negro Carbón (bg): `#0D0D0D`
- Carbón Suave (surface): `#161616`
- Coral (accent): `#E8735A` — hover/fondos claros `#F2A08D`, texto sobre claro / muted `#B8492F`
- Blanco Hueso (heading/texto principal): `#F5F1EC`
- Gris Cálido (body/nav): `#A8A29A`

### Logo
`src/components/ui/AillyLogo.astro` — el monograma (dos arcos que convergen en un rombo coral) como SVG inline, coloreado vía `var(--color-heading)`/`var(--color-accent)` para heredar el tema. Nunca deformar, rotar, ni quitar el acento coral (reglas del brandbook, sección "Usos incorrectos").

### Typography
- **Desviación deliberada del brandbook**: el brandbook especifica una sola familia sin serif (Helvetica Neue/Inter), pero por preferencia explícita del usuario los headings (`font-serif`, h1–h4) usan **Cormorant Garamond** — no es un descuido, no "corregir" de vuelta a Inter sin que lo pidan.
- Headings: Cormorant Garamond, peso 600, line-height 1.05.
- Body: Inter 400, line-height 1.75. Nav/Botones: Inter 500, uppercase permitido solo aquí, letter-spacing 0.08em.
- **Sentence-case en headings, nunca uppercase** — el uppercase se reserva solo para micro-labels de nav/botones.

### Style
- Esquinas redondeadas suaves (`border-radius: 10px` botones, `16px` tarjetas) — nunca chamfer angular, se percibe más cálido/confiable
- Botones CTA: fondo coral con texto negro carbón, sombra suave en vez de glow (`box-shadow: 0 8px 24px -8px rgba(232,115,90,0.35)`)
- Bordes finos coral-apagado con opacidad baja para delimitar tarjetas
- Spacing generoso entre secciones (`clamp(80px,10vw,160px)` vertical) — el aire comunica calma/seguridad, no urgencia apretada
- Spacing base: 4px, escala 4/8/12/16/24/32/48/64/80/120
- Breakpoint móvil: 700px

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
