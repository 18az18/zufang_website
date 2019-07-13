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

  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  // submit the contact us form to server
  submitContactForm(name: string, email: string, text: string): Observable<any> {
    const contactUrl = this.url + 'contactform';
    return this.http.post(contactUrl, {name, email, text}, httpOptions);
  }

  // submit the reservation form to server
  submitReservationForm(): Observable<any> {
    const reservationUrl = this.url + '';
    return;
  }

  submitProfileForm(): Observable<any> {
    const profileUrl = this.url + '';
    return ;
  }


}
