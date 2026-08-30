// Único lugar para editar los datos de contacto de la agencia.
// Reemplazar con los valores reales antes de enviar el link a prospectos.

export const AGENCY_NAME = "Ailly";
export const AGENCY_TAGLINE = "Tu aliado de IA para negocios";

export const WHATSAPP_NUMBER = "573022903165"; // formato internacional sin "+", ej. 521XXXXXXXXXX
export const WHATSAPP_MESSAGE = "Hola, quiero agendar mi reunión de diagnóstico";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const CALENDLY_URL = "https://calendly.com/contacto-ailly/llamada-de-diagnostico";

// Colores de marca Ailly aplicados al widget embebido (ver globals.css).
export const CALENDLY_EMBED_URL = `${CALENDLY_URL}?background_color=0d0d0d&text_color=f5f1ec&primary_color=e8735a`;
