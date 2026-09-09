// Fuente de verdad de la calculadora de precio: modelo de Niveles por tamaño
// de clínica (mismo usado internamente para prospección, ver
// Prospectos_high_ticket.txt) — instalación + mensualidad por rango, no una
// fórmula aditiva por módulos sueltos. El tamaño de la clínica es lo único
// que determina el precio; los módulos elegidos solo personalizan el mensaje
// de WhatsApp de cierre.

export const CLINIC_SIZE_OPTIONS = [
  {
    value: "1",
    label: "1 a 2 profesionales",
    setupLow: 2_500_000,
    setupHigh: 4_000_000,
    monthlyLow: 400_000,
    monthlyHigh: 600_000,
  },
  {
    value: "2",
    label: "3 a 6 profesionales",
    setupLow: 5_000_000,
    setupHigh: 9_000_000,
    monthlyLow: 800_000,
    monthlyHigh: 1_200_000,
  },
  {
    value: "3",
    label: "7+ profesionales o varias sedes",
    setupLow: 9_000_000,
    setupHigh: 15_000_000,
    monthlyLow: 1_500_000,
    monthlyHigh: 2_500_000,
  },
] as const;

export const MODULE_OPTIONS = [
  { value: "atencion", label: "Atención y agendamiento de pacientes por WhatsApp" },
  { value: "reportes", label: "Reportes y administración" },
  { value: "crm", label: "Pacientes y seguimiento (CRM)" },
  { value: "facturacion", label: "Facturación y cobros" },
  { value: "inventario", label: "Inventario de insumos médicos/odontológicos" },
  { value: "todo", label: "Todo el sistema completo" },
] as const;

export function getClinicSizeTier(value: string) {
  return CLINIC_SIZE_OPTIONS.find((o) => o.value === value) ?? CLINIC_SIZE_OPTIONS[0];
}

export function formatCOP(amount: number): string {
  return `$${Math.round(amount).toLocaleString("es-CO")}`;
}
