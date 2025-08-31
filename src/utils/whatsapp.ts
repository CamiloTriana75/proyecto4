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
  const referenceId = `#VR${Date.now().toString().slice(-6)}`;

  // Tipo de servicio y acción (mantener dinámico pero con el formato solicitado)
  let actionText = 'servicio';
  let serviceType = 'SERVICIO';
  if (isGameService) {
    switch (service.subcategory) {
      case 'currency':
        actionText = 'recarga';
        serviceType = 'RECARGA DE MONEDAS VIRTUALES';
        break;
      case 'giftcard':
        actionText = 'gift card';
        serviceType = 'GIFT CARD';
        break;
      case 'subscription':
        actionText = 'suscripción';
        serviceType = 'SUSCRIPCIÓN';
        break;
      default:
        actionText = 'servicio';
        serviceType = 'SERVICIO GAMING';
    }
  } else {
    actionText = 'servicio';
    serviceType = 'SERVICIO SOCIAL';
  }

  // Mensaje con el layout pedido (sin markdown en exceso y con etiquetas fijas)
  return `¡Hola! Espero que estén muy bien

Soy ${orderData.firstName} ${orderData.lastName} y acabo de realizar una transferencia bancaria para mi ${actionText}

DETALLES DE MI ${serviceType}:
Servicio: ${service.name}${quantityText}
Monto transferido: ${amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })}
Referencia: ${referenceId}

MIS DATOS PERSONALES:
WhatsApp: ${orderData.phone}
Documento: ${orderData.dni}${orderData.userId ? `\nUsuario/ID: ${orderData.userId}` : ''}${orderData.email ? `\nEmail: ${orderData.email}` : ''}${orderData.comments ? `\nComentarios: ${orderData.comments}` : ''}

COMPROBANTE DE TRANSFERENCIA ADJUNTO
(Adjunto la captura de pantalla de mi transferencia bancaria)

¿Podrían confirmarme cuando procesen mi ${actionText}?

¡Muchas gracias por su excelente servicio!

Enviado desde Viral Recargas`;
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

_Consulta desde Viral Recargas_ 🚀`;
};

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${APP_CONFIG.merchant_phone}?text=${encodedMessage}`;
  window.open(url, '_blank');
};