import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Meal, WorkoutPlan } from '../shared/data.model';
import { DataService } from '../shared/data.service';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogged: SocialUser;
  isLogged: boolean;
  exercisesCount;
  workoutProgramsCount;
  mealsCount;
  usersCount;
  trendingMeals: Meal[];
  trendingWorkoutPlans: WorkoutPlan[];

  constructor(
    private authService: SocialAuthService,
    private tokenService: TokenService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    document.getElementById('home-nav').className = 'menu-active'
    document.getElementById('workout-nav').className = ''
    document.getElementById('nutrition-nav').className = ''
    document.getElementById('forum-nav').className = ''
    document.getElementById('login-nav').className = ''

    // this.authService.authState.subscribe(
    //   data => {
    //     this.userLogged = data;
    //     this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
    //   }
    // );

    this.dataService.getExercisesCount().subscribe(data => {
      this.exercisesCount = data
    })

    this.dataService.getWorkoutPlansCount().subscribe(data => {
      this.workoutProgramsCount = data.length
    })

    this.dataService.getMealsCount().subscribe(data => {
      this.mealsCount = data.length
    })

    this.dataService.getUsers().subscribe(data => {
      this.usersCount = data.length
    })

    this.dataService.getTrendingWorkoutPrograms(-1).subscribe(data => {
      this.trendingWorkoutPlans = data;
    })

    this.dataService.getTrendingMeals(-1).subscribe(data => {
      this.trendingMeals = data;
    })
  }

}
