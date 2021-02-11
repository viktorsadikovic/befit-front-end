import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  constructor(private service: DataService) { }

  meal = new FormGroup({
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

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.meal.value)

    const uploadImageData = new FormData();

    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    let meal = {
      id: null,
      title: this.meal.value.title,
      username: null,
      mealType: this.meal.value.mealTypes,
      dietaryType: this.meal.value.dietaryType,
      preparationTime: this.meal.value.preparationTime,
      cookingTime : this.meal.value.cookingTime,
      servings : this.meal.value.servings,
      description : this.meal.value.description,
      ingredients : this.meal.value.ingredients,
      preparation : this.meal.value.preparation,
      reviews : null,
      image: uploadImageData.get('imageFile')
    }

    console.log(meal)
    this.service.createMeal(meal);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
 }

}
