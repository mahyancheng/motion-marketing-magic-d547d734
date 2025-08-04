
import { useState } from 'react';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import SectionNavigation from './SectionNavigation';

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
    <section id="section-4" className="section-container py-16">
      <h2 className="section-title">Step 4: Know Your Customers Better</h2>
      <p className="section-description">
        A single view of your customer's history and preferences helps you provide better service
        and build lasting relationships.
      </p>
      
      <div className="split-view">
        {/* Salesperson View */}
        <div className="panel">
          <h3 className="text-lg font-medium mb-4">Salesperson View</h3>
          
          <div className="guided-action">
            As a Salesperson, you can access essential customer information before your next interaction,
            helping you provide personalized service.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Quick View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Recent Activity</p>
                  <div className="text-sm text-gray-600">
                    {orders.length > 0 ? (
                      <p>Last order placed: {new Date(orders[0].createdAt).toLocaleDateString()}</p>
                    ) : (
                      <p>No recent orders</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Customer Notes</p>
                  <div className="max-h-40 overflow-y-auto">
                    {customer.notes.length > 0 ? (
                      customer.notes.map(note => (
                        <div key={note.id} className="bg-gray-50 p-2 rounded mb-2 text-sm">
                          <p className="text-gray-800">{note.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(note.createdAt).toLocaleString()}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No notes available</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin View */}
        <div className="panel">
          <h3 className="text-lg font-medium mb-4">Admin View</h3>
          
          <div className="guided-action">
            As an Admin, you can manage detailed customer information, view their complete order history, 
            and add notes that will be visible to your sales team.
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium mb-1">Customer Name</p>
                  <Input value={customer.name} readOnly />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Phone</p>
                  <Input value={customer.phone} readOnly />
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium mb-1">Email</p>
                  <Input value={customer.email} readOnly />
                </div>
              </div>
              
              {/* Order History */}
              <div>
                <p className="text-sm font-medium mb-2">Order History</p>
                {orders.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {orders.map(order => (
                      <div key={order.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                        <div>
                          <p className="font-medium">{order.product.name} ({order.quantity})</p>
                          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p>${order.total.toFixed(2)}</p>
                          <span className={`text-xs status-badge ${
                            order.status === 'pending' ? 'status-pending' : 
                            order.status === 'confirmed' ? 'status-confirmed' :
                            order.status === 'processing' ? 'status-processing' :
                            'status-shipped'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No order history</p>
                )}
              </div>
              
              {/* Add Note Section */}
              <div>
                <p className="text-sm font-medium mb-1">Add Customer Note</p>
                <form onSubmit={handleAddNote} className="space-y-3">
                  <Textarea 
                    placeholder="Add important details about the customer..." 
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button type="submit" disabled={!noteContent.trim()}>
                    Add Note
                  </Button>
                </form>
              </div>
              
              {/* Notes List */}
              <div>
                <p className="text-sm font-medium mb-1">Customer Notes</p>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {customer.notes.length > 0 ? (
                    customer.notes.map(note => (
                      <div key={note.id} className="bg-gray-50 p-2 rounded text-sm">
                        <p className="text-gray-800">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(note.createdAt).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No notes available</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <SectionNavigation sectionId={4} targetSectionId={5} title="Next: Dive into Analytics & Reporting" />
    </section>
    
  );
};

export default CustomerSection;
