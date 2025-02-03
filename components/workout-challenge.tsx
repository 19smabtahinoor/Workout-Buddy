/* eslint-disable @next/next/no-img-element */
"use client";

import { defaultWorkouts, Workout } from "@/app/workouts";
import { AddWorkoutDialog } from "@/components/add-workout-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkoutTimer } from "@/components/workout-timer";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface WorkoutChallengeProps {
  onComplete: (workoutName: string) => void;
}

export function WorkoutChallenge({ onComplete }: WorkoutChallengeProps) {
  const [workouts, setWorkouts] = useState<Workout[]>(defaultWorkouts);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = workouts.length * 2 - 1;

  const isRestSlide = currentSlide % 2 === 1;
  const workoutIndex = Math.floor(currentSlide / 2);
  const isLastSlide = currentSlide === totalSlides;

  const handleAddWorkout = (newWorkout: Workout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  const handleTimerComplete = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
      if (!isRestSlide) {
        onComplete(workouts[workoutIndex].name);
      }
    }
  };

  const currentWorkout = workouts[workoutIndex];

  return (
    <div className="grid gap-6 sm:gap-8">
      {isLastSlide ? (
        <Card className="bg-card p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-card-foreground">
            Congratulations!
          </h2>
          <p className="text-muted-foreground mb-6">
            You&apos;ve completed all workouts for today!
          </p>
          <div className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mx-auto">
                  <Calendar className="mr-2 h-4 w-4" />
                  View in Calendar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Workout Complete!</DialogTitle>
                  <DialogDescription>
                    Your workout has been added to the calendar. You can view your progress in the Workout Tracker tab.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <AddWorkoutDialog
              onAddWorkout={handleAddWorkout}
              currentWorkoutId={workouts[workouts.length - 1].id}
            />
          </div>
        </Card>
      ) : !isRestSlide ? (
        <Card className="overflow-hidden bg-card">
          <div className="aspect-video relative">
            <img
              src={currentWorkout.image}
              alt={currentWorkout.name}
              className="w-full h-full object-cover"
            />
            {currentWorkout.isCustom && (
              <div className="absolute top-2 right-2">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  Custom
                </span>
              </div>
            )}
          </div>
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-card-foreground">
              {currentWorkout.name}
            </h2>
            <p className="text-muted-foreground mb-4">
              {currentWorkout.description}
            </p>
            <WorkoutTimer
              duration={20}
              onComplete={handleTimerComplete}
            />
          </div>
        </Card>
      ) : (
        <Card className="bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 text-card-foreground">
            Rest Time!
          </h2>
          <WorkoutTimer
            duration={10}
            onComplete={handleTimerComplete}
            isRest
          />
        </Card>
      )}

      <div className="flex justify-between items-center px-2">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          className="p-2 rounded-full hover:bg-accent transition-colors disabled:opacity-50"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="text-center">
          <p className="text-base sm:text-lg font-semibold text-foreground">
            Workout {workoutIndex + 1} of {workouts.length}
          </p>
          <p className="text-sm text-muted-foreground">
            {isRestSlide ? "Rest Period" : "Exercise Period"}
          </p>
        </div>
        <button
          onClick={() => setCurrentSlide(Math.min(totalSlides, currentSlide + 1))}
          className="p-2 rounded-full hover:bg-accent transition-colors disabled:opacity-50"
          disabled={currentSlide === totalSlides}
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
}