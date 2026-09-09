# Ailly — Landing WhatsApp para clínicas

Landing de una página para **Ailly** ("Tu aliado de IA para clínicas"). **Nicho
exclusivo (pivote 2026-09-09, decisión explícita del usuario):** la landing ya
no se dirige a "negocios" en general — es 100% para **clínicas dentales,
estéticas/medicina estética y veterinarias**. Cualquier copy nuevo debe hablar
de "tu clínica" y "tus pacientes", nunca de "tu negocio" y "tus clientes"
genéricos. Motivación de negocio: el usuario busca deliberadamente pocos
clientes de ticket alto y alta integración (~4 clínicas pagando ~$1M COP/mes
cada una) en vez de muchos clientes de ticket bajo — ver el modelo de Niveles
más abajo, que ahora es también el precio público de la calculadora.

Dentro de "clínicas", Ailly sigue cubriendo 6 frentes del negocio: comunicación
y atención a pacientes, agendamiento y coordinación, facturación/cobros,
inventario de insumos médicos/odontológicos, pacientes y CRM, y administración/
marketing — ver Sección 2 del plan maestro (el contenido de esa sección ahora
está reescrito en clave de clínica, no de negocio genérico). Se distribuye por
correo directo a prospectos, no depende de SEO/tráfico orgánico.

**Sección eliminada:** `IndustryExamples.astro` (mostraba 9+ rubros no
relacionados — barberías, ópticas, salones, comercio — que dejaron de aplicar
con el nicho de clínicas). El link de navegación `#industrias` se reemplazó
por `#lo-que-recibirias` (apunta a CaseStudies) en `Navbar.astro` y
`Footer.astro`.

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
- `src/pages/index.astro` — única página, compone todas las secciones. Orden
  vigente (2026-09-09): Hero → CaseStudies → PainSection (dolores delegables)
  → BeforeAfterSection → HowItWorks → PricingCalculator → FAQSection →
  CTASection.
- `src/components/layout/` — BaseLayout, Navbar, Footer. Los links de navegación
  apuntan a `#dolores`, `#como-funciona`, `#lo-que-recibirias`, `#precio`, `#faq`.
- `src/components/sections/` — una sección de la landing por archivo:
  - `Hero.astro` — 2 CTAs (WhatsApp + Calendly), H1 habla de "tu clínica" y
    "cuidar a tus pacientes".
  - `PainSection.astro` — Sección 2, 6 bloques de dolores delegables
    (comunicación, agendamiento, facturación/cobros, inventario de insumos
    médicos/odontológicos, pacientes y CRM, administración/marketing) — cada
    tarea reescrita en lenguaje de clínica (pacientes, citas, tratamientos,
    insumos), no de negocio/cliente genérico.
  - `BeforeAfterSection.astro` — Sección 3, antes/después con métricas de
    clínica (inasistencia a citas, pacientes reactivados, etc.).
  - `HowItWorks.astro` — Sección 4: 4 pasos (llamada de diagnóstico →
    propuesta → demo → comparación). El paso 2 muestra un badge verde con
    "50% al iniciar el proyecto · 50% al entregarlo funcionando".
  - `CaseStudies.astro` — Sección "Esto es lo que recibirías", ubicada justo
    después del Hero. 3 ejemplos ilustrativos por tipo de clínica (dental /
    estética-spa / veterinaria), explícitamente rotulados "no son pacientes
    reales" en el copy, con el mockup de WhatsApp mostrando "Tu clínica" en
    vez de un nombre de empresa. **Nunca volver a presentar negocios/capturas
    inventados como casos reales** — si se necesitan casos reales, deben ser
    clientes reales verificados con su permiso, no ejemplos con nombre propio
    fabricado.
  - `PricingCalculator.astro` — Sección de precio. Calculadora de 2 preguntas
    (tamaño de la clínica + qué automatizar primero), sin formulario de
    captación — el botón de WhatsApp final con el resumen prellenado ES la
    captación. El precio ya no se suma por módulo: se lee directamente del
    modelo de Niveles en `src/lib/pricing.ts` (ver sección de precio más
    abajo) según el tamaño de clínica elegido.
  - `FAQSection.astro` — 13 preguntas, lenguaje de "pacientes" en vez de
    "clientes", cubriendo objeciones de confianza y control (toque personal,
    reemplazo de personal, quién controla la conversación, portabilidad de
    datos al irse) además de las operativas (integración, precio, tiempo,
    seguridad, soporte, contrato).
  - `CTASection.astro` — copy reescrito para conectar con el Hero, mención
    explícita de "tus pacientes" y "tu clínica".
  - **Eliminados:** `SolutionSection.astro`, `MoreThanChat.astro` (contenido
    absorbido por PainSection) y `IndustryExamples.astro` (mostraba 9+ rubros
    no relacionados con clínicas — barberías, ópticas, salones, comercio —
    redundante una vez que CaseStudies ya cubre las 3 verticales del nicho).
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

## Fuente de verdad de marca (actualizado 2026-09-05)

