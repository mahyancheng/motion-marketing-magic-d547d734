
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Order {
  id: string;
  customerId: string;
  product: Product;
  quantity: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped';
  createdAt: Date;
  updatedAt: Date;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: CustomerNote[];
}

interface CustomerNote {
  id: string;
  content: string;
  createdAt: Date;
}

// Initial Products
export const products: Product[] = [
  { id: 'prod-001', name: 'Alpha Unit', price: 299.99, stock: 10 },
  { id: 'prod-002', name: 'Beta Package', price: 499.99, stock: 5 },
  { id: 'prod-003', name: 'Gamma Solution', price: 799.99, stock: 3 },
  { id: 'prod-004', name: 'Delta Enterprise', price: 1299.99, stock: 2 }
];

// Demo Customer
export const customer: Customer = {
  id: 'cust-001',
  name: 'Demo Customer',
  email: 'demo@example.com',
  phone: '(555) 123-4567',
  notes: []
};

// Initial empty orders array
export const orders: Order[] = [];

// Generate unique ID
export const generateId = (prefix: string) => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};
