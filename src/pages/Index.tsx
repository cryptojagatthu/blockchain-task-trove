
import { motion } from "framer-motion";
import { Wallet, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const connectWallet = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 opacity-20" />
      
      <div className="container mx-auto px-4 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Wallet size={64} className="mx-auto mb-6 text-primary" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Monad DApp Explorer
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Complete tasks, earn rewards, and explore the Monad ecosystem
          </p>

          <div className="space-y-4">
            <Button
              size="lg"
              onClick={connectWallet}
              className="glass-card hover:bg-primary/20 transition-all duration-300"
            >
              <img src="/metamask.svg" alt="MetaMask" className="w-6 h-6 mr-2" />
              Connect with MetaMask
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={connectWallet}
              className="glass-card hover:bg-primary/20 transition-all duration-300"
            >
              <img src="/walletconnect.svg" alt="WalletConnect" className="w-6 h-6 mr-2" />
              Connect with WalletConnect
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
