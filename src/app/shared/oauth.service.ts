import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { TokenDto } from './data.model';
import { Observable, of } from 'rxjs';

const options = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http: HttpClient) { }
  user;
  isLoggedIn = false;
  @Output() event: EventEmitter<any> = new EventEmitter();


  oauthURL = 'http://localhost:8080/oauth/';

  public google(tokenDto: TokenDto): Observable<TokenDto> {
    console.log(tokenDto + " oauth-service")
    return this.http.post<TokenDto>(this.oauthURL + 'google', tokenDto, options);
  }

  public facebook(tokenDto: TokenDto): Observable<TokenDto> {
    console.log(tokenDto + " oauth-service")
    return this.http.post<TokenDto>(this.oauthURL + 'facebook', tokenDto, options);
  }

  checkUserLoggedIn() {
    if(localStorage.getItem("user") === null || localStorage.getItem("user") ===  undefined) {
      return false;
    } else {
      return true;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"))
  }

  updateUser(newUser){
    localStorage.removeItem("user")
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  getUserEmail() {
    let user = this.getCurrentUser()
    return user.email
  }

}
