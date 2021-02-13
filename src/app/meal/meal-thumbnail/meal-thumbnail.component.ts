import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/shared/data.model';

@Component({
  selector: 'app-meal-thumbnail',
  templateUrl: './meal-thumbnail.component.html',
  styleUrls: ['./meal-thumbnail.component.css']
})
export class MealThumbnailComponent implements OnInit {

  constructor() { }
  @Input() meal: Meal
  rating;
  stars = [1,2,3,4,5]

  ngOnInit(): void {
    if(this.meal.reviews != null) {
      this.meal.reviews.forEach(rev => this.rating += rev.score);
      this.rating = this.rating/this.meal.reviews.length;
    } else {
      this.rating = 0;
    }

  }

}
