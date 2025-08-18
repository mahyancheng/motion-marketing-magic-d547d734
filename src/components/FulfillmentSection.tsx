import { useOrder } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FulfillmentSection = () => {
  const {
    beginFulfillment,
    shipOrder,
    getOrdersForAdmin,
    getOrdersForSalesperson,
  } = useOrder();

  // admin orders（仅需要的状态）
  const adminOrders = getOrdersForAdmin().filter(
    (o) => o.status === "confirmed" || o.status === "processing" || o.status === "shipped"
  );
  // salesperson orders
  const salespersonOrders = getOrdersForSalesperson();

  return (
    <section
      id="section-3"
      className="section-container py-10 text-[12px] md:text-[13px] leading-snug"
    >
      <div className="split-view gap-4">
        {/* Salesperson View */}
        <div className="panel">
          <h3 className="text-sm md:text-[15px] font-medium mb-2">Salesperson View</h3>

          <div className="guided-action py-2">
            As a Salesperson, you can track the status of your orders as they progress through
            fulfillment. This allows you to provide accurate updates to customers.
          </div>

          <div>
            <h4 className="font-medium mb-2">My Order Status Updates</h4>
            {salespersonOrders.length === 0 ? (
              <p className="text-gray-500">No orders to display</p>
            ) : (
              // 限高稍放宽
              <div className="space-y-3 max-h-80 md:max-h-96 overflow-y-auto pr-1">
                {salespersonOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium truncate">{order.product.name}</p>
                        <span
                          className={`text-[11px] md:text-[12px] px-2 py-0.5 rounded status-badge ${
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

                      {/* Timeline：元素略放大 */}
                      <div className="mt-2 relative">
                        <div className="absolute h-full w-0.5 bg-gray-200 left-2.5 top-0" />

                        {/* Created */}
                        <div className="flex items-center relative mb-2">
                          <div className="rounded-full h-5 w-5 flex items-center justify-center bg-green-500 z-10">
                            <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="">Order Created</p>
                            <p className="text-[11px] text-gray-500">
                              {new Date(order.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Confirmed */}
                        <div className="flex items-center relative mb-2">
                          <div
                            className={`rounded-full h-5 w-5 flex items-center justify-center ${
                              order.status === "pending" ? "bg-gray-300" : "bg-green-500"
                            } z-10`}
                          >
                            {order.status !== "pending" && (
                              <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p>Order Confirmed</p>
                            {order.status !== "pending" ? (
                              <p className="text-[11px] text-gray-500">
                                {new Date(order.updatedAt).toLocaleString()}
                              </p>
                            ) : (
                              <p className="text-[11px] text-gray-400">Waiting for confirmation</p>
                            )}
                          </div>
                        </div>

                        {/* Processing */}
                        <div className="flex items-center relative mb-2">
                          <div
                            className={`rounded-full h-5 w-5 flex items-center justify-center ${
                              order.status === "processing" || order.status === "shipped"
                                ? "bg-green-500"
                                : "bg-gray-300"
                            } z-10`}
                          >
                            {(order.status === "processing" || order.status === "shipped") && (
                              <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p>Fulfillment Processing</p>
                            {order.status === "processing" || order.status === "shipped" ? (
                              <p className="text-[11px] text-gray-500">
                                {new Date(order.updatedAt).toLocaleString()}
                              </p>
                            ) : (
                              <p className="text-[11px] text-gray-400">Not started</p>
                            )}
                          </div>
                        </div>

                        {/* Shipped */}
                        <div className="flex items-center relative">
                          <div
                            className={`rounded-full h-5 w-5 flex items-center justify-center ${
                              order.status === "shipped" ? "bg-green-500" : "bg-gray-300"
                            } z-10`}
                          >
                            {order.status === "shipped" && (
                              <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p>Order Shipped</p>
                            {order.status === "shipped" ? (
                              <>
                                <p className="text-[11px] text-gray-500">
                                  {new Date(order.updatedAt).toLocaleString()}
                                </p>
                                <p className="text-[11px] font-medium text-brand-600 mt-0.5">
                                  Tracking: TRK-{Math.floor(Math.random() * 1000000)}
                                </p>
                              </>
                            ) : (
                              <p className="text-[11px] text-gray-400">Not shipped</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 操作按钮（略大） */}
                      {order.status === "confirmed" && (
                        <div className="mt-3">
                          <Button className="w-full h-9 md:h-10 text-[12px] md:text-[13px]">
                            Begin Fulfillment
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Admin View */}
        <div className="panel">
          <h3 className="text-sm md:text-[15px] font-medium mb-2">Admin View</h3>

          <div className="guided-action py-2">
            As an Admin, you can manage the fulfillment process. Select an order and begin
            fulfillment, then mark it as shipped once ready.
          </div>

          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm md:text-[15px]">Fulfillment Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {/* 头部指标更紧凑 */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <span className="font-medium">To Fulfill:</span>{" "}
                  {adminOrders.filter((o) => o.status === "confirmed").length}
                </div>
                <div>
                  <span className="font-medium">Processing:</span>{" "}
                  {adminOrders.filter((o) => o.status === "processing").length}
                </div>
                <div>
                  <span className="font-medium">Shipped:</span>{" "}
                  {adminOrders.filter((o) => o.status === "shipped").length}
                </div>
              </div>

              {adminOrders.length === 0 ? (
                <p className="text-gray-500">No orders to process</p>
              ) : (
                <div className="space-y-3 max-h-80 md:max-h-96 overflow-y-auto pr-1">
                  {adminOrders.map((order) => (
                    <Card key={order.id} className="bg-gray-50">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium truncate">{order.product.name}</p>
                          <span
                            className={`text-[11px] md:text-[12px] px-2 py-0.5 rounded status-badge ${
                              order.status === "confirmed"
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
                        <div className="flex flex-wrap gap-2">
                          {order.status === "confirmed" && (
                            <Button
                              onClick={() => beginFulfillment(order.id)}
                              className="h-9 md:h-10 text-[12px] md:text-[13px]"
                            >
                              Begin Fulfillment
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button
                              onClick={() => shipOrder(order.id)}
                              className="h-9 md:h-10 text-[12px] md:text-[13px]"
                            >
                              Mark as Shipped
                            </Button>
                          )}
                          {order.status === "shipped" && (
                            <p className="text-[12px] md:text-[13px] text-green-600">
                              ✓ Shipped on {new Date(order.updatedAt).toLocaleDateString()}
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
    </section>
  );
};

export default FulfillmentSection;
