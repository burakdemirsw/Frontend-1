"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlayerComponent = void 0;
var core_1 = require("@angular/core");
// import { Event } from '@angular/router';
var rxjs_1 = require("rxjs");
var moment = require("moment");
// import { runInThisContext } from 'vm';
// import { NgxSpinnerService } from 'ngx-spinner';
var PlayerComponent = /** @class */ (function () {
    //player var.
    function PlayerComponent(httpClient, alertifyService) {
        this.httpClient = httpClient;
        this.alertifyService = alertifyService;
        this.check = true;
        this.trackDetails = [];
        this.audio = new Audio();
        this.currentTime = '00:00:00';
        this.duration = '00:00:00';
        this.duration2 = '00:00:00';
        this.seek = 0;
        this.currentIndex = 0;
        this.buttonClicked = false;
        this.buttonClicked2 = false;
        this.buttonClicked3 = false;
        this.buttonClicked4 = false;
        this.audioEvents = [
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
    }
    PlayerComponent.prototype.ngOnInit = function () {
        // this.spinnerService.show();
        var _this = this;
        // setTimeout(() => {
        //   /** spinner ends after 5 seconds */
        //   this.spinnerService.hide();
        // }, 250);
        this.getTrackDetail().subscribe(function (data) {
            _this.trackDetails = data;
            // console.log(this.trackDetails.length)
            // console.log(data);
        });
    };
    /* playOrStop(){
      if(this.buttonClicked2==true){
        this.pause
      }else(){
  
      }
    }
    */
    PlayerComponent.prototype.getTrackDetail = function () {
        // get array from api
        return this.httpClient.get('http://localhost:5191/Tracks/TrackDetails' //playlist api
        );
    };
    PlayerComponent.prototype.openFile = function (url) {
        // sent evet stream observer
        this.streamObserver(url).subscribe(function (event) { });
    };
    PlayerComponent.prototype.openFile2 = function (id) {
        //gets id when clıck the table photos
        var track = this.trackDetails.find(function (t) { return t.id == id; });
        // console.log(track?.id);
        this.currentTrackId = id;
        this.openFile("" + (track === null || track === void 0 ? void 0 : track.audioUrl));
    };
    PlayerComponent.prototype.resetIndex = function (id) {
        //resets index when clıck the table photos
        var index = this.trackDetails.findIndex(function (t) { return t.id == id; });
        this.currentIndex = index;
        // console.log(
        //   'index fotograf uzerınden degıstırıldı \n index:' + this.currentIndex
        // );
    };
    PlayerComponent.prototype.streamObserver = function (url) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.audio.src = url;
            _this.audio.load();
            _this.audio.play();
            var handler = function (event) {
                _this.seek = _this.audio.currentTime;
                _this.duration2 = _this.timeFormat(_this.audio.duration);
                _this.duration = _this.audio.duration.toString();
                _this.currentTime = _this.timeFormat(_this.audio.currentTime);
                // console.log('şuanki saniye:' + this.seek);
            };
            _this.addEvent(_this.audio, _this.audioEvents, handler);
            return function () {
                _this.audio.pause();
                _this.audio.currentTime = 0;
                _this.removeEvent(_this.audio, _this.audioEvents, handler);
            };
        });
    };
    PlayerComponent.prototype.setCurrentTime = function (ev) {
        this.audio.currentTime = parseFloat(ev.target.value);
    };
    PlayerComponent.prototype.timeFormat = function (time, format) {
        if (format === void 0) { format = 'mm:ss'; }
        var momentTime = time * 1000;
        return moment.utc(momentTime).format(format);
    };
    PlayerComponent.prototype.addEvent = function (obj, events, handler) {
        events.forEach(function (event) {
            obj.addEventListener(event, handler);
        });
    };
    PlayerComponent.prototype.removeEvent = function (obj, events, handler) {
        events.forEach(function (event) {
            obj.removeEventListener(event, handler);
        });
    };
    PlayerComponent.prototype.play = function () {
        this.audio.play();
        //  this.alertifyService.success("şarkı çalınamıyor")
    };
    PlayerComponent.prototype.pause = function () {
        this.audio.pause();
    };
    // timeFormatter(time:number){
    //   let m = time/60
    //   let s =
    //   let type = ""
    // }
    PlayerComponent.prototype.stop = function () {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.play();
    };
    PlayerComponent.prototype.mute = function () {
        if (this.audio.volume > 0) {
            this.audio.volume = 0;
            document.getElementById('audioRange').value = '0';
            return true;
        }
        else
            this.audio.volume = 0;
        this.audio.volume = 1;
        document.getElementById('audioRange').value = '1';
        return true;
    };
    PlayerComponent.prototype.volumeUp = function () {
        this.audio.volume = 1;
        document.getElementById('audioRange').value = '1';
    };
    PlayerComponent.prototype.setVolume = function (ev) {
        this.audio.volume = parseFloat(ev.target.value);
        // console.log(parseFloat((ev.target as HTMLInputElement).value));
    };
    PlayerComponent.prototype.skipRandom = function () {
        var trackArray = this.trackDetails; //arrye baglandık
        var newIndex = Math.floor(Math.random() * trackArray.length - 1 + 1); //random sayı oluşturduk
        this.currentIndex = newIndex; //sayıyı şimdiki indexse eşitledik
        var newId = trackArray[this.currentIndex].id; //id aldık
        this.openFile2(newId);
        // console.log(this.currentIndex);
    };
    PlayerComponent.prototype.skipStart = function () {
        var trackArray = this.trackDetails;
        if (this.currentIndex > 0) {
            var newId = trackArray[this.currentIndex - 1].id;
            // console.log('index 0 dan büyük');
            this.currentIndex--;
            // console.log('current index number is : ' + this.currentIndex);
            this.openFile2(newId);
            // console.log('SkipStart has been worked!');
            return true;
        }
        else
            this.currentIndex == 0;
        {
            var newId = trackArray[trackArray.length - 1].id;
            this.currentIndex = trackArray.length - 1;
            // console.log('index eksiye inmeye çalışıldı');
            // this.currentIndex = trackArray.length - 1;
            this.openFile2(newId);
            // console.log('index eksiye inmeye çalışıldığı için liste sonuna gidildi');
            return true;
        }
    };
    PlayerComponent.prototype.skipEnd = function () {
        var trackArray = this.trackDetails;
        if (this.currentIndex == trackArray.length - 1) {
            var newId = trackArray[0].id;
            // console.log('liste aşılmaya çalışdı');
            this.currentIndex = 0;
            // console.log('liste aşılmaya çalışdığı için index -1 olarak değiştirildi \n 1.loop');
            this.openFile2(newId);
            return true;
        }
        else
            this.currentIndex < trackArray.length - 1;
        {
            var newId = trackArray[this.currentIndex + 1].id;
            this.currentIndex++;
            // console.log('current index number is : ' + this.currentIndex);
            this.openFile2(newId);
            // console.log('2. LOOOP');
            return true;
        }
    };
    PlayerComponent.prototype.changePlayerByTrack = function (url, title, desc, price) {
        (document.getElementById('trackPlayerPhoto').src = "" + url),
            (document.getElementById('trackPlayerTitle').innerHTML = "" + title),
            (document.getElementById('trackPlayerName').innerHTML = "" + desc);
        (document.getElementById('trackPlayerName').innerHTML = "" + desc);
        // (document.getElementById("trackPlayerName") as HTMLInputElement).src=`${desc}`
    };
    PlayerComponent.prototype.resetPlayerByTrack = function (index) {
        var photoUrl = this.trackDetails[index].photoUrl;
        var title = this.trackDetails[index].title;
        var desc = this.trackDetails[index].desc;
        var price = this.trackDetails[index].price;
        // console.log('current ındex value:' + index);
        this.changePlayerByTrack(photoUrl, title, desc, price);
    };
    PlayerComponent.prototype.clicked = function () {
        //hide content
        this.buttonClicked = true;
    };
    PlayerComponent.prototype.clicked2 = function () {
        //hide content
        if (this.buttonClicked2 == false) {
            this.buttonClicked2 = true;
            this.pause();
            // this.alertifyService.success("durduruldu")
            return true;
        }
        else
            this.buttonClicked2 == true;
        {
            this.buttonClicked2 = false;
            this.play();
            // this.alertifyService.success("oynatıldı")
            return false;
        }
    };
    PlayerComponent.prototype.clicked3 = function () {
        //hide content
        if (this.buttonClicked3 == false) {
            this.buttonClicked3 = true;
            // this.alertifyService.success("eklendi")
            return true;
        }
        else
            this.buttonClicked3 == true;
        {
            this.buttonClicked3 = false;
            // this.alertifyService.success("kaldırıldı")
            return false;
        }
    };
    PlayerComponent.prototype.clicked4 = function () {
        //hide content
        if (this.buttonClicked4 == false) {
            this.buttonClicked4 = true;
            // console.log('kapa');
            return true;
        }
        else
            this.buttonClicked4 == true;
        {
            this.buttonClicked4 = false;
            return false;
        }
    };
    PlayerComponent = __decorate([
        core_1.Component({
            selector: 'app-player',
            templateUrl: './player.component.html',
            styleUrls: ['./player.component.css']
        })
    ], PlayerComponent);
    return PlayerComponent;
}());
exports.PlayerComponent = PlayerComponent;
