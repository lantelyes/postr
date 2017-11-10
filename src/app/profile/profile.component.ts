import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }


  user: User = this.userService.currentUser;
  userEdit: User = Object.assign({}, this.user);

  saveUser(user: User) {
    this.userService.updateUser(user).subscribe(response => {
      this.refreshUser();

    }, error => {
      console.log(error);
    });
  }

  refreshUser() {
    this.userService.updateCurrentUser();
  }


  ngOnInit() {

    this.refreshUser();


  }


}
