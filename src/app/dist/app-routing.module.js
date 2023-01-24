"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var homepage_component_1 = require("./homepage/homepage.component");
var login_component_1 = require("./login/login.component");
var track_component_1 = require("./ADMIN/track.component");
var trackdetails_component_1 = require("./trackpage/trackdetails/trackdetails.component");
var trackpage_component_1 = require("./trackpage/trackpage.component");
var update_track_component_1 = require("./ADMIN/update-track/update-track.component");
var uploadtrack_component_1 = require("./ADMIN/uploadtrack/uploadtrack.component");
var trackdetail2_component_1 = require("./ADMIN/trackdetail2/trackdetail2.component");
var card_component_1 = require("./card/card.component");
var player_component_1 = require("./trackpage/player/player.component");
var register_component_1 = require("./register/register/register.component");
var login_guard_1 = require("./login/login.guard");
var wawe_form_component_1 = require("./wawe-form/wawe-form.component");
var routes = [
    { path: 'TrackList', component: trackpage_component_1.TrackpageComponent },
    { path: 'Admin', component: track_component_1.TrackComponent },
    { path: 'Login', component: login_component_1.LoginComponent },
    { path: 'Homepage', component: homepage_component_1.HomepageComponent },
    {
        path: 'Upload',
        component: uploadtrack_component_1.UploadtrackComponent
    },
    {
        path: 'Update/:trackId',
        component: update_track_component_1.UpdateTrackComponent
    },
    {
        path: 'Update',
        component: update_track_component_1.UpdateTrackComponent
    },
    { path: 'Card', component: card_component_1.CardComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: 'Track-Details/:trackId', component: trackdetail2_component_1.Trackdetail2Component },
    { path: 'Track-Special/:trackId', component: trackdetails_component_1.TrackdetailsComponent },
    { path: 'Player', component: player_component_1.PlayerComponent },
    { path: 'Register', component: register_component_1.RegisterComponent },
    { path: 'Wave', component: wawe_form_component_1.WaweFormComponent },
    { path: '', component: homepage_component_1.HomepageComponent },
];
// { path: '', redirectTo: 'products', pathMatch: 'full' },
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
