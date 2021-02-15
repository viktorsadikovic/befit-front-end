import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Article } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-article-thumbnail',
  templateUrl: './article-thumbnail.component.html',
  styleUrls: ['./article-thumbnail.component.css']
})
export class ArticleThumbnailComponent implements OnChanges {

  constructor(private service: DataService) { }
  @Input() article: Article;
  @Output() eventClick = new EventEmitter<Article>();
  commentsCount;

  ngOnChanges(): void {   
      if(isNaN(this.article.comments?.length)) {
        this.commentsCount = 0;
      } else {
        this.commentsCount = this.article.comments?.length;
      }
  }

  sendData() {
    console.log(this.article)
    this.service.updateViews(this.article.id);
    this.eventClick.emit(this.article)
  }

}
