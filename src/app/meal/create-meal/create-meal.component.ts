import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    title : new FormControl('',[Validators.required]),
    mealTypes : new FormControl(null, Validators.required),
    dietaryType : new FormControl('VEGAN'),
    preparationTime : new FormControl('', Validators.required),
    cookingTime : new FormControl('', Validators.required),
    servings : new FormControl('', Validators.required),
    description : new FormControl('', Validators.required),
    ingredients : new FormControl('', Validators.required),
    preparation : new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  })
  selectedFile: File;
  meal;

  get title() { return this.mealForm.get('title'); }

  get mealTypes() { return this.mealForm.get('mealTypes'); }

  get dietaryType() { return this.mealForm.get('dietaryType'); }

  get preparationTime() { return this.mealForm.get('preparationTime'); }

  get cookingTime() { return this.mealForm.get('cookingTime'); }

  get servings() { return this.mealForm.get('servings'); }

  get description() { return this.mealForm.get('description'); }

  get ingredients() { return this.mealForm.get('ingredients'); }

  get preparation() { return this.mealForm.get('preparation'); }

  get price() { return this.mealForm.get('price'); }


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
      submissionTime: null,
      reviews : null,
      image: null,
      favoriteForUsers: null,
      price: this.mealForm.value.price
    }

    uploadImageData.append('meal', JSON.stringify(this.meal));

    console.log(this.meal)
    console.log(uploadImageData.get('imageFile'))
    this.service.createMeal(uploadImageData);
    this.router.navigate(['/meals']);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
 }

}
