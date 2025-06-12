import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Users, Clock, CheckCircle, Shield, CreditCard, Award } from "lucide-react";

const productDetails = {
  1: {
    title: "Crypto Investment Mastery",
    fullDescription: `Master the art of cryptocurrency investment with our comprehensive 200+ hour course. This isn't just another crypto course - it's your complete transformation into a successful crypto investor.

    Our expert-led curriculum covers everything from blockchain fundamentals to advanced trading strategies, DeFi protocols, NFT investing, and portfolio management. You'll learn from industry veterans who have collectively managed over $500M in crypto assets.

    What makes this course unique? We provide live market analysis sessions, 1-on-1 mentorship opportunities, and access to our private trading community where successful investors share insights daily. Our students have achieved an average ROI of 340% within their first year.

    Unlike expensive courses from competitors charging $2000-5000, we're offering this at 80% off for a limited time. Compare this to similar courses:
    - Coin Academy Pro: $2,999 (basic content, no mentorship)
    - Crypto Wealth Institute: $4,500 (outdated strategies)
    - Digital Asset University: $3,200 (theory-heavy, no practical application)

    Our course includes:
    ✅ 200+ hours of premium video content
    ✅ Live weekly market analysis sessions
    ✅ Private Discord community (5000+ active traders)
    ✅ 1-on-1 monthly mentorship calls
    ✅ Real-time trade alerts and signals
    ✅ Comprehensive risk management tools
    ✅ Tax optimization strategies
    ✅ Lifetime access to all updates
    ✅ 30-day money-back guarantee
    ✅ Certificate of completion
    
    Security & Trust:
    🔒 Bank-level encryption for all transactions
    🔒 SOC 2 Type II certified platform
    🔒 Trusted by 15,000+ students worldwide
    🔒 Featured in Forbes, Bloomberg, and CoinDesk
    
    Payment Options:
    💳 Secure crypto payments (BTC, ETH, USDT)
    💳 Instant access upon payment confirmation
    💳 Multi-signature wallet security`,
    price: 99,
    originalPrice: 499,
    rating: 4.9,
    students: 15420,
    duration: "200+ hours",
    modules: 45,
    language: "English",
    level: "Beginner to Advanced"
  },
  2: {
    title: "Complete Coding Bootcamp",
    fullDescription: `Transform into a full-stack developer with our comprehensive 400+ hour coding bootcamp. This intensive program has launched over 28,000 careers in tech, with 94% of graduates securing jobs within 6 months.

    Learn cutting-edge technologies including React, Node.js, Python, AWS, Docker, and MongoDB. Our curriculum is constantly updated to match industry demands, designed by senior engineers from Google, Facebook, and Amazon.

    What sets us apart? Real-world project experience, personalized career coaching, and our exclusive job placement network with 500+ partner companies. Our graduates work at top tech companies earning $80K-150K starting salaries.

    Competitor comparison:
    - Lambda School: $30,000 (income share agreement)
    - General Assembly: $15,000 (limited support)
    - Flatiron School: $17,000 (outdated curriculum)
    - App Academy: $28,000 (high-pressure environment)

    Our bootcamp includes:
    ✅ 400+ hours of hands-on coding
    ✅ 20+ real-world projects for your portfolio
    ✅ Live code reviews with senior developers
    ✅ Career coaching and interview preparation
    ✅ Job placement assistance (94% success rate)
    ✅ Access to exclusive job board
    ✅ Lifetime alumni network access
    ✅ Industry-standard development tools
    ✅ Agile/Scrum methodology training
    ✅ Technical interview mastery
    
    Technologies Covered:
    🚀 Frontend: React, Vue.js, Angular, TypeScript
    🚀 Backend: Node.js, Python, Java, C#
    🚀 Databases: MongoDB, PostgreSQL, Redis
    🚀 Cloud: AWS, Azure, Google Cloud
    🚀 DevOps: Docker, Kubernetes, CI/CD
    🚀 Testing: Jest, Cypress, TDD practices
    
    Security & Support:
    🔒 Enterprise-grade learning platform
    🔒 24/7 technical support
    🔒 Secure payment processing
    🔒 Industry partnerships for job placement`,
    price: 159,
    originalPrice: 799,
    rating: 4.8,
    students: 28350,
    duration: "400+ hours",
    modules: 65,
    language: "English",
    level: "Complete Beginner"
  },
  3: {
    title: "Linux System Administration",
    fullDescription: `Become a Linux systems expert with our comprehensive administration course. Master enterprise-level Linux management, automation, and security practices used by Fortune 500 companies.

    This course transforms beginners into confident Linux administrators capable of managing large-scale infrastructures. Learn from certified Red Hat and Ubuntu professionals with 15+ years of enterprise experience.

    Our students achieve Linux certification pass rates of 97% and secure high-paying DevOps and SysAdmin roles at companies like Netflix, Spotify, and Goldman Sachs.

    Why choose us over competitors?
    - Linux Foundation Training: $2,500 (certification only)
    - Red Hat Training: $4,000 (vendor-specific)
    - Linux Academy: $500/year (limited practical labs)
    - CBT Nuggets: $800/year (theory-focused)

    Complete curriculum includes:
    ✅ 180+ hours of practical training
    ✅ 50+ hands-on lab environments
    ✅ Real enterprise scenarios and case studies
    ✅ Automation with Ansible, Puppet, Chef
    ✅ Container orchestration (Docker, Kubernetes)
    ✅ Security hardening and compliance
    ✅ Performance monitoring and optimization
    ✅ Disaster recovery and backup strategies
    ✅ Cloud integration (AWS, Azure, GCP)
    ✅ Certification exam preparation
    
    Skills You'll Master:
    🐧 System installation and configuration
    🐧 User and group management
    🐧 File system and storage management
    🐧 Network configuration and troubleshooting
    🐧 Service management and systemd
    🐧 Shell scripting and automation
    🐧 Security implementation and monitoring
    🐧 Performance tuning and optimization
    🐧 Backup and disaster recovery
    🐧 Container and virtualization technologies
    
    Career Outcomes:
    💼 Average salary increase: 65%
    💼 Job placement rate: 89% within 3 months
    💼 Certification pass rate: 97%
    💼 Access to exclusive job opportunities`,
    price: 79,
    originalPrice: 399,
    rating: 4.7,
    students: 12780,
    duration: "180+ hours",
    modules: 38,
    language: "English",
    level: "Beginner to Expert"
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Convert string ID to number and validate
  const productId = id ? parseInt(id, 10) : null;
  const product = productId && productId in productDetails ? productDetails[productId as keyof typeof productDetails] : null;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-8 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
        >
          ← Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-8">
                <h1 className="text-4xl font-bold text-white mb-6">{product.title}</h1>
                
                <div className="flex items-center space-x-6 mb-8 text-gray-300">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span>{product.rating} ({product.students.toLocaleString()} students)</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-400 mr-1" />
                    <span>{product.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-green-400 mr-1" />
                    <span>{product.level}</span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                    {product.fullDescription}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sticky top-8"
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-6">
                <img
                  src="/placeholder.svg"
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <span className="text-3xl font-bold text-green-400">${product.price}</span>
                    <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  </div>
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
                    Limited Time: 80% OFF
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{product.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Modules:</span>
                    <span>{product.modules}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language:</span>
                    <span>{product.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span>{product.level}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Lifetime Access</span>
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>30-Day Money Back Guarantee</span>
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>Secure Crypto Payments</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate(`/purchase/${id}`)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-3"
                >
                  Enroll Now - ${product.price}
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
