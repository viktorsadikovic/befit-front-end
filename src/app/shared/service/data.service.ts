import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, Exercise, Meal, User, WorkoutPlan } from '../data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  api = "http://localhost:8080/";
  options = { headers: new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'})}
  optionsImage = { headers: new HttpHeaders({'Content-Type': 'multipart/form-data; charset=UTF-8'})}

  getExercises(params){
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

  getMeals(params, criteria) {
    return this.http.get<any>(this.api + "meals/all/" + criteria, { params });
  }

  getFavoriteMeals(params) {
    return this.http.get<any>(this.api + "users/favorite-meals", { params });
  }

  getMyMeals(params, email) {
    return this.http.get<any>(this.api + "users/" + email + "/meals", { params });
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
    return this.http.post(this.api + "meals/add", meal, {observe: 'response' });
  }

  editMeal(meal) {
    return this.http.post(this.api + "meals/edit", meal, {observe: 'response' });
  }

  deleteMeal(id) {
    return this.http.post<any>(this.api + "meals/" + id + "/delete", null, {observe: 'response' });
  }

  getWorkoutPlans(params, criteria) {
    return this.http.get<any>(this.api + "workouts/all/" + criteria, {params});
  }

  getFavoriteWorkoutPlans(params) {
    return this.http.get<any>(this.api + "users/favorite-workout-plans" , { params });
  }

  getMyWorkoutPlans(params, email) {
    return this.http.get<any>(this.api + "users/" + email + "/workout-plans", { params });
  }

  getWorkoutPlansCount() {
    return this.http.get<WorkoutPlan[]>(this.api + "workouts/count");
  }

  getSingleWorkoutPlan(id) {
    return this.http.get<WorkoutPlan>(this.api + "workouts/" + id);
  }

  createWorkoutPlan(workoutPlan) {
    return this.http.post<any>(this.api + "workouts/add", workoutPlan, {observe: 'response' });
  }

  editWorkoutPlan(workoutPlan) {
    return this.http.post<any>(this.api + "workouts/edit", workoutPlan, {observe: 'response' });
  }

  deleteWorkoutPlan(id) {
    return this.http.post<any>(this.api + "workouts/" + id + "/delete", null, {observe: 'response' });
  }

  getTrendingWorkoutPrograms(id) {
    return this.http.get<any>(this.api + "workouts/trending/" + id);
  }

  getLatestWorkoutPrograms(id) {
    return this.http.get<any>(this.api + "workouts/latest/" + id);
  }

  getArticles(params, criteria) {
    return this.http.get<any>(this.api + "forum/articles/all/" + criteria, {params});
  }

  getSortedArticles(params, criteria) {
    return this.http.get<any>(this.api)
  }

  saveArticle(article) {
    return this.http.post<Article>(this.api + "forum/articles/add", article, this.options);
  }

  deleteArticle(id) {
    return this.http.post<any>(this.api + "forum/articles/" + id + "/delete", null, {observe: 'response'});
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
    return this.http.post(this.api + "reviews/add/meal/" + id, review);
  }

  addWorkoutReviews(id, review) {
    return this.http.post(this.api + "reviews/add/workout-plan/" + id, review);
  }

  updateViews(id) {
    this.http.post(this.api + "forum/increment-views/" + id, new Object()).subscribe();
  }

  addComment(id, comment) {
    return this.http.post<any>(this.api + "forum/articles/" + id + "/add-comment", comment, {observe: 'response'});
  }

  deleteComment(id, comment, articleId) {
    return this.http.post<any>(this.api + "forum/" + articleId + "/comments/" + id + "/delete", comment, {observe: 'response'})
  }

  upVote(id) {
    return this.http.post<any>(this.api + "forum/comments/" + id + "/change-rating/upVote", id)
  }

  downVote(id) {
    return this.http.post<any>(this.api + "forum/comments/" + id + "/change-rating/downVote", id)
  }

  addMealToFavorites(id) {
    return this.http.post<any>(this.api + "meals/" + id + "/add-to-favorites", id);
  }

  removeMealFromFavorites(id) {
    return this.http.post<any>(this.api + "meals/" + id + "/remove-from-favorites", id)
  }

  addWorkoutProgramToFavorites(id) {
    return this.http.post<any>(this.api + "workouts/" + id + "/add-to-favorites", id);
  }

  removeWorkoutProgramFromFavorites(id) {
    return this.http.post<any>(this.api + "workouts/" + id + "/remove-from-favorites", id)
  }

  getCurrentUser() {
    return this.http.get(this.api + "auth/current-user");
  }

  login(loginDto) {
    return this.http.post<any>(this.api + "auth/login", loginDto)
  }

  register(user) {
    return this.http.post<any>(this.api + "auth/register", user, {observe: 'response' });
  }

  logout() {
    return this.http.post<any>(this.api + "auth/logout", null).subscribe()
  }

  sendEmail(data) {
    return this.http.post("https://formspree.io/f/mnqoelqq", {
      name: data.name,
      _subject: data.subject,
      _replyto: data.email,
      message: data.message
    },
    this.options
    )
  }

}
