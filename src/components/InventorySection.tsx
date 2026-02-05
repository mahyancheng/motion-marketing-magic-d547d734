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

const InventorySection = () => {
  const { products, adjustStock } = useOrder();

  const [selectedProductId, setSelectedProductId] = useState("");
  const [adjustAmount, setAdjustAmount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProductId && adjustAmount !== 0) {
      adjustStock(selectedProductId, adjustAmount);
    }
  };

  return (
    <section
      id="section-2"
      className="section-container py-1 md:py-6 text-[clamp(11px,0.8vw,13px)] leading-snug"
    >
      <div className="split-view gap-2.5 md:gap-3">
        {/* Salesperson View */}
        <div className="panel">
          <h3 className="text-[0.9em] font-medium mb-1.5">Sales View</h3>

          <div className="guided-action text-[0.9em] py-1">
            Sales see live stock levels to avoid overselling.
          </div>

          <Card>
            <CardHeader className="py-1.5">
              <CardTitle className="text-[0.95em]">Products</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1.5 max-h-[clamp(140px,26vh,240px)] overflow-y-auto pr-1">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b pb-1.5"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-[0.85em] text-gray-500">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className={[
                        "px-2 py-0.5 rounded whitespace-nowrap text-[0.85em]",
                        product.stock > 5
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800",
                      ].join(" ")}
                    >
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin View */}
        <div className="panel">
          <h3 className="text-[0.9em] font-medium mb-1.5">Admin View</h3>

          <div className="guided-action text-[0.9em] py-1">
            Adjust stock by product and quantity here.
          </div>

          <Card>
            <CardHeader className="py-1.5">
              <CardTitle className="text-[0.95em]">Inventory Control</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="space-y-1">
                  <label htmlFor="product" className="block text-[0.9em] font-medium">
                    Product
                  </label>
                  <Select onValueChange={setSelectedProductId} value={selectedProductId}>
                    <SelectTrigger className="h-[clamp(28px,2.3vw,34px)] text-[clamp(11px,0.8vw,13px)]">
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id}
                          className="text-[clamp(11px,0.8vw,13px)]"
                        >
                          {product.name} — {product.stock} in stock
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="adjust" className="block text-[0.9em] font-medium">
                    Adjust Qty
                  </label>
                  <Input
                    id="adjust"
                    type="number"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(parseInt(e.target.value, 10) || 0)}
                    className="h-[clamp(28px,2.3vw,34px)] text-[clamp(11px,0.8vw,13px)] py-0.5"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-[clamp(28px,2.3vw,34px)] text-[clamp(11px,0.8vw,13px)] text-black bg-yellow-400 hover:bg-yellow-300"
                >
                  Update Stock
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-2.5">
            <CardHeader className="py-1.5">
              <CardTitle className="text-[0.95em]">Current Inventory</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="max-h-[clamp(160px,30vh,280px)] overflow-auto pr-1">
                <table className="w-full text-left text-[clamp(11px,0.8vw,13px)]">
                  <thead>
                    <tr className="border-b">
                      <th className="py-1.5 pr-2">Product</th>
                      <th className="py-1.5 pr-2">Price</th>
                      <th className="py-1.5 pl-2 text-right">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-1.5 pr-2 truncate">{product.name}</td>
                        <td className="py-1.5 pr-2">${product.price.toFixed(2)}</td>
                        <td
                          className={[
                            "py-1.5 pl-2 text-right",
                            product.stock > 5
                              ? "text-green-600"
                              : product.stock > 0
                              ? "text-yellow-600"
                              : "text-red-600",
                          ].join(" ")}
                        >
                          {product.stock}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InventorySection;
