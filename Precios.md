# Precios.md — Lógica del estimador de precio en la landing

## Objetivo
El formulario de la landing (3 preguntas de selección única) debe calcular un precio estimado **sumando pesos directamente**, sin clasificar en planes fijos (Básico/Estándar/Avanzado). Eliminar esas 3 tarjetas de tiers.

---

## Las 3 preguntas y sus valores

### Pregunta 3 — "¿Qué te gustaría automatizar primero?" → define el precio BASE

| Opción | Base |
|---|---|
| Atención y agendamiento por WhatsApp | $1.500.000 |
| Reportes y administración | $1.800.000 |
| Clientes y seguimiento (CRM) | $2.000.000 |
| Facturación y cobros | $2.500.000 |
| Inventario y operaciones | $2.500.000 |
| Todo el sistema completo | $4.500.000 |

### Pregunta 1 — "¿Cuántas personas trabajan en tu negocio?" → suma al total

| Opción | Ajuste |
|---|---|
| Solo yo | +$0 |
| 2 a 5 personas | +$300.000 |
| 6 a 15 personas | +$800.000 |
| Más de 15 personas | +$1.500.000 |

### Pregunta 2 — "¿Cuántos mensajes de WhatsApp recibe al día?" → suma al total

| Opción | Ajuste |
|---|---|
| Menos de 20 | +$0 |
| 20 a 50 | +$300.000 |
| 50 a 100 | +$700.000 |
| Más de 100 | +$1.200.000 |

---

## Fórmula

```
precio_estimado = base(pregunta_3) + ajuste(pregunta_1) + ajuste(pregunta_2)
```

Ejemplo: "6 a 15 personas" + "50 a 100 mensajes" + "Facturación y cobros"
→ $2.500.000 + $800.000 + $700.000 = **$4.000.000**

---

## Qué debe hacer Claude Code

1. Implementar el cálculo como función pura, ej: `calcularPrecio(personas, mensajes, modulo)` — recibe las 3 respuestas, devuelve el número final. No mezclar la lógica con el componente visual, para poder ajustar montos después sin tocar el UI.
2. Eliminar las 3 tarjetas de "Plan Básico / Estándar / Avanzado" — ya no aplican con esta lógica aditiva.
3. Mostrar el resultado como un solo número (o rango pequeño, ej. el número ±10%), con el texto fijo debajo: *"Estimado preliminar — el precio real se define en tu diagnóstico gratuito"*.
4. Los montos de las tablas deben quedar como constantes fácilmente editables (objeto o config aparte), no hardcodeados dispersos en el componente.
