import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  constructor(private service: DataService, private router: Router) { }

  mealForm = new FormGroup({
    id : new FormControl(),
    title : new FormControl(),
    username : new FormControl(),
    mealTypes : new FormControl(),
    dietaryType : new FormControl('VEGAN'),
    preparationTime : new FormControl(),
    cookingTime : new FormControl(),
    servings : new FormControl(),
    description : new FormControl(),
    ingredients : new FormControl(),
    preparation : new FormControl(),
    reviews : new FormControl(null)
  })
  selectedFile: File;
  meal;

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.mealForm.value)

    const uploadImageData = new FormData();

    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.meal = {
      id: null,
      title: this.mealForm.value.title,
      username: null,
      mealTypes: this.mealForm.value.mealTypes,
      dietaryType: this.mealForm.value.dietaryType,
      preparationTime: this.mealForm.value.preparationTime,
      cookingTime : this.mealForm.value.cookingTime,
      servings : this.mealForm.value.servings,
      description : this.mealForm.value.description,
      ingredients : this.mealForm.value.ingredients,
      preparation : this.mealForm.value.preparation,
      submissionTime: Date.now(),
      reviews : null,
      image: null
    }

    uploadImageData.append('meal', JSON.stringify(this.meal));

    console.log(this.meal)
    console.log(uploadImageData.get('imageFile'))
    this.service.createMeal(uploadImageData);
    // this.router.navigate(['/meals']);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
 }

}
