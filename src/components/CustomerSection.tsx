import { useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const CustomerSection = () => {
  const { customer, orders, addCustomerNote } = useOrder();
  const [noteContent, setNoteContent] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent.trim()) {
      addCustomerNote(noteContent);
      setNoteContent("");
    }
  };

  return (
    <section id="section-4" className="section-container py-8 text-[10px] leading-tight">
      <div className="split-view gap-2.5">
        {/* Salesperson View */}
        <div className="panel">
          <h3 className="text-xs font-medium mb-1.5">Salesperson View</h3>

          <div className="guided-action text-[10px] py-1.5">
            As a Salesperson, you can access essential customer information before your next interaction,
            helping you provide personalized service.
          </div>

          <Card>
            <CardHeader className="py-1.5">
              <CardTitle className="text-xs">Customer Quick View</CardTitle>
            </CardHeader>
            <CardContent className="p-1.5">
              <div className="space-y-2.5">
                {/* avatar + name */}
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold text-[10px]">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{customer.name}</p>
                    <p className="text-[9px] text-gray-500 truncate">{customer.email}</p>
                  </div>
                </div>

                {/* recent activity */}
                <div>
                  <p className="text-[10px] font-medium mb-1">Recent Activity</p>
                  <div className="text-[10px] text-gray-600">
                    {orders.length > 0 ? (
                      <p>Last order: {new Date(orders[0].createdAt).toLocaleDateString()}</p>
                    ) : (
                      <p>No recent orders</p>
                    )}
                  </div>
                </div>

                {/* notes */}
                <div>
                  <p className="text-[10px] font-medium mb-1">Customer Notes</p>
                  <div className="max-h-28 overflow-y-auto pr-1" style={{ scrollbarGutter: "stable both-edges" }}>
                    {customer.notes.length > 0 ? (
                      customer.notes.map((note) => (
                        <div key={note.id} className="bg-gray-50 p-1 rounded mb-1">
                          <p className="text-[10px] text-gray-800">{note.content}</p>
                          <p className="text-[9px] text-gray-500 mt-0.5">
                            {new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-gray-500">No notes available</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin View */}
        <div className="panel">
          <h3 className="text-xs font-medium mb-1.5">Admin View</h3>

          <div className="guided-action text-[10px] py-1.5">
            As an Admin, you can manage detailed customer information, view their complete order history,
            and add notes that will be visible to your sales team.
          </div>

          <Card>
            <CardHeader className="py-1.5">
              <CardTitle className="text-xs">Customer Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 p-1.5">
              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <p className="text-[10px] font-medium mb-0.5">Customer Name</p>
                  <Input value={customer.name} readOnly className="h-7 text-[10px] py-0.5" />
                </div>
                <div>
                  <p className="text-[10px] font-medium mb-0.5">Phone</p>
                  <Input value={customer.phone} readOnly className="h-7 text-[10px] py-0.5" />
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-medium mb-0.5">Email</p>
                  <Input value={customer.email} readOnly className="h-7 text-[10px] py-0.5" />
                </div>
              </div>

              {/* Order History */}
              <div>
                <p className="text-[10px] font-medium mb-1">Order History</p>
                {orders.length > 0 ? (
                  <div className="space-y-1 max-h-28 overflow-y-auto pr-1" style={{ scrollbarGutter: "stable both-edges" }}>
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center p-1.5 bg-gray-50 rounded"
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">
                            {order.product.name} ({order.quantity})
                          </p>
                          <p className="text-[9px] text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[10px]">${order.total.toFixed(2)}</p>
                          <span
                            className={`inline-block mt-0.5 text-[9px] px-1 py-0.5 rounded status-badge ${
                              order.status === "pending"
                                ? "status-pending"
                                : order.status === "confirmed"
                                ? "status-confirmed"
                                : order.status === "processing"
                                ? "status-processing"
                                : "status-shipped"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-gray-500">No order history</p>
                )}
              </div>

              {/* Add Note */}
              <div>
                <p className="text-[10px] font-medium mb-0.5">Add Customer Note</p>
                <form onSubmit={handleAddNote} className="space-y-1.5">
                  <Textarea
                    placeholder="Add important details about the customer..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-[48px] text-[10px] py-1"
                  />
                  <Button type="submit" disabled={!noteContent.trim()} className="h-7 text-[10px]">
                    Add Note
                  </Button>
                </form>
              </div>

              {/* Notes List */}
              <div>
                <p className="text-[10px] font-medium mb-0.5">Customer Notes</p>
                <div className="max-h-28 overflow-y-auto space-y-1 pr-1" style={{ scrollbarGutter: "stable both-edges" }}>
                  {customer.notes.length > 0 ? (
                    customer.notes.map((note) => (
                      <div key={note.id} className="bg-gray-50 p-1 rounded">
                        <p className="text-[10px] text-gray-800">{note.content}</p>
                        <p className="text-[9px] text-gray-500 mt-0.5">
                          {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-gray-500">No notes available</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CustomerSection;
