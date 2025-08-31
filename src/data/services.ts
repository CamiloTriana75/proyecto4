import { Service } from '../types';

export const SERVICES: Service[] = [
  // JUEGOS - Monedas virtuales (usando fórmula: precio_base * (cantidad/100))
  {
    id: "G001",
    name: "Robux - Roblox",
    unit_price: 9.5, // Basado en fórmula similar a diamantes
    type: "cantidad",
    note: "Moneda oficial para comprar skins, accesorios y más",
    category: "games",
    image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 50000,
    minQuantity: 100
  },
  {
    id: "G002", 
    name: "Diamantes - Free Fire",
    unit_price: 9.5, // 950 ARS por 100 diamantes = 9.5 por diamante
    type: "cantidad",
    note: "Para skins, personajes y eventos especiales",
    category: "games",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 10000,
    minQuantity: 50
  },
  {
    id: "G003",
    name: "V-Bucks - Fortnite", 
    unit_price: 12,
    type: "cantidad",
    note: "Para skins, emotes y pase de batalla",
    category: "games",
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 25000,
    minQuantity: 100
  },
  {
    id: "G004",
    name: "UC - PUBG Mobile",
    unit_price: 8,
    type: "cantidad", 
    note: "Para skins, armas y pases de temporada",
    category: "games",
    image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 15000,
    minQuantity: 60
  },
  {
    id: "G005",
    name: "Gemas - Clash of Clans",
    unit_price: 15,
    type: "cantidad",
    note: "Para acelerar construcciones y comprar recursos", 
    category: "games",
    image: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 5000,
    minQuantity: 50
  },
  {
    id: "G006",
    name: "Gemas - Clash Royale",
    unit_price: 18,
    type: "cantidad",
    note: "Para acelerar cofres, comprar cartas o skins",
    category: "games", 
    image: "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 8000,
    minQuantity: 50
  },
  {
    id: "G007",
    name: "Diamonds - Mobile Legends",
    unit_price: 9,
    type: "cantidad",
    note: "Para héroes, skins y cofres",
    category: "games",
    image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 12000,
    minQuantity: 50
  },
  {
    id: "G008",
    name: "Primogemas - Genshin Impact",
    unit_price: 20,
    type: "cantidad",
    note: "Para invocaciones y eventos",
    category: "games",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 8000,
    minQuantity: 60
  },
  {
    id: "G009",
    name: "CP - Call of Duty Mobile",
    unit_price: 14,
    type: "cantidad",
    note: "Para armas, skins y pases de batalla",
    category: "games",
    image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 10000,
    minQuantity: 100
  },
  {
    id: "G010",
    name: "Monedas - Dream League Soccer",
    unit_price: 5,
    type: "cantidad",
    note: "Para mejorar jugadores, equipos y habilidades",
    category: "games",
    image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 20000,
    minQuantity: 100
  },
  {
    id: "G011",
    name: "Valorant Points (VP)",
    unit_price: 16,
    type: "cantidad",
    note: "Para comprar skins de armas y pases de batalla",
    category: "games",
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 15000,
    minQuantity: 100
  },
  {
    id: "G012",
    name: "RP - League of Legends",
    unit_price: 13,
    type: "cantidad",
    note: "Para skins, campeones y pases de evento",
    category: "games",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 20000,
    minQuantity: 100
  },

  // GIFT CARDS Y SUSCRIPCIONES
  {
    id: "G013",
    name: "Steam Wallet",
    unit_price: 1000,
    type: "fijo",
    note: "Tarjeta de $1000 ARS",
    category: "games",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: "G014",
    name: "Google Play Gift Card",
    unit_price: 1500,
    type: "fijo",
    note: "Tarjeta de $1500 ARS",
    category: "games",
    image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: "G015",
    name: "PlayStation Plus - 1 Mes",
    unit_price: 3500,
    type: "fijo",
    note: "Membresía 1 mes",
    category: "games",
    image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=400"
  },

  // SERVICIOS SOCIALES
  {
    id: "S001",
    name: "Seguidores Instagram",
    unit_price: 1,
    type: "cantidad",
    note: "$1 ARS por seguidor",
    category: "social",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxQuantity: 100000,
    minQuantity: 100
  },
  {
    id: "S002",
    name: "Verificación Instagram - Personal",
    unit_price: 60000,
    type: "fijo",
    note: "Cuenta personal",
    category: "social",
    image: "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: "S003",
    name: "Verificación Instagram - Negocios", 
    unit_price: 80000,
    type: "fijo",
    note: "Cuenta negocios",
    category: "social",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: "S004",
    name: "Verificación Instagram - Influencers",
    unit_price: 150000,
    type: "fijo", 
    note: "Cuenta influencers",
    category: "social",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: "S005",
    name: "Recuperación de cuenta",
    unit_price: 60000,
    type: "rango",
    note: "Desde $60.000 hasta $100.000",
    category: "social", 
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: "S006",
    name: "Verificación WhatsApp",
    unit_price: 90000,
    type: "fijo",
    note: "Verificación oficial",
    category: "social",
    image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: "S007",
    name: "Metashield (protección WA & IG)",
    unit_price: 85000,
    type: "rango",
    note: "$85.000 - $300.000",
    category: "social",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];