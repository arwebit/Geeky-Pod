import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private http: HttpClient) {}

  saveSubscribers(data: any): Observable<any> {
    return this.http
      .post(API_LINKS.SUBSCRIBER_URL + '/add', data)
      .pipe(take(1));
  }
}
