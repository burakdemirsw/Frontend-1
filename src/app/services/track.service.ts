import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ResponseModel } from '../models/ResponseModel';

import { TrackDetail } from '../models/trackDetail';

import { SingleTrackDto } from '../models/DTOs/singleTrackDto';
import { UserService } from './user.service';
import { GlobalRequestService } from './global-request.service';



@Injectable({
  providedIn: 'root',
})

export class TrackService {
  apiUrl = 'http://localhost:5191/Tracks/Add';
  getPath2 = 'http://localhost:5191/Tracks/Delete';
  getPath3 = 'http://localhost:5191/Tracks/Get';
  apiUrl2 = 'http://localhost:5191/tracks/Update';
  apiUrl3 = 'http://localhost:5191/TracksDetail/Add';
  apiUrl4 = 'http://localhost:5191/Tracks/TrackDetailsById';
  apiUrl5 = 'http://localhost:5191/Tracks/Getall';
  apiUrl6 = 'http://localhost:5191/Tracks/U pdateDN';


  constructor(
    private httpClient: HttpClient,
    private userService:UserService,
    private globalService:GlobalRequestService,
  ) {}

  getTrackFromApi(trackId: number): Observable<SingleTrackDto> {
    //
    const url = `${this.getPath3}/${trackId}`;
    return this.globalService.globalGet<SingleTrackDto>(url)
    // return this.httpClient.get<SingleTrackDto>(url);
  }

  getTrackWithDetailFromApi(trackId: number): Observable<TrackDetail> {
    //
    const url = `${this.apiUrl4}/${trackId}`;
    return this.globalService.globalGet<TrackDetail>(url)

    // let result = this.httpClient.get<TrackDetail>(url);
    // // console.log(result)
    // return result;
  }

  // getTracks() {
  //   return this.httpClient.get<Track[]>(this.apiUrl5);
  // }

  addTrack(
    formData : FormData
  ): Observable<any> {
    return this.globalService.globalAdd<any>(this.apiUrl,formData);


  }
  updateTrack(
    trackUpdateDto : FormData
  ): Observable<ResponseModel> {
    return this.globalService.globalUpdate<ResponseModel>(this.apiUrl2,trackUpdateDto)
  }

  deleteTrack(trackId: number): Observable<any> {
    // const _myTokenValue = this.userService.getMyToken();
    // if (_myTokenValue) {
    //   const headers = new HttpHeaders({
    //     Authorization: 'Bearer ' + _myTokenValue,
    //   });
    //   const url = `${this.getPath2}/${trackId}`;
    //   return this.httpClient.delete<any>(url);
    // }
    const url = `${this.getPath2}/${trackId}`;
   return this.globalService.globalDelete<any>(url)

  }

  updateDownlaodNumberLoop(trackId: number): Observable<unknown> {
    const url = `${this.apiUrl6}/${trackId}`;
    return this.httpClient.put<ResponseModel>(url,trackId);
  }

  getFormData(object:any) : FormData {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}
}
