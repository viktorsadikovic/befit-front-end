import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Meal, User } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { OauthService } from 'src/app/shared/oauth.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {

  constructor(private service: DataService,
              private route: ActivatedRoute,
              private oauthService: OauthService,
              private router: Router) { }
  id;
  stars = [1,2,3,4,5];
  hoverState = 0;
  meal: Meal;
  latest: Meal[];
  trending: Meal[];
  rating;
  userLogged;

  reviewForm = new FormGroup({
    description: new FormControl('', Validators.required)
  })

  get description() { return this.reviewForm.get('description'); }


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

    this.userLogged = this.oauthService.getCurrentUser();
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
    if(this.oauthService.checkUserLoggedIn()) {
      let review = {
        id: null,
        score: this.rating,
        description: this.reviewForm.value.description,
        submitter: null,
        submissionTime: null
      }

      setTimeout(function() {
        window.location.reload()
      }, 3000)

      this.service.addMealReview(this.meal.id, review);
    } else {
      this.router.navigate(['/login'])
    }

  }

  isFavoriteMeal(id) {

    if(this.oauthService.checkUserLoggedIn()){
      return this.userLogged?.favoriteMeals.filter(elemId => elemId === id).length !== 0
    }
    return false;
  }

  addToFavoriteMeals(id) {

    if(this.oauthService.checkUserLoggedIn()) {

      if(this.isFavoriteMeal(id)) {
        this.service.removeMealFromFavorites(id).subscribe(data => {
          this.userLogged = data;
          this.oauthService.updateUser(data)
        })
      } else {
        this.service.addMealToFavorites(id).subscribe(data => {
          this.userLogged = data;
          this.oauthService.updateUser(data)
        })
      }

    } else {
      this.router.navigate(['/login'])
    }
  }

  delete() {
    this.service.deleteMeal(this.meal.id).subscribe(
      (data) => {
      this.router.navigate(['/meals'])
    },
    (error) => {
      this.router.navigate(['/meals'])
    })
  }

  isCreator() {
    if(!this.oauthService.checkUserLoggedIn()) {
      return false;
    }
    return this.meal?.creator === this.oauthService.getCurrentUser().email
  }

}
