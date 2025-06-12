
import { motion } from "framer-motion";
import { Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  description: string;
  rating: number;
  students: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 overflow-hidden">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        </div>
        
        <div className="p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{product.title}</h3>
          <p className="text-gray-300 mb-4">{product.description}</p>
          
          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="ml-1 text-sm">{product.students.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-2xl font-bold text-green-400">${product.salePrice}</span>
              <span className="text-lg text-gray-400 line-through ml-2">${product.originalPrice}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              View Details
            </Button>
            <Button
              onClick={() => navigate(`/purchase/${product.id}`)}
              variant="outline"
              className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
