import { motion } from "framer-motion";

const items = [
  {
    title: "Healthcare Software Solutions",
    desc: "Patient management systems, appointment booking, electronic health records, and HIPAA-compliant platforms.",
  },
  {
    title: "ERP Systems",
    desc: "Enterprise resource planning systems for inventory, finance, HR, and operations management.",
  },
  {
    title: "Customer Help Desk Platforms",
    desc: "Ticketing systems, live chat solutions, and customer support automation for enhanced service delivery.",
  },
  {
    title: "Business Automation Software",
    desc: "Workflow automation, document processing, and task management systems to reduce manual overhead.",
  },
  {
    title: "CRM & Sales Systems",
    desc: "Customer relationship management platforms like our flagship project Howkee CRM for sales optimization.",
  },
  {
    title: "Building Automation System Software",
    desc: "IoT-enabled monitoring and control systems to optimize building efficiency and energy management.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Custom Software Development Services</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            End-to-end custom software by a software company in Malaysia. We design, build, and maintain solutions that fit your unique processes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.article>
          ))}
        </div>

        {/* Past Projects Showcase */}
        <motion.div
          className="mt-16 bg-white/5 rounded-xl p-8 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Project: Howkee CRM</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 mb-4">
                Our flagship CRM system built for Malaysian businesses, featuring:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Customer lifecycle management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Sales pipeline automation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Multi-language support (English/Malay/Chinese)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Integration with Malaysian banking systems</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop" 
                alt="Howkee CRM Dashboard"
                className="rounded-lg w-full"
              />
              <button 
                onClick={() => {
                  const demoSection = document.querySelector('#demo-section');
                  demoSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors"
              >
                Try Our Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