`~/CLAUDE PROYECTOS /Ailly/` (fuera de este repo, un nivel arriba) tiene el
**Brandbook v2.0 oficial** (`Brandbook/Ailly-Brandbook-v2.pdf`, fechado 2026) —
confirma que el verde esmeralda `#2D9B6F` SÍ es el color de marca real vigente
(no un pivote temporal), junto con los logos PNG reales
(`Ailly_simbolo_transparente.png`, `Ailly_logo_sobre_oscuro.png`,
`Ailly_logo_sobre_claro.png`). El símbolo real es una "A" de dos trazos rectos
que convergen en un rombo verde — **distinto** del monograma de arcos curvos
que estaba dibujado a mano en `AillyLogo.astro` (ya corregido, ver abajo).

Esa carpeta también tiene `Prospectos_high_ticket.txt` — una lista de
prospección de ventas (clínicas/consultorios reales de Medellín con niveles de
precio Nivel 1/2/3: Nivel 1 $2.5M-$4M setup / $400k-$600k mes, Nivel 2
$5M-$9M / $800k-$1.2M, Nivel 3 $9M-$15M / $1.5M-$2.5M). **Esto sigue siendo
información interna de ventas (nombres de clínicas reales, señales de
capacidad de pago) — nunca publicar el archivo en sí en la página pública.**

**Resuelto (2026-09-09):** la discrepancia histórica entre estos Niveles y el
`PricingCalculator.astro` público (que antes usaba un modelo aditivo por
módulos, sin cuota de instalación, con piso ~$1.3M/mes) ya no existe —
`src/lib/pricing.ts` ahora exporta `CLINIC_SIZE_OPTIONS` con los mismos 3
rangos de instalación + mensualidad de arriba, y la calculadora pública los
usa directamente. Un solo modelo de precio en toda la operación. Motivo del
cambio: el usuario definió su estrategia como high-ticket deliberado (pocos
clientes de alto valor, no volumen), así que el precio público ya no debía
anclar expectativas por debajo de lo que realmente se cobra.

**Discrepancias sin resolver entre el Brandbook v2 y lo ya implementado:**
1. **Hover del acento:** el usuario pidió explícitamente en el chat
   `#25825C` como hover (aplicado). El Brandbook v2 dice que el hover debería
   ser `#3DB882` (más claro) y que `#25825C` es "Verde Oscuro (texto)", un rol
   distinto. Se mantuvo lo que pidió el usuario por ser instrucción explícita
   y más reciente — no cambiar sin confirmar con él primero.
2. **Tipografía:** el Brandbook v2 especifica Inter como única familia
   (headings peso 800-900), "nunca fuentes decorativas ni serifas". El sitio
   usa **Baloo 2** en headings desde el pivote a "Marble" — no se tocó porque
   no se pidió explícitamente, pero es una inconsistencia real frente a la
   fuente de marca vigente. Preguntar antes de cambiarlo.

## Design System

**Color: acento verde esmeralda (2026-09-01, reemplaza el rojo sangre del
Brandbook).** Tercer pivote de color de la landing — historial: coral (Brandbook
original) → violeta ("Marble") → rojo sangre (Brandbook oficial) → **verde
esmeralda actual**, por pedido explícito del usuario. El Brandbook oficial
(`ailly-brandbook 2-completo.pdf`) queda desactualizado en color otra vez — sigue
siendo la referencia de logo/tono de voz, no de la paleta vigente. Layout,
tipografía (Baloo 2) y forma de componentes heredados de Marble no cambiaron.

### Colors (paleta vigente — ver `@theme` en `src/styles/globals.css`)
- Fondo (bg): `#0D0D0D` — sin cambios desde el Brandbook
- Superficie / tarjetas (surface): `#161616` — sin cambios
- Superficie elevada (surface-elevated): `#1E1E1E` — sin cambios
- Acento (accent): `#2D9B6F` (verde esmeralda) — hover `#25825C`
- `--color-accent-muted` = mismo `#2D9B6F` que accent (no hay un segundo hex de
  "muted" en este pedido). Los usos existentes con opacidad Tailwind
  (`bg-accent-muted/20`, `border-accent-muted/30`, etc.) ya producen los tintes
  pedidos por el usuario — fondos ≈ `rgba(45,155,111,0.12)`, bordes ≈
  `rgba(45,155,111,0.30)` — sin tocar cada valor de opacidad uno por uno.
- Heading/texto principal: `#F5F1EC` — sin cambios. Body/nav: `#A8A29A` — sin cambios.
- **Contraste:** texto sobre `bg-accent` debe ser `text-heading` (claro), nunca
  `text-bg` — ya corregido en `.bubble--agent`/`.bubble--typing` de `globals.css`.
- **Nota de diseño, no corregida sin que se pida:** ya existía un verde
  independiente (`#4CAF7D`) usado como tono "positivo/éxito" en `MiniStat.astro`,
  `StatBar.astro` y `CaseStudies.astro` (ej. "Confirmadas 91%"), de antes de este
  cambio. Ahora convive con el nuevo acento `#2D9B6F`, también verde — son tonos
  distintos pero cercanos, podría notarse poca distinción visual entre "acento
  de marca" y "indicador positivo". No se tocó porque no se pidió, pero vale la
  pena mencionarlo si el usuario nota que se ven parecidos.

### Logo
`src/components/ui/AillyLogo.astro` — el monograma coloreado vía
`var(--color-heading)`/`var(--color-accent)`, hereda el verde esmeralda
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
