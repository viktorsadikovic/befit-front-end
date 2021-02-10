import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/data.model';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css']
})
export class ArticleContentComponent implements OnInit {

  constructor() { }
  // @Input() article: Article

  ngOnInit(): void {
  }

}
