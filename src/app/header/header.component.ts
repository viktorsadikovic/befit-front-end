import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { OauthService } from '../shared/oauth.service';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: SocialAuthService,
              private router: Router,
              private tokenService: TokenService,
              private oauthService: OauthService) {

               }

  isLogged: boolean;
  userLogged: SocialUser;


  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
      }
    );

    this.isLogged = this.oauthService.checkUserLoggedIn()
  }

  logOut() {
    this.tokenService.logOut();
    this.isLogged = false;
  }

  isAuthenticated() {
    return this.oauthService.checkUserLoggedIn()
  }

}
