import { APP_CONFIG } from '../data/config';
import { OrderData, Service } from '../types';

export const generateWhatsAppMessage = (
  orderData: OrderData,
  service: Service,
  amount: number,
  quantity?: number
): string => {
  const quantityText = quantity ? ` (${quantity.toLocaleString()} unidades)` : '';
  const isGameService = service.category === 'games';
  const serviceEmoji = isGameService ? '🎮' : '📱';
  
  return `¡Hola! 👋 Soy *${orderData.firstName} ${orderData.lastName}*

Acabo de realizar una transferencia bancaria y te envío el comprobante de pago 📸

${serviceEmoji} *DETALLES DE MI ${isGameService ? 'RECARGA' : 'PEDIDO'}:*
🛍️ Servicio: *${service.name}${quantityText}*
💰 Monto transferido: *$${amount.toLocaleString()} ARS*
🆔 Referencia: #${Date.now().toString().slice(-6)}

👤 *MIS DATOS:*
📱 WhatsApp: ${orderData.phone}
🆔 Documento: ${orderData.dni}${orderData.userId ? `\n🎯 Usuario/ID: ${orderData.userId}` : ''}${orderData.email ? `\n📧 Email: ${orderData.email}` : ''}${orderData.comments ? `\n💬 Notas: ${orderData.comments}` : ''}

📎 *COMPROBANTE ADJUNTO*
(Adjunto captura de pantalla de mi transferencia bancaria)

¿Podrían confirmarme cuando procesen el ${isGameService ? 'recarga' : 'pago'}? 🙏

¡Muchas gracias por su excelente servicio! ✨`;
};

export const generateInternationalMessage = (
  country: string,
  service: Service
): string => {
  const isGameService = service.category === 'games';
  const serviceEmoji = isGameService ? '🎮' : '📱';
  
  return `¡Hola! 👋 Espero que estén muy bien

Me interesa adquirir este servicio:
${serviceEmoji} *${service.name}*
🌍 Ubicación: *${country}*

¿Podrían ayudarme con información sobre:
💳 ¿Qué métodos de pago aceptan en mi país?
⏰ ¿Cuánto tiempo demora la entrega?
💰 ¿Hay costos adicionales por transferencia internacional?
🔒 ¿El proceso es seguro y confiable?

Quedo atento a su respuesta 😊

¡Saludos cordiales! 🙏`;
};

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${APP_CONFIG.merchant_phone}?text=${encodedMessage}`;
  window.open(url, '_blank');
};