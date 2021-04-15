import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { ForumComponent } from './forum/forum.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateMealComponent } from './meal/create-meal/create-meal.component';
import { EditMealComponent } from './meal/edit-meal/edit-meal.component';
import { MealDetailsComponent } from './meal/meal-details/meal-details.component';
import { MealComponent } from './meal/meal.component';
import { MealsListComponent } from './meal/meals-list/meals-list.component';
import { RegisterComponent } from './register/register.component';
import { DataService } from './shared/service/data.service';
import { OauthService } from './shared/service/oauth.service';
import { CreateWorkoutPlanComponent } from './workout-plan/create-workout-plan/create-workout-plan.component';
import { EditWorkoutPlanComponent } from './workout-plan/edit-workout-plan/edit-workout-plan.component';
import { WorkoutPlanDetailsComponent } from './workout-plan/workout-plan-details/workout-plan-details.component';
import { WorkoutPlanComponent } from './workout-plan/workout-plan.component';
import { WorkoutPlansListComponent } from './workout-plan/workout-plans-list/workout-plans-list.component';

@Injectable()
export class UserAuthenticated implements CanActivate {

  constructor(private oauthService: OauthService, private router: Router){}

  canActivate() {
    if(!this.oauthService.checkUserLoggedIn()) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}

@Injectable()
export class UserAuthorized implements CanActivate {

  constructor(private oauthService: OauthService, private router: Router, private service: DataService){}

  canActivate(route: ActivatedRouteSnapshot) {
    let category = route.url[0].path
    let id = route.url[2].path

    if(category === "workout-plans") {

      this.service.getSingleWorkoutPlan(id).subscribe(data => {

        if(data.creator !== this.oauthService.getCurrentUser().email){
          this.router.navigate(['/workout-plans'])
          return false
        }
      })
    } else if (category == "meals") {

      this.service.getSingleMeal(id).subscribe(data => {
        if(data.creator !== this.oauthService.getCurrentUser().email){
          this.router.navigate(['/meals'])
          return false
        }
      })
    }

    return true
  }
}


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'workout-plans/create-workout-plan', component: CreateWorkoutPlanComponent, canActivate: [UserAuthenticated] },
  { path: 'workout-plans/edit-workout-plan/:id', component: EditWorkoutPlanComponent, canActivate: [UserAuthenticated, UserAuthorized] },
  { path: 'workout-plans/workout-details/:id', component: WorkoutPlanDetailsComponent },
  { path: 'workout-plans/:routeParam', component: WorkoutPlansListComponent, canActivate: [UserAuthenticated] },
  { path: 'workout-plans', component: WorkoutPlanComponent },
  { path: 'meals/create-meal', component: CreateMealComponent, canActivate: [UserAuthenticated] },
  { path: 'meals/edit-meal/:id', component: EditMealComponent, canActivate: [UserAuthenticated, UserAuthorized] },
  { path: 'meals/meal-details/:id', component: MealDetailsComponent },
  { path: 'meals/:routeParam', component: MealsListComponent, canActivate: [UserAuthenticated] },
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


