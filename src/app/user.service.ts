import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { User } from './models/user.model';
import { AppConfig } from './app.config';
import { AuthenticationService } from './auth.service';
import 'rxjs/add/operator/map'
 
@Injectable()
export class UserService {
  constructor(private http: Http,
              private authHttp: AuthHttp,
              private authService: AuthenticationService) { }

  public currentUser: User = new User();

  updateCurrentUser() {
      return this.authHttp.get(AppConfig.API_ENDPOINT + '/user', this.jwt()).map((response: Response) => {
          this.currentUser = response.json().user;
      });
  }

  createUser(user: User) {
      return this.http.post(AppConfig.API_ENDPOINT + '/users', {user: user}, this.jwt()).map((response: Response) => {
        return this.authService.storeToken(response, user);
      });
    
  }

  followUser(username: string) {
    return this.authHttp.post(AppConfig.API_ENDPOINT + '/profiles/' + username + '/follow', this.jwt()).map((response: Response) => response.json());
  }

  unfollowUser(username: string) {
    return this.authHttp.delete(AppConfig.API_ENDPOINT + '/profiles/' + username + '/follow', this.jwt()).map((response: Response) => response.json());
  }

  updateUser(user: User) {
      return this.authHttp.put(AppConfig.API_ENDPOINT + '/user', {user: user}, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let token = localStorage.getItem('id_token');

      if (currentUser && currentUser.token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + token });
          return new RequestOptions({ headers: headers });
      }
  }
}