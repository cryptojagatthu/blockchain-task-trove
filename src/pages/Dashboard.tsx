import { motion, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Check, Clock, AlertTriangle, Trophy, Star, Hourglass } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NFTReward from "@/components/NFTReward";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Dashboard = () => {
  const [taskStatus, setTaskStatus] = useState<"pending" | "completed" | "failed">("pending");
  const [showNFT, setShowNFT] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeTaken, setTimeTaken] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showIframe, setShowIframe] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 10 });

  // Enhanced mouse tracking for stage light effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX - 150, // Adjusted for larger stage light
        y: e.clientY - 150  // Adjusted for larger stage light
      });
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const startTask = () => {
    setStartTime(new Date());
    setShowIframe(true);
  };

  const checkTaskStatus = () => {
    if (startTime) {
      const endTime = new Date();
      const diff = endTime.getTime() - startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeTaken(`${minutes}m ${seconds}s`);
    }
    
    setTimeout(() => {
      setTaskStatus("completed");
      setShowNFT(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="hero-gradient absolute inset-0 opacity-10" />
      
      {/* Stage light effect with cartoon background */}
      <div 
        className="stage-light"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          backgroundPosition: `${-mousePosition.x}px ${-mousePosition.y}px`,
        }}
      />

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
            <div className="flex items-center space-x-4">
              {timeTaken && (
                <div className="text-sm text-muted-foreground">
                  Time taken: {timeTaken}
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-500" />
                <span className="text-xl font-semibold">100 XP</span>
              </div>
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
              <div className="step-item flex items-center text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  1
                </span>
                Visit Uniswap testnet
              </div>
              <div className="step-item flex items-center text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  2
                </span>
                Complete a swap transaction
              </div>
              <div className="step-item flex items-center text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  3
                </span>
                Return here to claim your reward
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {taskStatus === "pending" && (
                  <div className="hourglass">
                    <Hourglass className="text-yellow-500" />
                  </div>
                )}
                {taskStatus === "completed" && <Check className="text-green-500" />}
                {taskStatus === "failed" && <AlertTriangle className="text-red-500" />}
                <span className="capitalize">{taskStatus}</span>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={checkTaskStatus}
                  className="button-3d button-glow pulse-on-hover"
                >
                  Check Status
                </Button>
                <Button 
                  onClick={startTask}
                  className="bg-primary button-3d button-glow pulse-on-hover"
                >
                  Start Task <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {showNFT && <NFTReward />}
        </motion.div>
      </div>

      <Dialog open={showIframe} onOpenChange={setShowIframe}>
        <DialogContent className="max-w-[90vw] w-[1200px] h-[90vh]">
          <iframe 
            src="http://testnet.monad.xyz"
            className="w-full h-full rounded-lg"
            style={{ minHeight: "calc(90vh - 80px)" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
