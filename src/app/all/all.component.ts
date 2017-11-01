import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(private postService: PostService) { }

  posts: Object[];

  ngOnInit() {

    this.postService.getAllPosts().subscribe(response => {
      this.posts = response.posts;
    }, error => {
      console.log(error);
    });
    

  }

}
