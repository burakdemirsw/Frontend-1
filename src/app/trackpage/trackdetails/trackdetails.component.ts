import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackDetail } from 'src/app/models/trackDetail';

import { Track } from '../../models/track';
import { AlertifyService } from '../../services/alertify.service';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-trackdetails',
  templateUrl: './trackdetails.component.html',
  styleUrls: ['./trackdetails.component.css'],
  providers:[TrackService]
})
export class TrackdetailsComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private trackService:TrackService,
    private activatedRoute:ActivatedRoute
  ) { }

// track:Track = new Track;
trackDetail:TrackDetail = new TrackDetail;
ngOnInit()
{
 this.activatedRoute.params.subscribe(params=>{
   this.getTrackById(params["trackId"])


 })
}

getTrackById(trackId:number){
  this.trackService.getTrackWithDetailFromApi(trackId).subscribe(data=>{
    this.trackDetail = data;
       console.log(data)
  })
}




}
