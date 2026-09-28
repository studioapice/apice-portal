/**
 * Brand assets (official, downloaded from navicentrocreativo.com — see
 * ASSET_AUDIT.md). To upgrade to an official SVG later, drop it in
 * /public/brand/navi/ and change the path here; components read only this file.
 */

export const BRAND_ASSETS = {
  /** Horizontal "NaVi Centro Creativo" logo. JPG on black: framed via CSS, blended with `screen`. */
  naviLogo: {
    src: "/brand/navi/logo-horizontal-black.jpeg",
    width: 1600,
    height: 900,
    /** Visible logo bounds inside the file, in % (left, top, right, bottom). */
    bounds: [12, 16.3, 88.9, 83.8] as const,
  },
  /** NAVI tree mark — transparent PNG, the primary brand asset in NAVI OS chrome. */
  naviMark: { src: "/brand/navi/logo-mark-tree.png", width: 1179, height: 1627 },
  /** NAVI Channel logo (JPG on black). */
  naviChannelLogo: { src: "/brand/navi/logo-navi-channel.jpeg", width: 1254, height: 1254 },
} as const;
