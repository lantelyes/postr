import { Injectable } from '@angular/core';
import { Http, Headers, Response, ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { AppConfig } from './app.config';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    loggedIn() {
        return tokenNotExpired('id_token');
      }
 
    login(user: User): Observable<Response> {
        return this.http.post(AppConfig.API_ENDPOINT + '/users/login', {user: user})
            .map((response: Response) => {
                return response
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('id_token');
        localStorage.removeItem('currentUser');

        this.router.navigate(['/feed']);
    }

    storeToken(response: Response, user: User): Response {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().user.token;

        // set token property
        this.token = token;

        // store username and local storage 
        localStorage.setItem('id_token', token);

        localStorage.setItem('currentUser', JSON.stringify({ email: user.email, username: user.username }));

        // return true to indicate successful login
        return response;
    }
}