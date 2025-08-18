import { useOrder } from "@/contexts/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "recharts";

const AnalyticsSection = () => {
  const { orders, products } = useOrder();

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  // Order status breakdown
  const statusCounts = orders.reduce((acc: Record<string, number>, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});
  const statusData =
    Object.keys(statusCounts).map((status) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: statusCounts[status],
    })) || [];
  const pieData = statusData.length > 0 ? statusData : [{ name: "No Data", value: 1 }];

  // Product popularity
  const productCounts = orders.reduce((acc: Record<string, number>, o) => {
    acc[o.product.name] = (acc[o.product.name] || 0) + o.quantity;
    return acc;
  }, {});
  const productData =
    Object.keys(productCounts).map((name) => ({ name, units: productCounts[name] })) || [];
  const barData = productData.length > 0 ? productData : [{ name: "No Data", units: 0 }];

  // Top product
  let topProduct = "None";
  let maxQuantity = 0;
  Object.keys(productCounts).forEach((p) => {
    if (productCounts[p] > maxQuantity) {
      maxQuantity = productCounts[p];
      topProduct = p;
    }
  });

  // Colors
  const COLORS = ["#FFBB28", "#0088FE", "#8884d8", "#00C49F", "#FF8042", "#A3E635"];

  return (
    <section id="section-5" className="section-container py-10 text-[11px] leading-tight">
      {/* KPIs（文字大小不变） */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-[11px] text-gray-500 uppercase">Total Orders Today</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="text-xl font-extrabold leading-none">{totalOrders}</div>
            <p className="text-[10px] text-gray-500 mt-1">
              {totalOrders > 0 ? `+${totalOrders} from yesterday` : "No change from yesterday"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-[11px] text-gray-500 uppercase">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="text-xl font-extrabold leading-none">${totalRevenue.toFixed(2)}</div>
            <p className="text-[10px] text-gray-500 mt-1">
              {totalRevenue > 0 ? `+$${totalRevenue.toFixed(2)} from yesterday` : "No change from yesterday"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-[11px] text-gray-500 uppercase">Top Product</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="text-xl font-extrabold leading-none truncate">{topProduct}</div>
            <p className="text-[10px] text-gray-500 mt-1">
              {maxQuantity > 0 ? `${maxQuantity} units sold` : "No sales yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts：只放大容器和图形，不动文字大小 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Bar */}
        <Card className="lg:col-span-1">
          <CardHeader className="py-2">
            <CardTitle className="text-xs">Product Popularity</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="h-[clamp(320px,45vh,520px)]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 12, right: 12, left: 4, bottom: 44 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    angle={-25}
                    textAnchor="end"
                    height={44}
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    wrapperStyle={{ fontSize: 10 }}
                    contentStyle={{ padding: "6px 8px" }}
                    labelStyle={{ fontSize: 10 }}
                  />
                  <Bar dataKey="units" name="Units Sold" fill="#8B5CF6" barSize={28} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie */}
        <Card className="lg:col-span-1">
          <CardHeader className="py-2">
            <CardTitle className="text-xs">Order Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="h-[clamp(320px,45vh,520px)]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={96}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    wrapperStyle={{ fontSize: 10 }}
                    contentStyle={{ padding: "6px 8px" }}
                    labelStyle={{ fontSize: 10 }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={28}
                    wrapperStyle={{ fontSize: 10, paddingTop: 0 }}
                    iconSize={8}
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
