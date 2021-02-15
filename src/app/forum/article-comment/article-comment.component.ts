import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Article } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnChanges {

  constructor(private service: DataService) { }
  @Input()article: Article;

  commentForm = new FormGroup({
    text: new FormControl('')
  })

  ngOnChanges(): void {
  }

  onSubmit() {
    let comment = {
      id: null,
      text: this.commentForm.value.text,
      submitter: null,
      submissionTime: null,
      rating: null
    }
    setTimeout(function() {
      window.location.reload()
    },5000)

    this.service.addComment(this.article.id, comment);
  }

}
