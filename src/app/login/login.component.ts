import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginUserCommandResponse } from '../models/IdentityDTOs/loginUserCommandResponse';
import { User } from '../models/user';
import { UserDetail } from '../models/userDetail';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // loginForm!: FormGroup;
  homepageUrl = 'http://localhost:4200/Homepage';
  loginpageUrl = 'http://localhost:4200/Login';
  userRequestForm!: FormGroup;
  user: User = new User();

  userDetails: UserDetail[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private socialAuthService: SocialAuthService
  ) {
    this.spinner.show();
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      switch (user.provider) {
        case 'GOOGLE':
          this.userService.googleLoginNewUser(user); //google

          break;
        case 'FACEBOOK':
          this.userService.facebookLoginNewUser(user); //facebook 1

          break;
      }
    });

    this.spinner.hide();
  }

  facebookLogin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  createUserRequestForm() {
    this.userRequestForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.alertifyService.alert("zort","fort")
    this.createUserRequestForm();

    this.getUserDetail().subscribe((data) => {
      this.userDetails = data;
    });
  }

  getUserDetail() {
    return this.httpClient.get<UserDetail[]>(
      'http://localhost:5191/Users/UserDetails'
    );
  }

  async loginSubmitted() {
    this.spinner.show();
    let userModel = Object.assign({}, this.userRequestForm.value);
    let response: LoginUserCommandResponse;
    if (this.userRequestForm.valid) {
      response = await this.userService.loginNewUser(userModel);
      if (response.boolean === false) {
        this.authService.identityCheck();

        this.alertifyService.error('Access Denied.Username or password wrong!');
      } else if (response.boolean == null) {
        this.authService.identityCheck();

        this.alertifyService.error('Access Denied.Username or password wrong!');
      }
    } else {
      this.alertifyService.warning(
        'Access Denied.Username or password wrong!' + '!'
      );
      this.spinner.hide();
    }
    this.spinner.hide();
  }
}
