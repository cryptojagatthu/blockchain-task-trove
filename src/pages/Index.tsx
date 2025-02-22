
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FallingImages from "@/components/FallingImages";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const connectWallet = () => {
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FallingImages />
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
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Monad DApp Explorer
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Complete tasks, earn rewards, and explore the Monad ecosystem
          </p>

          <div className="space-y-4">
            <Button
              size="lg"
              onClick={connectWallet}
              className="button-3d w-full sm:w-auto glass-card hover:bg-primary/20 transition-all duration-300"
            >
              <img src="/lovable-uploads/4b1e9076-1cbd-4020-a32d-79a11db4e33f.png" alt="MetaMask" className="w-6 h-6 mr-2" />
              Connect with MetaMask
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={connectWallet}
              className="button-3d w-full sm:w-auto glass-card hover:bg-primary/20 transition-all duration-300"
            >
              <img src="/lovable-uploads/bdb04786-9f42-4bf6-abe1-3419d2ed27fc.png" alt="WalletConnect" className="w-6 h-6 mr-2" />
              Connect with WalletConnect
            </Button>
          </div>
        </motion.div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[90vw] w-[1200px] h-[90vh]">
          <DialogHeader>
            <DialogTitle>Monad Testnet</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0">
            <iframe 
              src="https://testnet.monad.xyz/"
              className="w-full h-full rounded-lg"
              style={{ minHeight: "calc(90vh - 80px)" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
