import { Component, OnInit } from '@angular/core';
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
  meal: Meal;
  latest: Meal[];
  trending: Meal[];

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

}
