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

const OrderProcessingSection = () => {
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
    <section
      id="section-1"
      /* 整体更小：基础 11px，md 12px，lg 13px */
      className="section-container py-8 md:py-9 text-[11px] md:text-[12px] lg:text-[13px] leading-snug"
    >
      {/* 列间距更小 */}
      <div className="split-view gap-2.5 md:gap-3 lg:gap-4">
        {/* Salesperson View */}
        <div className={`panel ${highlightedOrderId === null ? "active-panel" : ""}`}>
          <h3 className="text-[13px] md:text-sm lg:text-[15px] font-medium mb-1.5 md:mb-2">
            Salesperson View
          </h3>

          <div className="guided-action text-[11px] md:text-[12px]">
            You're in the Salesperson view. Click "Create New Order".
          </div>

          <Card>
            {/* 头部与内容 padding 缩小 */}
            <CardHeader className="py-1.5 md:py-2">
              <CardTitle className="text-[13px] md:text-sm">Create New Order</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-2.5">
              {/* 表单间距更紧凑 */}
              <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-3">
                <div className="space-y-1.5">
                  <label htmlFor="product" className="block text-[11px] md:text-[12px] font-medium">
                    Select Product
                  </label>
                  <Select onValueChange={setProductId} value={productId}>
                    {/* 控件高度更低、字号更小 */}
                    <SelectTrigger className="h-8 md:h-9 text-[11px] md:text-[12px]">
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id}
                          className="text-[11px] md:text-[12px]"
                        >
                          {product.name} - ${product.price.toFixed(2)} ({product.stock} available)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="quantity" className="block text-[11px] md:text-[12px] font-medium">
                    Quantity
                  </label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                    className="h-8 md:h-9 text-[11px] md:text-[12px] py-0.5"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-8 md:h-9 text-[11px] md:text-[12px] text-black bg-yellow-400 hover:bg-yellow-300"
                >
                  Submit Order
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-3">
            <h4 className="font-medium mb-1.5">My Submitted Orders</h4>
            {salespersonOrders.length === 0 ? (
              <p className="text-gray-500">No orders submitted yet</p>
            ) : (
              <div
                /* 列表最大高度略降，整体更紧凑 */
                className="space-y-2 max-h-[30vh] md:max-h-[34vh] lg:max-h-[38vh] overflow-y-auto pr-1"
              >
                {salespersonOrders.map((order) => (
                  <Card
                    key={order.id}
                    className={`${order.id === highlightedOrderId ? "transition-highlight" : ""}`}
                  >
                    <CardContent className="p-2 md:p-2.5 flex justify-between items-center">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{order.product.name}</p>
                        <p className="text-[11px] md:text-[12px] text-gray-500">
                          {order.quantity} units × ${order.product.price} = ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] md:text-[11px] px-1.5 py-0.5 rounded status-badge ${
                          order.status === "pending"
                            ? "status-pending"
                            : order.status === "confirmed"
                            ? "status-confirmed"
                            : order.status === "processing"
                            ? "status-processing"
                            : "status-shipped"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Admin View */}
        <div className={`panel ${highlightedOrderId !== null ? "active-panel" : ""}`}>
          <h3 className="text-[13px] md:text-sm lg:text-[15px] font-medium mb-1.5 md:mb-2">
            Admin View
          </h3>

          <div className="guided-action text-[11px] md:text-[12px]">
            {orders.length > 0
              ? 'The order is here! Click on an order, then "Confirm Order".'
              : "Wait for a salesperson to submit an order. It will appear here instantly."}
          </div>

          <div>
            <h4 className="font-medium mb-1.5">Incoming Orders</h4>
            {adminOrders.length === 0 ? (
              <p className="text-gray-500">No orders received yet</p>
            ) : (
              <div className="space-y-2 max-h-[32vh] md:max-h-[36vh] lg:max-h-[42vh] overflow-y-auto pr-1">
                {adminOrders.map((order) => (
                  <Card
                    key={order.id}
                    className={`cursor-pointer ${
                      order.id === highlightedOrderId ? "transition-highlight" : ""
                    }`}
                  >
                    <CardContent className="p-2 md:p-2.5">
                      <div className="flex justify-between items-center mb-1.5 md:mb-2">
                        <p className="font-medium truncate">{order.product.name}</p>
                        <span
                          className={`text-[10px] md:text-[11px] px-1.5 py-0.5 rounded status-badge ${
                            order.status === "pending"
                              ? "status-pending"
                              : order.status === "confirmed"
                              ? "status-confirmed"
                              : order.status === "processing"
                              ? "status-processing"
                              : "status-shipped"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-[11px] md:text-[12px] text-gray-500 mb-2">
                        {order.quantity} units × ${order.product.price} = ${order.total.toFixed(2)}
                      </p>
                      {order.status === "pending" && (
                        <Button
                          onClick={() => confirmOrder(order.id)}
                          className="w-full h-8 md:h-9 text-[11px] md:text-[12px]"
                        >
                          Confirm Order
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderProcessingSection;
