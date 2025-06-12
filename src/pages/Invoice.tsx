import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, Mail, Calendar, CreditCard } from "lucide-react";

const products = {
  1: { title: "Crypto Investment Mastery", price: 99, courseCode: "CIM-2024" },
  2: { title: "Complete Coding Bootcamp", price: 159, courseCode: "CCB-2024" },
  3: { title: "Linux System Administration", price: 79, courseCode: "LSA-2024" }
};

const cryptoNames = {
  bitcoin: "Bitcoin (BTC)",
  ethereum: "Ethereum (ETH)",
  usdt: "Tether (USDT)",
  usdc: "USD Coin (USDC)"
};

export default function Invoice() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const email = searchParams.get("email");
  const crypto = searchParams.get("crypto");
  
  // Convert string ID to number and validate
  const productId = id ? parseInt(id, 10) : null;
  const product = productId && productId in products ? products[productId as keyof typeof products] : null;
  
  const invoiceNumber = `INV-${Date.now()}`;
  const transactionId = `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const currentDate = new Date().toLocaleDateString();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-xl text-gray-300">Your course access has been activated</p>
        </motion.div>

        {/* Invoice */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white p-8 shadow-2xl">
            {/* Invoice Header */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h2>
                  <p className="text-gray-600">Digital Mastery Academy</p>
                  <p className="text-gray-600">Premium Online Education</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">#{invoiceNumber}</p>
                  <p className="text-gray-600">{currentDate}</p>
                </div>
              </div>
            </div>

            {/* Customer & Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Purchase Date: {currentDate}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>{cryptoNames[crypto as keyof typeof cryptoNames]}</span>
                  </div>
                  <p>Transaction ID: {transactionId}</p>
                  <p className="text-green-600 font-semibold">Status: CONFIRMED</p>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{product.title}</h4>
                    <p className="text-gray-600">Course Code: {product.courseCode}</p>
                    <p className="text-gray-600">Access: Lifetime</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${product.price}.00 USD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-900">Total Paid:</span>
                <span className="text-green-600">${product.price}.00 USD</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Next Steps</h3>
              <ul className="space-y-2 text-blue-800">
                <li>✅ Course access link sent to your email</li>
                <li>✅ Login credentials created automatically</li>
                <li>✅ Welcome materials and course roadmap included</li>
                <li>✅ 24/7 support available for any questions</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.print()}
                variant="outline"
                className="flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              <Button 
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Access Course Now
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8 text-gray-300"
        >
          <p>Need help? Contact our support team 24/7</p>
          <p>Email: support@digitalmastery.com | Live Chat: Available Now</p>
        </motion.div>
      </div>
    </div>
  );
}
