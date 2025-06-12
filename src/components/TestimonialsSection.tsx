
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    content: "The coding bootcamp transformed my career. I went from zero coding knowledge to landing my dream job in just 6 months!",
    rating: 5,
    avatar: "/placeholder.svg"
  },
  {
    name: "Michael Chen",
    role: "Crypto Investor",
    content: "Best investment I ever made! The crypto course helped me 10x my portfolio in under a year.",
    rating: 5,
    avatar: "/placeholder.svg"
  },
  {
    name: "Emily Davis",
    role: "System Administrator",
    content: "The Linux course is incredibly detailed. Now I'm confident managing enterprise servers.",
    rating: 5,
    avatar: "/placeholder.svg"
  }
];

export const TestimonialsSection = () => {
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
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real success stories from real students
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
