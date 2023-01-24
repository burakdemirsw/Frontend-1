"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateTrackComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var track_1 = require("src/app/models/track");
var UpdateTrackComponent = /** @class */ (function () {
    function UpdateTrackComponent(httpClient, alertifyService, trackService, activatedRoute, formBuilder, spinnerService // private spinnerService: NgxSpinnerService
    ) {
        this.httpClient = httpClient;
        this.alertifyService = alertifyService;
        this.trackService = trackService;
        this.activatedRoute = activatedRoute;
        this.formBuilder = formBuilder;
        this.spinnerService = spinnerService;
        this.track = new track_1.Track();
        this.url = 'http://localhost:4200/Admin';
        this.genres = [];
        this.keys = [];
        this.fileList = [];
        this.fileList2 = [];
        this.currentTrackId = 0;
    }
    UpdateTrackComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.show();
        this.createTrackUpdateForm();
        this.getGenres().subscribe(function (data) {
            _this.genres = data;
        });
        this.getKeys().subscribe(function (data) {
            _this.keys = data;
        });
        this.spinnerService.hide();
        setTimeout(function () {
            _this.activatedRoute.params.subscribe(function (params) {
                _this.getTrackById(params['trackId']);
            });
        }, 0);
    };
    UpdateTrackComponent.prototype.getTrackById = function (trackId) {
        var _this = this;
        this.trackService.getTrackFromApi(trackId).subscribe(function (data) {
            _this.track = data;
            _this.currentTrackId = _this.track.id;
            var innerHtmlValue = document.getElementById("id").value;
            innerHtmlValue = "" + _this.currentTrackId;
            alert(innerHtmlValue ? innerHtmlValue : "değer boş");
        });
    };
    UpdateTrackComponent.prototype.getKeys = function () {
        return this.httpClient.get('http://localhost:5191/keys/getall');
    };
    UpdateTrackComponent.prototype.getGenres = function () {
        return this.httpClient.get('http://localhost:5191/genres/getall');
    };
    UpdateTrackComponent.prototype.createTrackUpdateForm = function () {
        this.trackUpdateForm = this.formBuilder.group({
            id: [Number, [forms_1.Validators.required],],
            title: ['', [forms_1.Validators.required]],
            userId: ['', [forms_1.Validators.required]],
            genreId: ['', [forms_1.Validators.required]],
            keyId: ['', [forms_1.Validators.required]],
            price: ['', [forms_1.Validators.required]],
            premiumPrice: ['', [forms_1.Validators.required]],
            bpm: ['', [forms_1.Validators.required]],
            desc: ['', [forms_1.Validators.required]]
        });
    };
    UpdateTrackComponent.prototype.dropped = function (files) {
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
    UpdateTrackComponent.prototype.dropped2 = function (files) {
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
    UpdateTrackComponent.prototype.addValueFormData = function (value) {
        value.id = this.currentTrackId;
        value.userId = 1;
        var formdata = new FormData();
        formdata.append('images', this.fileList[0]);
        formdata.append('audios', this.fileList2[0]);
        formdata.append('id', JSON.stringify(value.id));
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
    UpdateTrackComponent.prototype.formatDecimal = function (number) {
        return number.toString().replace('.', ',');
    };
    UpdateTrackComponent.prototype.updateTrack = function (value) {
        var _this = this;
        var trackModel = Object.assign({}, this.trackUpdateForm.value);
        console.log(trackModel);
        if (this.trackUpdateForm.valid || !this.trackUpdateForm.valid) {
            this.spinnerService.show();
            this.trackService
                .updatePost(this.addValueFormData(value))
                .subscribe(function (response) {
                _this.alertifyService.success('TRACK HAS BEEN UPLOADED SUCCSESSFULY');
                _this.spinnerService.hide();
                window.location.href = _this.url;
            });
        }
        else {
            this.alertifyService.error('ERROR!');
        }
    };
    UpdateTrackComponent = __decorate([
        core_1.Component({
            selector: 'app-update-track',
            templateUrl: './update-track.component.html',
            styleUrls: ['./update-track.component.css']
        })
    ], UpdateTrackComponent);
    return UpdateTrackComponent;
}());
exports.UpdateTrackComponent = UpdateTrackComponent;
