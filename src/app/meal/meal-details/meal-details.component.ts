import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Meal } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {

  constructor(private service: DataService, private route: ActivatedRoute) { }
  id;
  stars = [1,2,3,4,5];
  hoverState = 0;
  meal: Meal;
  latest: Meal[];
  trending: Meal[];
  rating;

  reviewForm = new FormGroup({
    description: new FormControl('')
  })

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.id = params['id']
      this.service.getSingleMeal(this.id).subscribe(data => {
        this.meal = data;

        this.service.getLatestMeals(this.meal.id).subscribe(data => {
          this.latest = data;
        })

        this.service.getTrendingMeals(this.meal.id).subscribe(data => {
          this.trending = data;
        })
      })
    })


  }

  onStarEnter(starId: number){
    this.hoverState = starId;
  }

  onStarLeave(){
    this.hoverState = 0;
  }

  onStarClicked(starId: number){
    this.rating = starId;
  }

  onSubmit() {
    let review = {
      id: null,
      score: this.rating,
      description: this.reviewForm.value.description,
      submitter: null,
      submissionTime: null
    }

    console.log(review);
  }

}
