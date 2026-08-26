// Único lugar para editar los datos de contacto de la agencia.
// Reemplazar con los valores reales antes de enviar el link a prospectos.

export const AGENCY_NAME = "Tu Agencia IA";

export const WHATSAPP_NUMBER = "10000000000"; // formato internacional sin "+", ej. 521XXXXXXXXXX
export const WHATSAPP_MESSAGE =
  "Hola, quiero saber más sobre el agente de WhatsApp";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const CALENDLY_URL = "https://calendly.com/juan-mazo";
