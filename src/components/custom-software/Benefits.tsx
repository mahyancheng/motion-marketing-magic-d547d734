import { motion } from "framer-motion";

const benefits = [
  { title: "Efficiency & Cost Optimization", desc: "Reduce operational costs with efficient software tailored to your workflows." },
  { title: "Scalable Architecture", desc: "Future-proof systems that grow with your business." },
  { title: "Seamless Integrations", desc: "Connect CRMs, ERPs, and third-party platforms for a unified ecosystem." },
  { title: "Local Expertise", desc: "Work with a Malaysia-based software provider who understands your market." },
];

const BenefitsSection = () => {
  return (
    <section className="py-12 lg:py-24 bg-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Why Build Custom Software?</h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
            Unlock speed, visibility, and automation with custom software development solutions built for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">{b.title}</h3>
              <p className="text-xs text-gray-300">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
