import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  providedIn: 'root'
})
export class LoopService {
  apiUrl = 'http://localhost:5191/Loops/Add';
  getPath2 = 'http://localhost:5191/Loops/Delete';
  getPath3 = 'http://localhost:5191/Loops/Get';
  apiUrl2 = 'http://localhost:5191/Loops/Update';
  apiUrl3 = 'http://localhost:5191/LoopsDetail/Add';
  apiUrl4 = 'http://localhost:5191/Loops/TrackDetailsById';
  apiUrl5 = 'http://localhost:5191/Loops/getall';
  apiUrl6 = 'http://localhost:5191/Loops/UpdateDN';


  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService
  ) {}

  getLoopFromApi(loopId: number): Observable<Loop> {
    //

    const url = `${this.getPath3}/${loopId}`;
    return this.httpClient.get<Loop>(url);
  }

  getLoopWithDetailFromApi(loopId: number): Observable<LoopDetail> {
    //

    const url = `${this.apiUrl4}/${loopId}`;
    let result = this.httpClient.get<LoopDetail>(url);
    // console.log(result)
    return result;
  }

  getLoops() {
    return this.httpClient.get<Loop[]>(this.apiUrl5);
  }

  addPost(
    loopdto: LoopDTO,
    loopDetaildto: LoopDetailDTO
  ): Observable<ResponseModel> {
    let createLoopDTO = new CreateLoopDTO(loopdto, loopDetaildto);
    return this.httpClient.post<ResponseModel>(this.apiUrl, createLoopDTO);
  }

  updatePost(
    loopDTO: LoopDTO,
    loopDetailDTO: LoopDetailDTO
  ): Observable<ResponseModel> {
    let createLoopDTO = new CreateLoopDTO(loopDTO, loopDetailDTO);
    return this.httpClient.put<ResponseModel>(this.apiUrl2, createLoopDTO);
  }

  deleteLoop(loopId: number): Observable<unknown> {
    const url = `${this.getPath2}/${loopId}`;
    return this.httpClient.delete(url);
  }

  updateDownlaodNumberLoop(loopId: number): Observable<unknown> {
    const url = `${this.apiUrl6}/${loopId}`;
    return this.httpClient.put<ResponseModel>(url,loopId);
  }
}
