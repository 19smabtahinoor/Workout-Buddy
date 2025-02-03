"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";

interface WorkoutTimerProps {
  duration: number;
  onComplete: () => void;
  isRest?: boolean;
}

export function WorkoutTimer({ duration, onComplete, isRest = false }: WorkoutTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <Card className="p-4 sm:p-6 bg-card">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-card-foreground">
            {isRest ? "Rest Time" : "Workout Time"}
          </h3>
          <p className="text-3xl sm:text-4xl font-mono text-card-foreground">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </p>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-center space-x-4">
          <Button
            variant={isRunning ? "destructive" : "default"}
            size="lg"
            onClick={toggleTimer}
            className="text-sm sm:text-base"
          >
            {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={resetTimer}
            className="text-sm sm:text-base"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}