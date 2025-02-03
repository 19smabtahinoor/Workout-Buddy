export interface Workout {
  id: number;
  name: string;
  image: string;
  description: string;
  isCustom?: boolean;
}

export const defaultWorkouts: Workout[] = [
  {
    id: 1,
    name: "Push-ups",
    image: "https://images.unsplash.com/photo-1598971639058-999901d1a362?w=800&auto=format&fit=crop&q=60",
    description: "Classic upper body exercise targeting chest, shoulders, and triceps"
  },
  {
    id: 2,
    name: "Squats",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=60",
    description: "Lower body exercise focusing on quadriceps, hamstrings, and glutes"
  },
  {
    id: 3,
    name: "Plank",
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&auto=format&fit=crop&q=60",
    description: "Core strengthening exercise that improves stability"
  }
];