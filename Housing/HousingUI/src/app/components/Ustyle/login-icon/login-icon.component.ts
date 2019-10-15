import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Subscription } from 'rxjs';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-icon',
  templateUrl: './login-icon.component.html',
  styleUrls: ['./login-icon.component.css']
})
export class LoginIconComponent implements OnInit, OnDestroy {

  loggedIn: boolean;
  loggedUser: any;
  private userSub: Subscription;
  isAdmin: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUserUpdateListener();
    this.getInitialUser();
    this.isAdmin = false;
  }

  getUserUpdateListener() {
    this.userSub = this.userService.getUserUpdateListener()
      .subscribe((loggedIn) => {
        this.loggedIn = loggedIn;
        if (loggedIn) {
          this.isAdmin = loggedIn.role === 'admin' ? true : false;
        }
      });
    // create service and call the get current user api request
    // change loggedIn boolean accordingly
    // store the loggedUser info accordindly for when user logout/user profile
  }

  getInitialUser() {
    this.userService.getInitialUser().subscribe(res => {
      this.loggedIn = res.user;
      if (res.user) {
        this.isAdmin = res.user.role === 'admin' ? true : false;
      }
      this.userService.setUserUpdateListener(res.user);
    }, err => {
      this.loggedIn = null;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  login() {
    this.router.navigate(['/ustyle/login']);
  }

  logout() {
    this.userService.logout().subscribe(res => {
      if (this.router.url === '/account' || this.router.url === '/admin') {
        this.router.navigate(['']);
      }
    });
  }

  checkProfile() {
    this.router.navigate(['/account']);
  }

  adminManagement() {
    this.router.navigate(['/admin']);
  }

}
