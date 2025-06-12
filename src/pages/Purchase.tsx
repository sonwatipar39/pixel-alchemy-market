
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CreditCard, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CryptoPayment } from "@/components/CryptoPayment";

const products = {
  1: { title: "Crypto Investment Mastery", price: 99 },
  2: { title: "Complete Coding Bootcamp", price: 159 },
  3: { title: "Linux System Administration", price: 79 }
};

export default function Purchase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [cryptoMethod, setCryptoMethod] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const productId = id ? parseInt(id, 10) : null;
  const product = productId && productId in products ? products[productId as keyof typeof products] : null;

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleInitiatePayment = () => {
    if (!email || !cryptoMethod) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    navigate(`/invoice/${id}?email=${encodeURIComponent(email)}&crypto=${cryptoMethod}`);
  };

  const handlePaymentExpired = () => {
    setShowPayment(false);
    toast({
      title: "Payment Expired",
      description: "Please start a new payment session.",
      variant: "destructive",
    });
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setShowPayment(false)}
            variant="outline"
            className="mb-8 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
          >
            ← Back to Order
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CryptoPayment
              amount={product.price}
              currency={cryptoMethod}
              onPaymentComplete={handlePaymentComplete}
              onPaymentExpired={handlePaymentExpired}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate(`/product/${id}`)}
          variant="outline"
          className="mb-8 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
        >
          ← Back to Product
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-gray-700">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                    <p className="text-gray-400">Digital Course Access</p>
                  </div>
                  <span className="text-xl font-bold text-green-400">${product.price}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Instant Access After Payment</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Lifetime Access Guarantee</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>Secure Crypto Payment</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-green-400">${product.price} USD</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Information</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="mt-2 bg-slate-700 border-gray-600 text-white"
                    required
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    We'll send your course access details to this email
                  </p>
                </div>

                <div>
                  <Label className="text-white">Cryptocurrency Payment Method</Label>
                  <Select value={cryptoMethod} onValueChange={setCryptoMethod}>
                    <SelectTrigger className="mt-2 bg-slate-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                      <SelectItem value="usdt">Tether (USDT)</SelectItem>
                      <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Payment Security</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✅ Real-time payment tracking</li>
                    <li>✅ 15-minute secure payment window</li>
                    <li>✅ QR code for easy mobile payments</li>
                    <li>✅ Instant course activation</li>
                  </ul>
                </div>

                <Button
                  onClick={handleInitiatePayment}
                  disabled={!email || !cryptoMethod}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-3"
                >
                  Proceed to Crypto Payment
                </Button>

                <div className="text-center text-sm text-gray-400">
                  <p>Secure payment processing • 15-minute payment window</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
