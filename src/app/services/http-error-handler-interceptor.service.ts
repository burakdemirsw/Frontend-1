import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AlertifyService } from './alertify.service';
import { _isAuthenticated } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private alertifyService: AlertifyService,
    private userService: UserService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        switch (err.status) {
          case HttpStatusCode.Unauthorized:
            this.alertifyService.warning('Unauthorized Access');
            this.userService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{
            })
            var str = err.error;
            var splitted = str.split('End', 1);
            this.alertifyService.error(splitted[0]);


            break;

          case HttpStatusCode.InternalServerError:
            this.alertifyService.warning('InternalServerError');

            var str = err.error;
            var splitted = str.split('End', 1);
            // this.alertifyService.error(splitted[0]);
            console.log(str)

            break;

          case HttpStatusCode.BadRequest:
            this.alertifyService.warning('BadRequest');

            var str = err.error;
            var splitted = str.split('End', 1);
            this.alertifyService.error(splitted[0]);

            break;

          case HttpStatusCode.NotFound:
            this.alertifyService.warning('NotFound');

            var str = err.error;
            var splitted = str.split('End', 1);
            console.log(splitted);
            this.alertifyService.error(splitted[0]);

            console.log(err);

            break;

          default:
            this.alertifyService.warning('SomeError');
            console.log(err);
            break;
        }
        return of(err);
      })
    );
  }
}
