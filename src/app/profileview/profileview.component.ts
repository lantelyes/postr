import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute) { }

  profile: Object = {};

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.username)
    .subscribe(params => {
      this.setProfile(params.username);

    });
  }

  setProfile(username: string) {
    this.profileService.getProfile(username).subscribe(response => {
      this.profile = response.profile;
      console.log(this.profile);
    }, error => {
      console.log(error);
    });
  }

}
