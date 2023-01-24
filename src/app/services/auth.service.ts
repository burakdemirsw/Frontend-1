import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpHeaders } from "@capacitor/core";
import { AlertifyService } from "./alertify.service";



@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private alert: AlertifyService
  ) {}



  identityCheck() {

    const token: string = localStorage.getItem("accessToken");

    let expired: boolean;

    if (token == null) {
      expired = true;
      _isAuthenticated = false;
    } else if (this.jwtHelper.isTokenExpired(token) == true) {
      expired = true;
    } else {
      expired = false;
    }

    if (token != null && expired == false) {
      //aut etme komutu
      _isAuthenticated = true;


    }
    // _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): Boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;
