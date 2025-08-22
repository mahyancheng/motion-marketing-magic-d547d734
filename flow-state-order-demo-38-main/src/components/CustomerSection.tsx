
import { useState } from 'react';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const CustomerSection = () => {
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
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        A single view of your customer's history and preferences helps you provide better service and build lasting relationships.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Salesperson View */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Salesperson View</h4>
          
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            As a Salesperson, you can access essential customer information before your next interaction.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Customer Quick View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium mb-1">Recent Activity</p>
                  <div className="text-xs text-gray-600">
                    {orders.length > 0 ? (
                      <p>Last order placed: {new Date(orders[0].createdAt).toLocaleDateString()}</p>
                    ) : (
                      <p>No recent orders</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium mb-1">Customer Notes</p>
                  <div className="max-h-20 overflow-y-auto">
                    {customer.notes.length > 0 ? (
                      customer.notes.map(note => (
                        <div key={note.id} className="bg-gray-50 p-1 rounded mb-1 text-xs">
                          <p className="text-gray-800">{note.content}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{new Date(note.createdAt).toLocaleDateString()}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500">No notes available</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin View */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Admin View</h4>
          
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            As an Admin, you can manage detailed customer information and add notes for your sales team.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Customer Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs font-medium mb-1">Customer Name</p>
                  <Input value={customer.name} readOnly className="h-6 text-xs" />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1">Phone</p>
                  <Input value={customer.phone} readOnly className="h-6 text-xs" />
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-medium mb-1">Email</p>
                  <Input value={customer.email} readOnly className="h-6 text-xs" />
                </div>
              </div>
              
              {/* Order History */}
              <div>
                <p className="text-xs font-medium mb-1">Order History</p>
                {orders.length > 0 ? (
                  <div className="space-y-1 max-h-16 overflow-y-auto">
                    {orders.map(order => (
                      <div key={order.id} className="flex justify-between items-center p-1 bg-gray-50 rounded text-xs">
                        <div>
                          <p className="font-medium">{order.product.name} ({order.quantity})</p>
                          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p>${order.total.toFixed(2)}</p>
                          <span className={`text-xs px-1 rounded ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No order history</p>
                )}
              </div>
              
              {/* Add Note Section */}
              <div>
                <p className="text-xs font-medium mb-1">Add Customer Note</p>
                <form onSubmit={handleAddNote} className="space-y-2">
                  <Textarea 
                    placeholder="Add important details..." 
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-[60px] text-xs"
                  />
                  <Button type="submit" disabled={!noteContent.trim()} size="sm" className="w-full h-6 text-xs">
                    Add Note
                  </Button>
                </form>
              </div>
              
              {/* Notes List */}
              <div>
                <p className="text-xs font-medium mb-1">Customer Notes</p>
                <div className="max-h-16 overflow-y-auto space-y-1">
                  {customer.notes.length > 0 ? (
                    customer.notes.map(note => (
                      <div key={note.id} className="bg-gray-50 p-1 rounded text-xs">
                        <p className="text-gray-800">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{new Date(note.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">No notes available</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerSection;
