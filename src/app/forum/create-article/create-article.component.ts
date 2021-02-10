import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(private router:Router, private service: DataService) { }
  article = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(),
    description: new FormControl(),
    submitter:  new FormControl(null),
    submissionTime: new FormControl(new Date()),
    comments:  new FormControl(null)
  })

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.article.value)
    this.service.saveArticle(this.article.value)
    // window.location.reload()
  }

}
