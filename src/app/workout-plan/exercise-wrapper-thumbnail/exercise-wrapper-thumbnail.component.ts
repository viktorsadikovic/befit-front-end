import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Exercise, ExerciseWrapper } from 'src/app/shared/data.model';

@Component({
  selector: 'app-exercise-wrapper-thumbnail',
  templateUrl: './exercise-wrapper-thumbnail.component.html',
  styleUrls: ['./exercise-wrapper-thumbnail.component.css']
})
export class ExerciseWrapperThumbnailComponent implements OnInit {

  constructor() { }
  changed = false;

  @Input() exerciseWrapper: ExerciseWrapper;
  @Output() eventClick = new EventEmitter<any>();
  @Output() deleteClick = new EventEmitter<any>();


  exerciseForm = new FormGroup({
    series: new FormControl(0, Validators.min(0)),
    reps: new FormControl(0, Validators.min(0))
  })

  ngOnInit(): void {
    let series = new FormControl(this.exerciseWrapper.numberOfSets, Validators.min(0))
    let reps = new FormControl(this.exerciseWrapper.numberOfReps, Validators.min(0))

    this.exerciseForm = new FormGroup({
      series: series,
      reps: reps
    })
  }

  onSubmit() {
    let exercise = {
      id: this.exerciseWrapper.id,
      exerciseId: this.exerciseWrapper.exercise.id,
      exercise: this.exerciseWrapper.exercise,
      numberOfSets: this.exerciseForm.value.series,
      numberOfReps: this.exerciseForm.value.reps,
    }

    console.log(exercise)
    this.eventClick.emit(exercise)
  }

  changeExercise() {
    this.changed = true
  }

  delete() {
    this.deleteClick.emit(this.exerciseWrapper.id)
  }


}
