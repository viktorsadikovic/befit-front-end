import { Component, Input, OnInit } from '@angular/core';
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

  exerciseForm = new FormGroup({
    series: new FormControl(0, Validators.min(0)),
    reps: new FormControl(0, Validators.min(0))
  })

  ngOnInit(): void {
  }

  onSubmit() {
    let exercise = {
      exercise: this.exercise,
      series: this.exerciseForm.value.series,
      reps: this.exerciseForm.value.reps,
    }
  }

}
