import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/shared/data.model';

@Component({
  selector: 'app-article-thumbnail',
  templateUrl: './article-thumbnail.component.html',
  styleUrls: ['./article-thumbnail.component.css']
})
export class ArticleThumbnailComponent implements OnInit {

  constructor() { }
  @Input() article: Article;
  @Output() eventClick = new EventEmitter<Article>();

  ngOnInit(): void {
  }

  sendData() {
    this.eventClick.emit(this.article)
  }

}
