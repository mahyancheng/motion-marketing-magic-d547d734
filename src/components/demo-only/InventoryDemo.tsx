import { useState } from 'react';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const InventoryDemo = () => {
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
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Salesperson View */}
        <div>
          <h3 className="text-sm font-medium text-yellow-400 mb-3">Stock Levels</h3>
          <Card>
            <CardContent className="p-3">
              <div className="space-y-2">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="flex justify-between items-center text-xs">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      product.stock > 5 ? 'bg-green-100 text-green-800' :
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock}` : '0'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin View */}
        <div>
          <h3 className="text-sm font-medium text-yellow-400 mb-3">Adjust Stock</h3>
          <Card>
            <CardContent className="p-3">
              <form onSubmit={handleSubmit} className="space-y-3">
                <Select onValueChange={setSelectedProductId} value={selectedProductId}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id} className="text-xs">
                        {product.name} ({product.stock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Input
                  type="number"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(parseInt(e.target.value) || 0)}
                  className="text-xs"
                  placeholder="Adjust amount"
                />
                
                <Button type="submit" className="w-full text-black bg-yellow-400 hover:bg-yellow-300 text-xs">
                  Update Stock
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InventoryDemo;