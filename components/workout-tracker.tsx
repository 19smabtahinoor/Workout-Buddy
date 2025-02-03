"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface WorkoutTrackerProps {
  completedWorkouts: { date: Date; name: string }[];
}

export function WorkoutTracker({ completedWorkouts }: WorkoutTrackerProps) {
  const workoutsByDate = completedWorkouts.reduce((acc, workout) => {
    const dateStr = workout.date.toDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(workout.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-card-foreground">
        Workout Calendar
      </h2>
      <Calendar
        mode="single"
        selected={new Date()}
        modifiers={{
          completed: (date) => {
            return !!workoutsByDate[date.toDateString()];
          },
        }}
        modifiersClassNames={{
          completed: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        }}
        components={{
          Day: ({ date, displayMonth, ...props }) => {
            const workouts = workoutsByDate[date.toDateString()];
            if (!workouts) {
              return <button {...props} />;
            }

            return (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button
                    {...props}
                    className={cn(
                      props.className,
                      "relative",
                      date.getMonth() === displayMonth.getMonth() && 
                      "after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary-foreground after:rounded-full"
                    )}
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">
                      Completed Workouts:
                    </p>
                    <ul className="text-sm list-disc pl-4">
                      {workouts.map((workout, index) => (
                        <li key={index}>{workout}</li>
                      ))}
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          },
        }}
        className="rounded-md border"
      />
    </Card>
  );
}