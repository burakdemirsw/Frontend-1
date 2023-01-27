import { HttpClient } from '@angular/common/http';
import { Component, ErrorHandler, OnInit } from '@angular/core';
// import { Event } from '@angular/router';
import { findIndex, Observable } from 'rxjs';
import { TrackDetail } from 'src/app/models/trackDetail';
import { AlertifyService } from 'src/app/services/alertify.service';
import * as moment from 'moment';
import { Track } from 'src/app/models/track';
import { GlobalRequestService } from 'src/app/services/global-request.service';
import { Genre } from 'src/app/models/genre';
import { Key } from 'src/app/models/key';
// import { runInThisContext } from 'vm';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  slice1: number = 0;
  slice2: number = 20;
  count: number = 0;
  stateList: Array<string> = ['first', 'stopped', 'playing'];
  state: number = 0;
  value: number = -1;
  rePlayCount: number = 0;
  playyed: number = 1;
  playPhoto: string = '../../assets/photos/play2.png';
  playButtonTouchCounter: number = 1;
  checkTrackIdForPhotoCounter: number = -1;
  formModal: any;
  tracks: Track[] = [];
  trackDetails: TrackDetail[] = [];
  date: Date = new Date();
  key2: string = 'dateTime';
  reverse2: boolean = false;
  key: string = 'price';
  reverse: boolean = false;
  filteredGenre: string = '';
  filterText = '';
  searchTrack = '';
  today = new Date();
  keys: Key[] = [];
  genres: Genre[] = [];
  check: boolean = true;
  audio = new Audio();
  currentTime = '00:00:00';
  duration = '00:00:00';
  duration2 = '00:00:00';
  seek = 0;
  currentTrackId!: number;
  currentIndex = 0;
  buttonClicked: boolean = false;
  buttonClicked2: boolean = false;
  buttonClicked3: boolean = false;
  buttonClicked4: boolean = false;
  buttonClicked5: boolean = false;
  newPhotoUrl!: string;
  srcCounter: boolean = false;
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
  ];

  //player var.

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private globalRequest : GlobalRequestService
  ) // private spinnerService: NgxSpinnerService,

  {}

  ngOnInit(): void {


    this.getTrackDetail().subscribe((data) => {
      this.trackDetails = data;

    });
  }





  getTrackDetail() {
    // get array from api
    return this.globalRequest.globalGet<TrackDetail[]>(
      'http://localhost:5191/Tracks/TrackDetails' //playlist api
    );
  }
  openFile(url: string) {
    this.streamObserver(url).subscribe((event) => {});
  }
  openFile2(id: number) {
    var track = this.trackDetails.find((t) => t.id == id);

    this.currentTrackId = id;
    this.openFile(`${track?.audioUrl}`);
  }
  openFile3(id: number): boolean {
    if (this.state == 0) {
      this.changeSrcById(id, 0);

      var track = this.trackDetails.find((t) => t.id == id);
      this.currentTrackId = id;
      this.openFile(`${track?.audioUrl}`);
      this.state = 2;
      this.currentIndex = id;
      this.value = id;

      return true;
    } else if (this.state == 2) {
      ///oynuyorken
      if (id == this.value) {
        //aynı
        this.changeSrcById(id, 0);

        this.state = 1;
        this.currentIndex = id;
        this.value = id;
        this.pause();
      } else if (id !== this.value) {
        //farklı
        this.changeSrcById(this.value, 4);
        this.changeSrcById(id, 3);
        this.state = 2;
        this.currentIndex = id;
        this.currentTrackId = id; //
        var track2 = this.trackDetails.find((t) => t.id == id);
        this.value = id;
        this.pause();
        this.openFile(`${track2?.audioUrl}`);
      }

      return false;
    } else if (this.state === 1) {
      ///duruyorkeen
      if (id !== this.value) {
        //id eşit değilse
        this.changeSrcById(this.value, 1); //duruyorkeen yeni track eski
        this.changeSrcById(id, 2); //yeni

        this.state = 2;
        this.currentIndex = id;
        var track3 = this.trackDetails.find((t) => t.id == id);
        this.value = id;
        this.currentTrackId = id;
        this.play();
        this.openFile(`${track3?.audioUrl}`);
      } else if (id == this.value) {
        this.changeSrcById(id, 0);

        this.state = 2;
        this.currentIndex = id;
        this.value = id;
        this.play();
      }
      return true;
    } else {
      this.alertifyService.error('else-by-stream-controller');
      this.state = 2;
      this.play();

      return true;
    }
  }

  resetIndex(id: number) {
    var index = this.trackDetails.findIndex((t) => t.id == id);
    this.currentIndex = index;
  }

  rePlay() {
    if (this.rePlayCount == 0) {
      this.rePlayCount = 1;
    } else {
      this.rePlayCount = 0;
    }
  }
  streamObserver(url: string) {
    return new Observable((observer) => {
      this.audio.src = url;
      this.audio.load();
      this.audio.play();

      const handler = (event: Event) => {
        this.seek = this.audio.currentTime;

        this.duration2 = this.timeFormat(this.audio.duration);
        this.duration = this.audio.duration.toString();

        this.currentTime = this.timeFormat(this.audio.currentTime);
        if (
          this.audio.currentTime == this.audio.duration &&
          this.rePlayCount == 0
        ) {
          this.skipEnd();
        } else if (
          this.audio.currentTime == this.audio.duration &&
          this.rePlayCount == 1
        ) {
          this.audio.currentTime = 0;
          this.play();
        }
      };
      this.addEvent(this.audio, this.audioEvents, handler);

      return () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.removeEvent(this.audio, this.audioEvents, handler);
      };
    });
  }
  setCurrentTime(ev: any) {
    this.audio.currentTime = parseFloat((ev.target as HTMLInputElement).value);
  }
  timeFormat(time: any, format = 'mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  addEvent(obj: any, events: any[], handler: (event: Event) => void) {
    events.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }
  removeEvent(obj: any, events: any[], handler: (event: Event) => void) {
    events.forEach((event) => {
      obj.removeEventListener(event, handler);
    });
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.play();
  }

  mute(): boolean {
    if (this.audio.volume > 0) {
      this.audio.volume = 0;
      (document.getElementById('audioRange') as HTMLInputElement).value = '0';
      return true;
    } else this.audio.volume = 0;
    this.audio.volume = 1;
    (document.getElementById('audioRange') as HTMLInputElement).value = '1';
    return true;
  }
  volumeUp() {
    this.audio.volume = 1;
    (document.getElementById('audioRange') as HTMLInputElement).value = '1';
  }

  setVolume(ev: any) {
    this.audio.volume = parseFloat((ev.target as HTMLInputElement).value);
  }
  skipRandom() {
    var trackArray = this.trackDetails;
    let newIndex = Math.floor(Math.random() * trackArray.length - 1 + 1);
    this.currentIndex = newIndex;
    var newId = trackArray[this.currentIndex].id;
    this.openFile2(newId);
  }

  skipStart(): boolean {
    debugger;
    var trackArray = this.trackDetails;
    this.resetPlayerByTrack(this.currentIndex);

    if (this.currentIndex > 0) {
      var newId = trackArray[this.currentIndex - 1].id;
      this.currentIndex--;
      this.openFile2(newId);
      return true;
    } else this.currentIndex == 0;
    {
      var newId = trackArray[trackArray.length - 1].id;
      this.currentIndex = trackArray.length - 1;

      this.openFile2(newId);

      return true;
    }
  }

  skipEnd(): boolean {
    debugger;
    var trackArray = this.trackDetails;
    this.resetPlayerByTrack(this.currentIndex);

    if (this.currentIndex == trackArray.length - 1) {
      var newId = trackArray[0].id;
      this.currentIndex = 0;
      this.openFile2(newId);
    } else if (this.currentIndex < trackArray.length - 1) {
      var newId = trackArray[this.currentIndex + 1].id;
      this.currentIndex++;
      this.openFile2(newId);
    } else {
      return true;
    }
    return true;
  }
  changeSrcById(id: number, state: number): void {
    // this.alertifyService.warning("girdi")
    if (this.srcCounter === false && state === 0) {
      (document.getElementById('i' + `${id}`) as HTMLImageElement).src =
        '../../assets/photos/pause-2.png';
      this.buttonClicked2 = true;
      this.srcCounter = true;
      // this.alertifyService.success('0-1')
    } else if (this.srcCounter === true && state === 0) {
      (document.getElementById('i' + `${id}`) as HTMLImageElement).src =
        '../../assets/photos/play-2.png';
      this.buttonClicked2 = false;
      this.srcCounter = false;
      // this.alertifyService.success('0-2')
    } else if (this.srcCounter == false && state == 1) {
      //duruyorkeen yeni track eskiyi guncelle
      (document.getElementById('i' + `${id}`) as HTMLImageElement).src =
        '../../assets/photos/play-2.png';
      this.buttonClicked2 = false;
      this.srcCounter = false;
      // this.alertifyService.success('1')
    } else if (this.srcCounter == false && state == 2) {
      // duruyorken yenı track geldi yeniyi güncelle
      (document.getElementById('i' + `${id}`) as HTMLImageElement).src =
        '../../assets/photos/pause-2.png';
      this.buttonClicked2 = true;
      this.srcCounter = true;
      // this.alertifyService.success('2')
    } else if (this.srcCounter === true && state == 3) {
      (document.getElementById('i' + `${id}`) as HTMLImageElement).src =
        '../../assets/photos/pause-2.png';
      this.buttonClicked2 = true;
      this.srcCounter = true;
      // this.alertifyService.success('3')
    } else if (this.srcCounter === true && state == 4) {
      //oynuyorken farklı id
      (document.getElementById('i' + `${id}`) as HTMLImageElement).src =
        '../../assets/photos/play-2.png';
      this.buttonClicked2 = true;
      this.srcCounter = true;
      // this.alertifyService.success('4')
    } else if (this.srcCounter === false && state === 5) {
      //durdurduktan sonra oynat --by player
      (document.getElementById('i' + `${id}`) as HTMLImageElement).src =
        '../../assets/photos/pause-2.png';
      this.buttonClicked2 = true; //play
      this.srcCounter = true;
      // this.alertifyService.success('5')
    } else if (this.srcCounter === true && state === 6) {
      //oynattıktan sonra durdur --by player
      (document.getElementById('i' + `${id}`) as HTMLImageElement).src =
        '../../assets/photos/play-2.png';
      this.buttonClicked2 = false; //play
      this.srcCounter = false;
      // this.alertifyService.success('6')
    } else {
      this.alertifyService.error('else: ' + this.srcCounter + '///' + state);
    }
  }

  changePlayerByTrack(
    photoUrl: string,
    title: string,
    desc: string,
    price: number
  ) {
    ((
      document.getElementById('trackPlayerPhoto') as HTMLInputElement
    ).src = `${photoUrl}`),
      ((
        document.getElementById('trackPlayerTitle') as HTMLBodyElement
      ).innerHTML = `${title}`),
      ((
        document.getElementById('trackPlayerName') as HTMLBodyElement
      ).innerHTML = `${desc}`);
    (
      document.getElementById('trackPlayerPrice') as HTMLBodyElement
    ).innerHTML = `${'$' + price}`;
  }
  resetPlayerByTrack(index: number) {
    var photoUrl = this.trackDetails[index].photoUrl;
    var title = this.trackDetails[index].title;
    var desc = this.trackDetails[index].desc;
    var price = this.trackDetails[index].price;

    this.changePlayerByTrack(photoUrl, title, desc, price);
  }

  clicked() {
    this.buttonClicked = true;
  }

  clicked2(): boolean {
    let cti = this.currentTrackId;
    // this.alertifyService.warning("denendi")
    if (this.state == 1 && this.buttonClicked2 == true) {
      this.buttonClicked2 = false;
      this.state = 2;
      this.play();

      return true;
    } else if (this.state == 1 && this.buttonClicked2 == false) {
      // this.buttonClicked2 = true;//player
      this.changeSrcById(this.currentTrackId, 5);

      this.state = 2;
      this.play();

      return true;
    } else if (this.state == 2 && this.buttonClicked2 == false) {
      this.buttonClicked2 = true;
      this.state = 1;

      this.pause();
      return true;
    } else if (this.state == 2 && this.buttonClicked2 == true) {
      this.buttonClicked2 = false; //player
      this.changeSrcById(this.currentTrackId, 6);

      this.state = 1;

      this.pause();
      return true;
    } else {
      this.alertifyService.error('else-by-player');
      return true;
    }
  }

  clicked3() {
    if (this.buttonClicked3 == false) {
      this.buttonClicked3 = true;

      return true;
    } else this.buttonClicked3 == true;
    {
      this.buttonClicked3 = false;
      return false;
    }
  }
  clicked4(): void {
    if (this.buttonClicked4 == false) {
      this.buttonClicked4 = true;
    } else this.buttonClicked4 == true;
    {
      this.buttonClicked4 = false;
    }
  }

  firtPlayButtonTouch() {
    if (this.playButtonTouchCounter === 1) {
      this.playButtonTouchCounter = 0;
      return false;
    } else {
      return true;
    }
  }
  checkTrackIdForPhoto(id: number): number {
    let CheckTrack = this.trackDetails
      .slice(this.slice1, this.slice2)
      .find((t) => t.id == id);
    let CheckId = CheckTrack?.id;
    if (this.currentTrackId === undefined) {
      this.checkTrackIdForPhotoCounter = -1;

      return -1;
    } else if (this.currentTrackId === CheckId) {
      this.checkTrackIdForPhotoCounter = 1;
      return 1;
    } else {
      this.checkTrackIdForPhotoCounter = 0;

      return 0;
    }
  }

}
