import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Meal } from 'src/app/shared/data.model';

@Component({
  selector: 'app-meal-thumbnail',
  templateUrl: './meal-thumbnail.component.html',
  styleUrls: ['./meal-thumbnail.component.css']
})
export class MealThumbnailComponent implements OnChanges {

  constructor() { }
  @Input() meal: Meal
  rating = 0;
  stars = [1,2,3,4,5]

  ngOnChanges(): void {
      this.meal.reviews?.forEach(rev => this.rating += rev.score);
      if(isNaN(this.rating)) {
        this.rating = 0;
      } else {
        this.rating = this.rating/this.meal.reviews.length;
      }

  }

}
