
import { motion } from "framer-motion";
import { Shield, Clock, Globe, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Crypto Payments",
    description: "Pay with Bitcoin, Ethereum, USDT, and more with military-grade security"
  },
  {
    icon: Clock,
    title: "Instant Access",
    description: "Get immediate course access after payment confirmation"
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Learn from anywhere in the world with our mobile-friendly platform"
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description: "Get help whenever you need it from our dedicated support team"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Digital Mastery?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of online learning with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
