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
    <section className="py-10 lg:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Custom Software Development Services</h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto">
            End-to-end custom software by a software company in Malaysia. We design, build, and maintain solutions that fit your unique processes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              className="bg-black p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              {/* Title，设定最小高度确保每一张卡的标题高度一致 */}
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-yellow-400 min-h-[48px]">
                {item.title}
              </h3>

              {/* Description，自动填满剩余空间，确保所有描述对齐 */}
              <p className="text-xs md:text-md text-gray-300 flex-grow">
                {item.desc}
              </p>
            </motion.article>
          ))}
        </div>


        <motion.div
          className="mt-10 bg-black p-6 rounded-xl border border-gray-800 hover:border-yellow-400 transition-colors"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-yellow-400">
            Featured Project: Howkee CRM
          </h3>

          {/* 手机：gap-4   /   平板与桌面：gap-8 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">

            {/* 左边内容 */}
            <div>
              <p className="text-sm md:text-md text-gray-300 mb-4">
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

            {/* 右边图片 */}
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
                alt="Howkee CRM Dashboard"
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
