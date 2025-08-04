
import { useState } from 'react';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import SectionNavigation from './SectionNavigation';

const OrderProcessingSection = () => {
  const { products, createOrder, orders, confirmOrder, highlightedOrderId, getOrdersForSalesperson, getOrdersForAdmin } = useOrder();
  
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const salespersonOrders = getOrdersForSalesperson();
  const adminOrders = getOrdersForAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productId && quantity > 0) {
      createOrder(productId, quantity);
    }
  };
  
  return (
    <section id="section-1" className="section-container py-16">
      <h2 className="section-title">Step 1: Effortless Order Processing</h2>
      <p className="section-description">
        See how easily orders can be captured and validated from the salesperson's perspective 
        and how they instantly appear for your admin team. No more manual entry errors or delays!
      </p>
      
      <div className="split-view">
        {/* Salesperson View */}
        <div className={`panel ${highlightedOrderId === null ? 'active-panel' : ''}`}>
          <h3 className="text-lg font-medium text mb-4">Salesperson View</h3>
          
          <div className="guided-action text-black">
            You're in the Salesperson view. Click 'Create New Order'.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create New Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="product" className="block text-sm font-medium">
                    Select Product
                  </label>
                  <Select onValueChange={setProductId} value={productId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - ${product.price.toFixed(2)} ({product.stock} available)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="quantity" className="block text-sm font-medium">
                    Quantity
                  </label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <Button type="submit" className="w-full text-black-400 bg-yellow-400">
                  Submit Order
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">My Submitted Orders</h4>
            {salespersonOrders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders submitted yet</p>
            ) : (
              <div className="space-y-3">
                {salespersonOrders.map((order) => (
                  <Card 
                    key={order.id} 
                    className={`${order.id === highlightedOrderId ? 'transition-highlight' : ''}`}
                  >
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{order.product.name}</p>
                        <p className="text-sm text-gray-500">
                          {order.quantity} units × ${order.product.price} = ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`status-badge ${
                          order.status === 'pending' ? 'status-pending' : 
                          order.status === 'confirmed' ? 'status-confirmed' :
                          order.status === 'processing' ? 'status-processing' :
                          'status-shipped'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Admin View */}
        <div className={`panel ${highlightedOrderId !== null ? 'active-panel' : ''}`}>
          <h3 className="text-lg font-medium mb-4">Admin View</h3>
          
          <div className="guided-action">
            {orders.length > 0 
              ? "The order is here! Click on an order, then 'Confirm Order'."
              : "Wait for a salesperson to submit an order. It will appear here instantly."}
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Incoming Orders</h4>
            {adminOrders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders received yet</p>
            ) : (
              <div className="space-y-3">
                {adminOrders.map((order) => (
                  <Card 
                    key={order.id} 
                    className={`cursor-pointer ${order.id === highlightedOrderId ? 'transition-highlight' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">{order.product.name}</p>
                        <span className={`status-badge ${
                          order.status === 'pending' ? 'status-pending' : 
                          order.status === 'confirmed' ? 'status-confirmed' :
                          order.status === 'processing' ? 'status-processing' :
                          'status-shipped'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {order.quantity} units × ${order.product.price} = ${order.total.toFixed(2)}
                      </p>
                      {order.status === 'pending' && (
                        <Button onClick={() => confirmOrder(order.id)} className="w-full">
                          Confirm Order
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <SectionNavigation sectionId={1} targetSectionId={2} title="Next: Explore Inventory Management" />
    </section>
  );
};

export default OrderProcessingSection;
