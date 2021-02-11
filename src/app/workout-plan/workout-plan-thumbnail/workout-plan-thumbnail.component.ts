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

  ngOnInit(): void {
    if( this.workoutPlan.reviews != null) {
      this.workoutPlan.reviews.forEach(rev => this.rating += rev.score);
      this.rating = this.rating / this.workoutPlan.reviews.length;
    } else {
      this.rating = 0;
    }


  }

}
