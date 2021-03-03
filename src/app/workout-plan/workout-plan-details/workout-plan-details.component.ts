import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User, WorkoutPlan } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { OauthService } from 'src/app/shared/oauth.service';

@Component({
  selector: 'app-workout-plan-details',
  templateUrl: './workout-plan-details.component.html',
  styleUrls: ['./workout-plan-details.component.css']
})
export class WorkoutPlanDetailsComponent implements OnInit {

  constructor(private service: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private oauthService: OauthService) { }
  workoutProgram : WorkoutPlan
  id;
  stars = [1,2,3,4,5];
  hoverState = 0;
  latest: WorkoutPlan[];
  trending: WorkoutPlan[];
  rating;
  userLogged;

  reviewForm = new FormGroup({
    description: new FormControl('', Validators.required)
  })

  get description() { return this.reviewForm.get('description'); }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.id = params['id']
      this.service.getSingleWorkoutPlan(this.id).subscribe(data => {
        this.workoutProgram = data;

        this.service.getLatestWorkoutPrograms(this.workoutProgram.id).subscribe(data => {
          this.latest = data;
        })

        this.service.getTrendingWorkoutPrograms(this.workoutProgram.id).subscribe(data => {
          this.trending = data;
        })
      })
    })

    this.userLogged = this.oauthService.getCurrentUser();
  }

  onStarEnter(starId: number){
    this.hoverState = starId;
  }

  onStarLeave(){
    this.hoverState = 0;
  }

  onStarClicked(starId: number){
    this.rating = starId;
  }

  onSubmit() {
    if(this.oauthService.checkUserLoggedIn()){
      let review = {
        id: null,
        score: this.rating,
        description: this.reviewForm.value.description,
        submitter: null,
        submissionTime: null
      }

      setTimeout(function() {
        window.location.reload()
      }, 3000)

      console.log(review);
      this.service.addWorkoutReviews(this.workoutProgram.id, review);
    } else {
      this.router.navigate(['/login'])
    }

  }


  isFavoriteWorkout(id) {

    if(this.oauthService.checkUserLoggedIn()){
      return this.userLogged?.favoriteWorkoutPlans.filter(elemId => elemId === id).length !== 0
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

  isCreator() {
    if(!this.oauthService.checkUserLoggedIn()) {
      return false;
    }

    return this.workoutProgram?.creator === this.oauthService.getCurrentUser().email
  }

  delete() {
    this.service.deleteWorkoutPlan(this.workoutProgram.id).subscribe(data => {
      this.router.navigate(['/workout-plans'])
    })
  }


}
