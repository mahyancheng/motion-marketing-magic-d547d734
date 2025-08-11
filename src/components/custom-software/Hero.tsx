import { motion } from "framer-motion";

interface HeroProps {
  subtitle?: string;
}

const CustomSoftwareHero = ({ subtitle }: HeroProps) => {
  return (
    <header className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center">
        <motion.div
          className="lg:w-3/5 mb-8 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Custom Software Development Solutions in <span className="text-yellow-400">Malaysia</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            We are a software development company in Malaysia delivering efficient custom software development services and custom business systems for cost optimization and growth.
          </p>
          {subtitle && (
            <p className="text-base text-gray-400 max-w-3xl">{subtitle}</p>
          )}
        </motion.div>
        <motion.div
          className="lg:w-2/5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">Why choose our software development company?</h2>
            <p className="text-gray-300">
              As a trusted software provider, we build scalable custom software and business automation software tailored to your workflows.
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default CustomSoftwareHero;
