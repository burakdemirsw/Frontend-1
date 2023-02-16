import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TrackDetail } from '../models/trackDetail';
import { AlertifyService } from './alertify.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalRequestService {
  constructor(
    private userService: UserService,
    private httpClient: HttpClient,
    private alertifyService: AlertifyService
  ) {}

  globalGet<T>(path: string): Observable<any> {
    const _myTokenValue = this.userService.getMyToken();
    if (_myTokenValue) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + _myTokenValue,
      });
      return this.httpClient.get<T[]>(path, { headers });
    }else{

      this.alertifyService.error("globalGet işlemi sırasında hata oluştu!")
      return this.httpClient.get<T[]>(path);

    }

  }


  globalDelete<T>(path: string): Observable<any> {
    const _myTokenValue = this.userService.getMyToken();
    if (_myTokenValue) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + _myTokenValue,
      });
      return this.httpClient.delete<T>(path, { headers });
    }else{
      this.alertifyService.error("globalDelete işlemi sırasında hata oluştu!")
      return null;

    }

  }


  globalUpdate<T>(path: string,trackUpdateDto:FormData): Observable<any> {
    const _myTokenValue = this.userService.getMyToken();
    if (_myTokenValue) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + _myTokenValue,
      });
      return this.httpClient.put<T>(path, trackUpdateDto,{ headers });
    }else{
      this.alertifyService.error("globalUpdate işlemi sırasında hata oluştu!")
      return null;

    }

  }


  globalAdd<T>(path: string,trackUpdateDto:FormData): Observable<any> {
    const _myTokenValue = this.userService.getMyToken();
    if (_myTokenValue) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + _myTokenValue,
      });
      return this.httpClient.post<T>(path, trackUpdateDto,{ headers });
    }else{
      this.alertifyService.error("globalUpdate işlemi sırasında hata oluştu!")
      return null;

    }

  }
}
