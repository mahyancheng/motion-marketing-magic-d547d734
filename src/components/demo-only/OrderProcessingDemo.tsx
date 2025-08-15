import { useState } from 'react';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const OrderProcessingDemo = () => {
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
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Salesperson View */}
        <div className={`${highlightedOrderId === null ? 'ring-2 ring-yellow-400' : ''} rounded-lg p-2`}>
          <h3 className="text-sm font-medium text-yellow-400 mb-3">Salesperson View</h3>
          
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Create New Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Select onValueChange={setProductId} value={productId}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id} className="text-xs">
                        {product.name} - ${product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="text-xs"
                />
                
                <Button type="submit" className="w-full text-black bg-yellow-400 hover:bg-yellow-300 text-xs">
                  Submit Order
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            {salespersonOrders.slice(0, 2).map((order) => (
              <Card key={order.id} className={`${order.id === highlightedOrderId ? 'ring-2 ring-yellow-400' : ''}`}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-medium">{order.product.name}</p>
                      <p className="text-xs text-gray-500">${order.total.toFixed(2)}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Admin View */}
        <div className={`${highlightedOrderId !== null ? 'ring-2 ring-yellow-400' : ''} rounded-lg p-2`}>
          <h3 className="text-sm font-medium text-yellow-400 mb-3">Admin View</h3>
          
          <div className="space-y-2">
            {adminOrders.slice(0, 3).map((order) => (
              <Card key={order.id} className={`${order.id === highlightedOrderId ? 'ring-2 ring-yellow-400' : ''}`}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-medium">{order.product.name}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">${order.total.toFixed(2)}</p>
                  {order.status === 'pending' && (
                    <Button onClick={() => confirmOrder(order.id)} className="w-full text-xs">
                      Confirm Order
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessingDemo;