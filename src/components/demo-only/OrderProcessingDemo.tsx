import { useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const OrderProcessingDemo = () => {
  const {
    products,
    createOrder,
    orders,
    confirmOrder,
    highlightedOrderId,
    getOrdersForSalesperson,
    getOrdersForAdmin,
  } = useOrder();

  const [productId, setProductId] = useState("");
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
    <div className="p-2 space-y-3 text-[11px] leading-tight">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Salesperson View */}
        <div
          className={`${
            highlightedOrderId === null ? "ring-2 ring-yellow-400" : ""
          } rounded-lg p-1`}
        >
          <h3 className="text-[11px] font-medium text-yellow-400 mb-2">
            Salesperson View
          </h3>

          <Card className="mb-2">
            <CardHeader className="py-2">
              <CardTitle className="text-xs">Create New Order</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <form onSubmit={handleSubmit} className="space-y-2">
                <Select onValueChange={setProductId} value={productId}>
                  <SelectTrigger className="h-8 text-[11px]">
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem
                        key={product.id}
                        value={product.id}
                        className="text-[11px]"
                      >
                        {product.name} - ${product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(parseInt(e.target.value, 10) || 1)
                  }
                  className="h-8 text-[11px] py-1"
                />

                <Button
                  type="submit"
                  className="w-full h-8 text-[11px] text-black bg-yellow-400 hover:bg-yellow-300"
                >
                  Submit Order
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {salespersonOrders.slice(0, 2).map((order) => (
              <Card
                key={order.id}
                className={`${
                  order.id === highlightedOrderId ? "ring-2 ring-yellow-400" : ""
                }`}
              >
                <CardContent className="p-2">
                  <div className="flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium truncate">
                        {order.product.name}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Admin View */}
        <div
          className={`${
            highlightedOrderId !== null ? "ring-2 ring-yellow-400" : ""
          } rounded-lg p-1`}
        >
          <h3 className="text-[11px] font-medium text-yellow-400 mb-2">
            Admin View
          </h3>

          <div className="space-y-2">
            {adminOrders.slice(0, 3).map((order) => (
              <Card
                key={order.id}
                className={`${
                  order.id === highlightedOrderId ? "ring-2 ring-yellow-400" : ""
                }`}
              >
                <CardContent className="p-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-[11px] font-medium truncate">
                      {order.product.name}
                    </p>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-1.5">
                    ${order.total.toFixed(2)}
                  </p>
                  {order.status === "pending" && (
                    <Button
                      onClick={() => confirmOrder(order.id)}
                      className="w-full h-8 text-[11px]"
                    >
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
