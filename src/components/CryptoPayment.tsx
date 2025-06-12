
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CryptoPaymentProps {
  amount: number;
  currency: string;
  onPaymentComplete: () => void;
  onPaymentExpired: () => void;
}

const cryptoAddresses = {
  bitcoin: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  ethereum: "0x742d35Cc6635C0532925a3b8D87EB2F13C7C4C94",
  usdt: "TQn9Y2khEsLJW1ChVWFMSMeRDow5FFDVDN",
  usdc: "0x742d35Cc6635C0532925a3b8D87EB2F13C7C4C94"
};

export const CryptoPayment = ({ 
  amount, 
  currency, 
  onPaymentComplete, 
  onPaymentExpired 
}: CryptoPaymentProps) => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'completed' | 'expired'>('pending');
  const { toast } = useToast();

  const address = cryptoAddresses[currency as keyof typeof cryptoAddresses];
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus('expired');
          onPaymentExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onPaymentExpired]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Crypto address copied to clipboard",
    });
  };

  const checkPayment = () => {
    setPaymentStatus('checking');
    // Simulate payment checking
    setTimeout(() => {
      const isPaymentReceived = Math.random() > 0.3; // 70% chance of success for demo
      if (isPaymentReceived) {
        setPaymentStatus('completed');
        onPaymentComplete();
      } else {
        setPaymentStatus('pending');
        toast({
          title: "Payment Not Found",
          description: "Please wait a moment and try again",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  if (paymentStatus === 'completed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Payment Confirmed!</h3>
        <p className="text-gray-300">Your course access is being activated...</p>
      </motion.div>
    );
  }

  if (paymentStatus === 'expired') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Payment Expired</h3>
        <p className="text-gray-300">Please start a new payment session</p>
      </motion.div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Complete Your Payment</h3>
        <div className="flex items-center justify-center text-red-400 mb-4">
          <Clock className="w-5 h-5 mr-2" />
          <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
        </div>
        <p className="text-gray-300">Send exactly <strong className="text-green-400">${amount} USD</strong> worth of {currency.toUpperCase()}</p>
      </div>

      <div className="space-y-6">
        {/* QR Code */}
        <div className="text-center">
          <div className="bg-white p-4 rounded-lg inline-block mb-4">
            <img src={qrCodeUrl} alt="Payment QR Code" className="w-48 h-48" />
          </div>
          <p className="text-sm text-gray-400">Scan with your crypto wallet</p>
        </div>

        {/* Address */}
        <div>
          <label className="text-white font-semibold block mb-2">
            {currency.toUpperCase()} Address:
          </label>
          <div className="bg-slate-700 p-3 rounded-lg flex items-center justify-between">
            <span className="text-sm text-gray-300 font-mono break-all mr-2">
              {address}
            </span>
            <Button
              onClick={copyAddress}
              variant="outline"
              size="sm"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2">Payment Instructions:</h4>
          <ol className="text-sm text-gray-300 space-y-1">
            <li>1. Copy the address above or scan the QR code</li>
            <li>2. Send exactly ${amount} USD worth of {currency.toUpperCase()}</li>
            <li>3. Click "Check Payment" after sending</li>
            <li>4. Wait for confirmation (usually 1-10 minutes)</li>
          </ol>
        </div>

        <Button
          onClick={checkPayment}
          disabled={paymentStatus === 'checking'}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {paymentStatus === 'checking' ? "Checking Payment..." : "Check Payment Status"}
        </Button>
      </div>
    </Card>
  );
};
