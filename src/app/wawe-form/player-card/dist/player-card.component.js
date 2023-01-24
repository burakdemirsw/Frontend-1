"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlayerCardComponent = void 0;
var core_1 = require("@angular/core");
var PlayerCardComponent = /** @class */ (function () {
    function PlayerCardComponent() {
        this.playWaveForm = new core_1.EventEmitter();
        this.toggleStatus = false;
    }
    PlayerCardComponent.prototype.playWaveFormOnClick = function (id) {
        if (!id || id < 1) {
            return; //throw alert
        }
        this.toggleStatus = !this.toggleStatus;
        this.playWaveForm.emit(id);
    };
    __decorate([
        core_1.Input()
    ], PlayerCardComponent.prototype, "track");
    __decorate([
        core_1.Output()
    ], PlayerCardComponent.prototype, "playWaveForm");
    PlayerCardComponent = __decorate([
        core_1.Component({
            selector: 'app-player-card',
            templateUrl: './player-card.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], PlayerCardComponent);
    return PlayerCardComponent;
}());
exports.PlayerCardComponent = PlayerCardComponent;
