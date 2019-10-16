import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  getAnnouncements(page: string, numberCount: string): Observable<any> {
    const announcementUrl = this.url + 'getAnnouncements';
    const params = new HttpParams()
    .set('page', page)
    .set('number', numberCount);
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      params
    };
    return this.http.get(announcementUrl, httpOption);
  }

  postAnnouncement(title: string, context: string):Observable<any> {
    const postAnnouncementUrl = this.url + 'newAnnouncement';
    return this.http.post(postAnnouncementUrl, {title, context}, httpOptions)
  }


}

