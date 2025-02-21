
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

const NFTReward = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-card p-8 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mx-auto mb-6"
        >
          <Trophy className="w-full h-full text-yellow-500" />
        </motion.div>
        
        <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
        <p className="text-xl text-muted-foreground mb-6">
          You've earned an exclusive NFT reward
        </p>
        
        <div className="relative w-48 h-48 mx-auto mb-6">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src="/lovable-uploads/fa0c4043-55fb-4f98-ab2e-3cb5ac405d09.png"
              alt="NFT Reward"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        <div className="text-muted-foreground">
          <p>Your NFT has been minted and transferred to your wallet</p>
          <p className="text-sm mt-2">Contract: LMaoo</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default NFTReward;
