import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {

  constructor(private profileService: ProfileService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  profile: Object = {};

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.username)
    .subscribe(params => {
      this.setProfile(params.username);

    });
  }

  follow(username: string) {
    this.userService.followUser(username).subscribe(response => {
      this.profile['following'] = true;
    }, error => {
      console.log(error);
    })
  }

  unfollow(username: string) {
    this.userService.unfollowUser(username).subscribe(response => {
      this.profile['following'] = false;
    }, error => {
      console.log(error);
    })
  }

  setProfile(username: string) {
    this.profileService.getProfile(username).subscribe(response => {
      this.profile = response.profile;
    }, error => {
      console.log(error);
    });
  }

}
