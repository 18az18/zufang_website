import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }

  user: any;
  private userSub: Subscription;


  ngOnInit() {
    this.getUserUpdateListener();
  }

  getUserUpdateListener() {
    this.userSub = this.userService.getUserUpdateListener()
      .subscribe((user) => {
        this.user = user;
      });
    // create service and call the get current user api request
    // change loggedIn boolean accordingly
    // store the loggedUser info accordindly for when user logout/user profile
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
