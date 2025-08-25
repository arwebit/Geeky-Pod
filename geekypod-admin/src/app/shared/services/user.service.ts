import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(data: any): Observable<any> {
    return this.http.post(API_LINKS.USER_URL, data).pipe(take(1));
  }

  updateUsers(data: any, userID: any): Observable<any> {
    const params = new HttpParams().set('user_id', userID);
    return this.http
      .put(API_LINKS.USER_URL, data, { params: params })
      .pipe(take(1));
  }

  changePassword(data: any, userID: any): Observable<any> {
    const params = new HttpParams().set('user_id', userID);
    return this.http
      .put(API_LINKS.USER_URL + '/change_password', data, { params: params })
      .pipe(take(1));
  }
}
