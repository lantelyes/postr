import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private userService: UserService) { }


  user: User = new User();

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

  ngOnInit() {

    this.userService.updateCurrentUser();


  }

}
