import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  constructor(private http: HttpClient) {}

  getSubscribers(data: any): Observable<any> {
    return this.http.post(API_LINKS.SUBSCRIBER_URL, data).pipe(take(1));
  }

  deleteSubscribers(subscriberID: any): Observable<any> {
    const params = new HttpParams().set('subscriber_id', subscriberID);
    return this.http
      .delete(API_LINKS.SUBSCRIBER_URL, { params: params })
      .pipe(take(1));
  }
}
