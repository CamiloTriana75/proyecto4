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
  const serviceEmoji = service.emoji;
  const referenceId = `#SB${Date.now().toString().slice(-6)}`;
  
  // Determinar el tipo de servicio para el mensaje
  let serviceType = '';
  let actionText = '';
  
  if (isGameService) {
    switch (service.subcategory) {
      case 'currency':
        serviceType = 'RECARGA DE MONEDAS VIRTUALES';
        actionText = 'recarga';
        break;
      case 'giftcard':
        serviceType = 'GIFT CARD';
        actionText = 'gift card';
        break;
      case 'subscription':
        serviceType = 'SUSCRIPCIÓN';
        actionText = 'suscripción';
        break;
      case 'boosting':
        serviceType = 'SERVICIO DE BOOSTING';
        actionText = 'boosting';
        break;
      case 'accounts':
        serviceType = 'COMPRA DE CUENTA';
        actionText = 'cuenta';
        break;
      case 'battlepass':
        serviceType = 'PASE DE BATALLA';
        actionText = 'pase de batalla';
        break;
      case 'streaming':
        serviceType = 'SERVICIO DE STREAMING';
        actionText = 'servicio';
        break;
      case 'coaching':
        serviceType = 'COACHING GAMING';
        actionText = 'coaching';
        break;
      default:
        serviceType = 'SERVICIO GAMING';
        actionText = 'servicio';
    }
  } else {
    serviceType = 'SERVICIO SOCIAL';
    actionText = 'servicio';
  }

  return `¡Hola! 👋 Espero que estén muy bien

Soy *${orderData.firstName} ${orderData.lastName}* y acabo de realizar una transferencia bancaria para mi ${actionText} 💳

${serviceEmoji} *DETALLES DE MI ${serviceType}:*
🛍️ Servicio: *${service.name}${quantityText}*
💰 Monto transferido: *${amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })}*
🆔 Referencia: *${referenceId}*

👤 *MIS DATOS PERSONALES:*
📱 WhatsApp: ${orderData.phone}
🆔 Documento: ${orderData.dni}${orderData.userId ? `\n🎯 Usuario/ID: ${orderData.userId}` : ''}${orderData.email ? `\n📧 Email: ${orderData.email}` : ''}${orderData.comments ? `\n💬 Comentarios: ${orderData.comments}` : ''}

📎 *COMPROBANTE DE TRANSFERENCIA ADJUNTO*
(Adjunto la captura de pantalla de mi transferencia bancaria)

¿Podrían confirmarme cuando procesen mi ${actionText}? 🙏

¡Muchas gracias por su excelente servicio! ✨

_Enviado desde SocialBoost Platform_ 🚀`;
};

export const generateInternationalMessage = (
  country: string,
  service: Service
): string => {
  const isGameService = service.category === 'games';
  const serviceEmoji = service.emoji;
  
  let serviceTypeText = '';
  if (isGameService) {
    switch (service.subcategory) {
      case 'currency':
        serviceTypeText = 'recarga de monedas virtuales';
        break;
      case 'giftcard':
        serviceTypeText = 'gift card';
        break;
      case 'subscription':
        serviceTypeText = 'suscripción';
        break;
      case 'boosting':
        serviceTypeText = 'servicio de boosting';
        break;
      case 'accounts':
        serviceTypeText = 'compra de cuenta';
        break;
      case 'battlepass':
        serviceTypeText = 'pase de batalla';
        break;
      case 'streaming':
        serviceTypeText = 'servicio de streaming';
        break;
      case 'coaching':
        serviceTypeText = 'coaching gaming';
        break;
      default:
        serviceTypeText = 'servicio gaming';
    }
  } else {
    serviceTypeText = 'servicio de redes sociales';
  }

  return `¡Hola! 👋 Espero que estén muy bien

Me interesa adquirir este ${serviceTypeText}:
${serviceEmoji} *${service.name}*
🌍 Ubicación: *${country}*

¿Podrían ayudarme con información sobre:
💳 ¿Qué métodos de pago aceptan en mi país?
⏰ ¿Cuánto tiempo demora la entrega?
💰 ¿Hay costos adicionales por transferencia internacional?
🔒 ¿El proceso es seguro y confiable?
📋 ¿Necesitan algún dato específico para procesar el pedido?

Quedo atento a su respuesta 😊

¡Saludos cordiales desde ${country}! 🙏

_Consulta desde SocialBoost Platform_ 🚀`;
};

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${APP_CONFIG.merchant_phone}?text=${encodedMessage}`;
  window.open(url, '_blank');
};