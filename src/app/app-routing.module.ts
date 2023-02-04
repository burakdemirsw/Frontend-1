import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { TrackComponent } from './ADMIN/track.component';
import { TrackdetailsComponent } from './trackpage/trackdetails/trackdetails.component';
import { TrackpageComponent } from './trackpage/trackpage.component';
import { UpdateTrackComponent } from './ADMIN/update-track/update-track.component';
import { UploadtrackComponent } from './ADMIN/uploadtrack/uploadtrack.component';
import { Trackdetail2Component } from './ADMIN/trackdetail2/trackdetail2.component';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './trackpage/player/player.component';
import { RegisterComponent } from './register/register/register.component';
import { WaweFormComponent } from './wawe-form/wawe-form.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { NewLoginGuard } from './login/new-login.guard';

const routes: Routes = [
  { path: 'TrackList', component: TrackpageComponent , canActivate: [NewLoginGuard]},
  { path: 'Admin', component: TrackComponent , canActivate: [NewLoginGuard]},
  { path: 'Login', component: LoginComponent },
  { path: 'Homepage', component: HomepageComponent},
  {path: 'Upload',component: UploadtrackComponent, canActivate: [NewLoginGuard]},
  {path: 'Update/:trackId',component: UpdateTrackComponent,},
  {path: 'Update',component: UpdateTrackComponent, canActivate: [NewLoginGuard]},
  { path: 'Card', component: CardComponent },
  { path: 'Track-Details/:trackId', component: Trackdetail2Component },
  { path: 'Track-Special/:trackId', component: TrackdetailsComponent },
  { path: 'Player', component: PlayerComponent },
  { path: 'Wave', component: WaweFormComponent, canActivate: [NewLoginGuard] },
  { path: 'Register', component: NewRegisterComponent },
  { path: '', component: HomepageComponent, canActivate: [NewLoginGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
