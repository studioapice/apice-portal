# ASSET_AUDIT — Identidad real de NAVI para NAVI OS

**Información auditada a fecha de ejecución: 27 de septiembre de 2026.**

> **Nota de uso (añadida tras la FASE 2):** este documento es evidencia de investigación. La sección *Missing information*
> recoge huecos de la fuente, **no requisitos para presentar**: la presentación usa solo datos verificados y omite el resto.
> La única mejora que se mantiene abierta es obtener el SVG oficial del logo de NAVI.
NAVI Channel está en plena reorganización (los 5 canales de red publican desde hace ~2 semanas). No asumir que esta estructura es permanente.

Fuentes consultadas (solo oficiales):
- https://www.navicentrocreativo.com/ · /navi-channel/ · /sobre-navi/
- YouTube: @NaviChannelBienestar · @NaviChannelPop · @NaviChanelStories · @NaviChannelEmprende · @NaviChannelVlog (descripción de canal, pestaña de vídeos, playlists y descripción de cada playlist)

Leyenda: **VERIFIED** = confirmado en fuente oficial explícita · **PARTIAL** = parte confirmada, parte pendiente · **UNVERIFIED** = solo mención, sin evidencia · **INFERIDO** = deducción mía, no usar en la presentación.

Datos estructurados: `src/data/navi-programs-audited.ts` (aún **no** conectado a la presentación).

---

## ==================================================
## NAVI GLOBAL BRAND
## ==================================================

