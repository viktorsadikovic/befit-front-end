import { Component, Input, OnInit } from '@angular/core';
import { WorkoutPlan } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-workout-plan-thumbnail',
  templateUrl: './workout-plan-thumbnail.component.html',
  styleUrls: ['./workout-plan-thumbnail.component.css']
})
export class WorkoutPlanThumbnailComponent implements OnInit {

  constructor(private service: DataService) { }
  @Input() workoutPlan: WorkoutPlan;
  rating;
  stars = [1,2,3,4,5]

  ngOnInit(): void {
    this.workoutPlan.reviews?.forEach(rev => this.rating += rev.score);
      if(isNaN(this.rating)) {
        this.rating = 0;
      } else {
        this.rating = this.rating/this.workoutPlan.reviews.length;
      }


  }

}
