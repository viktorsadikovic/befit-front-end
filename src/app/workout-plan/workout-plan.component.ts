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
  selectedEquipment: any;
  selectedFilter = "None";
  wTypeDisabled = false;

  workoutPrograms: WorkoutPlan[]
  totalPrograms: Number
  page: Number = 1

  workout = new FormGroup({
    username : new FormControl(null),
    equipment : new FormControl(true),
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

    this.retrieveData(this.selectedFilter);
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
    this.retrieveData(this.selectedFilter)
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
    this.retrieveData(this.selectedFilter)
  }

  changeMuscleGroup() {
    console.log(this.workout.value)
    console.log(this.selectedMuscleGroups)
    this.retrieveData(this.selectedFilter)
  }

  changedEquipment() {
    this.retrieveData(this.selectedFilter)
  }

  selectedCriteria() {
    this.retrieveData(this.selectedFilter)
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveData(this.selectedFilter);
  }

  retrieveData(criteria) {
    const params = this.getRequestParams(this.page, 3);

    this.service.getWorkoutPlans(params, criteria)
      .subscribe(
        response => {
          const { workoutPlans, totalItems } = response;
          this.workoutPrograms = workoutPlans;
          this.totalPrograms = totalItems;
          console.log("response")
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  getRequestParams(page, pageSize) {

    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    if(this.selectedWorkoutType){
      params['workoutType'] = this.selectedWorkoutType
    }

    if (this.selectedBodyPart) {
      params[`bodyPart`] = this.selectedBodyPart;
    }

    if (this.selectedMuscleGroups) {
      params[`muscleGroups`] = this.selectedMuscleGroups;
    }

    if (this.selectedEquipment !== undefined) {
      params[`equipment`] = this.selectedEquipment;
    }

    console.log(params)

    // if (this.selectedFilter) {
    //   params[`criteria`] = this.selectedFilter;
    // }

    return params;
  }

}
