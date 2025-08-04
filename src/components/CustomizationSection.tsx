
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const CustomizationSection = () => {
  return (
    <section id="section-6" className="section-container py-16">
      <h2 className="section-title">Your Business, Your Way: Fully Customizable Workflows</h2>
      <p className="section-description">
        This Order Management System is a powerful example, but the real strength lies in our ability to tailor 
        every aspect to your unique business processes. We don't believe in one-size-fits-all.
      </p>
      
      <div className="space-y-10">
        {/* Basic Workflow */}
        <div>
          <h3 className="text-xl font-semibold mb-3">The Demo Workflow You Experienced</h3>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                {['Order Entry', 'Admin Confirmation', 'Inventory Update', 'Fulfillment', 'Shipped'].map((step, i, arr) => (
                  <div key={step} className="flex items-center">
                    <div className="bg-brand-100 text-brand-800 px-4 py-2 rounded-lg text-center">
                      {step}
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight className="mx-2 text-gray-400 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Example Alternative Workflows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* B2B Example */}
          <div>
            <h3 className="text-xl font-semibold mb-3">B2B with Approvals Example</h3>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    'Quote Request',
                    'Sales Manager Approval',
                    'Order Conversion',
                    'Credit Check',
                    'Tiered Pricing Application',
                    'Fulfillment'
                  ].map((step, i) => (
                    <div key={step} className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center font-medium mr-3">
                        {i + 1}
                      </div>
                      <div className="bg-gray-50 flex-1 p-3 rounded-lg">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Service-Based Example */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Service-Based Business Example</h3>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    'Service Booking',
                    'Technician Assignment',
                    'Resource Scheduling',
                    'Service Completion',
                    'Automated Invoice',
                    'Feedback Request'
                  ].map((step, i) => (
                    <div key={step} className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center font-medium mr-3">
                        {i + 1}
                      </div>
                      <div className="bg-gray-50 flex-1 p-3 rounded-lg">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Key Message */}
        <div className="bg-brand-50 border border-brand-200 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-brand-600 mb-3">Why Custom Software?</h3>
          <p className="text-gray-300 mb-4">
            Whether you need different approval stages, integration with specific third-party tools 
            (like your accounting software or unique shipping carriers), complex pricing rules, or entirely 
            different modules, we build software that works precisely the way you do.
          </p>
          <p className="text-gray-300">
            Your business is unique, and your software should be too. Stop adapting your workflows to fit 
            rigid off-the-shelf solutions.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Build Your Perfect Software Solution?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            You've experienced a glimpse of what's possible. This Order Management System is just 
            one application of our custom software development expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="font-medium">
              Schedule a Free Consultation
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 font-medium">
              Tell Us About Your Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection;
