import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExerciseWrapper, WorkoutPlan } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-edit-workout-plan',
  templateUrl: './edit-workout-plan.component.html',
  styleUrls: ['./edit-workout-plan.component.css']
})
export class EditWorkoutPlanComponent implements OnInit {

  wType: {[key: string]: string} = { 'Cardio' : 'CARDIO_TRAINING', 'Bodybuilding' : 'BODYBUILDING', 'Yoga' : 'YOGA',
  'Pilates' : 'PILATES', 'Zumba' : 'ZUMBA'};
  bPart: {[key: string]: string} =  { 'Full body' : 'FULL_BODY', 'Upper body' : 'UPPER_BODY', 'Lower body' : 'LOWER_BODY'};
  mGroups: {[key: string]: string} =  { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};

  exercises: any[];
  totalExercises: Number
  page: Number = 1
  currentWorkout: WorkoutPlan

  selectedWorkoutType: any;
  selectedBodyPart: any;
  selectedMuscleGroups: any;
  selectedEquipment: any;
  wTypeDisabled = false;
  selectedFile: File;
  retrieveResponse: any;
  selectedExercises: ExerciseWrapper[];
  workout: FormGroup;
  newImage = false;
  newExercises = false;
  additionalExercises : ExerciseWrapper[];

  constructor(private service: DataService,
              private router: Router,
              private route: ActivatedRoute) {
    this.selectedExercises = []
    this.additionalExercises = []
    this.workout = new FormGroup({
    title : new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    equipment : new FormControl(null,[Validators.required]),
    workoutType : new FormControl(null, [Validators.required]),
    bodyPart: new FormControl(null, [Validators.required]),
    muscleGroups: new FormControl(null, [Validators.required]),
    newImage: new FormControl(),
    price: new FormControl('', Validators.required)
    })

    this.selectedWorkoutType = null;
    this.selectedBodyPart = null;
    this.selectedMuscleGroups = null;
    this.selectedEquipment = null;
  }

  get title() { return this.workout.get('title'); }

  get workoutType() { return this.workout.get('workoutType'); }

  get bodyPart() { return this.workout.get('bodyPart')}

  get muscleGroups() { return this.workout.get('muscleGroups')}

  get equipment() { return this.workout.get('equipment')}

  get description() { return this.workout.get('description')}

