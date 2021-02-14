import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-create-workout-plan',
  templateUrl: './create-workout-plan.component.html',
  styleUrls: ['./create-workout-plan.component.css']
})
export class CreateWorkoutPlanComponent implements OnChanges {

  wType: {[key: string]: string} = { 'Cardio' : 'CARDIO_TRAINING', 'Bodybuilding' : 'BODYBUILDING', 'Yoga' : 'YOGA',
          'Pilates' : 'PILATES', 'Zumba' : 'ZUMBA'};
  bPart: {[key: string]: string} =  { 'Full body' : 'FULL_BODY', 'Upper body' : 'UPPER_BODY', 'Lower body' : 'LOWER_BODY'};
  mGroups: {[key: string]: string} =  { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
  exercises: any[];
  selectedWorkoutType: any;
  selectedBodyPart: any;
  selectedMuscleGroups: any;
  wTypeDisabled = false;
  selectedFile: File;
  retrieveResponse: any;
  selectedExercises: any[];


  constructor(private service: DataService) {
    this.selectedExercises = []
  }

  test = true;
  workout = new FormGroup({
    id : new FormControl(null),
    title : new FormControl(),
    description: new FormControl(),
    username : new FormControl(null),
    equipment : new FormControl(),
    workoutType : new FormControl(null),
    bodyPart: new FormControl(null),
    muscleGroups: new FormControl(),
    exercises: new FormControl(),
    reviews : new FormControl(null)
  })


  ngOnChanges(): void {
    this.service.getExercises();
  }

  changeWorkoutType() {
    console.log(this.selectedWorkoutType)

    if(this.selectedWorkoutType === "BODYBUILDING"){
        this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
        this.bPart =  { 'Full body' : 'FULL_BODY', 'Upper body' : 'UPPER_BODY', 'Lower body' : 'LOWER_BODY'};
        this.exercises = null;
    } else {
      this.workout.controls.muscleGroups.reset()
      this.bPart = {'' : ''}
      this.mGroups = {'' : ''}
      this.workout.controls.muscleGroups.setValue(null)
      this.workout.controls.bodyPart.setValue(null)
      this.exercises = null;

      console.log(this.wTypeDisabled)
    }
  }


  changeBodyPart() {
    if(this.selectedBodyPart === "FULL_BODY"){
      this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
      this.exercises = null;
    } else if(this.selectedBodyPart === "LOWER_BODY"){
        this.mGroups = {'Legs' : 'LEGS'}
        this.exercises = null;
      console.log(this.wTypeDisabled)
    } else if(this.selectedBodyPart == "UPPER_BODY"){
        this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS'};
        this.exercises = null;
    }
  }

  changeMuscleGroup() {
    console.log(this.selectedMuscleGroups)
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
      reviews : null,
      image: uploadImageData.get('imageFile')
    }

    console.log(uploadImageData.get('imageFile'))
    console.log(workoutPlan)
    // this.service.uploadImage(uploadImageData);
    this.service.createWorkoutPlan(workoutPlan)
  }

  getImage() {
    let image = null;

    this.service.getImage(null).subscribe(res => {
      this.retrieveResponse = res;
      image = 'data:image/jpeg;base64,' + this.retrieveResponse.picByte;
    })
  }

  addExercise(exerciseWrapper) {
    this.selectedExercises.push(exerciseWrapper)
    console.log(this.selectedExercises)
  }

}
