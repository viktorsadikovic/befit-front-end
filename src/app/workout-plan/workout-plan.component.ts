import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkoutPlan } from '../shared/data.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css']
})
export class WorkoutPlanComponent implements OnInit {

  constructor(private service: DataService) { }
  wType: {[key: string]: string} = { 'Cardio' : 'CARDIO_TRAINING', 'Bodybuilding' : 'BODYBUILDING', 'Yoga' : 'YOGA',
          'Pilates' : 'PILATES', 'Zumba' : 'ZUMBA'};
  bPart: {[key: string]: string} =  { 'Full body' : 'FULL_BODY', 'Upper body' : 'UPPER_BODY', 'Lower body' : 'LOWER_BODY'};
  mGroups: {[key: string]: string} =  { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
  exercises;
  selectedWorkoutType: any;
  selectedBodyPart: any;
  selectedMuscleGroups: any;
  wTypeDisabled = false;

  workoutPrograms: WorkoutPlan[]
  totalPrograms: Number
  page: Number = 1

  workout = new FormGroup({
    username : new FormControl(null),
    equipment : new FormControl(),
    workoutType : new FormControl(null),
    bodyPart: new FormControl(null),
    muscleGroups: new FormControl(),
    sort: new FormControl()
  })

  ngOnInit(): void {
    document.getElementById('workout-nav').className = 'menu-active'
    document.getElementById('nutrition-nav').className = ''
    document.getElementById('forum-nav').className = ''
    document.getElementById('home-nav').className = ''
    document.getElementById('login-nav').className = ''

    this.service.getWorkoutPlans().subscribe(data => {
      this.workoutPrograms = data;
      this.totalPrograms = data.length
    })
  }

  onSubmit() {
    console.log(this.workout.value)
  }

  changeWorkoutType() {
    console.log(this.selectedWorkoutType)

    if(this.selectedWorkoutType === "BODYBUILDING"){
        this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
        this.bPart =  { 'Full body' : 'FULL_BODY', 'Upper body' : 'UPPER_BODY', 'Lower body' : 'LOWER_BODY'};
    } else {
      this.workout.controls.muscleGroups.reset()
      this.bPart = {'' : ''}
      this.mGroups = null
      this.workout.controls.muscleGroups.setValue(null)
      this.workout.controls.bodyPart.setValue(null)

      console.log(this.wTypeDisabled)
    }
  }


  changeBodyPart() {
    if(this.selectedBodyPart === "FULL_BODY"){
      this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
    } else if(this.selectedBodyPart === "LOWER_BODY"){
        this.mGroups = {'Legs' : 'LEGS'}
      console.log(this.wTypeDisabled)
    } else if(this.selectedBodyPart == "UPPER_BODY"){
        this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS'};
    }
  }

  changeMuscleGroup() {
    console.log(this.selectedMuscleGroups)
  }

  selectedFilter() {

  }

}
