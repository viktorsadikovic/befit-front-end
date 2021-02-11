import { Component, Input, OnInit } from '@angular/core';
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


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.id = params['id']
      this.service.getSingleWorkoutPlan(this.id).subscribe(data => {
        this.workoutProgram = data;
      })
    })

  }

}
