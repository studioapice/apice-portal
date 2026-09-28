# REAL_ASSET_INTEGRATION — FASE 2

Integración de la identidad real de NAVI en la presentación NAVI OS.
Base: `ASSET_AUDIT.md` + `src/data/navi-programs-audited.ts` (auditoría del 27/09/2026).
Checkpoint previo: tag git `pre-real-navi-integration`.

## Integrado

| Área | Qué | Dónde |
|---|---|---|
| Logo | Logo horizontal oficial (apertura), recortado a su área visible con CSS + `mix-blend-mode: screen` (el JPG no se modifica) | `NaviWordmark`, `src/config/brand.ts` |
| Logo | Árbol NAVI (PNG transparente) en el reveal, la barra lateral de la demo, el Command Center y la marca superior | `NaviTree`, `NaviOSMark tree` |
| Favicon | Favicon oficial de NAVI | `src/app/icon.png` |
| Programas | Los 11 programas activos verificados, con su red, hosts, horario y miniatura real | `src/data/programs.ts` → `ProgramCard` |
| Redes | Las 5 redes como taxonomía: `NetworkBadge` (punto de color + nombre), filtros en Programs, chips con avatar en Overview, punto de red en calendario y pipeline | `NetworkBadge`, `CommandCenter` |
| Calendario | Horarios reales de episodio de cada programa (Mujeres Amplificadas se omite: horario no verificado) | `CALENDAR_ITEMS` |
| Demo | Episodio real de YSFT "La diferencia entre reaccionar y responder" (45:19), hosts Lilly Méndez + Nico Osorio, playlist y horario reales (martes 21:00). Sin temporada ni número de episodio (no son públicos) | `src/data/demo.ts` |
| Demo | La opción **B** de miniatura es la miniatura real publicada del episodio | `ThumbnailArt` |
| Roadmap | Etiquetas claras: "Beta operativa estimada 4–8 semanas" / "Desarrollo integral estimado 220–350 h" | escena 21 |

## Fuera (a propósito)

- Programas históricos (Boss Mind Beauty, De los Pies a la Cabeza, Desde el Paddock, Viralmente) y MILFS: no aparecen como activos.
- Mindset Evolution y Boss Mind Beauty se mantienen como entidades distintas.
- Incidencias de la web de NAVI (portadas mal emparejadas, enlace @NAVICHANNELTV roto): no se mencionan.
- Hosts: se muestra exactamente la información verificada (en algunos casos, solo el nombre de pila).
- Las ilustraciones `StudioFrame` se mantienen donde no hay material real (multicámara, fotogramas de clips, conceptos A/C de miniatura).

## Sigue siendo simulación

Métricas de Intelligence y del Command Center, estados del pipeline, alertas, insights, los 10 clips propuestos y sus
puntuaciones, horario de clips, títulos alternativos, capítulos y descripción SEO, nombre y tamaño del archivo de render,
07:42 (objetivo de diseño) y todos los escenarios ROI. Para mantener la coherencia interna, la duración simulada de visionado
se ha reescalado a la duración real del episodio (16:54 de 45:19).

## Criterio de datos

La presentación está completa con la información verificada. Si un dato no está verificado y no es necesario, no se muestra
(sin avisos del tipo "por confirmar", "pendiente" o "N/A"). No hace falta pedir información adicional a NAVI antes de presentar.

## Nota técnica interna

- Mejora opcional: sustituir el logo actual (JPG con fondo negro + PNG del árbol) por el **SVG/vector oficial de NAVI** cuando
  NAVI lo facilite. Basta con añadirlo en `public/brand/navi/` y cambiar la ruta en `src/config/brand.ts`.
