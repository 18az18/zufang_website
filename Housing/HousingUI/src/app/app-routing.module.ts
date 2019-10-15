import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './components/KWTRANGL/mainpage/mainpage.component';
import { UstylemainpageComponent } from './components/Ustyle/mainpage/Ustylemainpage';
import { AnnouncementComponent } from './components/KWTRANGL/pages/announcement/announcement.component';
import { RoomlayoutComponent } from './components/Ustyle/pages/roomlayout/roomlayout.component';
import { ContactComponent } from './components/Ustyle/pages/contact/contact.component';
import { ReservationComponent } from './components/Ustyle/pages/reservation/reservation.component';
import { LoginComponent } from './components/Ustyle/pages/login/login.component';
import { AccountComponent } from './components/Ustyle/pages/account/account.component';
import { SignupComponent } from './components/Ustyle/pages/signup/signup.component';
import { AdminComponent } from './components/Ustyle/pages/admin/admin.component';
import { ProfileGuard as UstyleProfileGuard} from './guards/Ustyle/profile/profile.guard';
import { AdminGuard as UstyleAdminGuard} from './guards/Ustyle/admin/admin.guard';


const routes: Routes = [
  { path: '', component: MainpageComponent},
  { path: 'announcement', component: AnnouncementComponent },
  { path: 'ustyle', component: UstylemainpageComponent},
  { path: 'ustyle/reservation', component: ReservationComponent},
  { path: 'ustyle/login', component: LoginComponent},
  { path: 'ustyle/roomlayout', component: RoomlayoutComponent},
  { path: 'ustyle/contact', component: ContactComponent},
  { path: 'ustyle/account', component: AccountComponent, canActivate: [UstyleProfileGuard]},
  { path: 'ustyle/signup', component: SignupComponent },
  { path: 'ustyle/admin', component: AdminComponent, canActivate: [UstyleAdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
