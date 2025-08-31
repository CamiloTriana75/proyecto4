# Viral Recargas - Plataforma de Servicios de Redes Sociales

Una aplicación React moderna para ofrecer servicios de crecimiento y verificación de redes sociales, similar a Codashop pero para servicios digitales.

## 🚀 Características

- **Interfaz moderna**: Diseño responsive con Tailwind CSS y animaciones suaves
- **Múltiples servicios**: Verificaciones, seguidores, recuperación de cuentas y más
- **Flujo de pago**: Transferencias AR y USD visibles, y WhatsApp para confirmación
- **Autenticación simple**: Sistema de usuarios con localStorage
- **Dashboard de usuario**: Historial de pedidos con estados en tiempo real
- **Integración WhatsApp**: Para comprobantes y soporte
- **Sin APIs externas**: Todo funciona client-side con localStorage

## 🛠 Tecnologías

- React 18 con TypeScript
- Tailwind CSS para estilos
- Lucide React para iconos
- Vite como build tool
- LocalStorage para persistencia

## 📦 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## ⚙️ Configuración

### Cambiar datos del merchant

Edita el archivo `src/data/config.ts`:

```typescript
export const APP_CONFIG = {
  // Cambia por tu número de WhatsApp (con código de país, sin espacios ni signos + ni guiones)
  // Ejemplo: Para +57 310 422 1496 usar: '573104221496'
  merchant_phone: '573104221496',
  
  // Cambia por tu CBU y Alias para transferencias en Argentina
  cbu_alias: 'alias@banco',
  cbu_number: '0000003100010000000001',
  
  // Nombre de tu negocio
  business_name: 'Viral Recargas',
  
  // Mensaje para países internacionales
  international_message: 'Hola, necesito información sobre métodos de pago para el servicio: {SERVICE} desde {COUNTRY}',
}
```

### Formato del número de WhatsApp

**IMPORTANTE**: El número debe incluir el código de país sin espacios, guiones ni el signo +:

- ✅ Correcto: `573104221496` (para +57 310 422 1496)
- ❌ Incorrecto: `+573104221496`, `+57 310 422 1496`, `57-310-422-1496`

### Mensajes de WhatsApp

La aplicación genera automáticamente dos tipos de mensajes:

1. **Para Argentina** (después de transferir): Mensaje con todos los datos del pedido y solicitud de confirmación
2. **Para otros países**: Consulta sobre métodos de pago disponibles

Los mensajes se abren automáticamente en WhatsApp Web o la app móvil.

### Modificar servicios

Los servicios se definen en `src/data/services.ts`. Cada servicio tiene:

- `id`: Identificador único
- `name`: Nombre del servicio
- `unit_price`: Precio base en ARS
- `type`: 'cantidad', 'fijo', o 'rango'
- `note`: Descripción adicional

### Agregar países

Para agregar más países, edita `src/data/countries.ts`:

```typescript
{ code: 'BR', name: 'Brasil', flag: '🇧🇷', phonePrefix: '+55' }
```

## 🎯 Flujo de Compra

1. **Selección de servicio**: El usuario elige un servicio del grid principal
2. **Formulario de compra**: Modal con datos obligatorios y selector de país
3. **Método de pago**: 
   - **Argentina**: Muestra CBU/Alias para transferencia
   - **Otros países**: Abre WhatsApp para consultar métodos
4. **Confirmación**: Al enviar comprobante por WhatsApp, se guarda la orden como 'pendiente'

## 📱 Funcionalidades

### Servicios incluidos:
- Seguidores (precio por cantidad)
- Verificación Instagram (Personal, Negocios, Influencers)
- Recuperación de cuentas
- Verificación WhatsApp
- Metashield (protección)

### Autenticación:
- Registro e inicio de sesión simple
- Datos guardados en localStorage
- Dashboard con historial de pedidos

### Integración WhatsApp:
- Botón flotante siempre visible
- Mensajes pre-formateados con datos del pedido
- Enlaces directos a WhatsApp con texto URL-encoded

