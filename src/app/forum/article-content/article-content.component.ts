import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { OauthService } from 'src/app/shared/oauth.service';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css']
})
export class ArticleContentComponent implements OnChanges {

  constructor(private service: DataService,
              private oauthService: OauthService) { }
  @Input() article: Article;

  ngOnChanges(): void {
    console.log(this.article)
    console.log("zgolemi")

  }

  isAuthenticated() {
    return this.oauthService.checkUserLoggedIn()
  }

  isCreator() {
    if(!this.oauthService.checkUserLoggedIn()) {
      return false;
    }
    return this.article?.submitter?.email === this.oauthService.getCurrentUser().email
  }

  delete() {
    this.service.deleteArticle(this.article.id).subscribe(data => {
      // this.router.navigate(['/forum'])

      setTimeout(function() {
        window.location.reload()
      }, 1000)
    })
  }

}
