import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ResponseModel } from '../models/ResponseModel';

import { TrackDetail } from '../models/trackDetail';

import { SingleTrackDto } from '../models/DTOs/singleTrackDto';
import { UserService } from './user.service';
import { GlobalRequestService } from './global-request.service';
import { ApiUrls } from '../models/Consts/ApıUrls';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private globalService: GlobalRequestService
  ) {}

  getTrackFromApi(trackId: number): Observable<SingleTrackDto> {
    const url = `${ApiUrls.Domain+ApiUrls.GetTrack}/${trackId}`;
    return this.globalService.globalGet<SingleTrackDto>(url);
  }

  getTrackWithDetailFromApi(trackId: number): Observable<TrackDetail> {
    const url = `${ApiUrls.Domain+ApiUrls.TrackDetailById}/${trackId}`;
    return this.globalService.globalGet<TrackDetail>(url);
  }

  addTrack(formData: FormData): Observable<any> {
    return this.globalService.globalAdd<any>(ApiUrls.Domain+ApiUrls.AddTrack,formData);
  }
  updateTrack(trackUpdateDto: FormData): Observable<ResponseModel> {
    return this.globalService.globalUpdate<ResponseModel>(
      ApiUrls.Domain+ApiUrls.UpdateTrack,
      trackUpdateDto
    );
  }

  deleteTrack(trackId: number): Observable<any> {
    const url = `${ApiUrls.Domain+ApiUrls.DeleteTrack}/${trackId}`;
    return this.globalService.globalDelete<any>(url);
  }

  updateDownlaodNumberLoop(trackId: number): Observable<unknown> {
    const url = `${ApiUrls.Domain+ApiUrls.UpdateDownloadNumber}/${trackId}`;
    return this.httpClient.put<ResponseModel>(url, trackId);
  }

  getFormData(object: any): FormData {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }
}
