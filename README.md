# NAVI OS — experiencia de presentación

Experiencia web cinematográfica e interactiva para presentar **NAVI OS** a NAVI
Centro Creativo en directo (~25–30 min, 25 escenas en 15 actos, con una demo
simulada del producto).

Todo funciona en local: sin APIs, sin claves y sin backend. Las fuentes se
sirven desde el propio build.

## Arrancar

```bash
npm install
npm run dev          # http://localhost:3000
```

Para presentar, mejor usar el build de producción (más fluido):

```bash
npm run build && npm start
```

## Presentar

| Acción | Tecla |
|---|---|
| Siguiente paso / escena | `→` · `Espacio` · `PageDown` |
| Anterior | `←` · `Shift+Espacio` · `PageUp` |
| Índice de escenas | `⌘K` / `Ctrl+K` |
| Modo presentación (pantalla completa, oculta la interfaz) | `P` (salir con `Esc`) |
| Pantalla completa | `F` |
| Primera / última escena | `Home` / `End` |

- Mueve el ratón para ver el **dock del presentador** (anterior/siguiente,
  índice, ir a la demo, reiniciar la demo, ir a la inversión, pantalla completa).
- Algunas escenas tienen **pasos** estilo keynote: `→` los revela antes de pasar
  a la siguiente escena. Si alguien navega con scroll, aparece un botón
  discreto de "Continuar".
- **Enlaces directos**: `/#demo`, `/#roi`, `/#investment`… (la URL se
  actualiza sola, así que recargar mantiene la posición).
- En la **demo** (escena 12), `→` también la hace avanzar: inicia la
  simulación, acelera las fases automáticas y aprueba cuando ya hay una
  selección. Las decisiones (miniatura, clips 1·2·3) se toman con clic.
  "Reset demo" la reinicia.

## Dónde se editan las cosas

| Qué | Dónde |
|---|---|
| Cifras del negocio (programas, horas, precio, horas de desarrollo, valores por defecto del ROI…) | `src/config/presentation.ts` |
| Fórmulas derivadas (proyecciones, ROI, carga por episodio) | `src/lib/metrics.ts` |
| Orden de escenas y actos | `src/data/scenes.ts` → componentes en `src/scenes/` |
| Programas del Command Center | `src/data/programs.ts` |
| Guion de la demo (episodio, clips, miniaturas, tareas) | `src/data/demo.ts` |
| Datos simulados de rendimiento y patrones | `src/data/performance.ts` |
| Command Center (pipeline, calendario, integraciones) | `src/data/commandCenter.ts` |
| Sistemas, roadmap, documentos base, alcance | `src/data/build.ts` |
| Logos e imágenes | `public/brand/` (ver `public/brand/README.md`) |
| Colores y tipografía | `src/app/globals.css` (`@theme`) |

Ninguna cifra importante está escrita a mano dentro de los componentes: las
cifras derivadas se calculan siempre a partir de la configuración.

## Veracidad

Cada cifra lleva una etiqueta que dice qué tipo de dato es:
**Dato actual** (medido hoy), **Proyección** (extrapolación lineal),
**Estimación** (horas o semanas de desarrollo), **Objetivo** (meta de diseño,
no una medición) y **Simulación** (datos inventados para visualizar la
experiencia). La demo y el Command Center aparecen marcados como
"Simulación de experiencia propuesta".

## Datos reales de NAVI

- **Fecha de auditoría:** 27/09/2026.
- **Fuente de programas:** `src/data/navi-programs-audited.ts` (verificado; evidencias en `ASSET_AUDIT.md`)
  → `src/data/programs.ts` (los 11 programas activos + capa operativa **simulada**) → UI.
- **Assets reales:** `public/brand/navi/` (logo y árbol NAVI), `public/channels/<red>/` (avatar y banner de las 5 redes),
  `public/programs/<slug>/` (miniaturas de YouTube y portadas de la web).
- **Real:** nombres de programas, redes, hosts, horarios, miniaturas, logos, el episodio de la demo
  ("La diferencia entre reaccionar y responder") y su miniatura publicada.
- **Simulado:** métricas (views, CTR, retención, suscriptores), estados del pipeline, alertas, insights, clips propuestos,
  07:42 de intervención humana (objetivo) y todos los resultados del ROI (escenarios).
- Criterio: lo no verificado y no necesario simplemente no se muestra; la experiencia no contiene avisos de datos pendientes.
- Nota técnica interna: cuando NAVI facilite el SVG oficial del logo, sustituirlo en `src/config/brand.ts`.
- Detalle de la integración: `REAL_ASSET_INTEGRATION.md`.

## Arquitectura

```
src/
  app/                 layout (fuentes, metadatos) + page
  config/              presentation.ts (cifras), brand.ts (assets)
  lib/                 metrics (fórmulas), format (es-ES), claims, colors
  data/                escenas, programas, demo, rendimiento, command center, build
  scenes/              una función por escena, agrupadas por acto
  components/
    presentation/      Provider (navegación, pasos, teclado, pantalla completa),
                       Scene, PresenterChrome, SceneIndex (⌘K)
    ui/                BigStatement, SceneHeader, Metric, ClaimTag, Reveal, …
    visuals/           MulticamStage, CurrentWorkflow, ScalingVisualization,
                       NaviOSReveal, ArchitectureDiagram, StudioFrame
    demo/              RenderSimulation + máquina de estados determinista,
                       ProcessingNode, ThumbnailSelector, ClipSelector,
                       DistributionMap, EpisodeStatus
    intelligence/      PerformanceDashboard, InsightPanel
    command/           CommandCenter, ProgramCard
    business/          ROICalculator, Roadmap, Investment, Finale
    charts/            gráficos SVG ligeros (columnas, líneas, barras apiladas)
```

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · Lucide. Respeta `prefers-reduced-motion`.
