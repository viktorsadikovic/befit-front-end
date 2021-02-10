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

  meal = new FormGroup({
    id : new FormControl(),
    mealTypes : new FormControl(),
    dietaryType : new FormControl('VEGAN'),
    preparationTime : new FormControl(),
    cookingTime : new FormControl(),
    servings : new FormControl(),
    preparation : new FormControl(),
    sort: new FormControl()
  })

  ngOnInit(): void {
    document.getElementById('nutrition-nav').className = 'menu-active'
    document.getElementById('workout-nav').className = ''
    document.getElementById('forum-nav').className = ''
    document.getElementById('home-nav').className = ''
    document.getElementById('login-nav').className = ''

    this.service.getMeals().subscribe(data => {
      this.meals = data;
    })
  }

  selectedFilter(){

  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

}
