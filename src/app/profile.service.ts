import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';
import { AppConfig } from './app.config';
import { AuthenticationService } from './auth.service';
import 'rxjs/add/operator/map'

@Injectable()
export class ProfileService {

  constructor(private authHttp: AuthHttp) { }

  getProfile(username: string) {
    return this.authHttp.get(AppConfig.API_ENDPOINT + '/profiles/' + username, this.jwt()).map((response: Response) => response.json());
  }

  followUser(user: User) {
    return this.authHttp.post(AppConfig.API_ENDPOINT + '/profles' + user.username + '/follow', this.jwt()).map((response: Response) => Object.assign(new User(), JSON.parse(response.json())));
  }

  unfollowUser(user: User) {
    return this.authHttp.delete(AppConfig.API_ENDPOINT + '/profles' + user.username + '/follow', this.jwt()).map((response: Response) => Object.assign(new User(), JSON.parse(response.json())));
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        return new RequestOptions({ headers: headers });
    }
}

}
