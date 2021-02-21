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
              private oauthService: OauthService) { }

  isLogged: boolean;
  userLogged: SocialUser;


  ngOnInit(): void {
    console.log(this.oauthService.user)
    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        // this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
      }
    );
    this.isLogged = this.oauthService.isLoggedIn;
    console.log(this.isLogged)
    console.log(this.oauthService.user)
  }

  logOut() {
    this.authService.signOut().then(
      data => {
        this.tokenService.logOut();
        this.router.navigate(['/login']);
      }
    );
  }

}
