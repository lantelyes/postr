import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BroadcasterService } from '../broadcaster.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(private postService: PostService,
              private broadcasterService: BroadcasterService) { }

  posts: Object[];

  ngOnInit() {

    this.refreshPosts();

    this.broadcasterService.on<string>('postChange')
    .subscribe(message => {
      this.refreshPosts();
    });
    
  }

  refreshPosts() {
    this.postService.getAllPosts().subscribe(response => {
      this.posts = response.posts;
    }, error => {
      console.log(error);
    });
  }


}
