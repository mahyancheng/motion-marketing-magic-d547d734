import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FulfillmentDemo = () => {
  const { orders, beginFulfillment, shipOrder, getOrdersByStatus } = useOrder();
  
  const confirmedOrders = getOrdersByStatus('confirmed');
  const processingOrders = getOrdersByStatus('processing');
  const shippedOrders = getOrdersByStatus('shipped');
  
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Processing Queue */}
        <div>
          <h3 className="text-sm font-medium text-yellow-400 mb-3">Processing Queue</h3>
          <div className="space-y-2">
            {confirmedOrders.slice(0, 3).map((order) => (
              <Card key={order.id}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-medium">{order.product.name}</p>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Qty: {order.quantity}</p>
                  <Button 
                    onClick={() => beginFulfillment(order.id)} 
                    className="w-full text-xs"
                    size="sm"
                  >
                    Start Processing
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Shipping Queue */}
        <div>
          <h3 className="text-sm font-medium text-yellow-400 mb-3">Ready to Ship</h3>
          <div className="space-y-2">
            {processingOrders.slice(0, 3).map((order) => (
              <Card key={order.id}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-medium">{order.product.name}</p>
                    <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-800">
                      Processing
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Qty: {order.quantity}</p>
                  <Button 
                    onClick={() => shipOrder(order.id)} 
                    className="w-full text-black bg-yellow-400 hover:bg-yellow-300 text-xs"
                    size="sm"
                  >
                    Ship Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Shipped Orders */}
      <div>
        <h3 className="text-sm font-medium text-yellow-400 mb-3">Recently Shipped</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {shippedOrders.slice(0, 3).map((order) => (
            <Card key={order.id}>
              <CardContent className="p-2">
                <p className="text-xs font-medium">{order.product.name}</p>
                <p className="text-xs text-gray-500">Qty: {order.quantity}</p>
                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                  Shipped
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FulfillmentDemo;