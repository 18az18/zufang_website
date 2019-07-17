import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    credentials: 'include'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUpdated = new BehaviorSubject<any>(null);

  private url = 'http://localhost:3000/';

  constructor(private router: Router, private http: HttpClient) { }

  login(name: string, password: string): Observable<any> {
    const loginUrl = this.url + 'login';
    return this.http.post(loginUrl, {name, password}, httpOptions).pipe(tap(res => {
      this.userUpdated.next(res);
    }));
  }

  signup(name: string, password: string, email: string, phoneNumber: string) {
    const signupUrl = this.url + 'signup';
    return this.http.post(signupUrl, {name, password, email, phoneNumber}, httpOptions).pipe(tap(res => {
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

  getInitialUser(): Observable<any> {
    const userUrl = this.url + 'userstatus';
    return this.http.get(userUrl, httpOptions);
  }
}
