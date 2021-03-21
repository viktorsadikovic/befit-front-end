import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/service/data.service';
import { OauthService } from 'src/app/shared/service/oauth.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnChanges {

  constructor(private service: DataService,
              private oauthService: OauthService) { }
  @Input()article: Article;

  commentForm = new FormGroup({
    text: new FormControl('', Validators.required)
  })

  get text() { return this.commentForm.get('text'); }


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

    this.service.addComment(this.article.id, comment).subscribe(data => {
      window.location.reload();
    });
  }

  isAuthenticated() {
    return this.oauthService.checkUserLoggedIn()
  }

}
