
import { motion } from "framer-motion";
import { ExternalLink, Check, Clock, AlertTriangle, Trophy, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NFTReward from "@/components/NFTReward";

const Dashboard = () => {
  const [taskStatus, setTaskStatus] = useState<"pending" | "completed" | "failed">("pending");
  const [showNFT, setShowNFT] = useState(false);

  const checkTaskStatus = () => {
    // Simulate checking task status
    setTimeout(() => {
      setTaskStatus("completed");
      setShowNFT(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="hero-gradient absolute inset-0 opacity-10" />
      
      <div className="container mx-auto px-4 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Task Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-500" />
              <span className="text-xl font-semibold">100 XP</span>
            </div>
          </div>

          <Card className="glass-card p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="px-2 py-1 rounded bg-primary/20 text-primary text-sm mb-2 inline-block">
                  New Task
                </span>
                <h2 className="text-2xl font-semibold mb-2">Uniswap Integration</h2>
                <p className="text-muted-foreground mb-4">
                  Complete a swap on Uniswap testnet to earn rewards
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Reward</div>
                <div className="text-xl font-semibold">50 XP</div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  1
                </span>
                Visit Uniswap testnet
              </div>
              <div className="flex items-center text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  2
                </span>
                Complete a swap transaction
              </div>
              <div className="flex items-center text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  3
                </span>
                Return here to claim your reward
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {taskStatus === "pending" && <Clock className="text-yellow-500" />}
                {taskStatus === "completed" && <Check className="text-green-500" />}
                {taskStatus === "failed" && <AlertTriangle className="text-red-500" />}
                <span className="capitalize">{taskStatus}</span>
              </div>
              
              <div className="flex space-x-4">
                <Button variant="outline" onClick={checkTaskStatus}>
                  Check Status
                </Button>
                <Button 
                  onClick={() => window.open("http://testnet.monad.xyz", "_blank")}
                  className="bg-primary"
                >
                  Start Task <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {showNFT && <NFTReward />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
