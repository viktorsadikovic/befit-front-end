import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkoutPlan } from '../shared/data.model';
import { DataService } from '../shared/service/data.service';
import { OauthService } from '../shared/service/oauth.service';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css']
})
export class WorkoutPlanComponent implements OnInit {

  constructor(private service: DataService,
              private oauthService: OauthService) { }
  wType: {[key: string]: string} = { 'Cardio' : 'CARDIO_TRAINING', 'Bodybuilding' : 'BODYBUILDING', 'Yoga' : 'YOGA',
          'Pilates' : 'PILATES', 'Zumba' : 'ZUMBA'};
  bPart: {[key: string]: string} =  { 'Full body' : 'FULL_BODY', 'Upper body' : 'UPPER_BODY', 'Lower body' : 'LOWER_BODY'};
  mGroups: {[key: string]: string} =  { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
  exercises;
  selectedWorkoutType = 'ALL';
  selectedBodyPart = 'ALL';
  selectedMuscleGroups: any;
  selectedEquipment: any;
  criteria = "None";
  wTypeDisabled = false;
  searchTerm = '';

  workoutPrograms: WorkoutPlan[]
  totalPrograms: Number
  page: Number = 1

  workout = new FormGroup({
    username : new FormControl(null),
    equipment : new FormControl(true),
    workoutType : new FormControl('ALL'),
    bodyPart: new FormControl('ALL'),
    muscleGroups: new FormControl(),
    sort: new FormControl()
  })

  ngOnInit(): void {
    document.getElementById('workout-nav').className = 'menu-active'
    document.getElementById('nutrition-nav').className = ''
    document.getElementById('forum-nav').className = ''
    document.getElementById('home-nav').className = ''
    document.getElementById('dropdown-nav').className = ''
    document.getElementById('login-nav').className = ''

    this.retrieveData(this.criteria);
  }

  changeWorkoutType() {
    if(this.selectedWorkoutType === "BODYBUILDING"){
        this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
        this.bPart =  { 'Full body' : 'FULL_BODY', 'Upper body' : 'UPPER_BODY', 'Lower body' : 'LOWER_BODY'};
    } else {
      this.workout.controls.muscleGroups.reset()
      this.bPart = {'' : ''}
      this.mGroups = null
      this.workout.controls.muscleGroups.setValue(null)
      this.workout.controls.bodyPart.setValue(null)
    }
    this.retrieveData(this.criteria);
  }


  changeBodyPart() {
    if(this.selectedBodyPart === "FULL_BODY"){
      this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
    } else if(this.selectedBodyPart === "LOWER_BODY"){
        this.mGroups = {'Legs' : 'LEGS'}
    } else if(this.selectedBodyPart == "UPPER_BODY"){
        this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS'};
    }
    this.retrieveData(this.criteria);
  }

  changeMuscleGroup() {
    this.retrieveData(this.criteria);
  }

  changedEquipment() {
    this.retrieveData(this.criteria);
  }

  selectedCriteria() {
    this.retrieveData(this.criteria);
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveData(this.criteria);
  }

  retrieveData(criteria) {
    const params = this.getRequestParams(this.page, 2);

    this.service.getWorkoutPlans(params, criteria)
      .subscribe(
        response => {
          const { workoutPlans, totalItems } = response;
          this.workoutPrograms = workoutPlans;
          this.totalPrograms = totalItems;
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

    if(this.selectedWorkoutType && this.selectedWorkoutType !== "ALL"){
      params['workoutType'] = this.selectedWorkoutType
    }

    if (this.selectedBodyPart && this.selectedBodyPart !== "ALL") {
      params[`bodyPart`] = this.selectedBodyPart;
    }

    if (this.selectedMuscleGroups) {
      params[`muscleGroups`] = this.selectedMuscleGroups;
    }

    if (this.selectedEquipment !== undefined && this.selectedEquipment !== null) {
      params[`equipment`] = this.selectedEquipment;
    }

    params['title'] = this.searchTerm;

    return params;
  }

  searchWorkoutPlans(){
    this.retrieveData(this.criteria);
  }

  isAuthenticated() {
    return this.oauthService.checkUserLoggedIn()
  }

  resetEquipment() {
    this.selectedEquipment = null;
    this.retrieveData(this.criteria)
  }

  resetMuscleGroups() {
    this.workout.controls.muscleGroups.reset();
    this.retrieveData(this.criteria)
  }

}
