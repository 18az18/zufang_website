import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  // submit the contact us form to server
  submitContactForm(name: string, email: string, message: string): Observable<any> {
    const url = 'http://localhost:3000/';
    return this.http.post(url, {name, email, message}, httpOptions);
  }

  // submit the reservation form to server
  submitReservationForm(): Observable<any> {
    const url = 'http://localhost:3000/';
    return ;
  }
}
