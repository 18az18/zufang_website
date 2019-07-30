import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUpdated = new BehaviorSubject<any>(null);

  private url = 'http://localhost:3000/';

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginUrl = this.url + 'login';
    return this.http.post(loginUrl, {username, password}, httpOptions).pipe(tap(res => {
      this.userUpdated.next(res);
    }));
  }

  signup(username: string, password: string, email: string, phoneNumber: string) {
    const signupUrl = this.url + 'signup';
    return this.http.post(signupUrl, {username, password, email, phoneNumber}, httpOptions).pipe(tap(res => {
    }));
  }

  // login(username: string, password: string) {
  // const url = '123';
  // return this.http.post(url, {name, email, message}, httpOptions);
  // }

  logout() {
    const logoutUrl = this.url + 'logout';
    console.log('user logged out');
    return this.http.delete(logoutUrl, httpOptions).pipe(tap(res => {
      this.userUpdated.next(null);
    }));
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  setUserUpdateListener(user: any) {
    this.userUpdated.next(user);
  }

  getInitialUser(): Observable<any> {
    const userUrl = this.url + 'userstatus';
    return this.http.get(userUrl, httpOptions);
  }

  updateUserProfile(firstName: string, lastName: string, email: string, password: string,
                    phoneNumber: string, subscribed: string, id: string) {
    const updateUrl = this.url + 'userSelfUpdate/' + id;
    // console.log('firstname is ' + firstName);
    // console.log('lastname is ' + lastName);
    // console.log('email is ' + email);
    // console.log('phonenumber is ' + phoneNumber);
    // console.log('password is ' + password);
    // console.log('subscribed is ' + subscribed);
    return this.http.patch(updateUrl, {firstName, lastName, password, email, phoneNumber, subscribed}, httpOptions);
  }
}
