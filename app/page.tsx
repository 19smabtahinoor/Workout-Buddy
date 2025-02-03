'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkoutChallenge } from '@/components/workout-challenge';
import { WorkoutTracker } from '@/components/workout-tracker';
import { useState } from 'react';

export default function Home() {
  const [completedWorkouts, setCompletedWorkouts] = useState<
    { date: Date; name: string; }[]
  >([]);

  const handleWorkoutComplete = (workoutName: string) => {
    setCompletedWorkouts([
      ...completedWorkouts,
      { date: new Date(), name: workoutName },
    ]);
  };

  return (
    <main className="min-h-screen bg-background transition-colors">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-foreground">
          Workout Buddy
        </h1>

        <Tabs defaultValue="challenge" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="challenge">Workout Challenge</TabsTrigger>
            <TabsTrigger value="tracker">Workout Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="challenge" className="space-y-4">
            <WorkoutChallenge onComplete={handleWorkoutComplete} />
          </TabsContent>

          <TabsContent value="tracker" className="space-y-4">
            <WorkoutTracker completedWorkouts={completedWorkouts} />
          </TabsContent>
        </Tabs>
      </div>

      <p className="text-center py-8">
        Made with ❤️ by{' '}
        <a
          href="https://github.com/19smabtahinoor"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400"
        >
          S.M.Abtahi Noor
        </a>
      </p>
    </main>
  );
}
