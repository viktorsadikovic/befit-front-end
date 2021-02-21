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
  optionsImage = { headers: new HttpHeaders({'Content-Type': 'multipart/form-data; charset=UTF-8'})}

  getExercises(params){
    console.log(params)
    return this.http.get<any>(this.api + "exercises/all", { params });
  }

  getExercisesCount() {
    return this.http.get(this.api + "exercises/count");
  }

  getSingleExercise(id) {
    return this.http.get(this.api + "exercises/" + id);
  }

  getExercisesByMuscleGroup(muscleGroup) {
    return this.http.get<Exercise[]>(this.api + muscleGroup + "/all");
  }

  addExercise(ExerciseDto) {
    this.http.post(this.api + "exercises/add", ExerciseDto,  {observe: 'response' }).subscribe();
  }

  getMeals(params) {
    return this.http.get<any>(this.api + "meals/all", { params });
  }

  getMealsCount() {
    return this.http.get<any>(this.api + "meals/count");
  }

  getSingleMeal(id) {
    return this.http.get<any>(this.api + "meals/" + id);
  }

  getTrendingMeals(id) {
    return this.http.get<any>(this.api + "meals/trending/" + id);
  }

  getLatestMeals(id) {
    return this.http.get<any>(this.api + "meals/latest/" + id);
  }

  createMeal(meal) {
    this.http.post(this.api + "meals/add", meal, {observe: 'response' }).subscribe();
  }

  deleteMeal(id) {
    this.http.delete<Meal>(this.api + "meals/" + id + "/delete");
  }

  getWorkoutPlans(params) {
    return this.http.get<WorkoutPlan[]>(this.api + "workouts/all", {params});
  }

  getWorkoutPlansCount() {
    return this.http.get<WorkoutPlan[]>(this.api + "workouts/count");
  }

  getSingleWorkoutPlan(id) {
    return this.http.get<WorkoutPlan>(this.api + "workouts/" + id);
  }

  createWorkoutPlan(workoutPlan) {
    this.http.post<any>(this.api + "workouts/add", workoutPlan, {observe: 'response' }).subscribe();
  }

  deleteWorkoutPlan(id) {
    this.http.delete<WorkoutPlan>(this.api + "workouts/" + id + "/delete");
  }

  getTrendingWorkoutPrograms(id) {
    return this.http.get<any>(this.api + "workouts/trending/" + id);
  }

  getLatestWorkoutPrograms(id) {
    return this.http.get<any>(this.api + "workouts/latest/" + id);
  }

  getArticles() {
    return this.http.get<Article[]>(this.api + "forum/articles/all");
  }

  saveArticle(article) {
    console.log(article)
    this.http.post<Article>(this.api + "forum/articles/add", article, this.options).subscribe();
  }

  deleteArticle(id) {
    this.http.delete<Article>(this.api + "forum/articles/" + id + "/delete");
  }

  getUsers() {
    return this.http.get<User[]>(this.api + 'users/count');
  }

  uploadImage(imageData) {
    this.http.post('http://localhost:8080/image/upload', imageData, {observe: 'response'}).subscribe()

  }

  getImage(imageName) {
    return this.http.get('http://localhost:8080/image/get/' + imageName)
  }

  addMealReview(id, review) {
    this.http.post(this.api + "reviews/add/meal/" + id, review).subscribe();
  }

  addWorkoutReviews(id, review) {
    this.http.post(this.api + "reviews/add/workout-plan/" + id, review).subscribe();
  }

  updateViews(id) {
    console.log("increment service")
    this.http.post(this.api + "forum/increment-views/" + id, new Object()).subscribe();
  }

  addComment(id, comment) {
    this.http.post<any>(this.api + "forum/articles/" + id + "/add-comment", comment, {observe: 'response'}).subscribe();
  }

}
