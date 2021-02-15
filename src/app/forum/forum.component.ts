import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/data.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private service: DataService) { }
  articles: Article[]
  currentArticle: Article;

  ngOnInit(): void {
    document.getElementById('nutrition-nav').className = ''
    document.getElementById('workout-nav').className = ''
    document.getElementById('forum-nav').className = 'menu-active'
    document.getElementById('home-nav').className = ''
    document.getElementById('login-nav').className = ''

    this.service.getArticles().subscribe(data => {
      this.articles = data;
      this.currentArticle = this.articles[0]
    })

  }

  changeCurrentArticle(currArticle) {
    console.log(currArticle)
    this.currentArticle = currArticle
  }
}
