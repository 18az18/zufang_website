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

  }

}
