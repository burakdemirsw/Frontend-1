"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadtrackComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UploadtrackComponent = /** @class */ (function () {
    function UploadtrackComponent(httpClient, formBuilder, trackService, alertifyService, spinnerService) {
        this.httpClient = httpClient;
        this.formBuilder = formBuilder;
        this.trackService = trackService;
        this.alertifyService = alertifyService;
        this.spinnerService = spinnerService;
        this.fileList = [];
        this.fileList2 = [];
        this.addPath = 'http://localhost:5191/tracks/add';
        this.url = 'http://localhost:4200/TrackList';
        this.genres = [];
        this.keys = [];
    }
    UploadtrackComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createTrackAddForm();
        this.getGenres().subscribe(function (data) {
            _this.genres = data;
        });
        this.getKeys().subscribe(function (data) {
            _this.keys = data;
        });
    };
    UploadtrackComponent.prototype.getKeys = function () {
        return this.httpClient.get('http://localhost:5191/keys/getall');
    };
    UploadtrackComponent.prototype.getGenres = function () {
        return this.httpClient.get('http://localhost:5191/genres/getall');
    };
    UploadtrackComponent.prototype.createTrackAddForm = function () {
        this.trackAddForm = this.formBuilder.group({
            userId: ['', forms_1.Validators.required],
            genreId: ['', forms_1.Validators.required],
            keyId: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required],
            premiumPrice: ['', forms_1.Validators.required],
            bpm: ['', forms_1.Validators.required],
            title: ['', forms_1.Validators.required],
            desc: ['', forms_1.Validators.required]
        });
    };
    UploadtrackComponent.prototype.dropped = function (files) {
        var _this = this;
        this.files = [];
        this.files = files;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            if (droppedFile.fileEntry.isFile) {
                var fileEntry = droppedFile.fileEntry;
                fileEntry.file(function (file) {
                    _this.fileList.push(file);
                });
            }
        }
    };
    UploadtrackComponent.prototype.dropped2 = function (files) {
        var _this = this;
        this.files2 = [];
        this.files2 = files;
        for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
            var droppedFile2 = files_2[_i];
            if (droppedFile2.fileEntry.isFile) {
                var fileEntry = droppedFile2.fileEntry;
                fileEntry.file(function (file) {
                    _this.fileList2.push(file);
                });
            }
        }
    };
    UploadtrackComponent.prototype.addValueFormData = function (value) {
        value.userId = 1;
        var formdata = new FormData();
        formdata.append('images', this.fileList[0]);
        formdata.append('audios', this.fileList2[0]);
        formdata.append('genreId', this.formatDecimal(value.genreId));
        formdata.append('keyId', this.formatDecimal(value.keyId));
        formdata.append('userId', JSON.stringify(value.userId));
        formdata.append('price', JSON.stringify(value.price));
        formdata.append('premiumPrice', JSON.stringify(value.premiumPrice));
        formdata.append('bpm', JSON.stringify(value.bpm));
        formdata.append('title', value.title);
        formdata.append('desc', value.desc);
        return formdata;
    };
    UploadtrackComponent.prototype.formatDecimal = function (number) {
        return number.toString().replace('.', ',');
    };
    UploadtrackComponent.prototype.addTrack = function (value) {
        var _this = this;
        if (!this.trackAddForm.valid) {
            this.spinnerService.show();
            this.trackService
                .addPost(this.addValueFormData(value))
                .subscribe(function (response) {
                // console.log(response);
                _this.spinnerService.hide();
                window.location.href = _this.url;
                _this.alertifyService.success('TRACK HAS BEEN UPLODED SUCCSESSFULY');
            });
        }
        else {
            this.alertifyService.error('ERROR!');
            console.log(this.trackAddForm);
        }
    };
    UploadtrackComponent = __decorate([
        core_1.Component({
            selector: 'app-uploadtrack',
            templateUrl: './uploadtrack.component.html',
            styleUrls: ['./uploadtrack.component.css']
        })
    ], UploadtrackComponent);
    return UploadtrackComponent;
}());
exports.UploadtrackComponent = UploadtrackComponent;
