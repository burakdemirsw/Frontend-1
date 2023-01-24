"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WaweFormComponent = void 0;
var core_1 = require("@angular/core");
var wavesurfer_js_1 = require("wavesurfer.js");
var WaweFormComponent = /** @class */ (function () {
    function WaweFormComponent(cdr, httpClient, alertifyService, spinnerService, loopService, trackService) {
        this.cdr = cdr;
        this.httpClient = httpClient;
        this.alertifyService = alertifyService;
        this.spinnerService = spinnerService;
        this.loopService = loopService;
        this.trackService = trackService;
        this.wave = [];
        this.url = '../../assets/audios/alone.mp3';
        this.photoUrl = '../../assets//photos/red1.jpg';
        this.trackDetails = [];
        this.slice1 = 0;
        this.slice2 = 20;
        this.keys = [];
        this.genres = [];
        this.date = new Date();
        this.key2 = 'dateTime';
        this.reverse2 = false;
        this.key = 'price';
        this.reverse = false;
        this.filteredGenre = '';
        this.filterText = '';
        this.searchTrack = '';
        this.today = new Date();
        this.count = 0;
        this.filteredKey = '';
        this.index = 0;
        this.playCounter = -1;
        this.currentTrackId = [];
        this.classCounter = false;
        this.buttonClicked2 = false;
        this.downloadCounter = 0;
        this.userId = 1;
    }
    //#endregion
    //#region  Inside func
    WaweFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.show();
        setTimeout(function () {
            _this.getTrackDetail().subscribe(function (data) {
                _this.trackDetails = data;
                console.log(data);
                _this.getGenres().subscribe(function (data) {
                    _this.genres = data;
                });
                _this.getKeys().subscribe(function (data) {
                    _this.keys = data;
                });
                setTimeout(function () {
                    _this.getTracks();
                }, 0);
                _this.spinnerService.hide();
            });
        }, 100);
    };
    WaweFormComponent.prototype.getKeys = function () {
        return this.httpClient.get('http://localhost:5191/keys/getall');
    };
    WaweFormComponent.prototype.getGenres = function () {
        return this.httpClient.get('http://localhost:5191/genres/getall');
    };
    WaweFormComponent.prototype.sortByPrice = function (key) {
        this.key = key;
        this.reverse = !this.reverse;
    };
    WaweFormComponent.prototype.onTrackFilter = function () {
        this.searchTrack = this.filterText;
    };
    WaweFormComponent.prototype.filterByGenre = function (genre) {
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
    WaweFormComponent.prototype.filterByKey = function (key) {
        this.filteredKey = key;
    };
    WaweFormComponent.prototype.sortByDate = function (key2) {
        this.key2 = key2;
        this.reverse2 = !this.reverse2;
    };
    WaweFormComponent.prototype.skipPage = function () {
        // window.location.href='/Wave'
        this.slice1 = this.slice1 + 20;
        this.slice2 = this.slice2 + 10;
        this.getTracksWithSkip();
    };
    WaweFormComponent.prototype.lastPage = function () {
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
    //#endregion
    //#region Wave Surfer
    WaweFormComponent.prototype.getTracks = function () {
        for (var count = 0; count <= this.trackDetails.length - 1; count++) {
            this.createWaveForm(this.trackDetails[count].id);
        }
    };
    WaweFormComponent.prototype.getTracksWithSkip = function () {
        for (this.slice1; this.slice1 < this.slice2; this.slice1++) {
            this.createWaveForm(this.trackDetails[this.slice1 - 1].id);
        }
    };
    WaweFormComponent.prototype.getTrackDetail = function () {
        return this.httpClient.get('http://localhost:5191/Tracks/TrackDetails');
    };
    WaweFormComponent.prototype.createWaveForm = function (id) {
        //bu wave i yenı vaveler eklemen alzım
        this.wave[this.index] = wavesurfer_js_1["default"].create({
            container: '#' + 'T' + ("" + id),
            waveColor: '#D9DCFF',
            progressColor: '#4353FF',
            cursorColor: '#4353FF',
            barWidth: 3,
            barRadius: 3,
            cursorWidth: 1,
            height: 30,
            barGap: 3
        });
        var track = this.trackDetails.find(function (t) { return t.id == id; });
        this.wave[this.index].load(track.audioUrl);
        this.index = this.index + 1;
    };
    WaweFormComponent.prototype.playCoutCounter = function () {
        this.playCounter = 1;
    };
    WaweFormComponent.prototype.setVolume = function (ev, id) {
        var trackIndex = this.trackDetails.findIndex(function (t) { return t.id == id; });
        var button = document.getElementById("customRange1");
        this.wave[trackIndex].setVolume(Number(ev.target.value));
    };
    WaweFormComponent.prototype.playWaveForm = function (id) {
        var _this = this;
        this.currentTrackId.push(id);
        var lastId = this.currentTrackId.length - 2;
        if (id == this.currentTrackId[lastId] || id == this.currentTrackId[0]) {
            this.clicked2();
            this.changeClassById(id);
            this.streamObserver(id);
            var trackIndex = this.trackDetails.findIndex(function (t) { return t.id == id; });
            this.wave[trackIndex].playPause();
        }
        else if (id !== this.currentTrackId[lastId]) {
            this.clicked2();
            this.changeClassById(this.currentTrackId[lastId]);
            this.changeClassById(id);
            this.streamObserver(id);
            var lastTrackIndex = this.trackDetails.findIndex(function (t) { return t.id == _this.currentTrackId[lastId]; });
            this.wave[lastTrackIndex].setCurrentTime(0);
            this.wave[lastTrackIndex].pause();
            var trackIndex = this.trackDetails.findIndex(function (t) { return t.id == id; });
            this.wave[trackIndex].playPause();
        }
        else {
            this.alertifyService.warning("");
        }
    };
    WaweFormComponent.prototype.changeClassById = function (id) {
        if (this.classCounter === false) {
            document.getElementById('p' + ("" + id)).className =
                'bi-pause';
            this.classCounter = true;
        }
        else {
            document.getElementById('p' + ("" + id)).className =
                'bi-play';
            this.classCounter = false;
        }
    };
    WaweFormComponent.prototype.nextWaveForm = function (id) {
        var track = this.trackDetails.findIndex(function (t) { return t.id == id; });
        this.wave[track].skip(10);
    };
    WaweFormComponent.prototype.streamObserver = function (id) {
        var _this = this;
        var track = this.trackDetails.find(function (t) { return t.id == id; });
        var trackIndex = this.trackDetails.findIndex(function (t) { return t.id == id; });
        document.getElementById('d' + ("" + track.id)).innerHTML = this.setDurationTime(id);
        this.wave[trackIndex].on('audioprocess', function (e) {
            // let a:string = document.getElementById('c' + `${track.id}`).innerHTML;
            // let b:string = document.getElementById('d' + `${track.id}`).innerHTML;
            if (document.getElementById('c' + ("" + track.id)).innerHTML == document.getElementById('d' + ("" + track.id)).innerHTML) {
                _this.changeClassById(id);
                _this.wave[trackIndex].setCurrentTime(0);
                _this.wave[trackIndex].pause();
            }
            else {
                // console.log(this.wave[trackIndex].getDuration()+"-----"+this.wave[trackIndex].getCurrentTime())
            }
            document.getElementById('c' + ("" + track.id)).innerHTML = _this.setCurrentTime(id);
        });
    };
    WaweFormComponent.prototype.setDurationTime = function (id) {
        var track = this.trackDetails.findIndex(function (t) { return t.id == id; });
        var durationTime = this.wave[track].getDuration();
        return this.timeCalculator(durationTime);
    };
    WaweFormComponent.prototype.setCurrentTime = function (id) {
        var track = this.trackDetails.findIndex(function (t) { return t.id == id; });
        var currentTime = this.wave[track].getCurrentTime();
        return this.timeCalculator(currentTime);
    };
    WaweFormComponent.prototype.timeCalculator = function (time) {
        var second = Math.floor(time % 60).toString();
        var minute = Math.floor((time / 60) % 60).toString();
        return "" + minute + ':' + ("" + second);
    };
    WaweFormComponent.prototype.loadWaveForm = function (id) {
        var track = this.trackDetails.find(function (t) { return t.id == id; });
        var trackUrl = track.audioUrl;
        this.wave[0].load(trackUrl);
        var ct = this.wave[0].getCurrentTime();
        console.log(ct);
    };
    WaweFormComponent.prototype.stopWaveForm = function (id) {
        var track = this.trackDetails.findIndex(function (t) { return t.id == id; });
        this.wave[track].stop();
    };
    WaweFormComponent.prototype.clicked2 = function () {
        //hide content
        if (this.buttonClicked2 == false) {
            this.buttonClicked2 = true;
            // this.alertifyService.success("eklendi")
        }
        else
            this.buttonClicked2 == true;
        {
            this.buttonClicked2 = false;
            // this.alertifyService.success("kaldırıldı")
        }
    };
    WaweFormComponent.prototype.updateDownloadNumber = function (id) {
        this.trackService.updateDownlaodNumberLoop(id).subscribe();
        this.alertifyService.warning('');
    };
    WaweFormComponent.prototype.download = function (audioUrl, id) {
        //giriş yaptı mı?
        //bu kullanıcı bu şarkıyı kaç kere indirdi?
        if (this.userId == 1 && this.downloadCounter < 5) {
            this.updateDownloadNumber(id);
            this.downloadCounter++;
            var fileName = audioUrl.split('/').pop(); //bu kısımda file url den file name i alcaz
            this.alertifyService.success(fileName);
            var link = document.createElement('a');
            link.setAttribute('type', 'hidden');
            link.download = fileName; //bu kısma file-name gelcek
            link.href = audioUrl; //bu kısma file-url gelcek
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        else {
            this.alertifyService.error('günlük indirme limitin aşıldı');
        }
        //+1 beğeni sayısı
    };
    WaweFormComponent = __decorate([
        core_1.Component({
            selector: 'app-wawe-form',
            templateUrl: './wawe-form.component.html',
            styleUrls: ['./wawe-form.component.css']
        })
        //#endregion
        //#region variables
    ], WaweFormComponent);
    return WaweFormComponent;
}());
exports.WaweFormComponent = WaweFormComponent;
