import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";



const FAQSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Custom Software FAQs</h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="q1" className="border-white/10">
            <AccordionTrigger className="hover:text-yellow-400 hover:no-underline">What are custom software development solutions?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Custom software development solutions are tailored applications built to your exact business needs—unlike off-the-shelf tools—ensuring better fit, efficiency, and ROI.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2" className="border-white/10">
            <AccordionTrigger className="hover:text-yellow-400 hover:no-underline">Are you a software development company in Malaysia?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes, we are a software company in Malaysia providing full-cycle custom software development services for local and international clients.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3" className="border-white/10">
            <AccordionTrigger className="hover:text-yellow-400 hover:no-underline">How do custom business systems improve efficiency?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              By aligning to your workflows, custom business systems reduce manual work through business automation software and software automation tools.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4" className="border-white/10">
            <AccordionTrigger className="hover:text-yellow-400 hover:no-underline">Can you integrate with existing platforms?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Absolutely. As a software provider we integrate CRMs, ERPs, and other platforms to create efficient software ecosystems.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q5" className="border-white/10">
            <AccordionTrigger className="hover:text-yellow-400 hover:no-underline">How do you approach cost optimization?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              We design for maintainability, automate where it matters, and prioritize high-impact features to optimize total cost of ownership.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
