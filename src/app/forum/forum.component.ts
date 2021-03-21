import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/data.model';
import { DataService } from '../shared/service/data.service';
import { OauthService } from '../shared/service/oauth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private service: DataService,
              private oauthService: OauthService) { }
  articles: Article[]
  currentArticle: Article;
  totalArticles: Number;
  page = 1;
  criteria = "All";
  searchTerm = '';

  ngOnInit(): void {
    document.getElementById('nutrition-nav').className = ''
    document.getElementById('workout-nav').className = ''
    document.getElementById('forum-nav').className = 'menu-active'
    document.getElementById('home-nav').className = ''
    document.getElementById('dropdown-nav').className = ''
    document.getElementById('login-nav').className = ''

    this.retrieveData(this.criteria)
  }

  changeCurrentArticle(currArticle) {
    this.currentArticle = currArticle
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveData(this.criteria)
  }

  retrieveData(criteria) {
    const params = this.getRequestParams(this.page, 4);

    this.service.getArticles(params, criteria)
      .subscribe(
        response => {
          const { articles, totalItems } = response;
          this.articles = articles;
          this.currentArticle = this.articles[0]
          this.totalArticles = totalItems;
        },
        error => {
          console.log(error);
        });
  }

  getRequestParams(page, pageSize) {

    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    params['title'] = this.searchTerm

    return params;
  }

  sortArticles() {
    this.retrieveData(this.criteria)
  }

  searchArticles() {
    this.retrieveData(this.criteria)
  }

  isAuthenticated() {
    return this.oauthService.checkUserLoggedIn()
  }

}
