import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import { Track } from 'src/app/models/track';
import { TrackDetail } from 'src/app/models/trackDetail';
import { AlertifyService } from 'src/app/services/alertify.service';
import { TrackService } from 'src/app/services/track.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trackdetail2',
  templateUrl: './trackdetail2.component.html',
  styleUrls: ['./trackdetail2.component.css'],
})
export class Trackdetail2Component implements OnInit {
  constructor(
    private trackService: TrackService,
    private activatedRoute: ActivatedRoute,
  ) {}
  track: Track = new Track();
  trackDetail: TrackDetail = new TrackDetail();
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getTrackById(params['trackId']);
    });
  }

  getTrackById(trackId: number) {
    this.trackService.getTrackWithDetailFromApi(trackId).subscribe((data) => {
      this.trackDetail = data;
    });
  }
}
