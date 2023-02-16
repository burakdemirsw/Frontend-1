import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from '../models/Consts/ApıUrls';
import { CreateLoopDTO } from '../models/DTOs/createLoopDTO';
import { CreateTrackDTO } from '../models/DTOs/createTrackDTO';
import { LoopDetailDTO } from '../models/DTOs/LoopDetailDTO';
import { LoopDTO } from '../models/DTOs/loopDTO';
import { TrackDetailDTO } from '../models/DTOs/trackDetailDTO';
import { TrackDTO } from '../models/DTOs/trackDTO';
import { Loop } from '../models/loop';
import { LoopDetail } from '../models/loopDetail';
import { ResponseModel } from '../models/ResponseModel';
import { Track } from '../models/track';
import { TrackDetail } from '../models/trackDetail';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root',
})
export class LoopService {
  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService
  ) {}

  getLoopFromApi(loopId: number): Observable<Loop> {
    const url = `${ApiUrls.Domain + ApiUrls.GetLoop}/${loopId}`;
    return this.httpClient.get<Loop>(url);
  }

  getLoopWithDetailFromApi(loopId: number): Observable<LoopDetail> {
    const url = `${ApiUrls.Domain + ApiUrls.TrackDetailById}/${loopId}`;
    let result = this.httpClient.get<LoopDetail>(url);
    return result;
  }

  getLoops(): Observable<any> {
    return this.httpClient.get<Loop[]>(ApiUrls.Domain + ApiUrls.GetAllLoops);
  }

  addPost(
    loopdto: LoopDTO,
    loopDetaildto: LoopDetailDTO
  ): Observable<ResponseModel> {
    let createLoopDTO = new CreateLoopDTO(loopdto, loopDetaildto);
    return this.httpClient.post<ResponseModel>(
      ApiUrls.Domain + ApiUrls.AddLoop,
      createLoopDTO
    );
  }

  updatePost(
    loopDTO: LoopDTO,
    loopDetailDTO: LoopDetailDTO
  ): Observable<ResponseModel> {
    let createLoopDTO = new CreateLoopDTO(loopDTO, loopDetailDTO);
    return this.httpClient.put<ResponseModel>(
      ApiUrls.Domain + ApiUrls.UptadateLoop,
      createLoopDTO
    );
  }

  deleteLoop(loopId: number): Observable<any> {
    const url = `${ApiUrls.Domain + ApiUrls.DeleteLoop}/${loopId}`;
    return this.httpClient.delete(url);
  }

  updateDownlaodNumberLoop(loopId: number): Observable<any> {
    const url = `${ApiUrls.Domain + ApiUrls.UpdateDownloadNumber}/${loopId}`;
    return this.httpClient.put<ResponseModel>(url, loopId);
  }
}
