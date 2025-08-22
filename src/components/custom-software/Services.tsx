import { motion } from "motion/react";

const items = [
  {
    title: "Custom Business Systems",
    desc: "Tailored custom software to streamline operations across departments and teams.",
  },
  {
    title: "Business Automation Software",
    desc: "Automate repetitive tasks with efficient software and reduce manual overhead.",
  },
  {
    title: "Software Automation Tools",
    desc: "Integrate tools and build automation that accelerates delivery and improves accuracy.",
  },
  {
    title: "Building Automation System Software",
    desc: "Develop monitoring and control systems to optimize building efficiency.",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </section>
  );
};

export default ServicesSection;
