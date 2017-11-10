import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { BroadcasterService } from '../broadcaster.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  constructor(private postService: PostService,
              private userService: UserService,
              private broadcasterService: BroadcasterService) { }

  body: string;
  user: User = this.userService.currentUser;

  submitPost() {
    this.postService.createPost(this.body).subscribe(response => {
      this.broadcasterService.broadcast('postChange', response);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {

  }

}
