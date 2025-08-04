
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionNavigation from './SectionNavigation';

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
    <section id="section-3" className="section-container py-16">
      <h2 className="section-title">Step 3: Automate Your Fulfillment Process</h2>
      <p className="section-description">
        Reduce manual work in your warehouse. See how the system can guide your team through 
        picking, packing, and shipping.
      </p>
      
      <div className="split-view">
        {/* Salesperson View */}
        <div className="panel">
          <h3 className="text-lg font-medium mb-4">Salesperson View</h3>
          
          <div className="guided-action">
            As a Salesperson, you can track the status of your orders as they progress through fulfillment.
            This allows you to provide accurate updates to customers.
          </div>
          
          <div>
            <h4 className="font-medium mb-2">My Order Status Updates</h4>
            {salespersonOrders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders to display</p>
            ) : (
              <div className="space-y-3">
                {salespersonOrders.map((order) => (
                  <Card key={order.id}>
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
                      <p className="text-sm text-gray-500 mb-2">
                        {order.quantity} units × ${order.product.price} = ${order.total.toFixed(2)}
                      </p>
                      
                      {/* Order timeline */}
                      <div className="mt-4 relative">
                        <div className="absolute h-full w-0.5 bg-gray-200 left-2.5 top-0"></div>
                        
                        <div className="flex items-center relative mb-2">
                          <div className="rounded-full h-5 w-5 flex items-center justify-center bg-green-500 z-10">
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm">Order Created</p>
                            <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        {/* Confirmed status */}
                        <div className="flex items-center relative mb-2">
                          <div className={`rounded-full h-5 w-5 flex items-center justify-center ${
                            order.status === 'pending' ? 'bg-gray-300' : 'bg-green-500'
                          } z-10`}>
                            {order.status !== 'pending' && (
                              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm">Order Confirmed</p>
                            {order.status !== 'pending' ? (
                              <p className="text-xs text-gray-500">{new Date(order.updatedAt).toLocaleString()}</p>
                            ) : (
                              <p className="text-xs text-gray-400">Waiting for confirmation</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Processing status */}
                        <div className="flex items-center relative mb-2">
                          <div className={`rounded-full h-5 w-5 flex items-center justify-center ${
                            order.status === 'processing' || order.status === 'shipped' ? 'bg-green-500' : 'bg-gray-300'
                          } z-10`}>
                            {(order.status === 'processing' || order.status === 'shipped') && (
                              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm">Fulfillment Processing</p>
                            {order.status === 'processing' || order.status === 'shipped' ? (
                              <p className="text-xs text-gray-500">{new Date(order.updatedAt).toLocaleString()}</p>
                            ) : (
                              <p className="text-xs text-gray-400">Not started</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Shipped status */}
                        <div className="flex items-center relative">
                          <div className={`rounded-full h-5 w-5 flex items-center justify-center ${
                            order.status === 'shipped' ? 'bg-green-500' : 'bg-gray-300'
                          } z-10`}>
                            {order.status === 'shipped' && (
                              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm">Order Shipped</p>
                            {order.status === 'shipped' ? (
                              <>
                                <p className="text-xs text-gray-500">{new Date(order.updatedAt).toLocaleString()}</p>
                                <p className="text-xs font-medium text-brand-600 mt-1">Tracking: TRK-{Math.floor(Math.random() * 1000000)}</p>
                              </>
                            ) : (
                              <p className="text-xs text-gray-400">Not shipped</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Admin View */}
        <div className="panel">
          <h3 className="text-lg font-medium mb-4">Admin View</h3>
          
          <div className="guided-action">
            As an Admin, you can manage the fulfillment process. Select an order and begin fulfillment,
            then mark it as shipped once ready.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fulfillment Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <span className="font-medium">Orders to Fulfill:</span> {adminOrders.filter(o => o.status === 'confirmed').length}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Processing:</span> {adminOrders.filter(o => o.status === 'processing').length}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Shipped:</span> {adminOrders.filter(o => o.status === 'shipped').length}
                </div>
              </div>
              
              {adminOrders.length === 0 ? (
                <p className="text-gray-500 text-sm">No orders to process</p>
              ) : (
                <div className="space-y-3">
                  {adminOrders.map((order) => (
                    <Card key={order.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium">{order.product.name}</p>
                          <span className={`status-badge ${
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
                        <div className="flex space-x-2">
                          {order.status === 'confirmed' && (
                            <Button onClick={() => beginFulfillment(order.id)} className="w-full">
                              Begin Fulfillment
                            </Button>
                          )}
                          {order.status === 'processing' && (
                            <Button onClick={() => shipOrder(order.id)} className="w-full">
                              Mark as Shipped
                            </Button>
                          )}
                          {order.status === 'shipped' && (
                            <p className="text-sm text-green-600">
                              ✓ Order shipped on {new Date(order.updatedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <SectionNavigation sectionId={3} targetSectionId={4} title="Next: Understand Customer Management" />
    </section>
  );
};

export default FulfillmentSection;
