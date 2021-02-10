import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from './data.model';
import { Observable } from 'rxjs';

const options = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private http: HttpClient) { }
  user;


  oauthURL = 'http://localhost:8080/oauth/';

  public google(tokenDto: TokenDto): Observable<TokenDto> {
    console.log("test")
    return this.http.post<TokenDto>(this.oauthURL + 'google', tokenDto, options);
  }

  public facebook(tokenDto: TokenDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(this.oauthURL + 'facebook', tokenDto, options);
  }
}
