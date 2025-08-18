import React from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsDemo = () => {
  const { orders, products } = useOrder();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const productSales = products
    .map((product) => {
      const productOrders = orders.filter((o) => o.product.id === product.id);
      const revenue = productOrders.reduce((s, o) => s + o.total, 0);
      return { name: product.name, orders: productOrders.length, revenue };
    })
    .sort((a, b) => b.revenue - a.revenue);

  const statusCounts: Record<string, number> = orders.reduce(
    (acc: Record<string, number>, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <div className="p-2 space-y-3 text-[11px] leading-tight">
      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <Card>
          <CardContent className="p-2 text-center">
            <p className="text-[10px] text-gray-400">Total Revenue</p>
            <p className="text-base font-extrabold text-yellow-400 leading-none">
              ${totalRevenue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 text-center">
            <p className="text-[10px] text-gray-400">Total Orders</p>
            <p className="text-base font-extrabold text-yellow-400 leading-none">
              {totalOrders}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 text-center">
            <p className="text-[10px] text-gray-400">Avg Order</p>
            <p className="text-base font-extrabold text-yellow-400 leading-none">
              ${avgOrderValue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance */}
      <Card>
        <CardHeader className="py-2">
          <CardTitle className="text-xs text-yellow-400">Top Products</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="space-y-1.5">
            {productSales.slice(0, 4).map((product, index) => (
              <div
                key={product.name}
                className="flex justify-between items-center text-[11px]"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-gray-500">#{index + 1}</span>
                  <span className="font-medium truncate">{product.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-medium leading-none">
                    ${product.revenue.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-gray-500 leading-none">
                    {product.orders} orders
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Status */}
      <Card>
        <CardHeader className="py-2">
          <CardTitle className="text-xs text-yellow-400">Order Status</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="text-center">
                <p className="text-base font-extrabold leading-none">{count}</p>
                <p className="text-[10px] text-gray-500 capitalize leading-none">
                  {status}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDemo;
  