"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrackComponent = void 0;
var core_1 = require("@angular/core");
var TrackComponent = /** @class */ (function () {
    function TrackComponent(httpClient, alertifyService, trackService, activatedRoute) {
        this.httpClient = httpClient;
        this.alertifyService = alertifyService;
        this.trackService = trackService;
        this.activatedRoute = activatedRoute;
        this.trackDetails = [];
        this.getPath = 'http://localhost:5191/Tracks/TrackDetails';
        this.getPath2 = 'http://localhost:4200/Admin';
    }
    TrackComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTracks().subscribe(function (data) {
            _this.trackDetails = data;
            // console.log(data)
        });
    };
    TrackComponent.prototype.changeDeleteTrackId = function (id) {
        this.deleteTrackId = id;
    };
    TrackComponent.prototype.getTracks = function () {
        return this.httpClient.get(this.getPath);
    };
    TrackComponent.prototype.deleteTrack = function (trackId) {
        this.trackService
            .deleteTrack(trackId)
            .subscribe();
        window.location.href = this.getPath2;
    };
    TrackComponent = __decorate([
        core_1.Component({
            selector: 'app-track',
            templateUrl: './track.component.html',
            styleUrls: ['./track.component.css']
        })
    ], TrackComponent);
    return TrackComponent;
}());
exports.TrackComponent = TrackComponent;
