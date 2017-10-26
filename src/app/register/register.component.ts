import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }


  user:User = new User();
  errorMsg: string;

  register() {
    this.userService.createUser(this.user)
      .subscribe(response => { 
            // login successful
            this.router.navigate(['/']);
        }, error => {
            // login failed
            this.errorMsg = 'Error logging in';
        });
  }

  ngOnInit() {

  }



}
