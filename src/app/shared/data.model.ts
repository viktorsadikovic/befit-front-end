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
  username: string,
  title: string,
  description: string,
  workoutType: string,
  equipment: boolean,
  bodyPart: string,
  muscleGroups: string[],
  exercises: ExerciseWrapper[],
  reviews: Review[]
}

export interface Meal {
  id: number,
  title: string,
  username: string,
  mealTypes: string[],
  dietaryType: string,
  preparationTime: number,
  cookingTime: number,
  servings: number,
  description: string,
  ingredients: string,
  preparation: string,
  reviews: Review[]
}

export interface Exercise {
  id: number,
  name: string,
  description: string,
  muscleGroup: string
}

export interface ExerciseWrapper {
  id: number,
  exercise: Exercise,
  numberOfSets: number,
  repsPerSet: number[]
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
  comments: Comment[]
}

export class TokenDto {
  value: string;

  constructor(value: string) {
      this.value = value;
  }
}
