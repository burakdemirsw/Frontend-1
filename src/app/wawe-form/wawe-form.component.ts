//#region imports
import { HttpClient } from '@angular/common/http';
import { DoCheck, OnDestroy } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, observable, Observable } from 'rxjs';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline';
import { Genre } from '../models/genre';
import { Key } from '../models/key';
import { TrackDetail } from '../models/trackDetail';
import { AlertifyService } from '../services/alertify.service';
import { GlobalRequestService } from '../services/global-request.service';
import { LoopService } from '../services/loop.service';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-wawe-form',
  templateUrl: './wawe-form.component.html',
  styleUrls: ['./wawe-form.component.css'],
})
//#endregion
//#region variables
export class WaweFormComponent implements OnInit {
  wave: WaveSurfer[] = [];
  url = '../../assets/audios/alone.mp3';
  photoUrl = '../../assets//photos/red1.jpg';
  trackDetails: TrackDetail[] = [];
  slice1: number = 0;
  slice2: number = 20;
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

  constructor(
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    private trackService: TrackService,
    private globalRequest: GlobalRequestService,

  ) {}
  //#endregion
  //#region  Inside func
  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.getTrackDetail().subscribe((data) => {
        this.trackDetails = data;
        console.log(data);
        this.getGenres().subscribe((data) => {
          this.genres = data;
        });

        this.getKeys().subscribe((data) => {
          this.keys = data;
        });
        setTimeout(() => {
          this.getTracks();
        }, 0);

        this.spinnerService.hide();
      });
    }, 500);
  }

  getKeys() {
    return this.globalRequest.globalGet<Key[]>('http://localhost:5191/keys/getall');
  }
  getGenres() {
    return this.globalRequest.globalGet<Genre[]>('http://localhost:5191/genres/getall');
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
  skipPage() {
    // window.location.href='/Wave'
    this.slice1 = this.slice1 + 20;

    this.slice2 = this.slice2 + 10;

    this.getTracksWithSkip();
  }

  lastPage() {
    this.spinnerService.show();

    setTimeout(() => {
      if (this.slice1 <= 20) {
        this.slice1 = 0;
        this.slice2 = 20;
      } else {
        this.slice1 = this.slice1 - 20;

        this.slice2 = this.slice2 - 20;
      }
      this.spinnerService.hide();
    }, 500);
  }
  //#endregion
  //#region Wave Surfer
  getTracks(): void {
    for (let count = 0; count <= this.trackDetails.length - 1; count++) {
      this.createWaveForm(this.trackDetails[count].id);
    }
  }
  getTracksWithSkip(): void {
    for (this.slice1; this.slice1 < this.slice2; this.slice1++) {
      this.createWaveForm(this.trackDetails[this.slice1 - 1].id);
    }
  }

  getTrackDetail() {
    return this.globalRequest.globalGet<TrackDetail[]>(
      'http://localhost:5191/Tracks/TrackDetails'
    );
  }

  index = 0;
  createWaveForm(id: number): void {
    //bu wave i yenı vaveler eklemen alzım
    this.wave[this.index] = WaveSurfer.create({
      container: '#' + 'T' + `${id}`,
      waveColor: '#D9DCFF',
      progressColor: '#4353FF',
      cursorColor: '#4353FF',
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 1,
      height: 30,
      barGap: 3,
    });
    const track = this.trackDetails.find((t) => t.id == id);
    this.wave[this.index].load(track.audioUrl);
    this.index = this.index + 1;
  }

  playCoutCounter() {
    this.playCounter = 1;
  }
  playCounter: number = -1;
  currentTrackId: Array<number> = [];

  setVolume(ev: Event, id: number) {
    var trackIndex = this.trackDetails.findIndex((t) => t.id == id);

    var button = document.getElementById('customRange1');
    this.wave[trackIndex].setVolume(
      Number((ev.target as HTMLInputElement).value)
    );
  }

  playWaveForm(id: number): void {
    this.currentTrackId.push(id);
    let lastId = this.currentTrackId.length - 2;

    if (id == this.currentTrackId[lastId] || id == this.currentTrackId[0]) {
      this.clicked2();
      this.changeClassById(id);
      this.streamObserver(id);
      var trackIndex = this.trackDetails.findIndex((t) => t.id == id);
      this.wave[trackIndex].playPause();
    } else if (id !== this.currentTrackId[lastId]) {
      this.clicked2();
      this.changeClassById(this.currentTrackId[lastId]);
      this.changeClassById(id);
      this.streamObserver(id);
      var lastTrackIndex = this.trackDetails.findIndex(
        (t) => t.id == this.currentTrackId[lastId]
      );
      this.wave[lastTrackIndex].setCurrentTime(0);

      this.wave[lastTrackIndex].pause();
      var trackIndex = this.trackDetails.findIndex((t) => t.id == id);
      this.wave[trackIndex].playPause();
    } else {
      this.alertifyService.warning('');
    }
  }
  classCounter: boolean = false;
  changeClassById(id: number): void {
    if (this.classCounter === false) {
      (document.getElementById('p' + `${id}`) as HTMLBaseElement).className =
        'bi-pause';
      this.classCounter = true;
    } else {
      (document.getElementById('p' + `${id}`) as HTMLBaseElement).className =
        'bi-play';
      this.classCounter = false;
    }
  }

  nextWaveForm(id: number) {
    var track = this.trackDetails.findIndex((t) => t.id == id);

    this.wave[track].skip(10);
  }

  streamObserver(id: number) {
    var track = this.trackDetails.find((t) => t.id == id);
    var trackIndex = this.trackDetails.findIndex((t) => t.id == id);

    (
      document.getElementById('d' + `${track.id}`) as HTMLBodyElement
    ).innerHTML = this.setDurationTime(id);

    this.wave[trackIndex].on('audioprocess', (e) => {
      // let a:string = document.getElementById('c' + `${track.id}`).innerHTML;
      // let b:string = document.getElementById('d' + `${track.id}`).innerHTML;

      if (
        document.getElementById('c' + `${track.id}`).innerHTML ==
        document.getElementById('d' + `${track.id}`).innerHTML
      ) {
        this.changeClassById(id);
        this.wave[trackIndex].setCurrentTime(0);
        this.wave[trackIndex].pause();
      } else {
        // console.log(this.wave[trackIndex].getDuration()+"-----"+this.wave[trackIndex].getCurrentTime())
      }
      (
        document.getElementById('c' + `${track.id}`) as HTMLBodyElement
      ).innerHTML = this.setCurrentTime(id);
    });
  }

  setDurationTime(id: number): string {
    var track = this.trackDetails.findIndex((t) => t.id == id);

    let durationTime = this.wave[track].getDuration();

    return this.timeCalculator(durationTime);
  }

  setCurrentTime(id: number): string {
    var track = this.trackDetails.findIndex((t) => t.id == id);

    let currentTime = this.wave[track].getCurrentTime();

    return this.timeCalculator(currentTime);
  }

  timeCalculator(time: number): string {
    let second: string = Math.floor(time % 60).toString();
    let minute: string = Math.floor((time / 60) % 60).toString();
    return `${minute}` + ':' + `${second}`;
  }

  loadWaveForm(id: number) {
    var track = this.trackDetails.find((t) => t.id == id);
    let trackUrl = track.audioUrl;
    this.wave[0].load(trackUrl);
    let ct = this.wave[0].getCurrentTime();
    console.log(ct);
  }

  stopWaveForm(id: number): void {
    var track = this.trackDetails.findIndex((t) => t.id == id);

    this.wave[track].stop();
  }

  buttonClicked2: boolean = false;

  clicked2(): void {
    //hide content
    if (this.buttonClicked2 == false) {
      this.buttonClicked2 = true;
      // this.alertifyService.success("eklendi")
    } else this.buttonClicked2 == true;
    {
      this.buttonClicked2 = false;
      // this.alertifyService.success("kaldırıldı")
    }
  }

  updateDownloadNumber(id: number) {
    this.trackService.updateDownlaodNumberLoop(id).subscribe();
    this.alertifyService.warning('');
  }
  downloadCounter: number = 0;
  userId: number = 1;
  download(audioUrl: string, id: number) {
    //giriş yaptı mı?
    //bu kullanıcı bu şarkıyı kaç kere indirdi?
    if (this.userId == 1 && this.downloadCounter < 5) {
      this.updateDownloadNumber(id);
      this.downloadCounter++;
      let fileName = audioUrl.split('/').pop(); //bu kısımda file url den file name i alcaz
      this.alertifyService.success(fileName);
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.download = fileName; //bu kısma file-name gelcek
      link.href = audioUrl; //bu kısma file-url gelcek
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      this.alertifyService.error('günlük indirme limitin aşıldı');
    }
    //+1 beğeni sayısı
  }

  //#endregion
}
