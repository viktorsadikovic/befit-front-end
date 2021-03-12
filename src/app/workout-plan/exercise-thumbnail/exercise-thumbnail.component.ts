import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Exercise } from 'src/app/shared/data.model';

@Component({
  selector: 'app-exercise-thumbnail',
  templateUrl: './exercise-thumbnail.component.html',
  styleUrls: ['./exercise-thumbnail.component.css']
})
export class ExerciseThumbnailComponent implements OnInit {

  constructor() { }
  @Input() exercise: Exercise;
  @Output() eventClick = new EventEmitter<any>();
  @Output() deleteClick = new EventEmitter<any>();

  added = false;

  exerciseForm = new FormGroup({
    series: new FormControl(0, Validators.min(0)),
    reps: new FormControl(0, Validators.min(0))
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.changeFlag()
    let exercise = {
      id: null,
      exerciseId: this.exercise.id,
      exercise: null,
      numberOfSets: this.exerciseForm.value.series,
      numberOfReps: this.exerciseForm.value.reps,
    }

    console.log(this.exercise)
    this.eventClick.emit(exercise)
  }

  delete() {
    this.changeFlag()
    this.deleteClick.emit(this.exercise.id)
  }

  changeFlag() {
    this.added = !this.added;
  }

}
