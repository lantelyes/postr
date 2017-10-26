import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';
import { AppConfig } from './app.config';
import 'rxjs/add/operator/map'

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  getProfile(user: User) {
    return this.http.put(AppConfig.API_ENDPOINT + '/profles' + user.username, this.jwt()).map((response: Response) => Object.assign(new Profile(), JSON.parse(response.json())));
  }

  followUser(user: User) {
    return this.http.post(AppConfig.API_ENDPOINT + '/profles' + user.username + '/follow', this.jwt()).map((response: Response) => Object.assign(new User(), JSON.parse(response.json())));
  }

  unfollowUser(user: User) {
    return this.http.delete(AppConfig.API_ENDPOINT + '/profles' + user.username + '/follow', this.jwt()).map((response: Response) => Object.assign(new User(), JSON.parse(response.json())));
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
