import { useOrder } from '@/contexts/OrderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsDemo = () => {
  const { orders, products } = useOrder();
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  const productSales = products.map(product => {
    const productOrders = orders.filter(order => order.product.id === product.id);
    const revenue = productOrders.reduce((sum, order) => sum + order.total, 0);
    return {
      name: product.name,
      orders: productOrders.length,
      revenue
    };
  }).sort((a, b) => b.revenue - a.revenue);
  
  const statusCounts: Record<string, number> = orders.reduce((acc: Record<string, number>, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <div className="p-4 space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xs text-gray-500">Total Revenue</p>
            <p className="text-lg font-bold text-yellow-400">${totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xs text-gray-500">Total Orders</p>
            <p className="text-lg font-bold text-yellow-400">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xs text-gray-500">Avg Order</p>
            <p className="text-lg font-bold text-yellow-400">${avgOrderValue.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Product Performance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-yellow-400">Top Products</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="space-y-2">
            {productSales.slice(0, 4).map((product, index) => (
              <div key={product.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">#{index + 1}</span>
                  <span className="font-medium">{product.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">${product.revenue.toFixed(2)}</p>
                  <p className="text-gray-500">{product.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Order Status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-yellow-400">Order Status</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="text-center">
                <p className="text-lg font-bold">{count}</p>
                <p className="text-xs text-gray-500 capitalize">{status}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDemo;