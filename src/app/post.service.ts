import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';
import { AppConfig } from './app.config';
import 'rxjs/add/operator/map'

@Injectable()
export class PostService {

    constructor(private http: Http) { }

    getAllPosts() {
        return this.http.get(AppConfig.API_ENDPOINT + '/posts', this.jwt()).map((response: Response) => response.json());
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
