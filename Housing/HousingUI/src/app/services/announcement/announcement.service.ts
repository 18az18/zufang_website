import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class AnnouncementService {

  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAnnouncements(page: number = 0, number: number = 0): Observable<any> {
    return null
  }
}
