import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private profileService: ProfileService,
              private userService: UserService) { }

  @Input('post') post: Object;
  @Input('author') author: string;

  profile: Profile = new Profile();

  ngOnInit() {

    this.profileService.getProfile(this.author).subscribe(response => {
      this.profile = response.profile;
    }, error => {
      console.log(error);
    });
  }

}
