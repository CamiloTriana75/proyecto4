export interface Service {
  id: string;
  name: string;
  unit_price: number;
  type: 'cantidad' | 'fijo' | 'rango';
  note: string;
  category: 'games' | 'social';
  image?: string;
  maxQuantity?: number;
  minQuantity?: number;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  phonePrefix: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  createdAt: string;
}

export interface OrderData {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email?: string;
  userId?: string;
  comments?: string;
  country: string;
  quantity?: number;
}

export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  quantity?: number;
  orderData: OrderData;
  status: 'pendiente' | 'acreditado';
  createdAt: string;
}