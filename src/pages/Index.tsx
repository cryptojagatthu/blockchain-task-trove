
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import FallingImages from "@/components/FallingImages";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navigate = useNavigate();

  // Smooth spring animation for the orb
  const springX = useSpring(mouseX, { stiffness: 50, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 10 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update motion values based on mouse position
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - 100); // Offset from top
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const connectWallet = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FallingImages />
      <div className="hero-gradient absolute inset-0 opacity-20" />
      
      {/* Animated Orb */}
      <motion.div
        className="absolute left-1/2 top-[100px] w-[150px] h-[150px] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.5) 0%, rgba(76, 29, 149, 0) 70%)",
          filter: "blur(20px)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, rgba(76, 29, 149, 0) 70%)",
            filter: "blur(15px)",
          }}
        />
      </motion.div>
      
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
            <DialogDescription>
              Explore and interact with the Monad testnet
            </DialogDescription>
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
