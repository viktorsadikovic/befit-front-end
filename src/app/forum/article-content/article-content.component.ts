import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css']
})
export class ArticleContentComponent implements OnChanges {

  constructor(private service: DataService) { }
  @Input() article: Article;

  ngOnChanges(): void {
    console.log(this.article)
    console.log("zgolemi")

  }

}
