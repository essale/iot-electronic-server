import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardLogin implements CanActivate {

  constructor(public auth: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedIn = this.auth.loggedIn;
    if (loggedIn) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
