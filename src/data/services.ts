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
    image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 50000,
    minQuantity: 100,
    emoji: "🎮"
  },
  {
    id: "G002",
    name: "Diamantes - Free Fire",
    unit_price: 9.5, // Base: 950 ARS por 100 diamantes
    type: "cantidad",
    note: "Para skins, personajes y eventos especiales",
    category: "games",
    subcategory: "currency",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 10000,
    minQuantity: 50,
    emoji: "💎"
  },
  {
    id: "G003",
    name: "V-Bucks - Fortnite",
    unit_price: 12,
    type: "cantidad",
    note: "Para skins, emotes y pase de batalla",
    category: "games",
    subcategory: "currency",
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 25000,
    minQuantity: 100,
    emoji: "🏆"
  },
  {
    id: "G004",
    name: "UC - PUBG Mobile",
    unit_price: 8,
    type: "cantidad",
    note: "Para skins, armas y pases de temporada",
    category: "games",
    subcategory: "currency",
    image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 12000,
    minQuantity: 100,
    emoji: "⚽"
  },

  // ===== GIFT CARDS Y SUSCRIPCIONES =====
  {
    id: "G015",
    name: "Steam Wallet",
    unit_price: 1000,
    type: "fijo",
    note: "Créditos para juegos y contenido en Steam - $1000 ARS",
    category: "games",
    subcategory: "giftcard",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "🎮"
  },
  {
    id: "G016",
    name: "Google Play Gift Card",
    unit_price: 1500,
    type: "fijo",
    note: "Para comprar cualquier juego o app de Android - $1500 ARS",
    category: "games",
    subcategory: "giftcard",
    image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "📱"
  },
  {
    id: "G017",
    name: "PlayStation Plus - 1 Mes",
    unit_price: 3500,
    type: "fijo",
    note: "Para jugar online y acceso a juegos gratis",
    category: "games",
    subcategory: "subscription",
    image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "🎮"
  },
  {
    id: "G018",
    name: "Xbox Game Pass - 1 Mes",
    unit_price: 4000,
    type: "fijo",
    note: "Para jugar cientos de juegos en consola y PC",
    category: "games",
    subcategory: "subscription",
    image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "🎮"
  },
  {
    id: "G019",
    name: "Nintendo Switch Online - 1 Mes",
    unit_price: 2500,
    type: "fijo",
    note: "Para jugar online y recibir juegos gratis",
    category: "games",
    subcategory: "subscription",
    image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
    emoji: "🎮"
  },
  {
    id: "G020",
    name: "Epic Games Gift Card",
    unit_price: 2000,
    type: "fijo",
    note: "Para Fortnite, Rocket League y otros juegos de Epic - $2000 ARS",
    category: "games",
    subcategory: "giftcard",
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
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