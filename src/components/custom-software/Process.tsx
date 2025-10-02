import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Discovery & Strategy", desc: "Align on goals, map processes, and define scope for your custom software." },
  { n: "02", title: "Design & Architecture", desc: "Design user journeys and system architecture optimized for automation." },
  { n: "03", title: "Development & Integration", desc: "Build features and integrate software automation tools and systems." },
  { n: "04", title: "QA, Launch & Optimization", desc: "Validate, deploy, and fine-tune for performance and cost optimization." },
];

const ProcessSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Development Process</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A proven approach used by our software development company to deliver reliable custom software.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="bg-black p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <span className="block text-4xl font-bold text-yellow-400 mb-2">{s.n}</span>
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">{s.title}</h3>
              <p className="text-gray-300">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
