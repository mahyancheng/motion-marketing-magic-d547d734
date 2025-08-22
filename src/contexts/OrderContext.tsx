
import { createContext, useContext, useState, ReactNode } from 'react';
import { products, customer, orders as initialOrders, generateId } from '../lib/flow-data';
import { toast } from '@/hooks/use-toast';

// Define the Order context type
interface OrderContextType {
  // Data
  products: any[];
  orders: any[];
  customer: any;
  // Order Functions
  createOrder: (productId: string, quantity: number) => void;
  confirmOrder: (orderId: string) => void;
  beginFulfillment: (orderId: string) => void;
  shipOrder: (orderId: string) => void;
  // Inventory Functions
  adjustStock: (productId: string, quantity: number) => void;
  // Customer Functions
  addCustomerNote: (content: string) => void;
  // Helper Functions
  getOrdersByStatus: (status: string) => any[];
  getOrdersForSalesperson: () => any[];
  getOrdersForAdmin: () => any[];
  // UI Functions
  setActiveSection: (section: number) => void;
  activeSection: number;
  setHighlightedOrderId: (id: string | null) => void;
  highlightedOrderId: string | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [productsList, setProductsList] = useState([...products]);
  const [ordersList, setOrdersList] = useState([...initialOrders]);
  const [customerData, setCustomerData] = useState({...customer});
  const [activeSection, setActiveSection] = useState(1);
  const [highlightedOrderId, setHighlightedOrderId] = useState<string | null>(null);

  // Order Functions
  const createOrder = (productId: string, quantity: number) => {
    const product = productsList.find(p => p.id === productId);
    
    if (!product) {
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive"
      });
      return;
    }
    
    if (product.stock < quantity) {
      toast({
        title: "Cannot Create Order",
        description: `Only ${product.stock} units available`,
        variant: "destructive"
      });
      return;
    }

    const newOrder = {
      id: generateId('order'),
      customerId: customerData.id,
      product,
      quantity,
      total: product.price * quantity,
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Update product stock
    const updatedProducts = productsList.map(p => 
      p.id === product.id ? {...p, stock: p.stock - quantity} : p
    );
    
    setOrdersList([newOrder, ...ordersList]);
    setProductsList(updatedProducts);
    setHighlightedOrderId(newOrder.id);
    
    toast({
      title: "Order Created",
      description: `Order for ${quantity} x ${product.name} has been created`
    });
  };

  const confirmOrder = (orderId: string) => {
    const updatedOrders = ordersList.map(order => 
      order.id === orderId 
        ? {...order, status: 'confirmed' as const, updatedAt: new Date()} 
        : order
    );
    
    setOrdersList(updatedOrders);
    
    toast({
      title: "Order Confirmed",
      description: `Order ${orderId} has been confirmed`
    });
  };

  const beginFulfillment = (orderId: string) => {
    const updatedOrders = ordersList.map(order => 
      order.id === orderId 
        ? {...order, status: 'processing' as const, updatedAt: new Date()} 
        : order
    );
    
    setOrdersList(updatedOrders);
    
    toast({
      title: "Fulfillment Started",
      description: `Order ${orderId} is now being processed`
    });
  };

  const shipOrder = (orderId: string) => {
    const updatedOrders = ordersList.map(order => 
      order.id === orderId 
        ? {...order, status: 'shipped' as const, updatedAt: new Date()} 
        : order
    );
    
    setOrdersList(updatedOrders);
    
    toast({
      title: "Order Shipped",
      description: `Order ${orderId} has been marked as shipped`
    });
  };

  // Inventory Functions
  const adjustStock = (productId: string, quantity: number) => {
    const updatedProducts = productsList.map(product => 
      product.id === productId 
        ? {...product, stock: product.stock + quantity} 
        : product
    );
    
    setProductsList(updatedProducts);
    
    toast({
      title: "Stock Updated",
      description: `Stock for product has been adjusted by ${quantity} units`
    });
  };

  // Customer Functions
  const addCustomerNote = (content: string) => {
    const newNote = {
      id: generateId('note'),
      content,
      createdAt: new Date(),
    };
    
    setCustomerData({
      ...customerData,
      notes: [newNote, ...customerData.notes]
    });
    
    toast({
      title: "Note Added",
      description: "Customer note has been added successfully"
    });
  };

  // Helper Functions
  const getOrdersByStatus = (status: string) => {
    return ordersList.filter(order => order.status === status);
  };

  const getOrdersForSalesperson = () => {
    return ordersList;
  };

  const getOrdersForAdmin = () => {
    return ordersList;
  };

  return (
    <OrderContext.Provider value={{
      products: productsList,
      orders: ordersList,
      customer: customerData,
      createOrder,
      confirmOrder,
      beginFulfillment,
      shipOrder,
      adjustStock,
      addCustomerNote,
      getOrdersByStatus,
      getOrdersForSalesperson,
      getOrdersForAdmin,
      setActiveSection,
      activeSection,
      setHighlightedOrderId,
      highlightedOrderId
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
