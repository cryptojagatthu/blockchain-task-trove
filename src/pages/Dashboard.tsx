
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Check, Clock, AlertTriangle, Trophy, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NFTReward from "@/components/NFTReward";

const Dashboard = () => {
  const [taskStatus, setTaskStatus] = useState<"pending" | "completed" | "failed">("pending");
  const [showNFT, setShowNFT] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
