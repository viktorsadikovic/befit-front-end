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
  retrievedImage: any;
  retrieveResponse: any;

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
    name: this.exerciseForm.value.name,
    muscleGroup: this.exerciseForm.value.muscleGroup,
    equipment: this.exerciseForm.value.equipment,
    image: null
  }

  uploadImageData.append('exercise', JSON.stringify(this.exercise));
  this.service.addExercise(uploadImageData);

  this.service.getImage(this.selectedFile.name).subscribe((res: Object) => {
    this.retrieveResponse = res;
    this.retrievedImage = 'data:image/gif;base64,' + this.retrieveResponse.picByte;
  })
 }

}
