import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { WorkoutPlan } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-workout-plan-details',
  templateUrl: './workout-plan-details.component.html',
  styleUrls: ['./workout-plan-details.component.css']
})
export class WorkoutPlanDetailsComponent implements OnInit {

  constructor(private service: DataService, private route: ActivatedRoute) { }
  workoutProgram : WorkoutPlan
  id;
  stars = [1,2,3,4,5];
  hoverState = 0;
  latest: WorkoutPlan[];
  trending: WorkoutPlan[];
  rating;

  reviewForm = new FormGroup({
    description: new FormControl('')
  })


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.id = params['id']
      this.service.getSingleWorkoutPlan(this.id).subscribe(data => {
        this.workoutProgram = data;
      })
    })

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
    let review = {
      id: null,
      score: this.rating,
      description: this.reviewForm.value.description,
      submitter: null,
      submissionTime: null
    }

    console.log(review);
  }

}
