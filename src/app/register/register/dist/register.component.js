"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, userService, alertifyService, spinnerService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.alertifyService = alertifyService;
        this.spinnerService = spinnerService;
        this.addPath = 'http://localhost:5191/users/add';
        this.url = 'http://localhost:4200/Upload';
        this.homepageUrl = 'http://localhost:4200/Homepage';
        this.loginPageUrl = 'http://localhost:4200/Login';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createUserAddForm();
        this.createUserAddForm2();
        this.spinnerService.show();
        setTimeout(function () {
            /** spinner ends after 5 seconds */
            _this.spinnerService.hide();
        }, 250);
    };
    RegisterComponent.prototype.createUserAddForm = function () {
        this.userAddForm = this.formBuilder.group({
            userName: ['', forms_1.Validators.required],
            lastName: ['', forms_1.Validators.required],
            passwordSalt: ['', forms_1.Validators.required]
        });
    };
    RegisterComponent.prototype.createUserAddForm2 = function () {
        this.userAddForm2 = this.formBuilder.group({
            email: ['', forms_1.Validators.required],
            country: ['', forms_1.Validators.required],
            phone: ['', forms_1.Validators.required],
            postalCode: ['', forms_1.Validators.required],
            dateOfBirth: ['', forms_1.Validators.required],
            gender: ['', forms_1.Validators.required],
            userAddress: ['', forms_1.Validators.required]
        });
    };
    RegisterComponent.prototype.addUser = function () {
        var _this = this;
        this.spinnerService.show();
        setTimeout(function () {
            /** spinner ends after 5 seconds */
            if (_this.userAddForm.valid && _this.userAddForm2.valid) {
                var userModel = Object.assign({}, _this.userAddForm.value);
                var userModel2 = Object.assign({}, _this.userAddForm2.value);
                _this.userService.addUser(userModel, userModel2).subscribe(function (response) {
                    window.location.href = _this.loginPageUrl;
                    // this.alertifyService.success('TRACK HAS BEEN UPLOADED SUCCSESSFULY');
                });
            }
            else {
                _this.alertifyService.error('ERROR!');
            }
            _this.spinnerService.hide();
        }, 250);
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
