
import { useState } from 'react';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import SectionNavigation from './SectionNavigation';

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
    <section id="section-2" className="section-container py-16">
      <h2 className="section-title">Step 2: Always Know Your Stock with Real-Time Inventory</h2>
      <p className="section-description">
        Accurate inventory is crucial. Watch how stock levels update automatically as orders are processed, 
        preventing overselling and ensuring sales teams have the latest information.
      </p>
      
      <div className="split-view">
        {/* Salesperson View (Inventory Visibility) */}
        <div className="panel">
          <h3 className="text-lg font-medium mb-4">Salesperson View</h3>
          
          <div className="guided-action">
            As a Salesperson, you always see accurate stock levels. This helps prevent selling items 
            that aren't available.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-sm ${
                      product.stock > 5 ? 'bg-green-100 text-green-800' :
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin View (Inventory Management) */}
        <div className="panel">
          <h3 className="text-lg font-medium mb-4">Admin View</h3>
          
          <div className="guided-action">
            As an Admin, you can adjust inventory levels. Click "Adjust Stock", select a product, 
            enter a quantity, and submit.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Adjust Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="product" className="block text-sm font-medium">
                    Select Product
                  </label>
                  <Select onValueChange={setSelectedProductId} value={selectedProductId}>
                    <SelectTrigger>
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
                
                <div className="space-y-2">
                  <label htmlFor="adjust" className="block text-sm font-medium">
                    Receive Stock (positive) / Remove Stock (negative)
                  </label>
                  <Input
                    id="adjust"
                    type="number"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <Button type="submit" className="w-full text-black-400 bg-yellow-400  hover:bg-yellow-300 transition-colors">
                  Update Inventory
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Current Inventory Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2">Product</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2 text-right">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-2">{product.name}</td>
                      <td className="py-2">${product.price.toFixed(2)}</td>
                      <td className={`py-2 text-right ${
                        product.stock > 5 ? 'text-green-600' :
                        product.stock > 0 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {product.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <SectionNavigation sectionId={2} targetSectionId={3} title="Next: Discover Fulfillment Automation" />
    </section>
  );
};

export default InventorySection;
