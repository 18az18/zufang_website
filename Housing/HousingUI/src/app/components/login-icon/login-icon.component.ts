import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-icon',
  templateUrl: './login-icon.component.html',
  styleUrls: ['./login-icon.component.css']
})
export class LoginIconComponent implements OnInit, OnDestroy {

  loggedIn = true;
  loggedUser: any;
  private userSub: Subscription;

  constructor(private userSerivce: UserService, private router: Router) { }

  ngOnInit() {
    this.getUserUpdateListener();
  }

  getUserUpdateListener() {
    this.userSub = this.userSerivce.getUserUpdateListener()
      .subscribe((loggedIn) => {
        this.loggedIn = loggedIn;
      });
    // create service and call the get current user api request
    // change loggedIn boolean accordingly
    // store the loggedUser info accordindly for when user logout/user profile
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout() {
    this.userSerivce.logout().subscribe(res => {
      if (this.router.url === 'signin') {
        this.router.navigate(['']);
      }
    });
  }

  checkProfile() {
    this.router.navigate(['/account']);
  }

}
