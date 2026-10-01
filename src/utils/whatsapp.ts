/**
 * WhatsApp integration utility
 * Formats WhatsApp click-to-chat links with URL-encoded messages
 */

/**
 * Strips any spaces, hyphens, brackets, or plus signs from a phone number string
 * to create a valid WhatsApp international phone parameter.
 * Automatically handles 10-digit Indian numbers by prepending 91 if needed.
 */
export function sanitizeWhatsAppNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  return cleaned;
}

export interface StructuredBookingParams {
  salonName: string;
  customerName?: string;
  serviceName: string;
  servicePrice?: number;
  currency?: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

/**
 * Creates a beautifully formatted, organized WhatsApp message for appointment bookings
 */
export function formatStructuredBookingMessage(params: StructuredBookingParams): string {
  const parts = [
    `✨ *Appointment Booking Request - ${params.salonName}* ✨`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
  ];

  if (params.customerName && params.customerName.trim()) {
    parts.push(`👤 *Guest Name:* ${params.customerName.trim()}`);
  }

  const priceTag = params.servicePrice ? ` (${params.currency || '₹'}${params.servicePrice})` : '';
  parts.push(`💇 *Service:* ${params.serviceName}${priceTag}`);
  parts.push(`📅 *Preferred Date:* ${params.date}`);
  parts.push(`⏰ *Preferred Time:* ${params.timeSlot}`);

  if (params.notes && params.notes.trim()) {
    parts.push(`📝 *Notes / Preferences:* ${params.notes.trim()}`);
  }

  parts.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
  parts.push(`Please let me know if this slot is available. Thank you!`);

  return parts.join('\n');
}

/**
 * Generates a direct WhatsApp click-to-chat URL with properly encoded message.
 */
export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  const cleanNumber = sanitizeWhatsAppNumber(whatsappNumber);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Pre-defined message templates for salon bookings and inquiries
 */
export const WhatsAppMessages = {
  generalBooking: (salonName: string) =>
    `Hi, I would like to book an appointment at ${salonName}. Could you please tell me the available timings?`,

  serviceBooking: (salonName: string, serviceName: string, price?: number, currency = '₹') =>
    price
      ? `Hi, I would like to book a ${serviceName} (${currency}${price}) at ${salonName}. Please let me know the available timings.`
      : `Hi, I would like to book a ${serviceName} at ${salonName}. Please let me know the available timings.`,

  contactInquiry: (salonName: string) =>
    `Hi ${salonName}, I have a question regarding your services and would like to speak with a stylist.`,

  quickSlotCheck: (salonName: string) =>
    `Hi ${salonName}, do you have any open slots available for an appointment today or tomorrow?`,
};
