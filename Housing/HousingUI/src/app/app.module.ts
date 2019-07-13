import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { RoomlayoutComponent } from './components/pages/roomlayout/roomlayout.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { ContactformComponent } from './components/contactform/contactform.component';
import { ReservationformComponent } from './components/reservationform/reservationform.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginIconComponent } from './components/login-icon/login-icon.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { ContactformParagraphComponent } from './components/contactform-paragraph/contactform-paragraph.component';
import { AccountComponent } from './components/pages/account/account.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { PicRollerComponent } from './components/pic-roller/pic-roller.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AccountHeaderComponent } from './components/account-header/account-header.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { RoomDisplayComponent } from './components/room-display/room-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReservationComponent,
    ContactComponent,
    RoomlayoutComponent,
    MainpageComponent,
    ContactformComponent,
    ReservationformComponent,
    LoginComponent,
    LoginIconComponent,
    LoginformComponent,
    ContactformParagraphComponent,
    AccountComponent,
    SignupComponent,
    SignupFormComponent,
    PicRollerComponent,
    ContactusComponent,
    AccountHeaderComponent,
    AccountFormComponent,
    RoomDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
