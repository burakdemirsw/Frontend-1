"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoopService = void 0;
var core_1 = require("@angular/core");
var createLoopDTO_1 = require("../models/DTOs/createLoopDTO");
var LoopService = /** @class */ (function () {
    function LoopService(httpClient, alertifyService) {
        this.httpClient = httpClient;
        this.alertifyService = alertifyService;
        this.apiUrl = 'http://localhost:5191/Loops/Add';
        this.getPath2 = 'http://localhost:5191/Loops/Delete';
        this.getPath3 = 'http://localhost:5191/Loops/Get';
        this.apiUrl2 = 'http://localhost:5191/Loops/Update';
        this.apiUrl3 = 'http://localhost:5191/LoopsDetail/Add';
        this.apiUrl4 = 'http://localhost:5191/Loops/TrackDetailsById';
        this.apiUrl5 = 'http://localhost:5191/Loops/getall';
        this.apiUrl6 = 'http://localhost:5191/Loops/UpdateDN';
    }
    LoopService.prototype.getLoopFromApi = function (loopId) {
        //
        var url = this.getPath3 + "/" + loopId;
        return this.httpClient.get(url);
    };
    LoopService.prototype.getLoopWithDetailFromApi = function (loopId) {
        //
        var url = this.apiUrl4 + "/" + loopId;
        var result = this.httpClient.get(url);
        // console.log(result)
        return result;
    };
    LoopService.prototype.getLoops = function () {
        return this.httpClient.get(this.apiUrl5);
    };
    LoopService.prototype.addPost = function (loopdto, loopDetaildto) {
        var createLoopDTO = new createLoopDTO_1.CreateLoopDTO(loopdto, loopDetaildto);
        return this.httpClient.post(this.apiUrl, createLoopDTO);
    };
    LoopService.prototype.updatePost = function (loopDTO, loopDetailDTO) {
        var createLoopDTO = new createLoopDTO_1.CreateLoopDTO(loopDTO, loopDetailDTO);
        return this.httpClient.put(this.apiUrl2, createLoopDTO);
    };
    LoopService.prototype.deleteLoop = function (loopId) {
        var url = this.getPath2 + "/" + loopId;
        return this.httpClient["delete"](url);
    };
    LoopService.prototype.updateDownlaodNumberLoop = function (loopId) {
        var url = this.apiUrl6 + "/" + loopId;
        return this.httpClient.put(url, loopId);
    };
    LoopService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoopService);
    return LoopService;
}());
exports.LoopService = LoopService;
