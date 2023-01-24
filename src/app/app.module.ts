import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxPopper } from 'angular-popper';
import { AlertifyService } from './services/alertify.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TrackComponent } from './ADMIN/track.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TrackpageComponent } from './trackpage/trackpage.component';
import { TrackdetailsComponent } from './trackpage/trackdetails/trackdetails.component';
import { LoginComponent } from './login/login.component';
import { UploadtrackComponent } from './ADMIN/uploadtrack/uploadtrack.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { FavoriteSummaryComponent } from './favorite-summary/favorite-summary.component';
import { UpdateTrackComponent } from './ADMIN/update-track/update-track.component';
import { Trackdetail2Component } from './ADMIN/trackdetail2/trackdetail2.component';
import { CardComponent } from './card/card.component';

import { TrackpageFilterPipe } from './trackpage/trackpage-filter.pipe';
import { PlayerComponent } from './trackpage/player/player.component';
import { SortPipe } from './pipes/sort.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrackPageGenreFilterPipe } from './trackpage/trackdetails/track-page-genre-filter.pipe';
import { TrackPageKeyFilterPipe } from './trackpage/track-page-key-filter.pipe';

import { RegisterComponent } from './register/register/register.component';
import { UserService } from './services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WaweFormComponent } from './wawe-form/wawe-form.component';
import { MarqueeComponent } from './marquee/marquee.component';
import { PlayerCardComponent } from './wawe-form/player-card/player-card.component';
import { TrackFSComponent } from './track-fs/track-fs.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgxEditorComponent } from './ngx-editor/ngx-editor.component'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NewRegisterComponent } from './new-register/new-register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/http-error-handler-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    TrackComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    TrackpageComponent,
    TrackdetailsComponent,
    LoginComponent,
    UploadtrackComponent,
    CartSummaryComponent,
    FavoriteSummaryComponent,
    UpdateTrackComponent,
    Trackdetail2Component,
    CardComponent,
    TrackpageFilterPipe,
    PlayerComponent,
    SortPipe,
    TrackPageGenreFilterPipe,
    TrackPageKeyFilterPipe,
    RegisterComponent,
    WaweFormComponent,
    MarqueeComponent,
    PlayerCardComponent,
    TrackFSComponent,
    NgxEditorComponent,
    NewRegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale-pulse-out' }),
    NgxEditorModule,
    NgxEditorModule,
    NgxFileDropModule,

    JwtModule.forRoot({
      config : {
        tokenGetter : () => localStorage.getItem("accsessToken"),
        allowedDomains : ["localhost:5191"]
      }
    }),
    SocialLoginModule,





  ],
  providers: [AlertifyService, NgxPopper, UserService,  NgModule,{
    provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("406814449017-svb0bgetb6nqrqpbmk9k4c89bnk4gsb7.apps.googleusercontent.com")
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1491893728001031")
        }
      ],
      onError: err => console.log(err)
    } as SocialAuthServiceConfig
  },
{provide:HTTP_INTERCEPTORS, useClass:HttpErrorHandlerInterceptorService , multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
