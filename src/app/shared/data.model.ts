export interface User {
  username: string,
  name: string,
  surname: string,
  email: string,
  password: string,
  favoriteWorkoutPlans: WorkoutPlan[],
  favoriteMeals: Meal[]
}

export interface Review {
  id: number,
  score: number,
  description: string,
  submitter: User,
  submissionTime: Date,
}

export interface WorkoutPlan {
  id: number,
  creator: string,
  title: string,
  description: string,
  workoutType: string,
  equipment: boolean,
  bodyPart: string,
  muscleGroups: string[],
  exercises: ExerciseWrapper[],
  submissionTime: Date,
  image: any,
  reviews: Review[],
  favoriteForUsers: String[],
  price: number
}

export interface Meal {
  id: number,
  title: string,
  creator: string,
  mealTypes: string[],
  dietaryType: string,
  preparationTime: number,
  cookingTime: number,
  servings: number,
  description: string,
  ingredients: string,
  preparation: string,
  submissionTime: Date,
  image: any,
  reviews: Review[],
  favoriteForUsers: String[],
  price: number
}

export interface Exercise {
  id: number,
  name: string,
  image: any,
  muscleGroup: string,
  workoutType: string,
  equipment: boolean
}

export interface ExerciseWrapper {
  id: number,
  exerciseId: number,
  exercise: Exercise,
  numberOfSets: number,
  numberOfReps: number
}

export interface Comment {
  id: number,
  text: string,
  submitter: User,
  submissionTime: Date,
  rating: number
}

export interface Article {
  id: number,
  title: string,
  description: string,
  submitter: User,
  submissionTime: Date,
  views: number,
  comments: Comment[]
}

export class TokenDto {
  value: string;
  user: any;
  constructor(value: string) {
      this.value = value;
  }
}
