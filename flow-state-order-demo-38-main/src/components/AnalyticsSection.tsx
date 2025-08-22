
import { useOrder } from '@/contexts/OrderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const AnalyticsSection = () => {
  const { orders, products } = useOrder();
  
  // Calculate analytics data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  
  // Order status breakdown for pie chart
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const statusData = Object.keys(statusCounts).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: statusCounts[status]
  }));
  
  // Product popularity data for bar chart
  const productCounts = orders.reduce((acc, order) => {
    acc[order.product.name] = (acc[order.product.name] || 0) + order.quantity;
    return acc;
  }, {} as Record<string, number>);
  
  const productData = Object.keys(productCounts).map(product => ({
    name: product,
    units: productCounts[product]
  }));
  
  // Find top product
  let topProduct = 'None';
  let maxQuantity = 0;
  
  Object.keys(productCounts).forEach(product => {
    if (productCounts[product] > maxQuantity) {
      maxQuantity = productCounts[product];
      topProduct = product;
    }
  });
  
  // Colors for pie chart
  const COLORS = ['#FFBB28', '#0088FE', '#8884d8', '#00C49F'];
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Turn your operational data into actionable insights. Our system provides comprehensive reports to help you track performance.
      </p>
      
      <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded mb-4">
        Now, let's look at the bigger picture. Explore the dashboard to see how your business is performing. Hover over chart elements to see details.
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {/* Total Orders KPI */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-gray-500 uppercase">Total Orders Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{totalOrders}</div>
            <p className="text-xs text-gray-500 mt-1">
              {totalOrders > 0 ? '+' + totalOrders + ' from yesterday' : 'No change from yesterday'}
            </p>
          </CardContent>
        </Card>
        
        {/* Revenue KPI */}
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-gray-500 uppercase">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">
              {totalRevenue > 0 ? '+$' + totalRevenue.toFixed(2) + ' from yesterday' : 'No change from yesterday'}
            </p>
          </CardContent>
        </Card>
        
        {/* Top Product KPI */}
        <Card className="col-span-2 lg:col-span-1">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-gray-500 uppercase">Top Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">{topProduct}</div>
            <p className="text-xs text-gray-500 mt-1">
              {maxQuantity > 0 ? `${maxQuantity} units sold` : 'No sales yet'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Product Units Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Product Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productData.length > 0 ? productData : [{name: 'No Data', units: 0}]}
                  margin={{top: 10, right: 15, left: 10, bottom: 30}}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={40} fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="units" name="Units Sold" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Order Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Order Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData.length > 0 ? statusData : [{name: 'No Data', value: 1}]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    fontSize={10}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend fontSize={10} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsSection;
