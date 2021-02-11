import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Exercise } from '../shared/data.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  mGroups: {[key: string]: string} =  { 'Arms' : 'ARMS', 'Shoulders' : 'SHOULDERS', 'Chest' : 'CHEST', 'Back' : 'BACK', 'Abs' : 'ABS', 'Legs' : 'LEGS'};
  selectedFile: File;

  constructor(private service: DataService) { }

  exerciseForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null),
    muscleGroup: new FormControl(null),
    equipment: new FormControl(null)
  })

  exercise: any;

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
 }

 onSubmit() {
  console.log(this.exerciseForm.value)
  const uploadImageData = new FormData();

  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);


    this.exercise = {
      id: null,
      name: this.exercise.value.name,
      muscleGroup: this.exercise.value.muscleGroup,
      equipment: this.exercise.value.equipment,
      image: null
    }

  uploadImageData.append('exercise', this.exercise);
  this.service.addExercise(uploadImageData)
 }

}
