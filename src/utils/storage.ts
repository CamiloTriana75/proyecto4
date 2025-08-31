import { User, Order } from '../types';

const STORAGE_KEYS = {
  USERS: 'socialboost_users',
  ORDERS: 'socialboost_orders',
  CURRENT_USER: 'socialboost_current_user',
};

// Datos de demo
const DEMO_USERS: User[] = [
  {
    id: 'user_1',
    email: 'demo@example.com',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '+541123456789',
    country: 'AR',
    createdAt: new Date().toISOString(),
  }
];

const DEMO_ORDERS: Order[] = [
  {
    id: 'order_1',
    userId: 'user_1',
    serviceId: 'S002',
    serviceName: 'Verificación Instagram - Personal',
    amount: 60000,
    orderData: {
      firstName: 'Juan',
      lastName: 'Pérez',
      dni: '12345678',
      phone: '+541123456789',
      email: 'demo@example.com',
      userId: '@juanperez',
      country: 'AR',
    },
    status: 'acreditado',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: 'order_2',
    userId: 'user_1',
    serviceId: 'S001',
    serviceName: 'Seguidores',
    amount: 1000,
    quantity: 1000,
    orderData: {
      firstName: 'Juan',
      lastName: 'Pérez',
      dni: '12345678',
      phone: '+541123456789',
      email: 'demo@example.com',
      userId: '@juanperez',
      country: 'AR',
    },
    status: 'pendiente',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  }
];

export const storageUtils = {
  // Initialize demo data if empty
  initializeDemo: () => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    
    if (!users) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
    }
    
    if (!orders) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEMO_ORDERS));
    }
  },

  // Users
  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (user: User) => {
    const users = storageUtils.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  findUserByEmail: (email: string): User | null => {
    const users = storageUtils.getUsers();
    return users.find(u => u.email === email) || null;
  },

  // Current user session
  getCurrentUser: (): User | null => {
    const userId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!userId) return null;
    
    const users = storageUtils.getUsers();
    return users.find(u => u.id === userId) || null;
  },

  setCurrentUser: (userId: string) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId);
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Orders
  getOrders: (): Order[] => {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  },

  saveOrder: (order: Order) => {
    const orders = storageUtils.getOrders();
    orders.push(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  getUserOrders: (userId: string): Order[] => {
    const orders = storageUtils.getOrders();
    return orders.filter(o => o.userId === userId);
  },

  generateId: () => {
    return 'id_' + Math.random().toString(36).substr(2, 9);
  }
};