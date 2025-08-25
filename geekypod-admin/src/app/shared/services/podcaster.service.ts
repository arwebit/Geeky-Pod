import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class PodcasterService {
  constructor(private http: HttpClient) {}

  getPodcasters(data: any): Observable<any> {
    return this.http.post(API_LINKS.PODCASTER_URL, data).pipe(take(1));
  }
  addPodcasters(data: any): Observable<any> {
    return this.http.post(API_LINKS.PODCASTER_URL + '/add', data).pipe(take(1));
  }
  editPodcasters(data: any, podcasterID: any): Observable<any> {
    const params = new HttpParams().set('podcaster_id', podcasterID);
    return this.http
      .post(API_LINKS.PODCASTER_URL + '/update', data, { params: params })
      .pipe(take(1));
  }
  deletePodcasters(podcasterID: any): Observable<any> {
    const params = new HttpParams().set('podcaster_id', podcasterID);
    return this.http
      .delete(API_LINKS.PODCASTER_URL, { params: params })
      .pipe(take(1));
  }
}
