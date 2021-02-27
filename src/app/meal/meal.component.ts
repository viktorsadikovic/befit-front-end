import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Meal } from '../shared/data.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  constructor(private service: DataService) { }
  meals: Meal[]
  totalMeals: Number
  page: Number = 1
  activeMeals: Meal[]
  criteria = "None";
  selectedMealTypes;
  selectedDietaryType;
  selectedServings;
  selectedPreparationTime;
  selectedCookingTime;

  meal = new FormGroup({
    mealTypes : new FormControl(null),
    dietaryType : new FormControl('VEGAN'),
    preparationTime : new FormControl(),
    cookingTime : new FormControl(null),
    servings : new FormControl(null),
    preparation : new FormControl(null),
    sort: new FormControl()
  })

  ngOnInit(): void {
    document.getElementById('nutrition-nav').className = 'menu-active'
    document.getElementById('workout-nav').className = ''
    document.getElementById('forum-nav').className = ''
    document.getElementById('home-nav').className = ''
    document.getElementById('login-nav').className = ''

    this.retrieveData(this.criteria);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveData(this.criteria);
  }

  retrieveData(criteria) {
    const params = this.getRequestParams(this.page, 3);

    this.service.getMeals(params, criteria)
      .subscribe(
        response => {
          const { meals, totalItems } = response;
          this.meals = meals;
          this.activeMeals = meals
          this.totalMeals = totalItems;
          console.log("response")
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  getRequestParams(page, pageSize) {

    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    if (this.selectedDietaryType) {
      params[`dietaryType`] = this.selectedDietaryType;
    }

    if (this.selectedMealTypes) {
      params[`mealTypes`] = this.selectedMealTypes;
    }

    if(this.selectedServings){
      params['servings'] = this.selectedServings
    }

    if(this.selectedPreparationTime === "LESS_THAN_30"){
      params['preparationTime'] = [0,30]

    } else if(this.selectedPreparationTime === "BETWEEN_30_60"){
      params['preparationTime'] = [30,60]

    } else if(this.selectedPreparationTime === "MORE_THAN_60"){
      params['preparationTime'] = [60,300]
    }

    console.log(params)

    return params;
  }

  changeDietaryType() {
    this.retrieveData(this.criteria)
  }

  changeMuscleGroups() {
    this.retrieveData(this.criteria)
  }

  changeServings() {
    this.retrieveData(this.criteria)
  }

  changePrepTime() {
    this.retrieveData(this.criteria)
  }

  changeCookTime() {
    this.retrieveData(this.criteria)
  }

  sortMeals() {
    console.log(this.criteria)
    this.retrieveData(this.criteria)
  }


}



