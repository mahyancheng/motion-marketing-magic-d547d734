// FulfillmentSection.tsx
import { useEffect, useRef, type ReactNode } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** 外层统一缩放，默认 0.8（= 缩小 20%） */
function ScaledBox({
  children,
  scale = 0.8,
}: {
  children: ReactNode;
  scale?: number;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const inner = innerRef.current;
    if (!shell || !inner) return;

    const apply = () => {
      const h = inner.offsetHeight || 0;
      // 外壳高度设置为“缩放后高度”，避免被外层裁切
      shell.style.height = `${h * scale}px`;
      shell.style.overflow = "hidden"; // 防止横向侧滚
      shell.style.position = "relative";
      shell.style.width = "100%";
    };

    const ro = new ResizeObserver(apply);
    ro.observe(inner);
    apply();

    const onResize = () => apply();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [scale]);

  return (
    <div ref={shellRef} className="w-full">
      <div
        ref={innerRef}
        className="min-w-0"
        style={{
          // 让视觉上缩小，但仍占满容器宽度
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${100 / scale}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const FulfillmentSection = () => {
  const {
    beginFulfillment,
    shipOrder,
    getOrdersForAdmin,
    getOrdersForSalesperson,
  } = useOrder();

  // admin orders（仅需要的状态）
  const adminOrders = getOrdersForAdmin().filter(
    (o) =>
      o.status === "confirmed" ||
      o.status === "processing" ||
      o.status === "shipped"
  );
  // salesperson orders
  const salespersonOrders = getOrdersForSalesperson();

  return (
    <section
      id="section-3"
      className="section-container py-8 text-[11px] md:text-[12px] leading-snug"
    >
      {/* ✅ 统一缩小 20% */}
      <ScaledBox scale={0.8}>
        <div className="split-view gap-3">
          {/* Salesperson View */}
          <div className="panel">
            <h3 className="text-xs md:text-sm font-medium mb-1.5">
              Salesperson View
            </h3>

            <div className="guided-action py-1.5">
              As a Salesperson, you can track the status of your orders as they
              progress through fulfillment. This allows you to provide accurate
              updates to customers.
            </div>

            <div>
              <h4 className="font-medium mb-1.5">My Order Status Updates</h4>
              {salespersonOrders.length === 0 ? (
                <p className="text-gray-500">No orders to display</p>
              ) : (
                <div className="space-y-2.5 max-h-72 md:max-h-80 overflow-y-auto pr-1">
                  {salespersonOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-2.5">
                        <div className="flex justify-between items-center mb-1.5">
                          <p className="font-medium truncate">
                            {order.product.name}
                          </p>
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
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-[10px] md:text-[11px] text-gray-500 mb-1.5">
                          {order.quantity} units × ${order.product.price} = $
                          {order.total.toFixed(2)}
                        </p>

                        {/* Timeline */}
                        <div className="mt-1.5 relative">
                          <div className="absolute h-full w-0.5 bg-gray-200 left-2 top-0" />

                          {/* Created */}
                          <div className="flex items-center relative mb-1.5">
                            <div className="rounded-full h-4 w-4 flex items-center justify-center bg-green-500 z-10">
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-2.5">
                              <p>Order Created</p>
                              <p className="text-[10px] text-gray-500">
                                {new Date(order.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Confirmed */}
                          <div className="flex items-center relative mb-1.5">
                            <div
                              className={`rounded-full h-4 w-4 flex items-center justify-center ${
                                order.status === "pending"
                                  ? "bg-gray-300"
                                  : "bg-green-500"
                              } z-10`}
                            >
                              {order.status !== "pending" && (
                                <svg
                                  className="h-2.5 w-2.5 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="ml-2.5">
                              <p>Order Confirmed</p>
                              {order.status !== "pending" ? (
                                <p className="text-[10px] text-gray-500">
                                  {new Date(order.updatedAt).toLocaleString()}
                                </p>
                              ) : (
                                <p className="text-[10px] text-gray-400">
                                  Waiting for confirmation
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Processing */}
                          <div className="flex items-center relative mb-1.5">
                            <div
                              className={`rounded-full h-4 w-4 flex items-center justify-center ${
                                order.status === "processing" ||
                                order.status === "shipped"
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              } z-10`}
                            >
                              {(order.status === "processing" ||
                                order.status === "shipped") && (
                                <svg
                                  className="h-2.5 w-2.5 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="ml-2.5">
                              <p>Fulfillment Processing</p>
                              {order.status === "processing" ||
                              order.status === "shipped" ? (
                                <p className="text-[10px] text-gray-500">
                                  {new Date(order.updatedAt).toLocaleString()}
                                </p>
                              ) : (
                                <p className="text-[10px] text-gray-400">
                                  Not started
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Shipped */}
                          <div className="flex items-center relative">
                            <div
                              className={`rounded-full h-4 w-4 flex items-center justify-center ${
                                order.status === "shipped"
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              } z-10`}
                            >
                              {order.status === "shipped" && (
                                <svg
                                  className="h-2.5 w-2.5 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="ml-2.5">
                              <p>Order Shipped</p>
                              {order.status === "shipped" ? (
                                <>
                                  <p className="text-[10px] text-gray-500">
                                    {new Date(order.updatedAt).toLocaleString()}
                                  </p>
                                  <p className="text-[10px] font-medium text-brand-600 mt-0.5">
                                    Tracking: TRK-
                                    {Math.floor(Math.random() * 1000000)}
                                  </p>
                                </>
                              ) : (
                                <p className="text-[10px] text-gray-400">
                                  Not shipped
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 操作按钮 */}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Admin View */}
          <div className="panel">
            <h3 className="text-xs md:text-sm font-medium mb-1.5">Admin View</h3>

            <div className="guided-action py-1.5">
              As an Admin, you can manage the fulfillment process. Select an
              order and begin fulfillment, then mark it as shipped once ready.
            </div>

            <Card>
              <CardHeader className="py-1.5">
                <CardTitle className="text-xs md:text-sm">
                  Fulfillment Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2.5">
                {/* 头部指标更紧凑 */}
                <div className="grid grid-cols-3 gap-2 mb-2.5">
                  <div>
                    <span className="font-medium">To Fulfill:</span>{" "}
                    {
                      adminOrders.filter((o) => o.status === "confirmed")
                        .length
                    }
                  </div>
                  <div>
                    <span className="font-medium">Processing:</span>{" "}
                    {
                      adminOrders.filter((o) => o.status === "processing")
                        .length
                    }
                  </div>
                  <div>
                    <span className="font-medium">Shipped:</span>{" "}
                    {
                      adminOrders.filter((o) => o.status === "shipped").length
                    }
                  </div>
                </div>

                {adminOrders.length === 0 ? (
                  <p className="text-gray-500">No orders to process</p>
                ) : (
                  <div className="space-y-2.5 max-h-72 md:max-h-80 overflow-y-auto pr-1">
                    {adminOrders.map((order) => (
                      <Card key={order.id} className="bg-gray-50">
                        <CardContent className="p-2.5">
                          <div className="flex justify-between items-center mb-1.5">
                            <p className="font-medium truncate">
                              {order.product.name}
                            </p>
                            <span
                              className={`text-[10px] md:text-[11px] px-1.5 py-0.5 rounded status-badge ${
                                order.status === "confirmed"
                                  ? "status-confirmed"
                                  : order.status === "processing"
                                  ? "status-processing"
                                  : "status-shipped"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-[10px] md:text-[11px] text-gray-500 mb-1.5">
                            {order.quantity} units × ${order.product.price} = $
                            {order.total.toFixed(2)}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {order.status === "confirmed" && (
                              <Button
                                onClick={() => beginFulfillment(order.id)}
                                className="h-8 md:h-9 text-[11px] md:text-[12px]"
                              >
                                Begin Fulfillment
                              </Button>
                            )}
                            {order.status === "processing" && (
                              <Button
                                onClick={() => shipOrder(order.id)}
                                className="h-8 md:h-9 text-[11px] md:text-[12px]"
                              >
                                Mark as Shipped
                              </Button>
                            )}
                            {order.status === "shipped" && (
                              <p className="text-[11px] md:text-[12px] text-green-600">
                                ✓ Shipped on{" "}
                                {new Date(
                                  order.updatedAt
                                ).toLocaleDateString()}
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
      </ScaledBox>
    </section>
  );
};

export default FulfillmentSection;
