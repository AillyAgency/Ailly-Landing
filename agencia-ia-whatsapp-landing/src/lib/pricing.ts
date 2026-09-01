// Fuente de verdad de la calculadora de precio: Precios.md (raíz del repo).
// Montos y opciones viven solo acá — para ajustar precios no se toca el
// componente visual, solo estas constantes.

export const TEAM_OPTIONS = [
  { value: "0", label: "Solo yo", adjustment: 0 },
  { value: "1", label: "2 a 5 personas", adjustment: 300_000 },
  { value: "2", label: "6 a 15 personas", adjustment: 800_000 },
  { value: "3", label: "Más de 15 personas", adjustment: 1_500_000 },
] as const;

export const MESSAGES_OPTIONS = [
  { value: "0", label: "Menos de 20", adjustment: 0 },
  { value: "1", label: "20 a 50", adjustment: 300_000 },
  { value: "2", label: "50 a 100", adjustment: 700_000 },
  { value: "3", label: "Más de 100", adjustment: 1_200_000 },
] as const;

export const MODULE_OPTIONS = [
  { value: "atencion", label: "Atención y agendamiento por WhatsApp", base: 1_500_000 },
  { value: "reportes", label: "Reportes y administración", base: 1_800_000 },
  { value: "crm", label: "Clientes y seguimiento (CRM)", base: 2_000_000 },
  { value: "facturacion", label: "Facturación y cobros", base: 2_500_000 },
  { value: "inventario", label: "Inventario y operaciones", base: 2_500_000 },
  { value: "todo", label: "Todo el sistema completo", base: 4_500_000 },
] as const;

export function calcularPrecio(personas: string, mensajes: string, modulos: string[]): number {
  const teamAdjustment = TEAM_OPTIONS.find((o) => o.value === personas)?.adjustment ?? 0;
  const msgsAdjustment = MESSAGES_OPTIONS.find((o) => o.value === mensajes)?.adjustment ?? 0;
  const base = modulos.reduce((sum, modulo) => {
    return sum + (MODULE_OPTIONS.find((o) => o.value === modulo)?.base ?? 0);
  }, 0);
  return base + teamAdjustment + msgsAdjustment;
}

export function formatCOP(amount: number): string {
  return `$${Math.round(amount).toLocaleString("es-CO")}`;
}
