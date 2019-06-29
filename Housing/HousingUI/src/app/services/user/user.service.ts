import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUpdated = new Subject<any>();

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    const url = 'http://localhost:3000/';
    this.userUpdated.next(true);
    this.router.navigate(['']);
  }

  signup() {
    const url = 'http://localhost:3000/';
  }

  // login(username: string, password: string) {
  // const url = '123';
  // return this.http.post(url, {name, email, message}, httpOptions);
  // }

  logout() {
    const url = 'http://localhost:3000/';
    this.userUpdated.next(false);
    if (this.router.url === 'signin') {
      this.router.navigate(['']);
    }
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }
}
