# SocialBoost - Plataforma de Servicios de Redes Sociales

Una aplicación React moderna para ofrecer servicios de crecimiento y verificación de redes sociales, similar a Codashop pero para servicios digitales.

## 🚀 Características

- **Interfaz moderna**: Diseño responsive con Tailwind CSS y animaciones suaves
- **Múltiples servicios**: Verificaciones, seguidores, recuperación de cuentas y más
- **Flujo de pago diferenciado**: CBU para Argentina, WhatsApp para otros países
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
  business_name: 'SocialBoost',
  
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
2. **Mensajes de WhatsApp**: Edita `src/utils/whatsapp.ts`
3. **Datos de demo**: Modifica `src/utils/storage.ts`
4. **Estilos**: Personaliza en cada componente o en `src/index.css`

## 📞 Soporte

Para soporte técnico o consultas sobre la implementación, contacta a través de WhatsApp.