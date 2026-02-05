import { useOrder } from '@/contexts/OrderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
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

  const statusData = Object.keys(statusCounts).map((status) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: statusCounts[status],
  }));

  // Product popularity data for bar chart
  const productCounts = orders.reduce((acc, order) => {
    acc[order.product.name] = (acc[order.product.name] || 0) + order.quantity;
    return acc;
  }, {} as Record<string, number>);

  const productData = Object.keys(productCounts).map((product) => ({
    name: product,
    units: productCounts[product],
  }));

  // Find top product
  let topProduct = 'None';
  let maxQuantity = 0;

  Object.keys(productCounts).forEach((product) => {
    if (productCounts[product] > maxQuantity) {
      maxQuantity = productCounts[product];
      topProduct = product;
    }
  });

  // Colors for pie chart
  const COLORS = ['#FFBB28', '#0088FE', '#8884d8', '#00C49F'];

  return (
    <section
      id="section-5"
      className="section-container py-4 md:py-6 text-[clamp(11px,0.8vw,13px)] leading-snug"
    >
      <div className="guided-action text-[0.9em] mb-4">
        View key metrics at a glance. Hover charts for more details.
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-5">
        {/* Total Orders KPI */}
        <Card>
          <CardHeader className="pb-1.5 pt-2">
            <CardTitle className="text-[0.8em] text-gray-500 uppercase">
              Total Orders Today
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            <div className="text-2xl md:text-3xl font-bold">{totalOrders}</div>
            <p className="text-[0.8em] text-gray-500 mt-0.5">
              {totalOrders > 0
                ? `+${totalOrders} from yesterday`
                : 'No change from yesterday'}
            </p>
          </CardContent>
        </Card>

        {/* Revenue KPI */}
        <Card>
          <CardHeader className="pb-1.5 pt-2">
            <CardTitle className="text-[0.8em] text-gray-500 uppercase">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            <div className="text-2xl md:text-3xl font-bold">
              ${totalRevenue.toFixed(2)}
            </div>
            <p className="text-[0.8em] text-gray-500 mt-0.5">
              {totalRevenue > 0
                ? `+$${totalRevenue.toFixed(2)} from yesterday`
                : 'No change from yesterday'}
            </p>
          </CardContent>
        </Card>

        {/* Top Product KPI */}
        <Card>
          <CardHeader className="pb-1.5 pt-2">
            <CardTitle className="text-[0.8em] text-gray-500 uppercase">
              Top Product
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            <div className="text-lg md:text-2xl font-bold truncate">
              {topProduct}
            </div>
            <p className="text-[0.8em] text-gray-500 mt-0.5">
              {maxQuantity > 0 ? `${maxQuantity} units sold` : 'No sales yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        {/* Product Units Chart */}
        <Card className="lg:col-span-1">
          <CardHeader className="py-2">
            <CardTitle className="text-[0.95em]">Product Popularity</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            <div className="h-56 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productData.length > 0 ? productData : [{ name: 'No Data', units: 0 }]}
                  margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-35} textAnchor="end" height={40} />
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
          <CardHeader className="py-2">
            <CardTitle className="text-[0.95em]">Order Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-2">
            <div className="h-56 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={
                      statusData.length > 0
                        ? statusData
                        : [{ name: 'No Data', value: 1 }]
                    }
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusData.length > 0
                      ? statusData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))
                      : null}
                  </Pie>
                  <Tooltip />
                  <Legend
                    wrapperStyle={{ fontSize: '0.75rem' }}
                    iconSize={10}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AnalyticsSection;
