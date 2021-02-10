import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/shared/data.model';

@Component({
  selector: 'app-meal-thumbnail',
  templateUrl: './meal-thumbnail.component.html',
  styleUrls: ['./meal-thumbnail.component.css']
})
export class MealThumbnailComponent implements OnInit {

  constructor() { }
  @Input() meal: Meal

  ngOnInit(): void {
  }

}
