
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";

const products = [
  {
    id: 1,
    title: "Crypto Investment Mastery",
    originalPrice: 499,
    salePrice: 99,
    discount: 80,
    image: "/placeholder.svg",
    description: "Master cryptocurrency investment strategies",
    rating: 4.9,
    students: 15420
  },
  {
    id: 2,
    title: "Complete Coding Bootcamp",
    originalPrice: 799,
    salePrice: 159,
    discount: 80,
    image: "/placeholder.svg",
    description: "Full-stack development from zero to hero",
    rating: 4.8,
    students: 28350
  },
  {
    id: 3,
    title: "Linux System Administration",
    originalPrice: 399,
    salePrice: 79,
    discount: 80,
    image: "/placeholder.svg",
    description: "Complete Linux mastery for professionals",
    rating: 4.7,
    students: 12780
  }
];

export const ProductShowcase = () => {
  return (
    <section id="products" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Premium Courses
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your career with our expertly crafted courses. Limited time 80% discount!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
