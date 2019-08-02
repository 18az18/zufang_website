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
export class AdminService {

  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  updateRentStatus(unitNumber: string, rentedBy: boolean): Observable<any> {
    const updateUrl = this.url + 'updateAPT/' + unitNumber;
    return this.http.put(updateUrl, {rentedBy}, httpOptions);
  }
}
