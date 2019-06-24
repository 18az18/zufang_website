import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-icon',
  templateUrl: './login-icon.component.html',
  styleUrls: ['./login-icon.component.css']
})
export class LoginIconComponent implements OnInit {

  loggedIn:boolean = false;
  loggedUser:any;

  constructor() { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.loggedIn = !this.loggedIn;
    // create service and call the get current user api request
    // change loggedIn boolean accordingly
    // store the loggedUser info accordindly for when user logout/user profile
  }

}
