"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrackService = void 0;
var core_1 = require("@angular/core");
var TrackService = /** @class */ (function () {
    // headers = new HttpHeaders().set('Content-Type', 'application/json');
    function TrackService(httpClient, alertifyService) {
        this.httpClient = httpClient;
        this.alertifyService = alertifyService;
        this.apiUrl = 'http://localhost:5191/Tracks/Add';
        this.getPath2 = 'http://localhost:5191/Tracks/Delete';
        this.getPath3 = 'http://localhost:5191/Tracks/Get';
        this.apiUrl2 = 'http://localhost:5191/tracks/Update';
        this.apiUrl3 = 'http://localhost:5191/TracksDetail/Add';
        this.apiUrl4 = 'http://localhost:5191/Tracks/TrackDetailsById';
        this.apiUrl5 = 'http://localhost:5191/Tracks/getall';
        this.apiUrl6 = 'http://localhost:5191/Tracks/UpdateDN';
    }
    TrackService.prototype.getTrackFromApi = function (trackId) {
        //
        var url = this.getPath3 + "/" + trackId;
        return this.httpClient.get(url);
    };
    TrackService.prototype.getTrackWithDetailFromApi = function (trackId) {
        //
        var url = this.apiUrl4 + "/" + trackId;
        var result = this.httpClient.get(url);
        // console.log(result)
        return result;
    };
    TrackService.prototype.getTracks = function () {
        return this.httpClient.get(this.apiUrl5);
    };
    TrackService.prototype.addPost = function (formData) {
        return this.httpClient.post(this.apiUrl, formData);
    };
    TrackService.prototype.updatePost = function (trackUpdateDto) {
        return this.httpClient.put(this.apiUrl2, trackUpdateDto);
    };
    TrackService.prototype.deleteTrack = function (trackId) {
        var url = this.getPath2 + "/" + trackId;
        return this.httpClient["delete"](url);
    };
    TrackService.prototype.updateDownlaodNumberLoop = function (trackId) {
        var url = this.apiUrl6 + "/" + trackId;
        return this.httpClient.put(url, trackId);
    };
    TrackService.prototype.getFormData = function (object) {
        var formData = new FormData();
        Object.keys(object).forEach(function (key) { return formData.append(key, object[key]); });
        return formData;
    };
    TrackService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TrackService);
    return TrackService;
}());
exports.TrackService = TrackService;
