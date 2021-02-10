import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/data.model';

@Component({
  selector: 'app-article-thumbnail',
  templateUrl: './article-thumbnail.component.html',
  styleUrls: ['./article-thumbnail.component.css']
})
export class ArticleThumbnailComponent implements OnInit {

  constructor() { }
  @Input() article: Article;

  ngOnInit(): void {
  }

}
