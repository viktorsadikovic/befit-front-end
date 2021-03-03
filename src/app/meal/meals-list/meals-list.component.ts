import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Meal } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { OauthService } from 'src/app/shared/oauth.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.css']
})
export class MealsListComponent implements OnInit {

  constructor(private service: DataService,
              private route: ActivatedRoute,
              private oauthService: OauthService) { }
  meals: Meal[]
  totalMeals: Number
  page: Number = 1
  criteria = "none";
  searchTerm = '';
  routeParam;


  ngOnInit(): void {
    document.getElementById('nutrition-nav').className = ''
    document.getElementById('workout-nav').className = ''
    document.getElementById('forum-nav').className = ''
    document.getElementById('home-nav').className = ''
    document.getElementById('dropdown-nav').className = 'menu-active'
    document.getElementById('login-nav').className = ''
    this.route.params.forEach((params: Params) => {
      this.routeParam = params['routeParam']
    })

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
    this.retrieveData(this.searchTerm);
  }

  retrieveData(criteria) {
    const params = this.getRequestParams(this.page, 3);

    if(this.routeParam === "favorites") {
      console.log("favoritessss")
      this.service.getFavoriteMeals(params)
      .subscribe(
        response => {
          const { meals, totalItems } = response;
          this.meals = meals;
          this.totalMeals = totalItems;
          console.log("response")
          console.log(response);
        },
        error => {
          console.log(error);
        });
    } else {
      this.service.getMyMeals(params, this.oauthService.getUserEmail())
      .subscribe(
        response => {
          const { meals, totalItems } = response;
          this.meals = meals;
          this.totalMeals = totalItems;
          console.log("response")
          console.log(response);
        },
        error => {
          console.log(error);
        });
    }
  }

  getRequestParams(page, pageSize) {

    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    params['text'] = this.searchTerm

    params['email'] = this.oauthService.getUserEmail()

    console.log(params)

    return params;
  }

  searchMeals() {
    this.retrieveData(this.searchTerm);
  }

}
