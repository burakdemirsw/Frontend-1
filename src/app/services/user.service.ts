import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { first, firstValueFrom, Observable } from 'rxjs';
import { ResponseModel } from '../models/ResponseModel';
import { AlertifyService } from './alertify.service';

import { UserDetailDTO } from '../models/DTOs/userDetailDTO';
import { UserDTO } from '../models/DTOs/userDTO';
import { CreateUserDTO } from '../models/DTOs/createUserDetailDTO';

import { AddUserDTO } from '../models/DTOs/AddUserDTO';
import { AddNewUserDTO } from '../models/DTOs/addNewUserDTO';
import { Token } from '../models/IdentityDTOs/token';
import { LoginUserCommandResponse } from '../models/IdentityDTOs/loginUserCommandResponse';
import { SocialUser } from '@abacritt/angularx-social-login/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, _isAuthenticated } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:5191/Users/Add';
  apiUrl3 = 'http://localhost:5191/AppUser/Add';
  apiUrl4 = 'http://localhost:5191/AppUser/Login';
  apiUrl5 = 'http://localhost:5191/AppUser/Google-Login';
  apiUrl6 = 'http://localhost:5191/AppUser/Facebook-Login';
  apiUrl7 = 'http://localhost:5191/AppUser/RefreshToken';

  constructor(
    private httpClient: HttpClient,

    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertifyService: AlertifyService,
  ) {}

  addNewUser(addUserdto: AddUserDTO): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl3, addUserdto);
  }

  async loginNewUser(addNewUserDTO: AddNewUserDTO): Promise<any> {
    const obs: Observable<any> = this.httpClient.post(
      this.apiUrl4,
      addNewUserDTO
    );

    const response: LoginUserCommandResponse | any = (await firstValueFrom(
      obs
    )) as LoginUserCommandResponse;

    if (response.token) {
      if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken');
      }
      localStorage.setItem('accessToken', response.token.accessToken);
      _myToken = response.token.accessToken;
      localStorage.setItem('refreshToken', response.token.refreshToken);


      this.authService.identityCheck();
      this.activatedRouteService();
    } else if (response.token == null) {
      this.authService.identityCheck();
      this.activatedRouteService();
    }

    return response;
  }

  async refreshTokenLogin(refreshToken: string): Promise<any> {
    const obs: Observable<any> = this.httpClient.post(this.apiUrl7, {
      refreshToken: refreshToken,
    });

    const response: LoginUserCommandResponse = (await firstValueFrom(
      obs
    )) as LoginUserCommandResponse;

    if (response.boolean == true) {


      if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken');
      }
      localStorage.setItem('accessToken', response.token.accessToken);
      _myToken = response.  token.accessToken;
      localStorage.setItem('refreshToken', response.token.refreshToken);
      this.authService.identityCheck();
      this.activatedRoute2("Homepage")

    } else if (response.boolean == false) {
      this.alertifyService.error("refreshtokentime")

      localStorage.removeItem('refreshToken');

      localStorage.removeItem('accessToken');

      _myToken = null;
      this.authService.identityCheck();
       this.activatedRoute2('Login')
    }

    return response;
  }
  activatedRouteService() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let returnUrl: string = params['returnUrl'];
      if (returnUrl) {
        this.router.navigate([returnUrl]);
      }else{
        this.router.navigate(["Homepage"]);
      }
    });
  }

  activatedRoute2(toUrl:string) {
    this.router.navigate([toUrl]);
  }

  googleLoginNewUser(user: SocialUser): LoginUserCommandResponse {
    const obs: Observable<any> = this.httpClient.post(this.apiUrl5, user);
    let response: LoginUserCommandResponse;
    this.externalValidator(response, obs);

    return response;
  }

  facebookLoginNewUser(user: SocialUser): LoginUserCommandResponse {
    const obs: Observable<any> = this.httpClient.post(this.apiUrl6, user);

    let response: LoginUserCommandResponse;

    this.externalValidator(response, obs);

    return response;
  }

  getMyToken(): string {
    if (_myToken) {
      return _myToken;
    }
    return null;
  }

  setMyToken(): void{
    let accessToken = localStorage.getItem("accessToken")
    if (accessToken.length>0) {
      _myToken=accessToken
    }else{
      this.alertifyService.error("accessToken Bulunamadı")
    }
  }
  externalValidator(
    response: LoginUserCommandResponse,
    obs: Observable<any | Token>
  ): void {
    obs.pipe(first()).subscribe((data) => {
      response = data as LoginUserCommandResponse;
      console.log(
        'boolean:' +
          response.boolean +
          '\n' +
          'token:' +
          response.token.accessToken +
          '\n' +
          response +
          'refreshToken: \n' +
          response.token.refreshToken
      );
      console.log(
        'boolean:' + data.boolean + '\n' + 'token:' + data.token.accessToken
      );

      if (response.boolean == true) {
        if (localStorage.getItem('accessToken')) {
          localStorage.removeItem('accessToken');
        }
        localStorage.setItem('accessToken', response.token.accessToken);
        console.log(
          '1--->token başarılı şekilde oluştu:\n' + response.token.accessToken
        );

        _myToken = response.token.accessToken;

        localStorage.setItem('refreshToken', response.token.refreshToken);

        this.authService.identityCheck();
        this.activatedRouteService();
      } else if (response.boolean == false) {
        this.authService.identityCheck();
        this.activatedRouteService();
        console.log('no response!');
      }
    });
  }
}

export let _myToken: string;
