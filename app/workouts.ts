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
    name: "1-ARM SWINGS (20 Reps) ",
    image: "https://i.ibb.co.com/LXPCwMjB/image.png",
    description: "Upper body exercise focusing on shoulders, chest, and back "
  },
  {
    id: 2,
    name: "2-Side Roatation (20 Reps)",
    image: "https://i.ibb.co.com/Q3Pkyrjd/image.png",
    description: "Core exercise that improves flexibility and mobility"
  },
  {
    id: 3,
    name: "3-Side Logs (20 Reps)",
    image: "https://i.ibb.co.com/Jj5fhxx4/image.png",
    description: "Core exercise that improves flexibility and mobility"
  },
];