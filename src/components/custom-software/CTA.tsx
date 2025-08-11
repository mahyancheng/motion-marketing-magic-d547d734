import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-yellow-400 text-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to build custom software?</h2>
          <p className="text-lg mb-8">
            Talk to our team about your goals and get a tailored plan from a trusted software development company.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
              Schedule a Consultation
            </Link>
            <a href="#demo" className="border-2 border-black text-black px-6 py-3 rounded-md font-medium hover:bg-black hover:text-white transition-colors">
              Try Our Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
