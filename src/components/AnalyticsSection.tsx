
import { useOrder } from '@/contexts/OrderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import SectionNavigation from './SectionNavigation';

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
    <section id="section-5" className="section-container py-16">
      <h2 className="section-title">Step 5: Make Data-Driven Decisions with Analytics</h2>
      <p className="section-description">
        Turn your operational data into actionable insights. Our system provides comprehensive reports 
        to help you track performance and identify growth opportunities.
      </p>
      
      <div className="guided-action">
        Now, let's look at the bigger picture. Explore the dashboard to see how your business is performing.
        Hover over chart elements to see details.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Orders KPI */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 uppercase">Total Orders Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalOrders}</div>
            <p className="text-sm text-gray-500 mt-1">
              {totalOrders > 0 ? '+' + totalOrders + ' from yesterday' : 'No change from yesterday'}
            </p>
          </CardContent>
        </Card>
        
        {/* Revenue KPI */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 uppercase">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-sm text-gray-500 mt-1">
              {totalRevenue > 0 ? '+$' + totalRevenue.toFixed(2) + ' from yesterday' : 'No change from yesterday'}
            </p>
          </CardContent>
        </Card>
        
        {/* Top Product KPI */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 uppercase">Top Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{topProduct}</div>
            <p className="text-sm text-gray-500 mt-1">
              {maxQuantity > 0 ? `${maxQuantity} units sold` : 'No sales yet'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Units Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Product Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productData.length > 0 ? productData : [{name: 'No Data', units: 0}]}
                  margin={{top: 20, right: 30, left: 20, bottom: 60}}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="units" name="Units Sold" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Order Status Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Order Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData.length > 0 ? statusData : [{name: 'No Data', value: 1}]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <SectionNavigation sectionId={5} targetSectionId={6} title="Next: Learn About Customization" />
    </section>
  );
};

export default AnalyticsSection;
