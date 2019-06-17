import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { RoomlayoutComponent } from './components/pages/roomlayout/roomlayout.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { LoginComponent } from './components/pages/login/login.component';



const routes: Routes = [
  { path: '', component: MainpageComponent},
  { path: 'reservation', component: ReservationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'roomlayout', component: RoomlayoutComponent},
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
