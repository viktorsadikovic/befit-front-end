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

    this.retrieveData();
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveData();
  }

  retrieveData() {
    const params = this.getRequestParams(this.page, 3);

    this.service.getMeals(params)
      .subscribe(
        response => {
          const { exercises, totalItems } = response;
          this.meals = exercises;
          this.activeMeals = exercises
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

    return params;
  }

  sortMeals(){
    if (this.criteria === "None"){

      this.activeMeals = this.meals

    } else if (this.criteria === "PriceAsc"){

      //this.activeMeals.sort(sortByPriceAsc)

    } else if (this.criteria === "PriceDesc"){

      // this.activeMeals.sort(sortByPriceDesc)

    } else if (this.criteria === "AlphabeticalAsc"){

      this.activeMeals.sort(sortByNameAsc)

    } else if (this.criteria === "AlphabeticalDesc"){

      this.activeMeals.sort(sortByNameDesc)

    } else if (this.criteria === "DateAsc"){

      this.activeMeals.sort(sortByDateNewest)

    } else if (this.criteria === "DateDesc"){

      this.activeMeals.sort(sortByDateOldest)

    } else if (this.criteria == "RatingAsc") {

      this.activeMeals.sort(sortByRatingAsc)

    } else if (this.criteria == "RatingDesc") {

      this.activeMeals.sort(sortByRatingDesc)

    }

  }

}

function sortByNameAsc(s1: Meal, s2: Meal ){
  if (s1.title > s2.title) return 1
  else if (s1.title === s2.title) return 0
  else return -1
}

function sortByNameDesc(s1: Meal, s2: Meal ){
  if (s1.title > s2.title) return -1
  else if (s1.title === s2.title) return 0
  else return 1
}

// function sortByPriceAsc(s1: Meal, s2: Meal ){
//   if (s1.price > s2.price) return 1
//   else if (s1.price === s2.price) return 0
//   else return -1
// }

//   function sortByPriceDesc(s1: Meal, s2: Meal ){
//     if (s1.price > s2.price) return -1
//     else if (s1.price === s2.price) return 0
//     else return 1
// }

function sortByDateNewest(s1: Meal, s2: Meal){
  return <any>new Date(s2.submissionTime) - <any>new Date(s1.submissionTime);
}

function sortByDateOldest(s1: Meal, s2: Meal){
  return <any>new Date(s1.submissionTime) - <any>new Date(s2.submissionTime);
}

function sortByRatingAsc(s1: Meal, s2: Meal) {
  if(calculateRating(s1) > calculateRating(s2)) return 1
  else if (calculateRating(s1) === calculateRating(s2)) return 0
  else return 1;
}

function sortByRatingDesc(s1: Meal, s2: Meal) {
  if(calculateRating(s1) > calculateRating(s2)) return -1
  else if (calculateRating(s1) === calculateRating(s2)) return 0
  else return 1;
}


function calculateRating(meal: Meal) {
  let rating = 0;
  meal.reviews?.forEach(rev => rating += rev.score);
  if(isNaN(rating)) {
    rating = 0;
  } else {
    rating = rating/meal.reviews.length;
  }
  return rating;
}
