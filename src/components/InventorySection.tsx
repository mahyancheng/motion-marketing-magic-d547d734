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
    <section id="section-2" className="section-container py-8 text-[10px] leading-tight">
      <div className="split-view gap-2.5">
        {/* Salesperson View (Inventory Visibility) */}
        <div className="panel">
          <h3 className="text-xs font-medium mb-1.5">Salesperson View</h3>

          <div className="guided-action text-[10px] py-1.5">
            As a Salesperson, you always see accurate stock levels. This helps prevent selling items
            that aren't available.
          </div>

          <Card>
            <CardHeader className="py-1.5">
              <CardTitle className="text-xs">Available Products</CardTitle>
            </CardHeader>
            <CardContent className="p-1.5">
              {/* 再次限高，避免撑版面 */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b pb-1"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-[9px] text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                    <div
                      className={`text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap ${
                        product.stock > 5
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin View (Inventory Management) */}
        <div className="panel">
          <h3 className="text-xs font-medium mb-1.5">Admin View</h3>

          <div className="guided-action text-[10px] py-1.5">
            As an Admin, you can adjust inventory levels. Click "Adjust Stock", select a product,
            enter a quantity, and submit.
          </div>

          <Card>
            <CardHeader className="py-1.5">
              <CardTitle className="text-xs">Adjust Inventory</CardTitle>
            </CardHeader>
            <CardContent className="p-1.5">
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="space-y-1">
                  <label htmlFor="product" className="block text-[10px] font-medium">
                    Select Product
                  </label>
                  <Select onValueChange={setSelectedProductId} value={selectedProductId}>
                    <SelectTrigger className="h-7 text-[10px]">
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id} className="text-[10px]">
                          {product.name} — Currently {product.stock} in stock
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="adjust" className="block text-[10px] font-medium">
                    Receive Stock (positive) / Remove Stock (negative)
                  </label>
                  <Input
                    id="adjust"
                    type="number"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(parseInt(e.target.value, 10) || 0)}
                    className="h-7 text-[10px] py-0.5"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-7 text-[10px] text-black bg-yellow-400 hover:bg-yellow-300 transition-colors"
                >
                  Update Inventory
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-2">
            <CardHeader className="py-1.5">
              <CardTitle className="text-xs">Current Inventory Levels</CardTitle>
            </CardHeader>
            <CardContent className="p-1.5">
              {/* 表格更紧凑 */}
              <div className="max-h-56 overflow-auto pr-1">
                <table className="w-full text-left text-[10px]">
                  <thead>
                    <tr className="border-b">
                      <th className="py-1 pr-2">Product</th>
                      <th className="py-1 pr-2">Price</th>
                      <th className="py-1 pl-2 text-right">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-0.5 pr-2 truncate">{product.name}</td>
                        <td className="py-0.5 pr-2">${product.price.toFixed(2)}</td>
                        <td
                          className={`py-0.5 pl-2 text-right ${
                            product.stock > 5
                              ? "text-green-600"
                              : product.stock > 0
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
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
