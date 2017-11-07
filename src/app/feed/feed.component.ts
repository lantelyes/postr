import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private postService: PostService) { }

  posts: Object[];

  ngOnInit() {
    this.postService.getFeed().subscribe(response => {
      this.posts = response.posts;
    }, error => {
      console.log(error);
    });
  }

}
