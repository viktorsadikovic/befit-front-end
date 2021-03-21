import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import { OauthService } from 'src/app/shared/service/oauth.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(private router:Router,
              private service: DataService,
              private oauthService: OauthService) { }
  article = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    submitter:  new FormControl(null),
    submissionTime: new FormControl(new Date()),
    comments:  new FormControl(null)
  })

  get title() { return this.article.get('title'); }

  get description() { return this.article.get('description'); }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.oauthService.checkUserLoggedIn()) {
      this.service.saveArticle(this.article.value).subscribe(data => {
        window.location.reload()
      })
    } else {
      this.router.navigate(['/login'])
    }

  }

}
