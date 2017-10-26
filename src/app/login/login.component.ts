import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMsg: String = new String();

  constructor(
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private router: Router,
    private authService: AuthenticationService) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.user)
    .subscribe(response => {
          // login successful
          this.authService.storeToken(response, this.user)
          this.router.navigate(['/feed']);
        }, error => {
          // login failed

          //TDOD less duct tape
          var errorBody = JSON.parse(error._body).error;
          this.toastr.error(errorBody.path + " " + errorBody.message, 'Oops!');
        }
      );
  }

}
