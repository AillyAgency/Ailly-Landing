# Agencia IA — Landing WhatsApp

Landing de una página que vende un agente de WhatsApp con IA que responde 24/7, evitando que el negocio pierda clientes por no contestar a tiempo. Se distribuye por correo directo a prospectos, no depende de SEO/tráfico orgánico.

## Commands

- `pnpm dev` — Start development server
- `pnpm build` — Production build
- `pnpm preview` — Preview production build localmente

## Tech Stack

Astro + TypeScript + Tailwind CSS v4 — sin React, sin CMS, sin backend, sin base de datos. Deploy en Vercel.

## Architecture

### Directory Structure
- `src/pages/index.astro` — única página, compone todas las secciones
- `src/components/layout/` — BaseLayout, Navbar, Footer
- `src/components/sections/` — una sección de la landing por archivo (Hero, Pain, Solution, HowItWorks, CTA)
- `src/components/ui/` — Button, StaircaseHeading reutilizables
- `src/lib/constants.ts` — WHATSAPP_NUMBER, WHATSAPP_MESSAGE, CALENDLY_URL centralizados

### Data Flow
No hay data flow — todo el contenido es estático, hardcoded directamente en los componentes `.astro`. Los únicos "datos dinámicos" son los links de contacto, centralizados en `constants.ts`.

### Key Patterns
- **HeroMedia.astro es un punto de reemplazo intencional.** Hoy renderiza una `<img>`, más adelante se reemplaza por un `<video>` sin tocar Hero.astro ni ningún otro archivo — mismo contenedor, mismo overlay, mismas dimensiones.
- **Un solo archivo para contacto.** Nunca hardcodear el número de WhatsApp o el link de Calendly directamente en un componente — siempre importar de `src/lib/constants.ts`.
- **Sin JS más allá de lo esencial.** El único script propio es el toggle del menú hamburguesa móvil (Navbar.astro). El script de Calendly es la única excepción externa, necesaria para el embed del CTA final.

## Code Organization Rules

1. **Una sección por archivo** en `components/sections/`. No mezclar dos secciones de la landing en un mismo componente.
2. **Path alias:** usar `@/` para imports desde `src/`.
3. **Mobile-first.** Escribir estilos base para móvil, agregar `md:`/`lg:` para escalar hacia desktop — nunca al revés.
4. **Sin componentes React** salvo que surja una necesidad real de interactividad compleja — hoy no la hay.
5. **Todo el copy en español**, tono directo y de venta — no genérico ni corporativo vacío.

## Design System

Dirección: **luxury / confianza**. El registro visual debe sentirse como una firma consultora seria, no como una startup de IA genérica — eso es lo que genera confianza en un prospecto que está por darle acceso a su canal de ventas.

### Colors
- Background: `#0B0E14` (navy casi negro)
- Surface: `#12151C` / Surface Elevada: `#181C25`
- Primary/Accent: `#C9A961` dorado champagne (hover `#D9C284`, border/muted `#A8874A`)
- Heading text: `#F5F3EF`
- Body text: `#A8ACB3`
- Nav text: `#C7CAD1`

### Typography
- Headings: Cormorant Garamond (Google Fonts, 600), **sentence-case, nunca uppercase**, line-height 1.05 — el uppercase se reserva solo para micro-labels de nav/botones
- Body: Inter (400), line-height 1.75
- Nav/Botones: Inter (500), uppercase permitido solo aquí, letter-spacing 0.08em
- Fallback: Georgia (headings) / system-ui (body)

### Style
- Esquinas redondeadas suaves (`border-radius: 10px` botones, `16px` tarjetas) — nunca chamfer angular, se percibe más cálido/confiable
- Botones CTA: fondo dorado con texto navy oscuro, sombra suave en vez de glow (`box-shadow: 0 8px 24px -8px rgba(201,169,97,0.35)`)
- Bordes finos dorado-apagado con opacidad baja para delimitar tarjetas — refuerza sensación de detalle cuidado
- Headings en layout "escalera" conservado pero menos agresivo, palabra clave en dorado
- Spacing generoso entre secciones (`clamp(80px,10vw,160px)` vertical) — el aire comunica calma/seguridad, no urgencia apretada
- Spacing base: 4px, escala 4/8/12/16/24/32/48/64/80/120
- Breakpoint móvil: 700px

## Environment Variables

Ninguna — sitio estático sin backend.

## Reglas No Negociables

1. **Nunca hardcodear el número de WhatsApp o el link de Calendly fuera de `constants.ts`.**
2. **HeroMedia.astro se edita solo, nunca se toca el layout de Hero.astro para cambiar imagen por video.**
3. **Cero dependencias de backend, CMS o base de datos** — si algo parece requerir una, es una señal de que se está sobre-construyendo esta landing.
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
