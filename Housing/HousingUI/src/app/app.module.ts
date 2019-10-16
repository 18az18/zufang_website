import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Ustyle/layout/header/header.component';
import { FooterComponent } from './components/Ustyle/layout/footer/footer.component';
import { ReservationComponent } from './components/Ustyle/pages/reservation/reservation.component';
import { ContactComponent } from './components/Ustyle/pages/contact/contact.component';
import { RoomlayoutComponent } from './components/Ustyle/pages/roomlayout/roomlayout.component';
import { UstylemainpageComponent } from './components/Ustyle/mainpage/Ustylemainpage';
import { ContactformComponent } from './components/Ustyle/contactform/contactform.component';
import { ReservationformComponent } from './components/Ustyle/reservationform/reservationform.component';
import { LoginComponent } from './components/Ustyle/pages/login/login.component';
import { LoginIconComponent } from './components/Ustyle/login-icon/login-icon.component';
import { LoginformComponent } from './components/Ustyle/loginform/loginform.component';
import { ContactformParagraphComponent } from './components/Ustyle/contactform-paragraph/contactform-paragraph.component';
import { AccountComponent } from './components/Ustyle/pages/account/account.component';
import { SignupComponent } from './components/Ustyle/pages/signup/signup.component';
import { SignupFormComponent } from './components/Ustyle/signup-form/signup-form.component';
import { PicRollerComponent } from './components/Ustyle/pic-roller/pic-roller.component';
import { ContactusComponent } from './components/Ustyle/contactus/contactus.component';
import { AccountHeaderComponent } from './components/Ustyle/account-header/account-header.component';
import { AccountFormComponent } from './components/Ustyle/account-form/account-form.component';
import { RoomDisplayComponent } from './components/Ustyle/room-display/room-display.component';
import { AdminComponent } from './components/Ustyle/pages/admin/admin.component';
import { AdminNavComponent } from './components/Ustyle/admin-nav/admin-nav.component';
import { AdminNavItemComponent } from './components/Ustyle/admin-nav-item/admin-nav-item.component';
import { MainpageComponent } from './components/KWTRANGL/mainpage/mainpage.component';
import { AnnouncementComponent } from './components/KWTRANGL/pages/announcement/announcement.component';
import { AnnouncementSectionComponent } from './components/KWTRANGL/announcement/announcement-section/announcement-section.component';
import { IntroComponent } from './components/KWTRANGL/intro/intro.component';
import { ProjectHeaderComponent } from './components/KWTRANGL/project-header/project-header.component';
import { PlateComponent } from './components/KWTRANGL/project-board/plate/plate.component';
import { ProjectSectionComponent } from './components/KWTRANGL/project-board/project-section/project-section.component';
import { SAnnouncementComponent } from './components/KWTRANGL/announcement/s-announcement/s-announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HeaderComponent,
    FooterComponent,
    ReservationComponent,
    ContactComponent,
    RoomlayoutComponent,
    UstylemainpageComponent,
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
    RoomDisplayComponent,
    AdminComponent,
    AdminNavComponent,
    AdminNavItemComponent,
    AnnouncementComponent,
    AnnouncementSectionComponent,
    IntroComponent,
    ProjectHeaderComponent,
    PlateComponent,
    ProjectSectionComponent,
    SAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
