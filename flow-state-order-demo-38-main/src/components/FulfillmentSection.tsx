
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FulfillmentSection = () => {
  const { 
    orders, 
    beginFulfillment, 
    shipOrder, 
    getOrdersForAdmin, 
    getOrdersForSalesperson 
  } = useOrder();
  
  // Get admin orders (all orders)
  const adminOrders = getOrdersForAdmin().filter(order => 
    order.status === 'confirmed' || order.status === 'processing' || order.status === 'shipped'
  );
  
  // Get salesperson orders
  const salespersonOrders = getOrdersForSalesperson();
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Reduce manual work in your warehouse. See how the system can guide your team through picking, packing, and shipping.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Salesperson View */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Salesperson View</h4>
          
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            As a Salesperson, you can track the status of your orders as they progress through fulfillment.
          </div>
          
          <div>
            <h5 className="font-medium mb-2 text-sm">My Order Status Updates</h5>
            {salespersonOrders.length === 0 ? (
              <p className="text-gray-500 text-xs">No orders to display</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {salespersonOrders.map((order) => (
                  <Card key={order.id}>
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
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Created: {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        {order.status !== 'pending' && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Confirmed</span>
                          </div>
                        )}
                        {(order.status === 'processing' || order.status === 'shipped') && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Processing</span>
                          </div>
                        )}
                        {order.status === 'shipped' && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Shipped</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Admin View */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Admin View</h4>
          
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            As an Admin, you can manage the fulfillment process. Select an order and begin fulfillment.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Fulfillment Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                <div className="text-center">
                  <span className="font-medium">To Fulfill:</span>
                  <div className="text-lg font-bold">{adminOrders.filter(o => o.status === 'confirmed').length}</div>
                </div>
                <div className="text-center">
                  <span className="font-medium">Processing:</span>
                  <div className="text-lg font-bold">{adminOrders.filter(o => o.status === 'processing').length}</div>
                </div>
                <div className="text-center">
                  <span className="font-medium">Shipped:</span>
                  <div className="text-lg font-bold">{adminOrders.filter(o => o.status === 'shipped').length}</div>
                </div>
              </div>
              
              {adminOrders.length === 0 ? (
                <p className="text-gray-500 text-xs">No orders to process</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {adminOrders.map((order) => (
                    <div key={order.id} className="border rounded p-2">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium text-xs">{order.product.name}</p>
                        <span className={`text-xs px-1 py-0.5 rounded ${
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
                      {order.status === 'confirmed' && (
                        <Button onClick={() => beginFulfillment(order.id)} size="sm" className="w-full h-6 text-xs">
                          Begin Fulfillment
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <Button onClick={() => shipOrder(order.id)} size="sm" className="w-full h-6 text-xs">
                          Mark as Shipped
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <p className="text-xs text-green-600">
                          ✓ Order shipped on {new Date(order.updatedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FulfillmentSection;
