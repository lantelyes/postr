import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';
import { AppConfig } from './app.config';
import 'rxjs/add/operator/map'

@Injectable()
export class PostService {

    constructor(private authHttp: AuthHttp) { }

    getAllPosts(offset: number) {
        return this.authHttp.get(AppConfig.API_ENDPOINT + '/posts' +'?limit=' + AppConfig.POSTS_PER_PAGE + '&offset=' + offset, this.jwt()).map((response: Response) => response.json());
    }

    getFeed() {
        return this.authHttp.get(AppConfig.API_ENDPOINT + '/posts/feed', this.jwt()).map((response: Response) => response.json());
    }

    getComments(postId: string) {
        return this.authHttp.get(AppConfig.API_ENDPOINT + '/posts/' + postId + '/comments', this.jwt()).map((response: Response) => response.json());
    }

    createComment(postId: string, commentBody: string) {
        return this.authHttp.post(AppConfig.API_ENDPOINT + '/posts/' + postId + '/comments', {comment: {body: commentBody}}, this.jwt()).map((response: Response) => response.json());
    }

    deleteComment(postId: string, commentId: string) {
        return this.authHttp.delete(AppConfig.API_ENDPOINT + '/posts/' + postId + '/comments/' + commentId, this.jwt()).map((response: Response) => response.json());
    }

    createPost(postBody: string) {
        return this.authHttp.post(AppConfig.API_ENDPOINT + '/posts', {post: {body: postBody}}, this.jwt()).map((response: Response) => response.json());
    }

    updatePost(postId: string, postBody: string) {
        return this.authHttp.put(AppConfig.API_ENDPOINT + '/posts/' + postId, {post: {body: postBody}}, this.jwt()).map((response: Response) => response.json());
    }

    deletePost(postId: string) {
        return this.authHttp.delete(AppConfig.API_ENDPOINT + '/posts/' + postId, this.jwt()).map((response: Response) => response.json());
    }

    favoritePost(postId: string) {
        return this.authHttp.post(AppConfig.API_ENDPOINT + '/posts/' + postId + '/favorite' , this.jwt()).map((response: Response) => response.json());
    }

    unfavoritePost(postId: string) {
        return this.authHttp.delete(AppConfig.API_ENDPOINT + '/posts/' + postId + '/favorite' , this.jwt()).map((response: Response) => response.json());
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
