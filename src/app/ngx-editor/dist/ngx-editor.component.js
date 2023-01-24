"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NgxEditorComponent = void 0;
var core_1 = require("@angular/core");
var ngx_editor_1 = require("ngx-editor");
var NgxEditorComponent = /** @class */ (function () {
    function NgxEditorComponent() {
    }
    NgxEditorComponent.prototype.ngOnInit = function () {
        this.editor = new ngx_editor_1.Editor();
    };
    // make sure to destory the editor
    NgxEditorComponent.prototype.ngOnDestroy = function () {
        this.editor.destroy();
    };
    NgxEditorComponent = __decorate([
        core_1.Component({
            selector: 'app-ngx-editor',
            templateUrl: './ngx-editor.component.html',
            styleUrls: ['./ngx-editor.component.css']
        })
    ], NgxEditorComponent);
    return NgxEditorComponent;
}());
exports.NgxEditorComponent = NgxEditorComponent;
