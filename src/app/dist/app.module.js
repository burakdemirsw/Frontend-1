"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var angular_popper_1 = require("angular-popper");
var alertify_service_1 = require("./services/alertify.service");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var track_component_1 = require("./ADMIN/track.component");
var header_component_1 = require("./header/header.component");
var footer_component_1 = require("./footer/footer.component");
var homepage_component_1 = require("./homepage/homepage.component");
var trackpage_component_1 = require("./trackpage/trackpage.component");
var trackdetails_component_1 = require("./trackpage/trackdetails/trackdetails.component");
var login_component_1 = require("./login/login.component");
var uploadtrack_component_1 = require("./ADMIN/uploadtrack/uploadtrack.component");
var cart_summary_component_1 = require("./cart-summary/cart-summary.component");
var favorite_summary_component_1 = require("./favorite-summary/favorite-summary.component");
var update_track_component_1 = require("./ADMIN/update-track/update-track.component");
var trackdetail2_component_1 = require("./ADMIN/trackdetail2/trackdetail2.component");
var card_component_1 = require("./card/card.component");
var trackpage_filter_pipe_1 = require("./trackpage/trackpage-filter.pipe");
var player_component_1 = require("./trackpage/player/player.component");
var sort_pipe_1 = require("./pipes/sort.pipe");
var ngx_pagination_1 = require("ngx-pagination");
var track_page_genre_filter_pipe_1 = require("./trackpage/trackdetails/track-page-genre-filter.pipe");
var track_page_key_filter_pipe_1 = require("./trackpage/track-page-key-filter.pipe");
var register_component_1 = require("./register/register/register.component");
var user_service_1 = require("./services/user.service");
var login_guard_1 = require("./login/login.guard");
var animations_1 = require("@angular/platform-browser/animations");
var ng2_order_pipe_1 = require("ng2-order-pipe");
var ngx_spinner_1 = require("ngx-spinner");
var wawe_form_component_1 = require("./wawe-form/wawe-form.component");
var marquee_component_1 = require("./marquee/marquee.component");
var player_card_component_1 = require("./wawe-form/player-card/player-card.component");
var track_fs_component_1 = require("./track-fs/track-fs.component");
var ngx_editor_1 = require("ngx-editor");
var ngx_editor_component_1 = require("./ngx-editor/ngx-editor.component");
var ngx_file_drop_1 = require("ngx-file-drop");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                track_component_1.TrackComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                homepage_component_1.HomepageComponent,
                trackpage_component_1.TrackpageComponent,
                trackdetails_component_1.TrackdetailsComponent,
                login_component_1.LoginComponent,
                uploadtrack_component_1.UploadtrackComponent,
                cart_summary_component_1.CartSummaryComponent,
                favorite_summary_component_1.FavoriteSummaryComponent,
                update_track_component_1.UpdateTrackComponent,
                trackdetail2_component_1.Trackdetail2Component,
                card_component_1.CardComponent,
                trackpage_filter_pipe_1.TrackpageFilterPipe,
                player_component_1.PlayerComponent,
                sort_pipe_1.SortPipe,
                track_page_genre_filter_pipe_1.TrackPageGenreFilterPipe,
                track_page_key_filter_pipe_1.TrackPageKeyFilterPipe,
                register_component_1.RegisterComponent,
                wawe_form_component_1.WaweFormComponent,
                marquee_component_1.MarqueeComponent,
                player_card_component_1.PlayerCardComponent,
                track_fs_component_1.TrackFSComponent,
                ngx_editor_component_1.NgxEditorComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                ngx_pagination_1.NgxPaginationModule,
                ng2_order_pipe_1.Ng2OrderModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                ngx_spinner_1.NgxSpinnerModule.forRoot({ type: 'line-scale-pulse-out' }),
                ngx_editor_1.NgxEditorModule,
                ngx_editor_1.NgxEditorModule,
                ngx_file_drop_1.NgxFileDropModule
            ],
            providers: [alertify_service_1.AlertifyService, angular_popper_1.NgxPopper, user_service_1.UserService, login_guard_1.LoginGuard, core_1.NgModule],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
