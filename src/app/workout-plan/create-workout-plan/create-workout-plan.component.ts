import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-create-workout-plan',
  templateUrl: './create-workout-plan.component.html',
  styleUrls: ['./create-workout-plan.component.css']
})
export class CreateWorkoutPlanComponent implements OnInit {

  wType: {[key: string]: string} = { 'Cardio' : 'CARDIO_TRAINING', 'Bodybuilding' : 'BODYBUILDING', 'Yoga' : 'YOGA',
          'Pilates' : 'PILATES', 'Zumba' : 'ZUMBA'};
  bPart: {[key: string]: string} =  { 'Full body' : 'FULL_BODY', 'Upper body' : 'UPPER_BODY', 'Lower body' : 'LOWER_BODY'};
  mGroups: {[key: string]: string} =  { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};

  exercises: any[];
  totalExercises: Number
  page: Number = 1

  selectedWorkoutType: any;
  selectedBodyPart: any;
  selectedMuscleGroups: any;
  selectedEquipment: any;
  wTypeDisabled = false;
  selectedFile: File;
  retrieveResponse: any;
  selectedExercises: any[];


  constructor(private service: DataService) {
    this.selectedExercises = []
    this.workout = new FormGroup({
      title : new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      equipment : new FormControl(null,[Validators.required]),
      workoutType : new FormControl(null, [Validators.required]),
      bodyPart: new FormControl(null, [Validators.required]),
      muscleGroups: new FormControl(null, [Validators.required])
    })

    this.selectedWorkoutType = null;
    this.selectedBodyPart = null;
    this.selectedMuscleGroups = null;
    this.selectedEquipment = null;
  }
  workout: FormGroup;

  get title() { return this.workout.get('title'); }

  get workoutType() { return this.workout.get('workoutType'); }

  get bodyPart() { return this.workout.get('bodyPart')}

  get muscleGroups() { return this.workout.get('muscleGroups')}

  get equipment() { return this.workout.get('equipment')}

  get description() { return this.workout.get('description')}


  ngOnInit(): void {
   this.retrieveData();
  }

  changeWorkoutType() {
    console.log(this.selectedWorkoutType)

    if(this.selectedWorkoutType === "BODYBUILDING"){
        this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
        this.bPart =  { 'Full body' : 'FULL_BODY', 'Upper body' : 'UPPER_BODY', 'Lower body' : 'LOWER_BODY'};
        this.retrieveData()
    } else {
      this.workout.controls.muscleGroups.reset()
      this.bPart = {'' : ''}
      this.mGroups = {'' : ''}
      this.workout.controls.muscleGroups.setValue(null)
      this.workout.controls.bodyPart.setValue(null)
      this.retrieveData()
      console.log(this.wTypeDisabled)
    }
  }


  changeBodyPart() {
    if(this.selectedBodyPart === "FULL_BODY"){
      this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
      this.retrieveData()
    } else if(this.selectedBodyPart === "LOWER_BODY"){
        this.mGroups = {'Legs' : 'LEGS'}
        this.retrieveData()
      console.log(this.wTypeDisabled)
    } else if(this.selectedBodyPart == "UPPER_BODY"){
        this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS'};
        this.retrieveData()
    }
  }

  changeMuscleGroup() {
    console.log(this.selectedMuscleGroups)
    this.retrieveData()
  }

  onFileChanged(event) {
     this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    console.log(this.workout.value)
    const uploadImageData = new FormData();

    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    let workoutPlan = {
      id : null,
      title : this.workout.value.title,
      description: this.workout.value.description,
      username : null,
      equipment : this.workout.value.equipment,
      workoutType : this.workout.value.workoutType,
      bodyPart: this.workout.value.bodyPart,
      muscleGroups: this.workout.value.muscleGroups,
      exercises: this.selectedExercises,
      submissionTime: null,
      reviews : null,
      image: null
    }
    uploadImageData.append('workoutPlan', JSON.stringify(workoutPlan));

    console.log(uploadImageData.get('imageFile'))
    console.log(workoutPlan)
    this.service.createWorkoutPlan(uploadImageData)
  }

  addExercise(exerciseWrapper) {
    this.selectedExercises.push(exerciseWrapper)
    console.log(this.selectedExercises)
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveData();
  }

  retrieveData() {
    const params = this.getRequestParams(this.page, 3);

    this.service.getExercises(params)
      .subscribe(
        response => {
          const { exercises, totalItems } = response;
          this.exercises = exercises;
          this.totalExercises = totalItems;
          console.log("response")
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  getRequestParams(page, pageSize) {

    let params = {};

    params['workoutType'] = this.selectedWorkoutType;
    params['muscleGroup'] = this.selectedMuscleGroups;
    params['equipment'] = this.selectedEquipment;

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

}
