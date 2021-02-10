import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, Exercise, Meal, User, WorkoutPlan } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  api = "http://localhost:8080/";
  options = { headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'})}


  getExercises(){
    return this.http.get<Exercise[]>(this.api + "exercises/all");
  }

  getExercisesByMuscleGroup(muscleGroup) {
    return this.http.get<Exercise[]>(this.api + muscleGroup + "/all");
  }

  getMeals() {
    return this.http.get<Meal[]>(this.api + "meals/all");
  }

  createMeal(meal) {
    this.http.post<Meal>(this.api + "meals/add", meal, this.options).subscribe();
  }

  deleteMeal(id) {
    this.http.delete<Meal>(this.api + "meals/" + id + "/delete");
  }

  getWorkoutPlans() {
    return this.http.get<WorkoutPlan[]>(this.api + "workouts/all");
  }

  createWorkoutPlan(workoutPlan) {
    this.http.post<WorkoutPlan>(this.api + "workouts/add", workoutPlan, this.options).subscribe();
  }

  deleteWorkoutPlan(id) {
    this.http.delete<WorkoutPlan>(this.api + "workouts/" + id + "/delete");
  }

  getArticles() {
    this.http.get<Article[]>(this.api + "forum/articles/all");
  }

  saveArticle(article) {
    this.http.post<Article>(this.api + "forum/articles/add", article, this.options);
  }

  deleteArticle(id) {
    this.http.delete<Article>(this.api + "forum/articles/" + id + "/delete");
  }

  getUsers() {
    return this.http.get<User[]>(this.api + 'users/all');
  }

}
