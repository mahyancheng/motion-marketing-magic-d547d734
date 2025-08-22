
import { useState } from 'react';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const InventorySection = () => {
  const { products, adjustStock } = useOrder();
  
  const [selectedProductId, setSelectedProductId] = useState('');
  const [adjustAmount, setAdjustAmount] = useState(1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProductId && adjustAmount !== 0) {
      adjustStock(selectedProductId, adjustAmount);
    }
  };
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Accurate inventory is crucial. Watch how stock levels update automatically as orders are processed.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Salesperson View */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Salesperson View</h4>
          
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            As a Salesperson, you always see accurate stock levels. This helps prevent selling items that aren't available.
          </div>
          
          <div>
            <h5 className="font-medium mb-2 text-sm">Available Products</h5>
            <div className="space-y-2">
              {products.map((product) => (
                <div key={product.id} className="flex justify-between items-center border border-gray-200 p-2 rounded text-sm">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    product.stock > 5 ? 'bg-green-100 text-green-800' :
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Admin View */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Admin View</h4>
          
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            As an Admin, you can adjust inventory levels. Select a product, enter a quantity, and update.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Adjust Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium">
                    Select Product
                  </label>
                  <Select onValueChange={setSelectedProductId} value={selectedProductId}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - Currently {product.stock} in stock
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="block text-xs font-medium">
                    Receive Stock (positive) / Remove Stock (negative)
                  </label>
                  <Input
                    type="number"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(parseInt(e.target.value) || 0)}
                    className="h-8 text-xs"
                  />
                </div>
                
                <Button type="submit" size="sm" className="w-full">
                  Update Inventory
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div>
            <h5 className="font-medium mb-2 text-sm">Current Inventory Levels</h5>
            <div className="text-xs">
              <div className="grid grid-cols-3 gap-2 font-medium p-2 bg-gray-50 rounded">
                <span>Product</span>
                <span>Price</span>
                <span>Stock</span>
              </div>
              {products.map((product) => (
                <div key={product.id} className="grid grid-cols-3 gap-2 p-2 border-b border-gray-100 last:border-b-0">
                  <span className="truncate">{product.name}</span>
                  <span>${product.price.toFixed(2)}</span>
                  <span className={
                    product.stock > 5 ? 'text-green-600' :
                    product.stock > 0 ? 'text-yellow-600' :
                    'text-red-600'
                  }>
                    {product.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySection;