  get price() { return this.workout.get('price')}

  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      this.service.getSingleWorkoutPlan(+params['id']).subscribe(data => {
        this.currentWorkout = data
        this.selectedExercises = data.exercises
        this.initializeForm()
        this.retrieveData();
      })
    })

  }

  initializeForm() {
    let title = new FormControl(this.currentWorkout.title, [Validators.required])
    let description = new FormControl(this.currentWorkout.description, [Validators.required])
    let equipment = new FormControl(this.currentWorkout.equipment,[Validators.required])
    let workoutType = new FormControl(this.currentWorkout.workoutType, [Validators.required])
    let bodyPart = new FormControl(this.currentWorkout.bodyPart, [Validators.required])
    let muscleGroups = new FormControl(this.currentWorkout.muscleGroups, [Validators.required])
    let image = new FormControl(this.currentWorkout.image, Validators.required)
    let price = new FormControl(this.currentWorkout.price, Validators.required)
    let newImage = new FormControl(false)
    this.selectedWorkoutType = this.currentWorkout.workoutType
    this.selectedEquipment = this.currentWorkout.equipment
    this.selectedBodyPart = this.currentWorkout.bodyPart
    this.selectedMuscleGroups = this.currentWorkout.muscleGroups

    this.workout = new FormGroup({
      title : title,
      description: description,
      equipment : equipment,
      workoutType : workoutType,
      bodyPart: bodyPart,
      muscleGroups: muscleGroups,
      image: image,
      price: price,
      newImage: newImage
      })
  }

  cancel() {
    this.router.navigate(['/workout-plans'])
  }

  cancelNewExercises() {
    this.additionalExercises = [];
    this.newExercises = !this.newExercises
  }

  changeWorkoutType() {
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
    this.selectedMuscleGroups = null
    this.retrieveData()
    }
  }

  changeBodyPart() {
    if(this.selectedBodyPart === "FULL_BODY"){
    this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
    this.retrieveData()
    } else if(this.selectedBodyPart === "LOWER_BODY"){
    this.mGroups = {'Legs' : 'LEGS'}
    this.retrieveData()
    } else if(this.selectedBodyPart == "UPPER_BODY"){
    this.mGroups = { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS'};
    this.retrieveData()
    }
  }

  changeMuscleGroup() {
    this.retrieveData()
  }

  changeEquipment() {
    this.retrieveData()
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  addExercise(exerciseWrapper) {
    this.additionalExercises.push(exerciseWrapper)
  }

  editExistingExercises(exerciseWrapper) {
    this.selectedExercises.forEach((element, index) => {
      if(element.exerciseId === exerciseWrapper.exerciseId){
        this.selectedExercises.splice(index, 1)
      }
    })
    this.selectedExercises.push(exerciseWrapper)
  }

  deleteExercise(id) {
    this.selectedExercises.forEach((element, index) => {
      if(element.exerciseId === id){
        this.selectedExercises.splice(index, 1)
      }
    })
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
    },
    error => {
      console.log(error);
    });
  }

  getRequestParams(page, pageSize) {

    let params = {};

    let exerciseIds = []
    this.selectedExercises.forEach(exerciseWrapper => {
      exerciseIds.push(exerciseWrapper.exerciseId)
    })

    if(this.selectedWorkoutType !== null) {
      params['workoutType'] = this.selectedWorkoutType;
    }

    if(this.selectedMuscleGroups !== null) {
      params['muscleGroup'] = this.selectedMuscleGroups;
    }

    if(this.selectedEquipment !== null) {
      params['equipment'] = this.selectedEquipment;
    }

    if(exerciseIds !== null || exerciseIds.length !== 0) {
      params['id'] = exerciseIds
    }

    if (page) {
    params[`page`] = page - 1;
    }

    if (pageSize) {
    params[`size`] = pageSize;
    }

    return params;
  }

  onSubmit() {
    this.additionalExercises.forEach(exerciseWrapper => {
      this.selectedExercises.push(exerciseWrapper)
    })

    this.selectedExercises.forEach(exerciseWrapper => {
      exerciseWrapper.exercise = null
    })

    const uploadImageData = new FormData();
    let workoutPlan;


    if(this.newImage) {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.currentWorkout.image.pictureBytes = null

      workoutPlan = {
        id : this.currentWorkout.id,
        title : this.workout.value.title,
        description: this.workout.value.description,
        username : this.currentWorkout.creator,
        equipment : this.workout.value.equipment,
        workoutType : this.workout.value.workoutType,
        bodyPart: this.workout.value.bodyPart,
        muscleGroups: this.workout.value.muscleGroups,
        exercises: this.selectedExercises,
        submissionTime: null,
        reviews : this.currentWorkout.reviews,
        image: this.currentWorkout.image,
        favoriteForUsers: this.currentWorkout.favoriteForUsers,
        price: this.workout.value.price
      }

    } else {
      // uploadImageData.append('imageFile', null, null);
      this.currentWorkout.image.pictureBytes = null

      workoutPlan = {
        id : this.currentWorkout.id,
        title : this.workout.value.title,
        description: this.workout.value.description,
        username : this.currentWorkout.creator,
        equipment : this.workout.value.equipment,
        workoutType : this.workout.value.workoutType,
        bodyPart: this.workout.value.bodyPart,
        muscleGroups: this.workout.value.muscleGroups,
        exercises: this.selectedExercises,
        submissionTime: null,
        reviews : this.currentWorkout.reviews,
        image: this.currentWorkout.image,
        favoriteForUsers: this.currentWorkout.favoriteForUsers,
        price: this.workout.value.price
        }
    }


    uploadImageData.append('workoutPlan', JSON.stringify(workoutPlan));

    this.service.editWorkoutPlan(uploadImageData)
    this.router.navigate(['/workout-plans'])
  }

  addNewImage(){
    return this.newImage
  }

  changeNewExercisesFlag() {
    this.newExercises = !this.newExercises
  }

}
