import type { ToolId } from "@/components/ui/Glyphs";

/**
 * How an episode travels today, after the recording ends (ACTUAL process
 * description — no timings attached to individual steps).
 */
export interface WorkflowStep {
  id: number;
  tool: ToolId;
  label: string;
  /** Short verb shown on the map when the render "hops" to this tool. */
  verb: string;
  mode: "auto" | "manual";
}

export const CURRENT_WORKFLOW: WorkflowStep[] = [
  { id: 1, tool: "dropbox", label: "El render aterriza en Dropbox", verb: "Aterriza", mode: "auto" },
  { id: 2, tool: "youtube", label: "Subida a YouTube en privado / oculto", verb: "Subir", mode: "manual" },
  { id: 3, tool: "airtable", label: "Registro y programación en Airtable", verb: "Registrar", mode: "manual" },
  { id: 4, tool: "ai", label: "Optimización SEO: títulos y descripciones", verb: "Redactar", mode: "manual" },
  { id: 5, tool: "design", label: "Creación de la miniatura", verb: "Diseñar", mode: "manual" },
  { id: 6, tool: "opus", label: "Procesado en OpusClip", verb: "Procesar", mode: "manual" },
  { id: 7, tool: "opus", label: "OpusClip genera clips verticales", verb: "Generar", mode: "auto" },
  { id: 8, tool: "review", label: "Revisión de los clips", verb: "Revisar", mode: "manual" },
  { id: 9, tool: "review", label: "Selección de los 3 clips de NAVI", verb: "Elegir", mode: "manual" },
  { id: 10, tool: "review", label: "Clips restantes para el programa", verb: "Separar", mode: "manual" },
  { id: 11, tool: "dropbox", label: "Descarga y organización de archivos", verb: "Descargar", mode: "manual" },
  { id: 12, tool: "dropbox", label: "Guardado en las carpetas del episodio", verb: "Guardar", mode: "manual" },
  { id: 13, tool: "whatsapp", label: "Compartir la carpeta con cada programa", verb: "Compartir", mode: "manual" },
  { id: 14, tool: "metricool", label: "Programación de Social Clips NAVI", verb: "Programar", mode: "manual" },
  { id: 15, tool: "youtube", label: "Completar y revisar datos de YouTube", verb: "Completar", mode: "manual" },
  { id: 16, tool: "review", label: "Comprobar que todo está preparado", verb: "Comprobar", mode: "manual" },
];

/** Tool "islands" layout on the map (viewBox 1000 × 560). */
export const TOOL_ISLANDS: Record<ToolId, { x: number; y: number }> = {
  dropbox: { x: 110, y: 290 },
  youtube: { x: 330, y: 110 },
  airtable: { x: 560, y: 90 },
  ai: { x: 800, y: 150 },
  design: { x: 890, y: 360 },
  opus: { x: 640, y: 300 },
  review: { x: 420, y: 330 },
  whatsapp: { x: 250, y: 470 },
  metricool: { x: 690, y: 490 },
};

export const WORKFLOW_TOOL_COUNT = new Set(CURRENT_WORKFLOW.map((s) => s.tool)).size;
export const WORKFLOW_MANUAL_STEPS = CURRENT_WORKFLOW.filter((s) => s.mode === "manual").length;
