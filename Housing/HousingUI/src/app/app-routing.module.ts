import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { RoomlayoutComponent } from './components/pages/roomlayout/roomlayout.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AccountComponent } from './components/pages/account/account.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ProfileGuard } from './guards/profile/profile.guard';
import { AdminComponent } from './components/pages/admin/admin.component';

const routes: Routes = [
  { path: '', component: MainpageComponent},
  { path: 'reservation', component: ReservationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'roomlayout', component: RoomlayoutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'account', component: AccountComponent, canActivate: [ProfileGuard]},
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent, canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
