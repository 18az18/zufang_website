import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { RoomlayoutComponent } from './components/pages/roomlayout/roomlayout.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { ContactformComponent } from './components/contactform/contactform.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ReservationComponent,
    ContactComponent,
    RoomlayoutComponent,
    MainpageComponent,
    ContactformComponent
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
