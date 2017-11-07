import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { BroadcasterService } from '../broadcaster.service';
import { User } from '../models/user.model';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private profileService: ProfileService,
              private userService: UserService,
              private postService: PostService,
              private broadcasterService: BroadcasterService) { }

  @Input('post') post: Object;
  @Input('author') author: string;

  profile: Profile = new Profile();
  user: User = new User();
  commentBody: string = "";

  ngOnInit() {

    this.post['comments'] = [];

    this.refreshComments();
    this.profileService.getProfile(this.author).subscribe(response => {
      this.profile = response.profile;
    }, error => {
      console.log(error);
    });

    this.userService.getCurrent().subscribe(response => {
      this.user = response.user;
    }, error => {
      console.log(error);
    });
  }

  isPostOwner() {
    return this.user.username == this.author;
  }

  isCommentOwner(commentAuthor: string) {
    return this.user.username == commentAuthor;
  }

  follow(username: string) {
    this.userService.followUser(username).subscribe(response => {
      this.profile.following = true;
    }, error => {
      console.log(error);
    })
  }

  unfollow(username: string) {
    this.userService.unfollowUser(username).subscribe(response => {
      this.profile.following = false;
    }, error => {
      console.log(error);
    })
  }

  addComment() {
    this.postService.createComment(this.post['id'], this.commentBody).subscribe(response => {
      this.refreshComments();
    }, error => {
      console.log(error);
    });
  }

  deleteComment(commentId: string) {
    this.postService.deleteComment(this.post['id'], commentId).subscribe(response => {
      this.refreshComments();
    }, error => {
      console.log(error);
    });
  
  }

  refreshComments() {
    this.postService.getComments(this.post['id']).subscribe(response => {
      this.post['comments'] = response.comments;
    }, error => {
      console.log(error);
    });
  
  }

  toggleEditPost() {
    this.post['isEditing'] = !this.post['isEditing'];
  }
  
  deletePost() {
    this.postService.deletePost(this.post['id']).subscribe(response => {
      this.broadcasterService.broadcast('postChange', this.post['id']);
    }, error => {
      console.log(error);
    });
  }

  updatePost() {
    this.postService.updatePost(this.post['id'], this.post['editBody']).subscribe(response => {
      this.toggleEditPost();
      this.post['body'] = this.post['editBody'];
    }, error => {
      console.log(error);
    });
  }

  favoritePost() {
    this.postService.favoritePost(this.post['id']).subscribe(response => {
      this.post['favorited'] = true;
      this.post['favoritesCount'] += 1;
    }, error => {
      console.log(error);
    });
  }

  unfavoritePost() {
    this.postService.unfavoritePost(this.post['id']).subscribe(response => {
      this.post['favorited'] = false;
      this.post['favoritesCount'] -= 1;
    }, error => {
      console.log(error);
    });
  }

}
