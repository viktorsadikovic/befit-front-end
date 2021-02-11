import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { WorkoutPlanComponent } from './workout-plan/workout-plan.component';
import { CreateWorkoutPlanComponent } from './workout-plan/create-workout-plan/create-workout-plan.component';
import { MealComponent } from './meal/meal.component';
import { CreateMealComponent } from './meal/create-meal/create-meal.component';
import { ForumComponent } from './forum/forum.component';
import { DataService } from '../app/shared/data.service';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { MealThumbnailComponent } from './meal/meal-thumbnail/meal-thumbnail.component';
import { ArticleThumbnailComponent } from './forum/article-thumbnail/article-thumbnail.component';
import { ArticleContentComponent } from './forum/article-content/article-content.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {MatSliderModule} from '@angular/material/slider';

import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { mealsInterceptor } from './interceptors/meals.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutPlanThumbnailComponent } from './workout-plan/workout-plan-thumbnail/workout-plan-thumbnail.component';
import { CreateArticleComponent } from './forum/create-article/create-article.component';
import { MealDetailsComponent } from './meal/meal-details/meal-details.component';
import { WorkoutPlanDetailsComponent } from './workout-plan/workout-plan-details/workout-plan-details.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    WorkoutPlanComponent,
    CreateWorkoutPlanComponent,
    MealComponent,
    CreateMealComponent,
    ForumComponent,
    MealThumbnailComponent,
    ArticleThumbnailComponent,
    ArticleContentComponent,
    WorkoutPlanThumbnailComponent,
    CreateArticleComponent,
    MealDetailsComponent,
    WorkoutPlanDetailsComponent,
    AddExerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [
    DataService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '863397394110-qkvobkibe4phn7d4lf0ai13sk5caubdg.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3989967751013966'),
          },
        ],
      }  as SocialAuthServiceConfig,
    },
    mealsInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
