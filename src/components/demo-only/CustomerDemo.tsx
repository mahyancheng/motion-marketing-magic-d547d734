import { useState } from 'react';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const CustomerDemo = () => {
  const { customer, orders, addCustomerNote } = useOrder();
  const [noteContent, setNoteContent] = useState('');
  
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent.trim()) {
      addCustomerNote(noteContent);
      setNoteContent('');
    }
  };
  
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Salesperson View */}
        <div>
          <h3 className="text-sm font-medium text-yellow-400 mb-3">Customer View</h3>
          <Card>
            <CardContent className="p-3">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-xs">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium mb-1">Recent Orders</p>
                  <div className="text-xs text-gray-600">
                    {orders.length > 0 ? (
                      <p>Last: {new Date(orders[0].createdAt).toLocaleDateString()}</p>
                    ) : (
                      <p>No recent orders</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium mb-1">Notes</p>
                  <div className="max-h-20 overflow-y-auto">
                    {customer.notes.slice(0, 2).map(note => (
                      <div key={note.id} className="bg-gray-50 p-1 rounded mb-1 text-xs">
                        <p className="text-gray-800">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin View */}
        <div>
          <h3 className="text-sm font-medium text-yellow-400 mb-3">Manage Customer</h3>
          <Card>
            <CardContent className="p-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input value={customer.name} readOnly className="text-xs" />
                <Input value={customer.phone} readOnly className="text-xs" />
              </div>
              
              <div>
                <form onSubmit={handleAddNote} className="space-y-2">
                  <Textarea 
                    placeholder="Add note..." 
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-[60px] text-xs"
                  />
                  <Button type="submit" disabled={!noteContent.trim()} className="w-full text-xs">
                    Add Note
                  </Button>
                </form>
              </div>
              
              <div>
                <p className="text-xs font-medium mb-1">Order History</p>
                <div className="space-y-1 max-h-16 overflow-y-auto">
                  {orders.slice(0, 2).map(order => (
                    <div key={order.id} className="flex justify-between items-center p-1 bg-gray-50 rounded text-xs">
                      <p>{order.product.name}</p>
                      <p>${order.total.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDemo;