import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { ForumComponent } from './forum/forum.component';
import { MealsGuard } from './guards/meals.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateMealComponent } from './meal/create-meal/create-meal.component';
import { MealDetailsComponent } from './meal/meal-details/meal-details.component';
import { MealComponent } from './meal/meal.component';
import { RegisterComponent } from './register/register.component';
import { CreateWorkoutPlanComponent } from './workout-plan/create-workout-plan/create-workout-plan.component';
import { WorkoutPlanDetailsComponent } from './workout-plan/workout-plan-details/workout-plan-details.component';
import { WorkoutPlanComponent } from './workout-plan/workout-plan.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'workout-plans/create-workout-plan', component: CreateWorkoutPlanComponent },
  { path: 'workout-plans/workout-details/:id', component: WorkoutPlanDetailsComponent },
  { path: 'workout-plans', component: WorkoutPlanComponent },
  { path: 'meals/create-meal', component: CreateMealComponent },
  { path: 'meals/meal-details/:id', component: MealDetailsComponent },
  { path: 'meals', component: MealComponent},
  { path: 'forum', component: ForumComponent },
  { path: 'exercise', component: AddExerciseComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
