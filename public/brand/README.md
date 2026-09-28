# Assets — NAVI OS presentation

Official assets audited on 2026-09-27 (see `/ASSET_AUDIT.md`). Paths are read
from `src/config/brand.ts` and `src/data/navi-programs-audited.ts`.

| Path | Content | Source |
|---|---|---|
| `brand/navi/` | NAVI tree (PNG, transparent), horizontal logo (JPG on black), NAVI Channel logo, favicon, Studio photos | navicentrocreativo.com |
| `brand/programs/ysft-*.png` | "¿Y si fueras tú?" logo and seal | Program brand kit (local) |
| `/channels/<red>/` | avatar + banner of each NAVI Channel network | YouTube (official channels) |
| `/programs/<slug>/` | real YouTube thumbnails (1280×720) and, when available, the web cover | YouTube / navicentrocreativo.com |
| `brand/hosts/`, `brand/thumbnails/` | reserved | — |

To swap the NAVI logo for an official SVG: add it to `brand/navi/` and change
`BRAND_ASSETS` in `src/config/brand.ts`. The stylised `StudioFrame` art is still
used where no real footage exists (multicam, clip frames, thumbnail concepts A/C).
