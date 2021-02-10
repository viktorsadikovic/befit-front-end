import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  constructor() { }

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

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.meal.value)
  }

}
