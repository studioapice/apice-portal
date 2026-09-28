/**
 * NAVI Channel — audited program data (FASE 1, research only).
 * Información auditada a fecha de ejecución: 2026-09-27.
 *
 * NOT wired into the presentation yet. `src/data/programs.ts` remains the
 * productive source until FASE 2. Details and evidence: /ASSET_AUDIT.md.
 *
 * Sources: navicentrocreativo.com, navicentrocreativo.com/navi-channel,
 * and the five official YouTube channels (descriptions + playlist
 * descriptions). `null` = not available / not verified.
 */

export type AuditedNetwork = "NAVI Bienestar" | "NAVI Pop" | "NAVI Stories" | "NAVI Emprende" | "NAVI Vlog";

export type VerificationStatus = "VERIFIED" | "PARTIAL" | "UNVERIFIED";

/** active = listed in the channel's current program list AND episodes in the last ~2 weeks. */
export type PublicActivity = "active" | "announced" | "historical";

export interface AuditedChannel {
  network: AuditedNetwork;
  slug: string;
  handle: string;
  youtubeUrl: string;
  channelId: string;
  tagline: string;
  /** Accent observed on the channel avatar/banner (approximate, from artwork). */
  accent: string;
  avatar: string;
  banner: string;
}

export interface AuditedProgram {
  name: string;
  slug: string;
  network: AuditedNetwork | null;
  hosts: string[] | null;
  schedule: string | null;
  activity: PublicActivity;
  verified: VerificationStatus;
  sourceUrl: string;
  youtubeUrl: string | null;
  playlistUrl: string | null;
  /** Older playlist on NAVI Bienestar (pre-network channel), if any. */
  legacyPlaylistUrl: string | null;
  cover: string | null;
  thumbnails: string[];
  logo: string | null;
  notes: string | null;
}

const YT = "https://www.youtube.com";
const pl = (id: string) => `${YT}/playlist?list=${id}`;

export const AUDIT_DATE = "2026-09-27";

export const NAVI_BRAND_AUDITED = {
  logoHorizontal: "/brand/navi/logo-horizontal-black.jpeg", // 1600×900 JPG, fondo negro
  logoMark: "/brand/navi/logo-mark-tree.png", // 1179×1627 PNG transparente (árbol)
  favicon: "/brand/navi/favicon-150.png", // 150×150 PNG
  logoNaviChannel: "/brand/navi/logo-navi-channel.jpeg", // 1254×1254 JPG, fondo negro
  gradient: ["#D81B78", "#E74763", "#F05A47", "#F2B52A"],
  gold: "#F2B52A",
} as const;

export const NAVI_CHANNELS_AUDITED: AuditedChannel[] = [
  { network: "NAVI Bienestar", slug: "bienestar", handle: "@NaviChannelBienestar", youtubeUrl: `${YT}/@NaviChannelBienestar`, channelId: "UCP3j4byQ4tX8Y-PpbWzFQ9g", tagline: "Encuentra tu equilibrio", accent: "#7CFC3A", avatar: "/channels/bienestar/avatar.jpg", banner: "/channels/bienestar/banner.jpg" },
  { network: "NAVI Pop", slug: "pop", handle: "@NaviChannelPop", youtubeUrl: `${YT}/@NaviChannelPop`, channelId: "UCoy5bn7uCBrWSwrCNXMIafg", tagline: "Vive lo que te emociona", accent: "#B23CFF", avatar: "/channels/pop/avatar.jpg", banner: "/channels/pop/banner.jpg" },
  { network: "NAVI Stories", slug: "stories", handle: "@NaviChanelStories", youtubeUrl: `${YT}/@NaviChanelStories`, channelId: "UCEKO_dTcvZ2YDxXFxfkLUYA", tagline: "Historias que inspiran", accent: "#2E9BFF", avatar: "/channels/stories/avatar.jpg", banner: "/channels/stories/banner.jpg" },
  { network: "NAVI Emprende", slug: "emprende", handle: "@NaviChannelEmprende", youtubeUrl: `${YT}/@NaviChannelEmprende`, channelId: "UCrldOrv2FlR4vdtnVu2adGw", tagline: "Ideas que crecen", accent: "#FF8A1E", avatar: "/channels/emprende/avatar.jpg", banner: "/channels/emprende/banner.jpg" },
  { network: "NAVI Vlog", slug: "vlog", handle: "@NaviChannelVlog", youtubeUrl: `${YT}/@NaviChannelVlog`, channelId: "UCKIbVQ9htTKpn0ObTinwnAg", tagline: "Belleza, relaciones, estilo de vida", accent: "#FF2E88", avatar: "/channels/vlog/avatar.jpg", banner: "/channels/vlog/banner.jpg" },
];

