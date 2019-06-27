import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
