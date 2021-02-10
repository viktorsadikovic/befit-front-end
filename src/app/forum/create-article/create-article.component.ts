import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(private router:Router) { }
  article = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(),
    description: new FormControl(),
    submitter:  new FormControl(null),
    submissionTime: new FormControl(Date.now),
    comments:  new FormControl(null)
  })

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.article.value)
    window.location.reload()
  }

}
