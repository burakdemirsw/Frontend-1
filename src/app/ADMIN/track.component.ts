import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';
import { catchError, Observable } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TrackDetail } from '../models/trackDetail';
import { GlobalRequestService } from '../services/global-request.service';
import { SignalRService } from '../services/signalr.service';
import { ReceiveFunctions } from '../models/Consts/ReceiveFunctions';
import { HubUrls } from '../models/Consts/HubUrls';
// import { NgxSpinnerService } from 'ngx-spinner';
declare var window: any;
@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
})
export class TrackComponent implements OnInit {
  trackDetails: TrackDetail[] = [];
  getPath = 'http://localhost:5191/Tracks/TrackDetails';
  getPath2 = 'http://localhost:4200/Admin';
  formModal: any;
  deleteTrackId: number;

  constructor(
    private trackService: TrackService,
    private globalService: GlobalRequestService,
    private signalRService:SignalRService,
    private alertifyService: AlertifyService
  ) {

    signalRService.start(HubUrls.TrackHub)
  }

  ngOnInit() {
    this.signalRService.on(ReceiveFunctions.TrackAddedMessageAsync,(message: string) =>{
      this.alertifyService.warning(message)
    });
    this.getTracks().subscribe((data) => {
      this.trackDetails = data;
      console.log(data);
    });
  }

  changeDeleteTrackId(id: number) {
    this.deleteTrackId = id;
  }
  getTracks() {
    return this.globalService.globalGet<TrackDetail>(this.getPath);
  }
  url = 'http://localhost:4200/Admin';

  deleteTrack(trackId: number) {
    this.trackService.deleteTrack(trackId).subscribe();
    location.reload();
  }
}
