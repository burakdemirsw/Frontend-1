import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { _isAuthenticated } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NewLoginGuard implements CanActivate {

  constructor(private jwtHelper : JwtHelperService,private router : Router,private alertifySerice: AlertifyService,private userService : UserService){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    {
       if (!_isAuthenticated) {
        this.router.navigate(["Login"],{queryParams:{returnUrl: state.url}});
        this.alertifySerice.warning("Please Log-In")
      }

    return true;
  }

}