const thumbs = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/programs/${slug}/thumbnail-0${i + 1}.jpg`);

export const NAVI_PROGRAMS_AUDITED: AuditedProgram[] = [
  /* ---------------- ACTIVE (11) ---------------- */
  {
    name: "¿Y si fueras tú?", slug: "y-si-fueras-tu", network: "NAVI Bienestar",
    hosts: ["Lilly Méndez", "Nico Osorio"], schedule: "Martes 21:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLZ7LtyNzsRI4"), youtubeUrl: `${YT}/@NaviChannelBienestar`, playlistUrl: pl("PLZ7LtyNzsRI4"), legacyPlaylistUrl: null,
    cover: null, thumbnails: thumbs("y-si-fueras-tu", 3), logo: "/brand/programs/ysft-sello.png",
    notes: "No aparece en la web de NAVI. Logo = asset local del brand kit (el sello también aparece en las miniaturas públicas).",
  },
  {
    name: "Respira Universo", slug: "respira-universo", network: "NAVI Bienestar",
    hosts: ["Alberto Fernández Parron"], schedule: "Domingo 21:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLQCK17V8wBRSQ6lCmknEK701jYKvT83lx"), youtubeUrl: `${YT}/@NaviChannelBienestar`, playlistUrl: pl("PLQCK17V8wBRSQ6lCmknEK701jYKvT83lx"), legacyPlaylistUrl: null,
    cover: "/programs/respira-universo/cover.jpeg", thumbnails: thumbs("respira-universo", 3), logo: null,
    notes: "Host según la descripción de la playlist (formato antiguo).",
  },
  {
    name: "Mujeres Amplificadas", slug: "mujeres-amplificadas", network: "NAVI Bienestar",
    hosts: ["Rosa", "Patricia", "Vanessa"], schedule: null, activity: "active", verified: "PARTIAL",
    sourceUrl: pl("PLPxKRY0W_u2w"), youtubeUrl: `${YT}/@NaviChannelBienestar`, playlistUrl: pl("PLPxKRY0W_u2w"), legacyPlaylistUrl: null,
    cover: null, thumbnails: thumbs("mujeres-amplificadas", 2), logo: null,
    notes: "La descripción del canal dice 'Jue 21:00'; la playlist dice '[Día y hora por confirmar]'. Hosts solo con nombre de pila.",
  },
  {
    name: "La Sobremesa", slug: "la-sobremesa", network: "NAVI Pop",
    hosts: ["Miguel", "Vanessa", "equipo"], schedule: "Lun (Noticias) · Mié (Invitados) · Vie (Juegos) 20:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLO_3_Q5KiP_U"), youtubeUrl: `${YT}/@NaviChannelPop`, playlistUrl: pl("PLO_3_Q5KiP_U"), legacyPlaylistUrl: pl("PLQCK17V8wBRS7pHw45AMQyk5-nqVfby4V"),
    cover: "/programs/la-sobremesa/cover.jpeg", thumbnails: thumbs("la-sobremesa", 3), logo: null,
    notes: "Playlist antigua (100 vídeos, NAVI Bienestar) lista: Eliecer Paredes, Vanessa Reverón, Miguel Cabrera, Oskar, Luis Daniel.",
  },
  {
    name: "The Show", slug: "the-show", network: "NAVI Stories",
    hosts: ["Freddy Bedoya"], schedule: "Martes y Jueves 19:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLM9M7y9wPBBk"), youtubeUrl: `${YT}/@NaviChanelStories`, playlistUrl: pl("PLM9M7y9wPBBk"), legacyPlaylistUrl: pl("PLQCK17V8wBRQ5eyFx6BtADMyWhJL6G_B-"),
    cover: "/programs/the-show/cover.jpeg", thumbnails: thumbs("the-show", 3), logo: null,
    notes: "Subtítulo oficial: 'El camino del Artista'.",
  },
  {
    name: "Lo Que No Se Ve", slug: "lo-que-no-se-ve", network: "NAVI Stories",
    hosts: ["Olaia Gómez"], schedule: "Sábados 19:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLLEZ41rmYSQE"), youtubeUrl: `${YT}/@NaviChanelStories`, playlistUrl: pl("PLLEZ41rmYSQE"), legacyPlaylistUrl: null,
    cover: null, thumbnails: thumbs("lo-que-no-se-ve", 2), logo: null, notes: null,
  },
  {
    name: "Kom2Life", slug: "kom2life", network: "NAVI Emprende",
    hosts: ["Miguel", "Ginette"], schedule: "Martes 20:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLfeWNTkI9gF0"), youtubeUrl: `${YT}/@NaviChannelEmprende`, playlistUrl: pl("PLfeWNTkI9gF0"), legacyPlaylistUrl: null,
    cover: null, thumbnails: thumbs("kom2life", 2), logo: null,
    notes: "Escrito 'KOM2LIFE' en YouTube; 'K2L' en miniaturas. No confirmado si 'Miguel' es Miguel Cabrera.",
  },
  {
    name: "Mindset Evolution", slug: "mindset-evolution", network: "NAVI Emprende",
    hosts: ["Rosana Palacio", "Elena"], schedule: "Jueves 20:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLHoIzGScpRhY"), youtubeUrl: `${YT}/@NaviChannelEmprende`, playlistUrl: pl("PLHoIzGScpRhY"), legacyPlaylistUrl: null,
    cover: null, thumbnails: thumbs("mindset-evolution", 2), logo: null,
    notes: "Posible continuación de Boss Mind Beauty (hosts y colaborador compartidos) — INFERIDO, no confirmado.",
  },
  {
    name: "Despierta con Luna", slug: "despierta-con-luna", network: "NAVI Vlog",
    hosts: ["Legna González"], schedule: "Lunes 8:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLb1Vns2Ewed4"), youtubeUrl: `${YT}/@NaviChannelVlog`, playlistUrl: pl("PLb1Vns2Ewed4"), legacyPlaylistUrl: pl("PLQCK17V8wBRR4ocunonYlXjLEtgjDVW3e"),
    cover: null, thumbnails: thumbs("despierta-con-luna", 2), logo: null,
    notes: "La web la lista pero su portada es de otro programa (ver auditoría). Playlist antigua: 'LUNES 7:30'.",
  },
  {
    name: "Los Amoristas", slug: "los-amoristas", network: "NAVI Vlog",
    hosts: ["Vanessa Reverón", "Eliecer Paredes"], schedule: "Jueves 20:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLekd7Tw_FD8E"), youtubeUrl: `${YT}/@NaviChannelVlog`, playlistUrl: pl("PLekd7Tw_FD8E"), legacyPlaylistUrl: pl("PLQCK17V8wBRQeAlBDhZhOtbrpMDwV6nc_"),
    cover: "/programs/los-amoristas/cover.jpeg", thumbnails: thumbs("los-amoristas", 2), logo: null,
    notes: "No aparece en la web; su portada está publicada con el pie 'Despierta con Luna'. Marca colaboradora: 'AMORISTAS: Escuela para Parejas'.",
  },
  {
    name: "Hacemos Que Pase", slug: "hacemos-que-pase", network: "NAVI Vlog",
    hosts: ["Rosana Palacio", "Rocío Gregorio"], schedule: "Sábados 20:00", activity: "active", verified: "VERIFIED",
    sourceUrl: pl("PLOXpU4O2J4Kw"), youtubeUrl: `${YT}/@NaviChannelVlog`, playlistUrl: pl("PLOXpU4O2J4Kw"), legacyPlaylistUrl: null,
    cover: null, thumbnails: thumbs("hacemos-que-pase", 2), logo: null, notes: null,
  },

  /* ---------------- ANNOUNCED (no public episodes) ---------------- */
  {
    name: "MILFS", slug: "milfs", network: "NAVI Pop",
    hosts: null, schedule: null, activity: "announced", verified: "UNVERIFIED",
    sourceUrl: `${YT}/@NaviChannelPop`, youtubeUrl: `${YT}/@NaviChannelPop`, playlistUrl: null, legacyPlaylistUrl: null,
    cover: null, thumbnails: [], logo: null,
    notes: "Solo mencionado en la descripción de NAVI Pop. Sin playlist ni episodios públicos.",
  },

  /* ---------------- HISTORICAL (playlists on NAVI Bienestar, no recent episodes) ---------------- */
  {
    name: "Boss Mind Beauty", slug: "boss-mind-beauty", network: null,
    hosts: ["Yael Rodríguez", "Elena Piruelos", "Rosana Palacios"], schedule: null, activity: "historical", verified: "PARTIAL",
    sourceUrl: pl("PLQCK17V8wBRS9TD5PBNyF8qEii5vuieTz"), youtubeUrl: `${YT}/@NaviChannelBienestar`, playlistUrl: pl("PLQCK17V8wBRS9TD5PBNyF8qEii5vuieTz"), legacyPlaylistUrl: null,
    cover: "/programs/boss-mind-beauty/cover.jpeg", thumbnails: thumbs("boss-mind-beauty", 2), logo: null,
    notes: "En la web de NAVI. 23 vídeos; último hace ~3 semanas. No figura en ninguna lista actual de programas de canal.",
  },
  {
    name: "De los Pies a la Cabeza", slug: "de-los-pies-a-la-cabeza", network: null,
    hosts: ["Toñi Campoy"], schedule: null, activity: "historical", verified: "PARTIAL",
    sourceUrl: pl("PLQCK17V8wBRQS109iUdncM5Ms8mtuUa5E"), youtubeUrl: `${YT}/@NaviChannelBienestar`, playlistUrl: pl("PLQCK17V8wBRQS109iUdncM5Ms8mtuUa5E"), legacyPlaylistUrl: null,
    cover: "/programs/de-los-pies-a-la-cabeza/cover.jpeg", thumbnails: thumbs("de-los-pies-a-la-cabeza", 2), logo: null,
    notes: "En la web de NAVI. 12 vídeos; último hace ~4 meses. Horario antiguo: miércoles 21:00.",
  },
  {
    name: "Desde el Paddock", slug: "desde-el-paddock", network: null,
    hosts: ["César Becerra"], schedule: null, activity: "historical", verified: "PARTIAL",
    sourceUrl: pl("PLQCK17V8wBRRvDkoEnPPz9pNqh7vyX2Dw"), youtubeUrl: `${YT}/@NaviChannelBienestar`, playlistUrl: pl("PLQCK17V8wBRRvDkoEnPPz9pNqh7vyX2Dw"), legacyPlaylistUrl: null,
    cover: null, thumbnails: thumbs("desde-el-paddock", 2), logo: null,
    notes: "19 vídeos; último hace ~3 meses. Programa de Fórmula 1.",
  },
  {
    name: "Viralmente", slug: "viralmente", network: null,
    hosts: ["Andreina Veliz"], schedule: null, activity: "historical", verified: "PARTIAL",
    sourceUrl: pl("PLQCK17V8wBRTcEfpuLbs3imL3OqQLWWzK"), youtubeUrl: `${YT}/@NaviChannelBienestar`, playlistUrl: pl("PLQCK17V8wBRTcEfpuLbs3imL3OqQLWWzK"), legacyPlaylistUrl: null,
    cover: null, thumbnails: thumbs("viralmente", 2), logo: null,
    notes: "6 vídeos; último hace ~5 meses.",
  },
];
