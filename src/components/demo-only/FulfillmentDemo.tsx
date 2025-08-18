import React from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FulfillmentDemo = () => {
  const { orders, beginFulfillment, shipOrder, getOrdersByStatus } = useOrder();

  const confirmedOrders = getOrdersByStatus("confirmed");
  const processingOrders = getOrdersByStatus("processing");
  const shippedOrders = getOrdersByStatus("shipped");

  return (
    <div className="p-2 space-y-3 text-[11px] leading-tight">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Processing Queue */}
        <div>
          <h3 className="text-[11px] font-medium text-yellow-400 mb-2">
            Processing Queue
          </h3>
          <div className="space-y-2">
            {confirmedOrders.slice(0, 3).map((order) => (
              <Card key={order.id}>
                <CardContent className="p-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="font-medium truncate">{order.product.name}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-1.5">
                    Qty: {order.quantity}
                  </p>
                  <Button
                    onClick={() => beginFulfillment(order.id)}
                    className="w-full h-8 text-[11px]"
                  >
                    Start Processing
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shipping Queue */}
        <div>
          <h3 className="text-[11px] font-medium text-yellow-400 mb-2">
            Ready to Ship
          </h3>
          <div className="space-y-2">
            {processingOrders.slice(0, 3).map((order) => (
              <Card key={order.id}>
                <CardContent className="p-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="font-medium truncate">{order.product.name}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">
                      Processing
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-1.5">
                    Qty: {order.quantity}
                  </p>
                  <Button
                    onClick={() => shipOrder(order.id)}
                    className="w-full h-8 text-[11px] text-black bg-yellow-400 hover:bg-yellow-300"
                  >
                    Ship Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Shipped Orders */}
      <div>
        <h3 className="text-[11px] font-medium text-yellow-400 mb-2">
          Recently Shipped
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {shippedOrders.slice(0, 3).map((order) => (
            <Card key={order.id}>
              <CardContent className="p-2">
                <p className="font-medium truncate">{order.product.name}</p>
                <p className="text-[10px] text-gray-500">
                  Qty: {order.quantity}
                </p>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-800">
                  Shipped
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FulfillmentDemo;
