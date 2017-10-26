// auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    if(this.authService.loggedIn()) {
      console.log("Authorized");
      return true;
    } else {
      console.log("Un-authorized");
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}