### Logo principal
| Asset | Archivo local | Fuente | Formato | Resolución | Calidad | Uso recomendado |
|---|---|---|---|---|---|---|
| Logo horizontal "NaVi Centro Creativo" (árbol + wordmark) | `public/brand/navi/logo-horizontal-black.jpeg` | web (header) `uploads/2025/09/HORIZONTAL-Fondo-Negro.jpeg` | JPG, **fondo negro** (no transparente) | 1600×900 | Buena | Sobre fondos negros puros (#000). En fondos #050505 el recuadro casi no se nota; si molesta, pedir SVG/PNG |
| Isotipo árbol (circuito multicolor + raíces doradas) | `public/brand/navi/logo-mark-tree.png` | web (favicon/apple-touch) `NAVI_ARBOL_FINAL.png` | **PNG transparente** | 1179×1627 | Muy buena | Marca principal para NAVI OS: sidebar, reveal, favicon |
| Favicon | `public/brand/navi/favicon-150.png` | web | PNG transparente | 150×150 | Buena | Favicon |
| Logo NAVI Channel (árbol + "NAVI" + "CHANNEL" multicolor) | `public/brand/navi/logo-navi-channel.jpeg` | web `LOGO-NAVI-CHANNEL.jpeg` | JPG, fondo negro | 1254×1254 | Buena | Escena de red / Command Center |

- **No existe SVG** público de ningún logo. No hay variante blanca/monocroma publicada. No he redibujado nada.
- El wordmark usa una tipografía redondeada propia (no identificable con seguridad); en la web el texto usa Space Grotesk / LINE Seed JP / Comfortaa.

### Colores (extraídos del CSS de la web)
| Uso | Valor |
|---|---|
| Fondo | `#000000`, `#050505`, `#080808`, superficies `#0D0D0D`→`#070707` |
| Acento principal (eyebrows, detalles) | **`#F2B52A`** (oro) |
| Gradiente de marca (titulares, botones) | **`#D81B78` → `#E74763` → `#F05A47` → `#F2B52A`** (90°) |
| Acento secundario | `#27B8CE` (cian, puntual) |
| Texto | `#FFFFFF`, grises `#D6D6D6`, `#B9B9B9` |

Colores de red (observados en avatares/banners de YouTube, aproximados): **Bienestar verde neón**, **Emprende naranja**, **Pop violeta**, **Stories azul**, **Vlog rosa/magenta**.

### Tipografías observables
`Space Grotesk` (titulares, mayúsculas) · `LINE Seed JP` (texto) · `Comfortaa` (detalles). Ya usamos Space Grotesk en NAVI OS.

### Lenguaje visual
Negro profundo, titulares en mayúsculas con palabra clave en gradiente magenta→oro, eyebrows en oro con tracking amplio, fotografía real de estudio, botones pill (blanco, outline y gradiente). Claims: *"Tú pones la voz. NAVI pone la producción, los Studios y el sistema."* · *"No competimos. Sumamos."* · canales: *"No crecemos solos. Crecemos en red."*

### Otros assets encontrados
- Studios: `public/brand/navi/studios/studio-1.jpeg`, `studio-2`, `studio-3`, `studio-hero` (1600×900) y `home-2025-08-04.webp` (680×453).
- Equipo (página Sobre NAVI, **no descargado**, son fotos de personas): Eliecer Paredes "Eli" (CEO · dirección audiovisual), Vanessa Reverón (gerencia · dirección creativa), Oskar Vielma (dirección de edición), **Miguel Cabrera** (producción · edición · estrategia digital), Luis Daniel (edición).

### Assets pendientes
- SVG del logo NAVI y de NAVI Channel (o PNG transparente del wordmark).
- Versión monocroma/blanca.
- Logos de cada programa como archivo independiente (hoy solo existen incrustados en miniaturas).

### Incidencias detectadas en la web de NAVI (útil comentárselo a Eli)
1. **Portadas mal emparejadas** en /navi-channel/: los pies de foto dicen *Despierta con Luna / De los Pies a la Cabeza / … / Boss Mind Beauty*, pero las imágenes muestran otra cosa: portada‑7 = **Los Amoristas**, portada‑6 = **Boss Mind**, portada‑2 = **De los Pies a la Cabeza**. Las 3 restantes (The Show, Respira Universo, La Sobremesa) sí coinciden. He guardado cada portada según **lo que muestra la imagen**.
2. El botón "Ver NAVI Channel en YouTube" apunta a **@NAVICHANNELTV → 404**.
3. La web lista 6 programas; YouTube tiene 11 activos + 1 anunciado.

---

## ==================================================
## NETWORK CHANNELS
## ==================================================

Todos comparten: avatar 900×900 (isotipo árbol + "NAVI" + nombre de red en neón dentro de un anillo), banner con escena atmosférica y el mismo bloque de descripción (programas, red, email de patrocinios). Assets en `public/channels/<red>/avatar.jpg` y `banner.jpg`.

### NAVI Bienestar — https://www.youtube.com/@NaviChannelBienestar
- Handle `@NaviChannelBienestar` · 1,12 K suscriptores · 790 vídeos · tagline "Encuentra tu equilibrio" (mente, cuerpo, relaciones, salud).
- **Programas (descripción oficial):** Respira Universo (Dom 21:00) · ¿Y si fueras tú? (Mar 21:00) · Mujeres Amplificadas (Jue 21:00).
- Observación: es el **canal histórico** de NAVI; conserva las playlists antiguas de casi todos los programas (La Sobremesa 100 vídeos, Despierta con Luna 28, Los Amoristas 19, Boss Mind Beauty 23, De los Pies a la Cabeza 12, Desde el Paddock 19, Viralmente 6, The Show 6).
- Assets: avatar 900×900 · banner 2048×1152.

### NAVI Pop — https://www.youtube.com/@NaviChannelPop
- 17 suscriptores · 12 vídeos · "Vive lo que te emociona" (entretenimiento, cultura, humor, tendencias).
- **Programas:** La Sobremesa (Lun noticias · Mié invitados · Vie juegos, 20:00) · MILFS (sin episodios públicos).
- Assets: avatar 900×900 · banner 2048×1152.

### NAVI Stories — https://www.youtube.com/@NaviChanelStories  *(handle con una sola "n": "Chanel")*
- 24 suscriptores · 18 vídeos · "Historias que inspiran".
- **Programas:** The Show (Mar y Jue 19:00) · Lo Que No Se Ve (Sáb 19:00).
- Assets: avatar 900×900 · banner 2560×1440.

### NAVI Emprende — https://www.youtube.com/@NaviChannelEmprende
- 25 suscriptores · 15 vídeos · "Ideas que crecen" (negocios, liderazgo, marketing).
- **Programas:** Kom2Life (Mar 20:00) · Mindset Evolution (Jue 20:00).
- Assets: avatar 900×900 · banner 2048×1152.

### NAVI Vlog — https://www.youtube.com/@NaviChannelVlog
- 30 suscriptores · 12 vídeos · belleza, relaciones, estilo de vida.
- **Programas:** Despierta con Luna (Lun 8:00) · Los Amoristas (Jue 20:00) · Hacemos Que Pase (Sáb 20:00).
- Assets: avatar 900×900 · banner 2560×1440.

### Mapa real de la red

```
NAVI CHANNEL
├── NAVI BIENESTAR
│   ├── ¿Y si fueras tú?        · Lilly Méndez + Nico Osorio   · Mar 21:00
│   ├── Respira Universo        · Alberto Fernández Parron     · Dom 21:00
│   └── Mujeres Amplificadas    · Rosa · Patricia · Vanessa    · Jue 21:00*
├── NAVI POP
│   ├── La Sobremesa            · Miguel, Vanessa y equipo     · L/X/V 20:00
│   └── MILFS                   · (anunciado, sin episodios)
├── NAVI STORIES
│   ├── The Show                · Freddy Bedoya                · Mar y Jue 19:00
│   └── Lo Que No Se Ve         · Olaia Gómez                  · Sáb 19:00
├── NAVI EMPRENDE
│   ├── Kom2Life                · Miguel y Ginette             · Mar 20:00
│   └── Mindset Evolution       · Rosana Palacio y Elena       · Jue 20:00
└── NAVI VLOG
    ├── Despierta con Luna      · Legna González               · Lun 8:00
    ├── Los Amoristas           · Vanessa Reverón + Eliecer Paredes · Jue 20:00
    └── Hacemos Que Pase        · Rosana Palacio + Rocío Gregorio   · Sáb 20:00

Históricos (solo playlists en NAVI Bienestar, sin episodios recientes):
    Boss Mind Beauty · De los Pies a la Cabeza · Desde el Paddock · Viralmente
* horario de canal; la playlist dice "por confirmar".
```

**11 programas activos** con episodios en las últimas ~2 semanas, que coincide con el dato operativo de NAVI.

---

## ==================================================
## PROGRAMS
## ==================================================

Miniaturas: todas son `maxresdefault` de YouTube (1280×720), en `public/programs/<slug>/thumbnail-0N.jpg`. El ID de vídeo de origen va entre paréntesis.

### ¿Y si fueras tú? — VERIFIED · activo
- Network: NAVI Bienestar · Hosts: Lilly Méndez + Nico Osorio · Martes 21:00
- Playlist: https://www.youtube.com/playlist?list=PLZ7LtyNzsRI4
- Logo: local `public/brand/programs/ysft-sello.png` (+ `ysft-logo.png`); el sello aparece también en las miniaturas públicas → **mantener assets locales** (mejor calidad).
- Cover: no existe en la web · Thumbnails: 3 (pV5sC9v2yrY, 3Vo6wqu4Mlw, j6MFjeipiXA)
- Branding público: miniatura con los dos hosts a los lados, mesa con el logo meditativo del programa al fondo, sello YSFT arriba a la izquierda, logo NAVI Bienestar arriba a la derecha, titular en mayúsculas oro/blanco y chip "Lilly Méndez + Nico Osorio". Coherente con el brand kit local.
- Recomendado para Command Center: `thumbnail-01.jpg` + sello local.

### Respira Universo — VERIFIED · activo
- NAVI Bienestar · Alberto Fernández Parron · Domingo 21:00
- Playlist: PLQCK17V8wBRSQ6lCmknEK701jYKvT83lx
- Cover: `cover.jpeg` (1280×720, web) · Thumbnails: 3 (cQH7LfKHLfI, EbYahNdigsY, 9Vnpes_QMHw)
- Recomendado: `cover.jpeg`.

### Mujeres Amplificadas — PARTIAL · activo
- NAVI Bienestar · Rosa · Patricia · Vanessa (solo nombre de pila) · canal: Jue 21:00 / playlist: "por confirmar"
- Playlist: PLPxKRY0W_u2w · Thumbnails: 2 (WfupSCQVw10, lw376Nln8CA) · Logo "X3 Mujeres Amplificadas" visible en miniatura
- Recomendado: `thumbnail-01.jpg`. Pendiente: apellidos y horario confirmado.

### La Sobremesa — VERIFIED · activo
- NAVI Pop · "Miguel, Vanessa y equipo" · Lun/Mié/Vie 20:00
- Playlist: PLO_3_Q5KiP_U · antigua (NAVI Bienestar, 100 vídeos): PLQCK17V8wBRS7pHw45AMQyk5-nqVfby4V, que lista a Eliecer Paredes, Vanessa Reverón, Miguel Cabrera, Oskar y Luis Daniel.
- Cover: `cover.jpeg` (web, "Episodio 100") · Thumbnails: 3 (ng3iAm9YmYw, ri9I6UZUVMo, 0daQhAroVBY)
- Recomendado: `thumbnail-01.jpg` (más actual) o `cover.jpeg`.

### The Show — VERIFIED · activo
- NAVI Stories · Freddy Bedoya · Martes y Jueves 19:00 · subtítulo "El camino del Artista"
- Playlist: PLM9M7y9wPBBk · antigua: PLQCK17V8wBRQ5eyFx6BtADMyWhJL6G_B-
- Cover: `cover.jpeg` (1600×900) · Thumbnails: 3 (0dny04n6EEs, BbgGH-ZqQtg, vUKDW0nRkUo)
- Recomendado: `cover.jpeg`.

### Lo Que No Se Ve — VERIFIED · activo
- NAVI Stories · Olaia Gómez · Sábados 19:00 · Playlist: PLLEZ41rmYSQE
- Thumbnails: 2 (vDkU8s2mzSk, IvX3eXOqLpc) · Recomendado: `thumbnail-01.jpg`.

### Kom2Life — VERIFIED · activo
- NAVI Emprende · Miguel y Ginette · Martes 20:00 · Playlist: PLfeWNTkI9gF0
- Thumbnails: 2 (UKe4F50jiAE, 9hSj50xi504) · Logo "K2L podcast" visible en miniatura.
- Pendiente: confirmar si "Miguel" es Miguel Cabrera (no lo asumo).

### Mindset Evolution — VERIFIED · activo
- NAVI Emprende · Rosana Palacio y Elena · Jueves 20:00 · Playlist: PLHoIzGScpRhY
- Thumbnails: 2 (28CHqvZy8XI, 6bqxqKwwfIQ)
- Nota INFERIDA: podría ser la evolución de Boss Mind Beauty (comparten Rosana y Elena y el colaborador "Sherona Academy Nails"). No fusionados sin confirmación.

### Despierta con Luna — VERIFIED · activo
- NAVI Vlog · Legna González · Lunes 8:00 · Playlist: PLb1Vns2Ewed4 · antigua: PLQCK17V8wBRR4ocunonYlXjLEtgjDVW3e (28 vídeos, "Lunes 7:30")
- Cover: **ninguna** (la de la web pertenece a Los Amoristas) · Thumbnails: 2 (DuDADIgenOA, Dfh1XK1lU34) · Logo "Despierta con Luna" visible en miniatura.

### Los Amoristas — VERIFIED · activo
- NAVI Vlog · Vanessa Reverón + Eliecer Paredes · Jueves 20:00 · Playlist: PLekd7Tw_FD8E · antigua: PLQCK17V8wBRQeAlBDhZhOtbrpMDwV6nc_ (19 vídeos)
- Cover: `cover.jpeg` (web, publicada con otro pie) · Thumbnails: 2 (fBzmAGlE_5I, c1Amy7Darxs).
- Nombre: "LOS AMORISTAS" en YouTube; el logo dice "AMORISTAS". Colaborador: "AMORISTAS: Escuela para Parejas".

### Hacemos Que Pase — VERIFIED · activo
- NAVI Vlog · Rosana Palacio + Rocío Gregorio · Sábados 20:00 · Playlist: PLOXpU4O2J4Kw
- Thumbnails: 2 (d1JEQ8dRwKM, 1wTSptHsLHE).

### MILFS — UNVERIFIED · anunciado
- Mencionado en la descripción de NAVI Pop ("Humor, actualidad y cultura pop sin filtros"). Sin playlist, episodios, hosts ni assets. **No usar.**

### Boss Mind Beauty — PARTIAL · histórico
- Hosts: Yael Rodríguez, Elena Piruelos, Rosana Palacios · Playlist (NAVI Bienestar, 23 vídeos, último hace ~3 semanas): PLQCK17V8wBRS9TD5PBNyF8qEii5vuieTz
- No aparece en ninguna lista actual de programas de canal → red actual no verificable.
- Cover: `cover.jpeg` · Thumbnails: 2 (IIkwbLgFNvs, GCmLVBascvM).

### De los Pies a la Cabeza — PARTIAL · histórico
- Host: Toñi Campoy · Playlist (12 vídeos, último hace ~4 meses): PLQCK17V8wBRQS109iUdncM5Ms8mtuUa5E · horario antiguo: miércoles 21:00
- Cover: `cover.jpeg` · Thumbnails: 2 (SJtbt-mkNp0, dHZEIHFNKBI).

### Desde el Paddock — PARTIAL · histórico
- Host: César Becerra · F1 · Playlist (19 vídeos, último hace ~3 meses): PLQCK17V8wBRRvDkoEnPPz9pNqh7vyX2Dw · Thumbnails: 2 (7mZ_UlNqZv4, 4v90NudZOBQ).

### Viralmente — PARTIAL · histórico
- Host: Andreina Veliz · Playlist (6 vídeos, último hace ~5 meses): PLQCK17V8wBRTcEfpuLbs3imL3OqQLWWzK · Thumbnails: 2 (893xj9-0hZk, cOr8_HqcXnA).

**Temporadas:** ninguna fuente indica temporada de forma explícita en los programas activos. Solo aparece numeración de episodio (p. ej. "DESPIERTA CON LUNA EP25", "La Sobremesa EP 99/100", "The Show EP_06"). No inferido.

---

## ==================================================
## AUDITORÍA DE MINIATURAS
## ==================================================

Patrón común de NAVI Channel (muy consistente entre programas):
- **Rostro siempre presente**: 1–3 personas (hosts y/o invitado), recortadas o sentadas en el set, expresivas.
- **Titular grande** (2–4 palabras) en mayúsculas condensadas, amarillo/oro + blanco, a menudo con contorno o sombra; palabra clave resaltada.
- **Logo del programa** pequeño en una esquina (arriba a la izquierda casi siempre); a veces también el de la red.
- **Fondos**: set real de estudio (plantas, lámparas cálidas, sofás) o fondos gráficos saturados.
- **Alto contraste y saturación**; viñeteado.
- Portadas de la web: miniatura enmarcada con borde/glow de color + franja lateral con el logo del programa.

Por programa (paleta dominante):
| Programa | Personas | Paleta / estilo |
|---|---|---|
| ¿Y si fueras tú? | 2 hosts | Verde oscuro/teal, oro, set con plantas y mesa |
| Respira Universo | 1–2 | Dorado/verde, luces de escenario |
| Mujeres Amplificadas | 3 | Blanco/crema, editorial y limpio (el más "revista") |
| La Sobremesa | 3–5 | Neón multicolor, mucho texto, humor |
| The Show | 2 | Amarillo/oro + negro, marco dorado |
| Lo Que No Se Ve | 2 | Gris frío, blanco + amarillo |
| Kom2Life | 2–3 | Azul oscuro tecnológico, blanco |
| Mindset Evolution | 3 | Cálido, tipografía serif elegante ("Éxito real") |
| Despierta con Luna | 1 | Violeta/místico, dorado |
| Los Amoristas | 2 | Rosa/magenta, selfie cercana |
| Hacemos Que Pase | 3 | Set luminoso, blanco/verde |
| Boss Mind Beauty | 2 | Rosa/magenta brillante |

Implicación para el Command Center: usar las miniaturas reales tal cual (no recrearlas). Las tarjetas deben dejarlas respirar sobre fondo negro, con el acento de la red como hairline o badge.

---

## ==================================================
## MISSING INFORMATION
## ==================================================

1. Logos de programa como archivo independiente (ideal SVG/PNG transparente) — ninguno público salvo YSFT (local).
2. SVG / PNG transparente del logo NAVI y de NAVI Channel (hoy JPG con fondo negro).
3. Apellidos de hosts: Mujeres Amplificadas (Rosa, Patricia, Vanessa), Kom2Life (Miguel, Ginette), Mindset Evolution (Elena).
4. Si "Miguel" (La Sobremesa / Kom2Life) es Miguel Cabrera y si "Vanessa" es Vanessa Reverón.
5. Horario de Mujeres Amplificadas (canal: Jue 21:00 vs playlist: por confirmar).
6. Estado real de Boss Mind Beauty, De los Pies a la Cabeza, Desde el Paddock y Viralmente (¿terminados, en pausa, fusionados?). En especial, si Mindset Evolution sustituye a Boss Mind Beauty.
7. MILFS: ¿existe ya? hosts, fecha de estreno.
8. Temporada actual de cada programa (no publicada).
9. Portada para Despierta con Luna, Lo Que No Se Ve, Kom2Life, Mindset Evolution, Mujeres Amplificadas y Hacemos Que Pase (no hay en la web; se pueden usar miniaturas).
10. Enlace correcto del canal principal de NAVI Channel (el de la web da 404).

---

## ==================================================
## TABLA DE COBERTURA
## ==================================================

| Programa | Canal | Host | Logo | Miniatura | Playlist | Verificado |
|---|---|---|---|---|---|---|
| ¿Y si fueras tú? | Bienestar | ✅ Lilly Méndez + Nico Osorio | ✅ local | ✅ 3 | ✅ | VERIFIED |
| Respira Universo | Bienestar | ✅ Alberto Fernández Parron | ⚠️ solo en miniatura | ✅ 3 + cover | ✅ | VERIFIED |
| Mujeres Amplificadas | Bienestar | ⚠️ solo nombres | ⚠️ solo en miniatura | ✅ 2 | ✅ | PARTIAL |
| La Sobremesa | Pop | ✅ Miguel, Vanessa y equipo | ⚠️ solo en miniatura | ✅ 3 + cover | ✅ | VERIFIED |
| MILFS | Pop | ❌ | ❌ | ❌ | ❌ | UNVERIFIED |
| The Show | Stories | ✅ Freddy Bedoya | ⚠️ solo en miniatura | ✅ 3 + cover | ✅ | VERIFIED |
| Lo Que No Se Ve | Stories | ✅ Olaia Gómez | ⚠️ solo en miniatura | ✅ 2 | ✅ | VERIFIED |
| Kom2Life | Emprende | ✅ Miguel y Ginette | ⚠️ solo en miniatura | ✅ 2 | ✅ | VERIFIED |
| Mindset Evolution | Emprende | ✅ Rosana Palacio y Elena | ⚠️ solo en miniatura | ✅ 2 | ✅ | VERIFIED |
| Despierta con Luna | Vlog | ✅ Legna González | ⚠️ solo en miniatura | ✅ 2 | ✅ | VERIFIED |
| Los Amoristas | Vlog | ✅ Vanessa Reverón + Eliecer Paredes | ⚠️ solo en miniatura | ✅ 2 + cover | ✅ | VERIFIED |
| Hacemos Que Pase | Vlog | ✅ Rosana Palacio + Rocío Gregorio | ⚠️ solo en miniatura | ✅ 2 | ✅ | VERIFIED |
| Boss Mind Beauty | — (histórico) | ✅ 3 hosts | ⚠️ solo en miniatura | ✅ 2 + cover | ✅ | PARTIAL |
| De los Pies a la Cabeza | — (histórico) | ✅ Toñi Campoy | ⚠️ solo en miniatura | ✅ 2 + cover | ✅ | PARTIAL |
| Desde el Paddock | — (histórico) | ✅ César Becerra | ⚠️ solo en miniatura | ✅ 2 | ✅ | PARTIAL |
| Viralmente | — (histórico) | ✅ Andreina Veliz | ⚠️ solo en miniatura | ✅ 2 | ✅ | PARTIAL |

Uso: assets descargados solo de fuentes oficiales (web de NAVI y CDN oficial de YouTube `i.ytimg.com` / `yt3.googleusercontent.com`) para una presentación privada para NAVI Centro Creativo.
