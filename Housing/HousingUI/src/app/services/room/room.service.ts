import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
export class RoomService {

  private url = 'http://localhost:3000/';


  constructor(private http: HttpClient) { }



  // getApartmentTypes(): Observable<any> {
  //   const typeUrl = this.url + 'getAvailableTypes/';
  //   return this.http.get(typeUrl, httpOptions);
  // }

  getAvailableFloors(type: string): Observable<any> {
    const floorUrl = this.url + 'getAvailableFloors/' + type;
    return this.http.get(floorUrl, httpOptions);
  }

  getAvailableUnits(type: string): Observable<any> {
    const unitsUrl = this.url + 'AllEmptyApts/' + type;
    return this.http.get(unitsUrl, httpOptions);
  }

  getAvailableTypes(): Observable<any> {
    const typeUrl = this.url + 'getAllTypes';
    return this.http.get(typeUrl, httpOptions);
  }


}
