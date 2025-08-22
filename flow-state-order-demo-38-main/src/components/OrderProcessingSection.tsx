
import { useState } from 'react';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

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
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        See how easily orders can be captured and validated from the salesperson's perspective 
        and how they instantly appear for your admin team.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Salesperson View */}
        <div className={`space-y-3 ${highlightedOrderId === null ? 'ring-2 ring-blue-200 rounded-lg p-3' : ''}`}>
          <h4 className="text-sm font-semibold text-gray-700">Salesperson View</h4>
          
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            You're in the Salesperson view. Click 'Create New Order'.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Create New Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="product" className="block text-xs font-medium">
                    Select Product
                  </label>
                  <Select onValueChange={setProductId} value={productId}>
                    <SelectTrigger className="h-8 text-xs">
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
                
                <div className="space-y-1">
                  <label htmlFor="quantity" className="block text-xs font-medium">
                    Quantity
                  </label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="h-8 text-xs"
                  />
                </div>
                
                <Button type="submit" size="sm" className="w-full">
                  Submit Order
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <h5 className="font-medium mb-2 text-sm">My Submitted Orders</h5>
            {salespersonOrders.length === 0 ? (
              <p className="text-gray-500 text-xs">No orders submitted yet</p>
            ) : (
              <div className="space-y-2">
                {salespersonOrders.map((order) => (
                  <Card 
                    key={order.id} 
                    className={`${order.id === highlightedOrderId ? 'transition-highlight' : ''}`}
                  >
                    <CardContent className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{order.product.name}</p>
                        <p className="text-xs text-gray-500">
                          {order.quantity} units × ${order.product.price} = ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
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
        <div className={`space-y-3 ${highlightedOrderId !== null ? 'ring-2 ring-blue-200 rounded-lg p-3' : ''}`}>
          <h4 className="text-sm font-semibold text-gray-700">Admin View</h4>
          
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            {orders.length > 0 
              ? "The order is here! Click on an order, then 'Confirm Order'."
              : "Wait for a salesperson to submit an order. It will appear here instantly."}
          </div>
          
          <div>
            <h5 className="font-medium mb-2 text-sm">Incoming Orders</h5>
            {adminOrders.length === 0 ? (
              <p className="text-gray-500 text-xs">No orders received yet</p>
            ) : (
              <div className="space-y-2">
                {adminOrders.map((order) => (
                  <Card 
                    key={order.id} 
                    className={`cursor-pointer ${order.id === highlightedOrderId ? 'transition-highlight' : ''}`}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-sm">{order.product.name}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {order.quantity} units × ${order.product.price} = ${order.total.toFixed(2)}
                      </p>
                      {order.status === 'pending' && (
                        <Button onClick={() => confirmOrder(order.id)} size="sm" className="w-full">
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
    </div>
  );
};

export default OrderProcessingSection;