## 🎨 Personalización de Diseño

### Colores principales:
- Fondo: `#0b0b0d` (gray-900)
- Acento: `#ff6600` (orange-600)
- Cards: `#1f2937` (gray-800)

### Responsive Breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 📂 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Navegación y autenticación
│   ├── Hero.tsx        # Sección principal
│   ├── ServiceCard.tsx # Card individual de servicio
│   ├── ServiceGrid.tsx # Grid de servicios
│   ├── PurchaseModal.tsx # Modal de compra
│   ├── PaymentCard.tsx # Card de pago
│   ├── UserAuth.tsx    # Modal de autenticación
│   ├── OrdersList.tsx  # Lista de pedidos del usuario
│   ├── Footer.tsx      # Pie de página
│   └── WhatsAppFloat.tsx # Botón flotante
├── data/               # Datos y configuración
│   ├── config.ts       # Configuración principal
│   ├── countries.ts    # Lista de países
│   └── services.ts     # Catálogo de servicios
├── types/              # Definiciones de TypeScript
│   └── index.ts        # Interfaces principales
├── utils/              # Utilidades
│   ├── storage.ts      # Manejo de localStorage
│   └── whatsapp.ts     # Helpers para WhatsApp
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
```

## 🚀 Despliegue

El proyecto está listo para producción. Usa `npm run build` para generar los archivos estáticos en la carpeta `dist/`.

## 📝 Notas Importantes

- **Sin APIs reales**: Todo funciona client-side
- **Datos de demo**: Se generan automáticamente en localStorage
- **Seguridad**: No almacenes datos sensibles reales
- **WhatsApp**: Los links se abren en nueva pestaña/app

## 🔧 Mantenimiento

Para cambiar comportamientos específicos:

1. **Validaciones de país**: Modifica `src/components/PurchaseModal.tsx`
2. **Mensajes de WhatsApp**: Edita `src/utils/whatsapp.ts` (plantillas con "Viral Recargas")
3. **Datos de demo**: Modifica `src/utils/storage.ts`
4. **Estilos**: Personaliza en cada componente o en `src/index.css`

## 📞 Soporte

Para soporte técnico o consultas sobre la implementación, contacta a través de WhatsApp.

## 🧭 Arquitectura en detalle

- __`src/App.tsx`__: orquesta la UI principal y maneja apertura de `PurchaseModal` y paso a `PaymentCard`.
- __`src/components/PurchaseModal.tsx`__: formulario de compra. Valida campos requeridos, calcula totales según `service.type` y, al enviar, cambia `step` a "payment" y simula el procesamiento antes de llamar a `onProceedToPayment`.
- __`src/components/PaymentCard.tsx`__: pantalla "Finalizar Pago". Muestra instrucciones de transferencia para AR y USD, genera el mensaje/CTA de WhatsApp y marca la orden como registrada.
- __`src/components/ServiceGrid.tsx`__ y __`ServiceCard.tsx`__: listan el catálogo y abren el modal con el servicio seleccionado.
- __`src/utils/pricing.ts`__: lógica de precios dinámicos por cantidad/tiers.
- __`src/utils/whatsapp.ts`__: helpers para construir enlaces con `APP_CONFIG.merchant_phone` y plantillas de mensajes.
- __`src/utils/storage.ts`__: persistencia ligera con `localStorage` (usuarios y pedidos demo).
- __`src/data/services.ts`__, __`countries.ts`__, __`config.ts`__: catálogo, países soportados y configuración del merchant.

### Flujo de datos

1. __Selección__: `ServiceCard` -> abre `PurchaseModal` con `service`, `selectedCountry` y cantidad/tier opcional.
2. __Formulario__: `PurchaseModal` guarda datos en estado local (`formData`), valida en blur y al enviar. Calcula `total` con `calculateDynamicPrice()` cuando aplica.
3. __Procesamiento__: `PurchaseModal` muestra pantalla de "Procesando" y llama `onProceedToPayment(orderData)`.
4. __Pago__: `PaymentCard` renderiza datos bancarios para AR/USD y el CTA a WhatsApp. Al confirmar, se guarda la orden (vía `storage.ts`).

### Decisiones clave

- __Sin backend__: todo es client-side con `localStorage` para facilitar pruebas y despliegue estático.
- __Países__: selector de país ajusta prefijo telefónico y método de pago mostrado.
- __Accesibilidad__: inputs con estados de error/éxito, focus styles, y validaciones mínimas.

## 🧰 Scripts disponibles

Desde `package.json`:

```bash
npm run dev       # Desarrollo con Vite
npm run build     # Build de producción a dist/
npm run preview   # Previsualizar el build localmente
npm run lint      # Linting del código
```

## ⚙️ Configuración del proyecto

- __Archivo__: `src/data/config.ts`
- __Claves principales__:
  - `merchant_phone`: número de WhatsApp (solo dígitos con código de país).
  - `cbu_alias`, `cbu_number`, `ar_holder_name`, `ar_entity_name`: datos para AR.
  - `usd_*`: datos para transferencias en USD.
  - `business_name`: nombre que se muestra en la UI.
  - `international_message`: plantilla para usuarios fuera de AR.

## 🧪 Cómo probar

1. `npm install` y `npm run dev`.
2. Elegir un servicio en `ServiceGrid`, completar `PurchaseModal` y continuar.
3. En "Finalizar Pago" revisa datos AR/USD y abre WhatsApp con el mensaje pre-armado.
4. Verifica en el dashboard/historial (si aplica) que la orden se guarde como pendiente.

## 🚀 Guías de despliegue

El build es totalmente estático. Tras `npm run build` se genera `dist/`.

### Netlify (recomendado)

- __Método 1: Conectado a Git__
  1. En Netlify, "Add new site" > "Import from Git" y selecciona este repo.
  2. Build command: `npm run build`. Publish directory: `dist`.
  3. Deploy. Netlify correrá `npm ci`, compilará y publicará.

- __Método 2: Drag & drop__
  1. `npm run build` local.
  2. Sube la carpeta `dist/` al panel de Netlify (Drag & drop).

### Vercel

1. "New Project" > Importa el repo.
2. Framework Preset: `Vite`.
3. Build command: `npm run build`. Output: `dist`.
4. Deploy.

### GitHub Pages

Opción simple sirviendo contenido estático de `dist/` con la acción oficial:

1. `npm run build`.
2. Usa una GitHub Action (ej. `actions/deploy-pages`) para publicar `dist/`.
3. Si el sitio va a un subpath (p.ej. `usuario.github.io/proyecto`), en `vite.config.ts` define `base: '/proyecto/'`.

### Cualquier hosting estático (Nginx/Apache/S3/Cloudflare)

1. `npm run build`.
2. Sube el contenido de `dist/` al bucket/servidor.

## 🧩 Troubleshooting

- __Enlaces de WhatsApp no abren__: valida `APP_CONFIG.merchant_phone` (solo dígitos, con código de país) y que el mensaje se encodee en `whatsapp.ts`.
- __Precios por cantidad__: revisa límites `minQuantity`/`maxQuantity` del servicio en `services.ts` y la validación en `PurchaseModal`.
- __Despliegue en subcarpeta__: configura `base` en `vite.config.ts`.
- __Íconos no cargan__: `lucide-react` está excluido de optimizeDeps por compatibilidad (`vite.config.ts`).

## ❓ FAQ

- __¿Se requiere backend?__ No. El MVP funciona 100% estático con `localStorage`.
- __¿Dónde cambio el branding?__ `src/data/config.ts` (`business_name`) y textos en componentes como `Header.tsx`/`Hero.tsx`.
- __¿Cómo agrego un servicio nuevo?__ Edita `src/data/services.ts` (sigue la estructura existente).
- __¿Puedo desactivar el email en UI?__ Sí, ya está oculto en `PaymentCard` y también no se muestra en `PurchaseModal` durante el procesamiento.