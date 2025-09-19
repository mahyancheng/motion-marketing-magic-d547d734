import { motion } from "framer-motion";

const DemoShowcase = () => {
  return (
    <section id="demo-section" className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try Our Software Demo</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experience our custom software solutions firsthand with interactive demos of our CRM, ERP, and automation systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-black p-6 rounded-xl border border-white/10 hover:border-yellow-400 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-3 text-yellow-400">Howkee CRM Demo</h3>
            <p className="text-gray-300 mb-4">
              Interactive customer relationship management system with Malaysian business features.
            </p>
            <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
              Launch CRM Demo
            </button>
          </motion.div>

          <motion.div
            className="bg-black p-6 rounded-xl border border-white/10 hover:border-yellow-400 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-3 text-yellow-400">ERP System Demo</h3>
            <p className="text-gray-300 mb-4">
              Complete enterprise resource planning solution for inventory and operations management.
            </p>
            <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
              Launch ERP Demo
            </button>
          </motion.div>

          <motion.div
            className="bg-black p-6 rounded-xl border border-white/10 hover:border-yellow-400 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-3 text-yellow-400">Help Desk Platform</h3>
            <p className="text-gray-300 mb-4">
              Customer support ticketing system with automation and live chat integration.
            </p>
            <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors">
              Launch Help Desk Demo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoShowcase;