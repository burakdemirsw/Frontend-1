"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrackFSComponent = void 0;
var core_1 = require("@angular/core");
var TrackFSComponent = /** @class */ (function () {
    function TrackFSComponent(httpClient, alertifyService, spinnerService, loopService, trackService) {
        this.httpClient = httpClient;
        this.alertifyService = alertifyService;
        this.spinnerService = spinnerService;
        this.loopService = loopService;
        this.trackService = trackService;
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
        this.trackDetails = [];
        this.filteredKey = '';
    }
    TrackFSComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.show();
        this.getTrackDetail().subscribe(function (data) {
            _this.trackDetails = data;
            console.log(data);
            _this.getGenres().subscribe(function (data) {
                _this.genres = data;
            });
            _this.getKeys().subscribe(function (data) {
                _this.keys = data;
            });
            setTimeout(function () {
                _this.spinnerService.hide();
            }, 1000);
        });
    };
    TrackFSComponent.prototype.getKeys = function () {
        return this.httpClient.get('http://localhost:5191/keys/getall');
    };
    TrackFSComponent.prototype.getGenres = function () {
        return this.httpClient.get('http://localhost:5191/genres/getall');
    };
    TrackFSComponent.prototype.sortByPrice = function (key) {
        this.key = key;
        this.reverse = !this.reverse;
    };
    TrackFSComponent.prototype.onTrackFilter = function () {
        this.searchTrack = this.filterText;
    };
    TrackFSComponent.prototype.filterByGenre = function (genre) {
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
    TrackFSComponent.prototype.filterByKey = function (key) {
        this.filteredKey = key;
    };
    TrackFSComponent.prototype.sortByDate = function (key2) {
        this.key2 = key2;
        this.reverse2 = !this.reverse2;
    };
    TrackFSComponent.prototype.getTrackDetail = function () {
        return this.httpClient.get('http://localhost:5191/Tracks/TrackDetails');
    };
    TrackFSComponent = __decorate([
        core_1.Component({
            selector: 'app-track-fs',
            templateUrl: './track-fs.component.html',
            styleUrls: ['./track-fs.component.css']
        })
    ], TrackFSComponent);
    return TrackFSComponent;
}());
exports.TrackFSComponent = TrackFSComponent;
