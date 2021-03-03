import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Meal, User, WorkoutPlan } from '../shared/data.model';
import { DataService } from '../shared/data.service';
import { OauthService } from '../shared/oauth.service';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogged: User;
  isLogged: boolean;
  exercisesCount;
  workoutProgramsCount;
  mealsCount;
  usersCount;
  trendingMeals: Meal[];
  trendingWorkoutPlans: WorkoutPlan[];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private service: DataService,
    private oauthService: OauthService
  ) { }

  ngOnInit(): void {
    document.getElementById('home-nav').className = 'menu-active'
    document.getElementById('workout-nav').className = ''
    document.getElementById('nutrition-nav').className = ''
    document.getElementById('forum-nav').className = ''
    document.getElementById('dropdown-nav').className = ''
    document.getElementById('login-nav').className = ''

    this.userLogged = this.oauthService.getCurrentUser()

    this.service.getExercisesCount().subscribe(data => {
      this.exercisesCount = data
    })

    this.service.getWorkoutPlansCount().subscribe(data => {
      this.workoutProgramsCount = data
    })

    this.service.getMealsCount().subscribe(data => {
      this.mealsCount = data
    })

    this.service.getUsers().subscribe(data => {
      this.usersCount = data
    })

    this.service.getTrendingWorkoutPrograms(-1).subscribe(data => {
      this.trendingWorkoutPlans = data;
    })

    this.service.getTrendingMeals(-1).subscribe(data => {
      this.trendingMeals = data;
    })

    console.log(this.oauthService.isLoggedIn)
  }

  isFavoriteWorkout(id) {
    if(this.oauthService.checkUserLoggedIn()){
      return this.userLogged?.favoriteWorkoutPlans?.filter(elemId => elemId === id).length !== 0
    }
    return false;
  }

  isFavoriteMeal(id) {
    if(this.oauthService.checkUserLoggedIn()){
      return this.userLogged?.favoriteMeals?.filter(elemId => elemId === id).length !== 0
    }
    return false;
  }

  addToFavoriteWorkoutPrograms(id) {
    if(this.oauthService.checkUserLoggedIn()) {

      if(this.isFavoriteWorkout(id)) {
        this.service.removeWorkoutProgramFromFavorites(id).subscribe(data => {
          this.userLogged = data;
          this.oauthService.updateUser(data)
        })
      } else {
        this.service.addWorkoutProgramToFavorites(id).subscribe(data => {
          this.userLogged = data;
          this.oauthService.updateUser(data)
        })
      }

    } else {
      this.router.navigate(['/login'])
    }
  }

  addToFavoriteMeals(id) {
    if(this.oauthService.checkUserLoggedIn()) {

      if(this.isFavoriteMeal(id)) {
        this.service.removeMealFromFavorites(id).subscribe(data => {
          this.userLogged = data;
          this.oauthService.updateUser(data)
        })
      } else {
        this.service.addMealToFavorites(id).subscribe(data => {
          this.userLogged = data;
          this.oauthService.updateUser(data)
        })
      }

    } else {
      this.router.navigate(['/login'])
    }
  }

}
