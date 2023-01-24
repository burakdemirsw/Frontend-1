import { HttpClient } from '@angular/common/http';
import { Component, ErrorHandler, OnInit } from '@angular/core';
// import { Event } from '@angular/router';
import { findIndex, Observable } from 'rxjs';
import { TrackDetail } from 'src/app/models/trackDetail';
import { AlertifyService } from 'src/app/services/alertify.service';
import * as moment from 'moment';
import { Track } from 'src/app/models/track';
// import { runInThisContext } from 'vm';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  check: boolean = true;
  trackDetails: TrackDetail[] = [];
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

  newPhotoUrl!: string;
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
    private alertifyService: AlertifyService
  ) // private spinnerService: NgxSpinnerService,

  {}

  ngOnInit(): void {
    // this.spinnerService.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinnerService.hide();
    // }, 250);

    this.getTrackDetail().subscribe((data) => {
      this.trackDetails = data;
      // console.log(this.trackDetails.length)
      // console.log(data);
    });
  }

  /* playOrStop(){
    if(this.buttonClicked2==true){
      this.pause
    }else(){

    }
  }
  */



  getTrackDetail() {
    // get array from api
    return this.httpClient.get<TrackDetail[]>(
      'http://localhost:5191/Tracks/TrackDetails' //playlist api
    );
  }
  openFile(url: string) {
    // sent evet stream observer
    this.streamObserver(url).subscribe((event) => {});
  }
  openFile2(id: number) {
    //gets id when clıck the table photos
    var track = this.trackDetails.find((t) => t.id == id);

    // console.log(track?.id);
    this.currentTrackId = id;
    this.openFile(`${track?.audioUrl}`);
  }



  resetIndex(id: number) {
    //resets index when clıck the table photos
    var index = this.trackDetails.findIndex((t) => t.id == id);
    this.currentIndex = index;
    // console.log(
    //   'index fotograf uzerınden degıstırıldı \n index:' + this.currentIndex
    // );
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

        // console.log('şuanki saniye:' + this.seek);
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

    //  this.alertifyService.success("şarkı çalınamıyor")
  }

  pause() {
    this.audio.pause();
  }

  // timeFormatter(time:number){
  //   let m = time/60
  //   let s =
  //   let type = ""

  // }

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
    // console.log(parseFloat((ev.target as HTMLInputElement).value));
  }
  skipRandom() {
    var trackArray = this.trackDetails; //arrye baglandık
    let newIndex = Math.floor(Math.random() * trackArray.length - 1 + 1); //random sayı oluşturduk
    this.currentIndex = newIndex; //sayıyı şimdiki indexse eşitledik
    var newId = trackArray[this.currentIndex].id; //id aldık
    this.openFile2(newId);
    // console.log(this.currentIndex);
  }

  skipStart(): boolean {
    var trackArray = this.trackDetails;

    if (this.currentIndex > 0) {
      var newId = trackArray[this.currentIndex - 1].id;
      // console.log('index 0 dan büyük');
      this.currentIndex--;
      // console.log('current index number is : ' + this.currentIndex);
      this.openFile2(newId);
      // console.log('SkipStart has been worked!');
      return true;
    } else this.currentIndex == 0;
    {
      var newId = trackArray[trackArray.length - 1].id;
      this.currentIndex = trackArray.length - 1;
      // console.log('index eksiye inmeye çalışıldı');
      // this.currentIndex = trackArray.length - 1;
      this.openFile2(newId);
      // console.log('index eksiye inmeye çalışıldığı için liste sonuna gidildi');

      return true;
    }
  }

  skipEnd(): boolean {
    var trackArray = this.trackDetails;

    if (this.currentIndex == trackArray.length - 1) {
      var newId = trackArray[0].id;
      // console.log('liste aşılmaya çalışdı');
      this.currentIndex = 0;
      // console.log('liste aşılmaya çalışdığı için index -1 olarak değiştirildi \n 1.loop');
      this.openFile2(newId);
      return true;
    } else this.currentIndex < trackArray.length - 1;
    {
      var newId = trackArray[this.currentIndex + 1].id;
      this.currentIndex++;
      // console.log('current index number is : ' + this.currentIndex);
      this.openFile2(newId);
      // console.log('2. LOOOP');
      return true;
    }
  }

  changePlayerByTrack(url: string, title: string, desc: string, price: number) {
    ((
      document.getElementById('trackPlayerPhoto') as HTMLInputElement
    ).src = `${url}`),
      ((
        document.getElementById('trackPlayerTitle') as HTMLBodyElement
      ).innerHTML = `${title}`),
      ((
        document.getElementById('trackPlayerName') as HTMLBodyElement
      ).innerHTML = `${desc}`);
      ((
        document.getElementById('trackPlayerName') as HTMLBodyElement
      ).innerHTML = `${desc}`);


    // (document.getElementById("trackPlayerName") as HTMLInputElement).src=`${desc}`
  }
  resetPlayerByTrack(index: number) {
    var photoUrl = this.trackDetails[index].photoUrl;
    var title = this.trackDetails[index].title;
    var desc = this.trackDetails[index].desc;
    var price = this.trackDetails[index].price;
    // console.log('current ındex value:' + index);
    this.changePlayerByTrack(photoUrl, title, desc, price);
  }
  clicked() {
    //hide content
    this.buttonClicked = true;
  }
  clicked2(): boolean {
    //hide content
    if (this.buttonClicked2 == false) {
      this.buttonClicked2 = true;
      this.pause();
      // this.alertifyService.success("durduruldu")
      return true;
    } else this.buttonClicked2 == true;
    {
      this.buttonClicked2 = false;
      this.play();
      // this.alertifyService.success("oynatıldı")
      return false;
    }
  }
  clicked3() {
    //hide content
    if (this.buttonClicked3 == false) {
      this.buttonClicked3 = true;

      // this.alertifyService.success("eklendi")
      return true;
    } else this.buttonClicked3 == true;
    {
      this.buttonClicked3 = false;
      // this.alertifyService.success("kaldırıldı")
      return false;
    }
  }
  clicked4() {
    //hide content
    if (this.buttonClicked4 == false) {
      this.buttonClicked4 = true;
      // console.log('kapa');
      return true;
    } else this.buttonClicked4 == true;
    {
      this.buttonClicked4 = false;
      return false;
    }
  }

}
