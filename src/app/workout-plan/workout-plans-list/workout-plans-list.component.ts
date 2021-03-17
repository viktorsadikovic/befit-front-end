import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { WorkoutPlan } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { OauthService } from 'src/app/shared/oauth.service';

@Component({
  selector: 'app-workout-plans-list',
  templateUrl: './workout-plans-list.component.html',
  styleUrls: ['./workout-plans-list.component.css']
})
export class WorkoutPlansListComponent implements OnInit {

  constructor(private service: DataService,
              private route: ActivatedRoute,
              private oauthService: OauthService) { }
  exercises;
  selectedWorkoutType: any;
  selectedBodyPart: any;
  selectedMuscleGroups: any;
  selectedEquipment: any;
  criteria = "None";
  wTypeDisabled = false;
  searchTerm = '';
  routeParam;

  workoutPrograms: WorkoutPlan[]
  totalPrograms: Number
  page: Number = 1

  ngOnInit(): void {
    document.getElementById('workout-nav').className = ''
    document.getElementById('nutrition-nav').className = ''
    document.getElementById('forum-nav').className = ''
    document.getElementById('home-nav').className = ''
    document.getElementById('dropdown-nav').className = 'menu-active'
    document.getElementById('login-nav').className = ''

    this.route.params.forEach((params: Params) => {
      this.routeParam = params['routeParam']
    })


    this.retrieveData(this.criteria);
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveData(this.criteria);
  }

  retrieveData(criteria) {
    const params = this.getRequestParams(this.page, 3);

    if(this.routeParam === "favorites") {
      this.service.getFavoriteWorkoutPlans(params)
      .subscribe(
        response => {
          const { workoutPlans, totalItems } = response;
          this.workoutPrograms = workoutPlans;
          this.totalPrograms = totalItems;
        },
        error => {
          console.log(error);
        });
    } else {
      this.service.getMyWorkoutPlans(params, this.oauthService.getUserEmail())
      .subscribe(
        response => {
          const { workoutPlans, totalItems } = response;
          this.workoutPrograms = workoutPlans;
          this.totalPrograms = totalItems;
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

    params['text'] = this.searchTerm;

    params['favoriteForUsers'] = this.oauthService.getUserEmail()

    return params;
  }

  searchWorkoutPlans(){
    this.retrieveData(this.criteria);
  }

}
