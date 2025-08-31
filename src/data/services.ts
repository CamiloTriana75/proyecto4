import { Service } from '../types';

export const SERVICES: Service[] = [
  // ===== MONEDAS VIRTUALES DE JUEGOS =====
  {
    id: "G001",
    name: "Robux - Roblox",
    unit_price: 9.5, // 950 ARS por 100 = 9.5 por unidad
    type: "cantidad",
    note: "Moneda oficial para comprar skins, accesorios y más",
    category: "games",
    subcategory: "currency",
    image: "/img/games/robux.webp",
    maxQuantity: 50000,
    minQuantity: 100,
    emoji: "🎮",
    quantityBreaks: [
      { quantity: 100, pricePerUnit: 9.5 },
      { quantity: 500, pricePerUnit: 9.0, discount: 5 },
      { quantity: 1000, pricePerUnit: 8.5, discount: 11 },
      { quantity: 5000, pricePerUnit: 8.0, discount: 16 },
      { quantity: 10000, pricePerUnit: 7.5, discount: 21 }
    ]
  },
  {
    id: "G002",
    name: "Diamantes - Free Fire",
    unit_price: 9.5, // Base: 950 ARS por 100 diamantes
    type: "cantidad",
    note: "Para skins, personajes y eventos especiales",
    category: "games",
    subcategory: "currency",
    image: "/img/games/Diamantes-Free-Fire-Brasil.jpg",
    maxQuantity: 10000,
    minQuantity: 50,
    emoji: "💎",
    quantityBreaks: [
      { quantity: 50, pricePerUnit: 9.5 },
      { quantity: 200, pricePerUnit: 9.0, discount: 5 },
      { quantity: 500, pricePerUnit: 8.5, discount: 11 },
      { quantity: 1000, pricePerUnit: 8.0, discount: 16 },
      { quantity: 5000, pricePerUnit: 7.5, discount: 21 }
    ]
  },
  {
    id: "G003",
    name: "V-Bucks - Fortnite",
    unit_price: 12,
    type: "cantidad",
    note: "Para skins, emotes y pase de batalla",
    category: "games",
    subcategory: "currency",
    image: "/img/games/fortnite.jpg",
    maxQuantity: 25000,
    minQuantity: 100,
    emoji: "🏆",
    quantityBreaks: [
      { quantity: 100, pricePerUnit: 12 },
      { quantity: 500, pricePerUnit: 11.5, discount: 4 },
      { quantity: 1000, pricePerUnit: 11.0, discount: 8 },
      { quantity: 5000, pricePerUnit: 10.5, discount: 13 },
      { quantity: 10000, pricePerUnit: 10.0, discount: 17 }
    ]
  },
  {
    id: "G004",
    name: "UC - PUBG Mobile",
    unit_price: 8,
    type: "cantidad",
    note: "Para skins, armas y pases de temporada",
    category: "games",
    subcategory: "currency",
    image: "/img/games/pubg.webp",
    maxQuantity: 15000,
    minQuantity: 60,
    emoji: "🔫"
  },
  {
    id: "G005",
    name: "Diamonds - Mobile Legends",
    unit_price: 9,
    type: "cantidad",
    note: "Para héroes, skins y cofres",
    category: "games",
    subcategory: "currency",
    image: "/img/games/mobile legends.jpg",
    maxQuantity: 12000,
    minQuantity: 50,
    emoji: "⚔️"
  },
  {
    id: "G006",
    name: "Gemas - Clash of Clans",
    unit_price: 15,
    type: "cantidad",
    note: "Para acelerar construcciones y comprar recursos",
    category: "games",
    subcategory: "currency",
    image: "/img/games/clash-of-clans-gemas.webp",
    maxQuantity: 5000,
    minQuantity: 50,
    emoji: "💰"
  },
  {
    id: "G007",
    name: "Gemas - Clash Royale",
    unit_price: 18,
    type: "cantidad",
    note: "Para acelerar cofres, comprar cartas o skins",
    category: "games",
    subcategory: "currency",
    image: "/img/games/clash royale.webp",
    maxQuantity: 8000,
    minQuantity: 50,
    emoji: "👑"
  },
  {
    id: "G008",
    name: "Primogemas - Genshin Impact",
    unit_price: 20,
    type: "cantidad",
    note: "Para invocaciones y eventos",
    category: "games",
    subcategory: "currency",
    image: "/img/games/genshin.webp",
    maxQuantity: 8000,
    minQuantity: 60,
    emoji: "🌟"
  },
  {
    id: "G009",
    name: "CP - Call of Duty Mobile",
    unit_price: 14,
    type: "cantidad",
    note: "Para armas, skins y pases de batalla",
    category: "games",
    subcategory: "currency",
    image: "/img/games/cod mobile.jpg",
    maxQuantity: 10000,
    minQuantity: 100,
    emoji: "🎯"
  },
  {
    id: "G010",
    name: "Monedas DLS - Dream League Soccer",
    unit_price: 5,
    type: "cantidad",
    note: "Para mejorar jugadores, equipos y habilidades",
    category: "games",
    subcategory: "currency",
    image: "/img/games/dls.jpg",
    maxQuantity: 20000,
    minQuantity: 100,
    emoji: "⚽"
  },
  {
    id: "G011",
    name: "Valorant Points (VP) - Valorant",
    unit_price: 16,
    type: "cantidad",
    note: "Para comprar skins de armas y pases de batalla",
    category: "games",
    subcategory: "currency",
    image: "/img/games/valorant.jpg",
    maxQuantity: 15000,
    minQuantity: 100,
    emoji: "🎯"
  },
  {
    id: "G012",
    name: "RP - League of Legends",
    unit_price: 13,
    type: "cantidad",
    note: "Para skins, campeones y pases de evento",
    category: "games",
    subcategory: "currency",
    image: "/img/games/rp lol.png",
    maxQuantity: 20000,
    minQuantity: 100,
    emoji: "🏆"
  },
  {
    id: "G013",
    name: "Minecoins - Minecraft",
    unit_price: 11,
    type: "cantidad",
    note: "Para comprar skins y packs dentro del juego",
    category: "games",
    subcategory: "currency",
    image: "/img/games/minecraft.jpg",
    maxQuantity: 10000,
    minQuantity: 100,
    emoji: "⛏️"
  },
  {
    id: "G014",
    name: "FIFA Points - FIFA/EA Games",
    unit_price: 17,
    type: "cantidad",
    note: "Para sobres, jugadores y modos de juego",
    category: "games",
    subcategory: "currency",
    image: "/img/games/fifa.jpg",
    maxQuantity: 12000,
    minQuantity: 100,
    emoji: "⚽"
  },

  // ===== GIFT CARDS Y SUSCRIPCIONES =====
  {
    id: "G015",
    name: "Steam Wallet",
    unit_price: 1000,
    type: "tiers",
    note: "Créditos para juegos y contenido en Steam",
    category: "games",
    subcategory: "giftcard",
    image: "/img/games/steam.png",
    emoji: "🎮",
    pricingTiers: [
      { value: 500, price: 500, label: "$500 ARS" },
      { value: 1000, price: 1000, label: "$1000 ARS" },
      { value: 2000, price: 2000, label: "$2000 ARS" },
      { value: 5000, price: 5000, label: "$5000 ARS" },
      { value: 10000, price: 10000, label: "$10000 ARS" }
    ]
  },
  {
    id: "G016",
    name: "Google Play Gift Card",
    unit_price: 1500,
    type: "tiers",
    note: "Para comprar cualquier juego o app de Android",
    category: "games",
    subcategory: "giftcard",
    image: "/img/games/google play.jpg",
    emoji: "📱",
    pricingTiers: [
      { value: 1000, price: 1000, label: "$1000 ARS" },
      { value: 1500, price: 1500, label: "$1500 ARS" },
      { value: 2500, price: 2500, label: "$2500 ARS" },
      { value: 5000, price: 5000, label: "$5000 ARS" }
    ]
  },
  {
    id: "G017",
    name: "PlayStation Plus",
    unit_price: 3500,
    type: "subscription",
    note: "Para jugar online y acceso a juegos gratis",
    category: "games",
    subcategory: "subscription",
    image: "/img/games/ps plus.avif",
    emoji: "🎮",
    pricingTiers: [
      { value: 1, price: 3500, label: "1 Mes" },
      { value: 3, price: 9500, label: "3 Meses", discount: 9 },
      { value: 6, price: 18000, label: "6 Meses", discount: 14 },
      { value: 12, price: 32000, label: "12 Meses", discount: 24 }
    ]
  },
  {
    id: "G018",
    name: "Xbox Game Pass",
    unit_price: 4000,
    type: "subscription",
    note: "Para jugar cientos de juegos en consola y PC",
    category: "games",
    subcategory: "subscription",
    image: "/img/games/gamepass.avif",
    emoji: "🎮",
    pricingTiers: [
      { value: 1, price: 4000, label: "1 Mes" },
      { value: 3, price: 11000, label: "3 Meses", discount: 8 },
      { value: 6, price: 20000, label: "6 Meses", discount: 17 },
      { value: 12, price: 36000, label: "12 Meses", discount: 25 }
    ]
  },
  {
    id: "G019",
    name: "Nintendo Switch Online",
    unit_price: 2500,
    type: "subscription",
    note: "Para jugar online y recibir juegos gratis",
    category: "games",
    subcategory: "subscription",
    image: "/img/games/nintendo.avif",
    emoji: "🎮",
    pricingTiers: [
      { value: 1, price: 2500, label: "1 Mes" },
      { value: 3, price: 7000, label: "3 Meses", discount: 7 },
      { value: 12, price: 24000, label: "12 Meses", discount: 20 }
    ]
  },
  {
    id: "G020",
    name: "Epic Games Gift Card",
    unit_price: 2000,
    type: "fijo",
    note: "Para Fortnite, Rocket League y otros juegos de Epic - $2000 ARS",
    category: "games",
    subcategory: "giftcard",
    image: "/img/games/epic.png",
    emoji: "🎮"
  },
  {
    id: "G021",
    name: "Riot Games Card",
    unit_price: 1800,
    type: "fijo",
    note: "Para LoL, TFT, Valorant y otros juegos de Riot - $1800 ARS",
    category: "games",
    subcategory: "giftcard",
    image: "/img/games/rp lol.png",
    emoji: "🏆"
  },
  {
    id: "G022",
    name: "App Store / iTunes Gift Card",
    unit_price: 2500,
    type: "fijo",
    note: "Para comprar juegos o apps en iPhone/iPad - $2500 ARS",
    category: "games",
    subcategory: "giftcard",
    image: "/img/games/itunes.jpg",
    emoji: "📱"
  },

  // ===== SERVICIOS DE BOOSTING Y CUENTAS =====
  {
    id: "G023",
    name: "Boosting LoL - League of Legends",
    unit_price: 15000,
    type: "rango",
    note: "Subir rango o nivel - Desde $15.000 hasta $50.000",
    category: "games",
    subcategory: "boosting",
    image: "/img/games/boosting lol.webp",
    emoji: "📈"
  },
  {
    id: "G024",
    name: "Boosting Fortnite",
    unit_price: 12000,
    type: "rango",
    note: "Subir nivel o completar pases - Desde $12.000 hasta $40.000",
    category: "games",
    subcategory: "boosting",
    image: "/img/games/fortnite boosting.webp",
    emoji: "📈"
  },
  {
    id: "G025",
    name: "Boosting COD Mobile",
    unit_price: 10000,
    type: "rango",
    note: "Subir rango en Battle Royale o Multijugador - Desde $10.000",
    category: "games",
    subcategory: "boosting",
    image: "/img/games/cod mobile.jpg",
    emoji: "📈"
  },
  {
    id: "G026",
    name: "Cuentas con Skins - Valorant",
    unit_price: 25000,
    type: "rango",
    note: "Cuentas con skins exclusivos - Desde $25.000 hasta $100.000",
    category: "games",
    subcategory: "accounts",
    image: "/img/games/valorant.jpg",
    emoji: "👤"
  },
  {
    id: "G027",
    name: "Cuentas Free Fire",
    unit_price: 20000,
    type: "rango",
    note: "Cuentas con personajes y skins - Desde $20.000 hasta $80.000",
    category: "games",
    subcategory: "accounts",
    image: "/img/games/Diamantes-Free-Fire-Brasil.jpg",
    emoji: "👤"
  },

  // ===== PASES DE BATALLA =====
  {
    id: "G028",
    name: "Battle Pass - Free Fire",
    unit_price: 3500,
    type: "fijo",
    note: "Pase de batalla de la temporada actual",
    category: "games",
    subcategory: "battlepass",
    image: "/img/games/Diamantes-Free-Fire-Brasil.jpg",
    emoji: "🎖️"
  },
  {
    id: "G029",
    name: "Battle Pass - Fortnite",
    unit_price: 4000,
    type: "fijo",
    note: "Pase de batalla de la temporada actual",
    category: "games",
    subcategory: "battlepass",
    image: "/img/games/fortnite.jpg",
    emoji: "🎖️"
  },
  {
    id: "G030",
    name: "Battle Pass - COD Mobile",
    unit_price: 3800,
    type: "fijo",
    note: "Pase de batalla de la temporada actual",
    category: "games",
    subcategory: "battlepass",
    image: "/img/games/cod mobile.jpg",
    emoji: "🎖️"
  },
  {
    id: "G031",
    name: "Battle Pass - Mobile Legends",
    unit_price: 3200,
    type: "fijo",
    note: "Pase de batalla de la temporada actual",
    category: "games",
    subcategory: "battlepass",
    image: "/img/games/mobile legends.jpg",
    emoji: "🎖️"
  },

  // ===== SERVICIOS STREAMING Y PREMIUM =====
  {
    id: "G032",
    name: "Twitch Bits",
    unit_price: 0.8,
    type: "cantidad",
    note: "Para apoyar a tus streamers favoritos",
    category: "games",
    subcategory: "streaming",
    image: "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 50000,
    minQuantity: 100,
    emoji: "📺"
  },
  {
    id: "G033",
    name: "YouTube Premium - 1 Mes",
    unit_price: 2800,
    type: "fijo",
    note: "Sin anuncios y música incluida",
    category: "games",
    subcategory: "streaming",
    image: "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "📺"
  },
  {
    id: "G034",
    name: "TikTok Gifts",
    unit_price: 1.2,
    type: "cantidad",
    note: "Para enviar regalos en transmisiones en vivo",
    category: "games",
    subcategory: "streaming",
    image: "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 10000,
    minQuantity: 50,
    emoji: "🎁"
  },

  // ===== COACHING Y ASESORÍAS =====
  {
    id: "G035",
    name: "Coaching LoL - 1 Hora",
    unit_price: 8000,
    type: "fijo",
    note: "Clases personalizadas para mejorar en League of Legends",
    category: "games",
    subcategory: "coaching",
    image: "/img/games/rp lol.png",
    emoji: "🎓"
  },
  {
    id: "G036",
    name: "Coaching Fortnite - 1 Hora",
    unit_price: 7500,
    type: "fijo",
    note: "Clases para mejorar en construcción y combate",
    category: "games",
    subcategory: "coaching",
    image: "/img/games/fortnite.jpg",
    emoji: "🎓"
  },
  {
    id: "G037",
    name: "Coaching Valorant - 1 Hora",
    unit_price: 8500,
    type: "fijo",
    note: "Clases para mejorar puntería y estrategia",
    category: "games",
    subcategory: "coaching",
    image: "/img/games/valorant.jpg",
    emoji: "🎓"
  },

  // ===== SERVICIOS DE REDES SOCIALES =====
  {
    id: "S001",
    name: "Seguidores Instagram",
    unit_price: 1,
    type: "cantidad",
    note: "$1 ARS por seguidor real y activo",
    category: "social",
    subcategory: "followers",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 100000,
    minQuantity: 100,
    emoji: "👥"
  },
  {
    id: "S002",
    name: "Verificación Instagram - Personal",
    unit_price: 60000,
    type: "fijo",
    note: "Verificación oficial para cuentas personales",
    category: "social",
    subcategory: "verification",
    image: "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "✅"
  },
  {
    id: "S003",
    name: "Verificación Instagram - Negocios",
    unit_price: 80000,
    type: "fijo",
    note: "Verificación oficial para cuentas de negocios",
    category: "social",
    subcategory: "verification",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "✅"
  },
  {
    id: "S004",
    name: "Verificación Instagram - Influencers",
    unit_price: 150000,
    type: "fijo",
    note: "Verificación oficial para influencers y figuras públicas",
    category: "social",
    subcategory: "verification",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "✅"
  },
  {
    id: "S005",
    name: "Recuperación de Cuenta",
    unit_price: 60000,
    type: "rango",
    note: "Recuperación profesional de cuentas - Desde $60.000 hasta $100.000",
    category: "social",
    subcategory: "recovery",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "🔒"
  },
  {
    id: "S006",
    name: "Verificación WhatsApp",
    unit_price: 90000,
    type: "fijo",
    note: "Verificación oficial de WhatsApp Business",
    category: "social",
    subcategory: "verification",
    image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "✅"
  },
  {
    id: "S007",
    name: "Metashield - Protección Avanzada",
    unit_price: 85000,
    type: "rango",
    note: "Protección para WhatsApp e Instagram - $85.000 - $300.000",
    category: "social",
    subcategory: "protection",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "🛡️"
  }
];