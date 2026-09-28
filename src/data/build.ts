/**
 * What we build, how, and on which foundations.
 */

export const SYSTEMS = [
  { n: "01", name: "Command Center", desc: "La vista de toda la operación en una pantalla." },
  { n: "02", name: "Programs · Seasons · Episodes", desc: "El modelo de datos de NAVI como entidades." },
  { n: "03", name: "Workflow Engine", desc: "Orquesta cada episodio de principio a fin." },
  { n: "04", name: "Dropbox Integration", desc: "Detecta renders y organiza entregas." },
  { n: "05", name: "Opus Processing", desc: "Clips con la plantilla de cada programa." },
  { n: "06", name: "AI Editorial Engine", desc: "Títulos, descripciones, capítulos y copy." },
  { n: "07", name: "Thumbnail Engine", desc: "Propuestas según la plantilla del programa." },
  { n: "08", name: "Human Review", desc: "Aprobaciones rápidas donde hay criterio." },
  { n: "09", name: "Distribution Engine", desc: "Reglas de publicación por clip y plataforma." },
  { n: "10", name: "YouTube Integration", desc: "Metadata, miniatura, playlist y programación." },
  { n: "11", name: "Analytics", desc: "Métricas centralizadas por episodio y programa." },
  { n: "12", name: "NAVI Intelligence", desc: "Patrones sobre datos históricos." },
  { n: "13", name: "Brand Kits", desc: "Identidad y reglas de cada programa." },
  { n: "14", name: "System Health", desc: "Estado de integraciones, colas y reintentos." },
  { n: "15", name: "Permissions · Security", desc: "Roles, accesos y credenciales protegidas." },
] as const;

export const V1_MODULES = ["Production", "Content", "Distribution", "Analytics", "Intelligence"] as const;

export const FUTURE_MODULES = ["Clients", "CRM", "Finance", "Team", "Sales", "Operations"] as const;

export const ROADMAP = [
  { phase: 0, name: "Architecture & Discovery", out: "Blueprints, validación de APIs, modelo de datos." },
  { phase: 1, name: "Core NAVI OS", out: "Entidades, base de datos, accesos, Command Center base." },
  { phase: 2, name: "Episode Workflow", out: "Detección de render, estados, cola de trabajos." },
  { phase: 3, name: "AI + Opus", out: "Motor editorial, miniaturas, clips, revisión humana." },
  { phase: 4, name: "Distribution", out: "Reglas, programación social, YouTube, Host Package." },
  { phase: 5, name: "Analytics", out: "Ingesta de métricas, dashboards, NAVI Intelligence." },
  { phase: 6, name: "Hardening", out: "Reintentos, monitorización, seguridad, testing." },
  { phase: 7, name: "Production", out: "Despliegue, formación, documentación, entrega." },
] as const;

/** Phase after which a relevant functional beta is targeted. */
export const BETA_AFTER_PHASE = 3;

export const ESTIMATE_DRIVERS = [
  "APIs y sus límites reales",
  "Validaciones con uso real",
  "Edge cases",
  "Integraciones",
  "Testing",
  "Cambios detectados durante el uso",
] as const;

export const FOUNDATION_DOCS = [
  { code: "MAD", name: "Master Architecture Document" },
  { code: "ROAD", name: "Development Roadmap" },
  { code: "RULES", name: "Development Rules" },
  { code: "DB", name: "Database Blueprint" },
  { code: "WF", name: "Workflow Blueprints" },
  { code: "INT", name: "Integration Blueprints" },
  { code: "SEC", name: "Security Blueprint" },
  { code: "TEST", name: "Testing Plan" },
  { code: "RETRY", name: "Failure / Retry Strategy" },
  { code: "DEPLOY", name: "Deployment Plan" },
] as const;

export const INVESTMENT_SCOPE = [
  "Diseño",
  "Arquitectura",
  "Desarrollo",
  "Automatización",
  "IA",
  "Distribución",
  "Analytics",
  "Testing",
  "Implementación",
] as const;
