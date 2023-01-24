"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrackpageComponent = void 0;
//#region imports
var core_1 = require("@angular/core");
var track_service_1 = require("../services/track.service");
var moment = require("moment");
var rxjs_1 = require("rxjs");
var TrackpageComponent = /** @class */ (function () {
    function TrackpageComponent(httpClient, alertifyService, trackService, activatedRoute, cartService, favService, formsModule, spinnerService) {
        this.httpClient = httpClient;
        this.alertifyService = alertifyService;
        this.trackService = trackService;
        this.activatedRoute = activatedRoute;
        this.cartService = cartService;
        this.favService = favService;
        this.formsModule = formsModule;
        this.spinnerService = spinnerService;
        //#endregion
        //#region variables
        this.slice1 = 0;
        this.slice2 = 20;
        this.count = 0;
        this.stateList = ['first', 'stopped', 'playing'];
        this.state = 0;
        this.value = -1;
        this.rePlayCount = 0;
        this.playyed = 1;
        this.playPhoto = '../../assets/photos/play2.png';
        this.playButtonTouchCounter = 1;
        this.checkTrackIdForPhotoCounter = -1;
        this.tracks = [];
        this.trackDetails = [];
        this.date = new Date();
        this.key2 = 'dateTime';
        this.reverse2 = false;
        this.key = 'price';
        this.reverse = false;
        this.filteredGenre = '';
        this.filterText = '';
        this.searchTrack = '';
        this.today = new Date();
        this.keys = [];
        this.genres = [];
        this.check = true;
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
        this.buttonClicked5 = false;
        this.srcCounter = false;
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
        this.download = 'downloadNumber';
        this.reverse3 = true;
        this.filteredKey = '';
    }
    //#endregion
    //#region api's
    TrackpageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.show();
        setTimeout(function () {
            _this.getTrackDetail().subscribe(function (data) {
                _this.trackDetails = data;
                // const obs = from(this.trackDetails)
                // obs.subscribe(data => {
                //   console.log(data)
                // })
            });
            _this.getGenres().subscribe(function (data) {
                _this.genres = data;
            });
            _this.getKeys().subscribe(function (data) {
                _this.keys = data;
            });
            _this.spinnerService.hide();
        }, 500);
    };
    TrackpageComponent.prototype.getTrackDetail = function () {
        return this.httpClient.get('http://localhost:5191/Tracks/TrackDetails');
    };
    TrackpageComponent.prototype.getKeys = function () {
        return this.httpClient.get('http://localhost:5191/keys/getall');
    };
    TrackpageComponent.prototype.getGenres = function () {
        return this.httpClient.get('http://localhost:5191/genres/getall');
    };
    //#endregion
    //#region Inside Func
    TrackpageComponent.prototype.skipPage = function () {
        var _this = this;
        this.spinnerService.show();
        setTimeout(function () {
            _this.slice1 = _this.slice1 + 20;
            _this.slice2 = _this.slice2 + 20;
            _this.spinnerService.hide();
        }, 500);
    };
    TrackpageComponent.prototype.lastPage = function () {
        var _this = this;
        this.spinnerService.show();
        setTimeout(function () {
            if (_this.slice1 <= 20) {
                _this.slice1 = 0;
                _this.slice2 = 20;
            }
            else {
                _this.slice1 = _this.slice1 - 20;
                _this.slice2 = _this.slice2 - 20;
            }
            _this.spinnerService.hide();
        }, 500);
    };
    TrackpageComponent.prototype.addToFav = function (trackDetail) {
        this.favService.addToFavList(trackDetail);
    };
    TrackpageComponent.prototype.addToCartToTrackDetail = function () {
        var cti = this.currentTrackId;
        var trackDetail = this.trackDetails.find(function (t) { return t.id == cti; });
        this.addToCart(trackDetail);
    };
    TrackpageComponent.prototype.addToCart = function (trackDetail) {
        this.cartService.addToCart(trackDetail);
    };
    TrackpageComponent.prototype.sortByDownload = function (key) {
        this.download = key;
        this.reverse3 = !this.reverse3;
    };
    TrackpageComponent.prototype.sortByPrice = function (key) {
        this.key = key;
        this.reverse = !this.reverse;
    };
    TrackpageComponent.prototype.onTrackFilter = function () {
        this.searchTrack = this.filterText;
    };
    TrackpageComponent.prototype.filterByGenre = function (genre) {
        var _this = this;
        if (this.count == 0) {
            this.filteredGenre = genre;
            this.spinnerService.show();
            setTimeout(function () {
                _this.spinnerService.hide();
            }, 250);
            this.count = 1;
        }
        else {
            this.filteredGenre = '';
            this.spinnerService.show();
            setTimeout(function () {
                _this.spinnerService.hide();
            }, 250);
            this.count = 0;
        }
    };
    TrackpageComponent.prototype.filterByKey = function (key) {
        this.filteredKey = key;
    };
    TrackpageComponent.prototype.sortByDate = function (key2) {
        this.key2 = key2;
        this.reverse2 = !this.reverse2;
    };
    //#endregion
    //#region player func.
    TrackpageComponent.prototype.openFile = function (url) {
        this.streamObserver(url).subscribe(function (event) { });
    };
    TrackpageComponent.prototype.openFile2 = function (id) {
        var track = this.trackDetails.find(function (t) { return t.id == id; });
        this.currentTrackId = id;
        this.openFile("" + (track === null || track === void 0 ? void 0 : track.audioUrl));
    };
    TrackpageComponent.prototype.openFile3 = function (id) {
        if (this.state == 0) {
            this.changeSrcById(id, 0);
            var track = this.trackDetails.find(function (t) { return t.id == id; });
            this.currentTrackId = id;
            this.openFile("" + (track === null || track === void 0 ? void 0 : track.audioUrl));
            this.state = 2;
            this.currentIndex = id;
            this.value = id;
            return true;
        }
        else if (this.state == 2) {
            ///oynuyorken
            if (id == this.value) {
                //aynı
                this.changeSrcById(id, 0);
                this.state = 1;
                this.currentIndex = id;
                this.value = id;
                this.pause();
            }
            else if (id !== this.value) {
                //farklı
                this.changeSrcById(this.value, 4);
                this.changeSrcById(id, 3);
                this.state = 2;
                this.currentIndex = id;
                this.currentTrackId = id; //
                var track2 = this.trackDetails.find(function (t) { return t.id == id; });
                this.value = id;
                this.pause();
                this.openFile("" + (track2 === null || track2 === void 0 ? void 0 : track2.audioUrl));
            }
            return false;
        }
        else if (this.state === 1) {
            ///duruyorkeen
            if (id !== this.value) {
                //id eşit değilse
                this.changeSrcById(this.value, 1); //duruyorkeen yeni track eski
                this.changeSrcById(id, 2); //yeni
                this.state = 2;
                this.currentIndex = id;
                var track3 = this.trackDetails.find(function (t) { return t.id == id; });
                this.value = id;
                this.currentTrackId = id;
                this.play();
                this.openFile("" + (track3 === null || track3 === void 0 ? void 0 : track3.audioUrl));
            }
            else if (id == this.value) {
                this.changeSrcById(id, 0);
                this.state = 2;
                this.currentIndex = id;
                this.value = id;
                this.play();
            }
            return true;
        }
        else {
            this.alertifyService.error('else-by-stream-controller');
            this.state = 2;
            this.play();
            return true;
        }
    };
    TrackpageComponent.prototype.resetIndex = function (id) {
        var index = this.trackDetails.findIndex(function (t) { return t.id == id; });
        this.currentIndex = index;
    };
    TrackpageComponent.prototype.rePlay = function () {
        if (this.rePlayCount == 0) {
            this.rePlayCount = 1;
        }
        else {
            this.rePlayCount = 0;
        }
    };
    TrackpageComponent.prototype.streamObserver = function (url) {
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
                if (_this.audio.currentTime == _this.audio.duration &&
                    _this.rePlayCount == 0) {
                    _this.skipEnd();
                }
                else if (_this.audio.currentTime == _this.audio.duration &&
                    _this.rePlayCount == 1) {
                    _this.audio.currentTime = 0;
                    _this.play();
                }
            };
            _this.addEvent(_this.audio, _this.audioEvents, handler);
            return function () {
                _this.audio.pause();
                _this.audio.currentTime = 0;
                _this.removeEvent(_this.audio, _this.audioEvents, handler);
            };
        });
    };
    TrackpageComponent.prototype.setCurrentTime = function (ev) {
        this.audio.currentTime = parseFloat(ev.target.value);
    };
    TrackpageComponent.prototype.timeFormat = function (time, format) {
        if (format === void 0) { format = 'mm:ss'; }
        var momentTime = time * 1000;
        return moment.utc(momentTime).format(format);
    };
    TrackpageComponent.prototype.addEvent = function (obj, events, handler) {
        events.forEach(function (event) {
            obj.addEventListener(event, handler);
        });
    };
    TrackpageComponent.prototype.removeEvent = function (obj, events, handler) {
        events.forEach(function (event) {
            obj.removeEventListener(event, handler);
        });
    };
    TrackpageComponent.prototype.play = function () {
        this.audio.play();
    };
    TrackpageComponent.prototype.pause = function () {
        this.audio.pause();
    };
    TrackpageComponent.prototype.stop = function () {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.play();
    };
    TrackpageComponent.prototype.mute = function () {
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
    TrackpageComponent.prototype.volumeUp = function () {
        this.audio.volume = 1;
        document.getElementById('audioRange').value = '1';
    };
    TrackpageComponent.prototype.setVolume = function (ev) {
        this.audio.volume = parseFloat(ev.target.value);
    };
    TrackpageComponent.prototype.skipRandom = function () {
        var trackArray = this.trackDetails;
        var newIndex = Math.floor(Math.random() * trackArray.length - 1 + 1);
        this.currentIndex = newIndex;
        var newId = trackArray[this.currentIndex].id;
        this.openFile2(newId);
    };
    TrackpageComponent.prototype.skipStart = function () {
        var trackArray = this.trackDetails;
        this.resetPlayerByTrack(this.currentIndex);
        if (this.currentIndex > 0) {
            var newId = trackArray[this.currentIndex - 1].id;
            this.currentIndex--;
            this.openFile2(newId);
            return true;
        }
        else
            this.currentIndex == 0;
        {
            var newId = trackArray[trackArray.length - 1].id;
            this.currentIndex = trackArray.length - 1;
            this.openFile2(newId);
            return true;
        }
    };
    TrackpageComponent.prototype.skipEnd = function () {
        var trackArray = this.trackDetails;
        this.resetPlayerByTrack(this.currentIndex);
        if (this.currentIndex == trackArray.length - 1) {
            var newId = trackArray[0].id;
            this.currentIndex = 0;
            this.openFile2(newId);
            return true;
        }
        else
            this.currentIndex < trackArray.length - 1;
        {
            var newId = trackArray[this.currentIndex + 1].id;
            this.currentIndex++;
            this.openFile2(newId);
            return true;
        }
    };
    TrackpageComponent.prototype.changeSrcById = function (id, state) {
        // this.alertifyService.warning("girdi")
        if (this.srcCounter === false && state === 0) {
            document.getElementById('i' + ("" + id)).src =
                '../../assets/photos/pause-2.png';
            this.buttonClicked2 = true;
            this.srcCounter = true;
            // this.alertifyService.success('0-1')
        }
        else if (this.srcCounter === true && state === 0) {
            document.getElementById('i' + ("" + id)).src =
                '../../assets/photos/play-2.png';
            this.buttonClicked2 = false;
            this.srcCounter = false;
            // this.alertifyService.success('0-2')
        }
        else if (this.srcCounter == false && state == 1) {
            //duruyorkeen yeni track eskiyi guncelle
            document.getElementById('i' + ("" + id)).src =
                '../../assets/photos/play-2.png';
            this.buttonClicked2 = false;
            this.srcCounter = false;
            // this.alertifyService.success('1')
        }
        else if (this.srcCounter == false && state == 2) {
            // duruyorken yenı track geldi yeniyi güncelle
            document.getElementById('i' + ("" + id)).src =
                '../../assets/photos/pause-2.png';
            this.buttonClicked2 = true;
            this.srcCounter = true;
            // this.alertifyService.success('2')
        }
        else if (this.srcCounter === true && state == 3) {
            document.getElementById('i' + ("" + id)).src =
                '../../assets/photos/pause-2.png';
            this.buttonClicked2 = true;
            this.srcCounter = true;
            // this.alertifyService.success('3')
        }
        else if (this.srcCounter === true && state == 4) {
            //oynuyorken farklı id
            document.getElementById('i' + ("" + id)).src =
                '../../assets/photos/play-2.png';
            this.buttonClicked2 = true;
            this.srcCounter = true;
            // this.alertifyService.success('4')
        }
        else if (this.srcCounter === false && state === 5) {
            //durdurduktan sonra oynat --by player
            document.getElementById('i' + ("" + id)).src =
                '../../assets/photos/pause-2.png';
            this.buttonClicked2 = true; //play
            this.srcCounter = true;
            // this.alertifyService.success('5')
        }
        else if (this.srcCounter === true && state === 6) {
            //oynattıktan sonra durdur --by player
            document.getElementById('i' + ("" + id)).src =
                '../../assets/photos/play-2.png';
            this.buttonClicked2 = false; //play
            this.srcCounter = false;
            // this.alertifyService.success('6')
        }
        else {
            this.alertifyService.error('else: ' + this.srcCounter + '///' + state);
        }
    };
    TrackpageComponent.prototype.changePlayerByTrack = function (photoUrl, title, desc, price) {
        (document.getElementById('trackPlayerPhoto').src = "" + photoUrl),
            (document.getElementById('trackPlayerTitle').innerHTML = "" + title),
            (document.getElementById('trackPlayerName').innerHTML = "" + desc);
        document.getElementById('trackPlayerPrice').innerHTML = "" + ('$' + price);
    };
    TrackpageComponent.prototype.resetPlayerByTrack = function (index) {
        var photoUrl = this.trackDetails[index].photoUrl;
        var title = this.trackDetails[index].title;
        var desc = this.trackDetails[index].desc;
        var price = this.trackDetails[index].price;
        this.changePlayerByTrack(photoUrl, title, desc, price);
    };
    TrackpageComponent.prototype.clicked = function () {
        this.buttonClicked = true;
    };
    TrackpageComponent.prototype.clicked2 = function () {
        var cti = this.currentTrackId;
        // this.alertifyService.warning("denendi")
        if (this.state == 1 && this.buttonClicked2 == true) {
            this.buttonClicked2 = false;
            this.state = 2;
            this.play();
            return true;
        }
        else if (this.state == 1 && this.buttonClicked2 == false) {
            // this.buttonClicked2 = true;//player
            this.changeSrcById(this.currentTrackId, 5);
            this.state = 2;
            this.play();
            return true;
        }
        else if (this.state == 2 && this.buttonClicked2 == false) {
            this.buttonClicked2 = true;
            this.state = 1;
            this.pause();
            return true;
        }
        else if (this.state == 2 && this.buttonClicked2 == true) {
            this.buttonClicked2 = false; //player
            this.changeSrcById(this.currentTrackId, 6);
            this.state = 1;
            this.pause();
            return true;
        }
        else {
            this.alertifyService.error('else-by-player');
            return true;
        }
    };
    TrackpageComponent.prototype.clicked3 = function () {
        if (this.buttonClicked3 == false) {
            this.buttonClicked3 = true;
            return true;
        }
        else
            this.buttonClicked3 == true;
        {
            this.buttonClicked3 = false;
            return false;
        }
    };
    TrackpageComponent.prototype.clicked4 = function () {
        if (this.buttonClicked4 == false) {
            this.buttonClicked4 = true;
        }
        else
            this.buttonClicked4 == true;
        {
            this.buttonClicked4 = false;
        }
    };
    TrackpageComponent.prototype.firtPlayButtonTouch = function () {
        if (this.playButtonTouchCounter === 1) {
            this.playButtonTouchCounter = 0;
            return false;
        }
        else {
            return true;
        }
    };
    TrackpageComponent.prototype.checkTrackIdForPhoto = function (id) {
        var CheckTrack = this.trackDetails
            .slice(this.slice1, this.slice2)
            .find(function (t) { return t.id == id; });
        var CheckId = CheckTrack === null || CheckTrack === void 0 ? void 0 : CheckTrack.id;
        if (this.currentTrackId === undefined) {
            this.checkTrackIdForPhotoCounter = -1;
            return -1;
        }
        else if (this.currentTrackId === CheckId) {
            this.checkTrackIdForPhotoCounter = 1;
            return 1;
        }
        else {
            this.checkTrackIdForPhotoCounter = 0;
            return 0;
        }
    };
    TrackpageComponent = __decorate([
        core_1.Component({
            selector: 'app-trackpage',
            templateUrl: './trackpage.component.html',
            styleUrls: ['./trackpage.component.css'],
            providers: [track_service_1.TrackService]
        })
    ], TrackpageComponent);
    return TrackpageComponent;
}());
exports.TrackpageComponent = TrackpageComponent;
//#endregion
