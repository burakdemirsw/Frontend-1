import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Genre } from '../models/genre';
import { Key } from '../models/key';
import { TrackDetail } from '../models/trackDetail';
import { AlertifyService } from '../services/alertify.service';
import { LoopService } from '../services/loop.service';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-track-fs',
  templateUrl: './track-fs.component.html',
  styleUrls: ['./track-fs.component.css']
})
export class TrackFSComponent implements OnInit {

  keys: Key[] = [];
  genres: Genre[] = [];
  date: Date = new Date();
  key2: string = 'dateTime';
  reverse2: boolean = false;
  key: string = 'price';
  reverse: boolean = false;
  filteredGenre: string = '';
  filterText = '';
  searchTrack = '';
  today = new Date();
  count: number = 0;
  trackDetails:TrackDetail[]=[]

  constructor(    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    private loopService: LoopService,
    private trackService: TrackService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.getTrackDetail().subscribe((data) => {
      this.trackDetails = data;
      console.log(data)
      this.getGenres().subscribe((data) => {
        this.genres = data;
      });

      this.getKeys().subscribe((data) => {
        this.keys = data;
      });
      setTimeout(() => {
        this.spinnerService.hide();
      }, 1000);
    });
  }

  getKeys() {
    return this.httpClient.get<Key[]>('http://localhost:5191/keys/getall');
  }
  getGenres() {
    return this.httpClient.get<Genre[]>('http://localhost:5191/genres/getall');
  }

  sortByPrice(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  onTrackFilter() {
    this.searchTrack = this.filterText;
  }

  filterByGenre(genre: string) {
    if (this.count == 0) {
      this.filteredGenre = genre;

      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
      }, 250);
      this.count = 1;
    } else {
      this.filteredGenre = '';

      this.spinnerService.show();
      setTimeout(() => {
        this.spinnerService.hide();
      }, 250);
      this.count = 0;
    }
  }
  filteredKey: string = '';
  filterByKey(key: string) {
    this.filteredKey = key;
  }

  sortByDate(key2: string) {
    this.key2 = key2;
    this.reverse2 = !this.reverse2;
  }


  getTrackDetail() {
    return this.httpClient.get<TrackDetail[]>(
      'http://localhost:5191/Tracks/TrackDetails'
    );
  }
}
