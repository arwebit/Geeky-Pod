import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class SlidersService {
  constructor(private http: HttpClient) {}

  getSliders(data: any): Observable<any> {
    return this.http.post(API_LINKS.SLIDER_URL, data).pipe(take(1));
  }
  addSliders(data: any): Observable<any> {
    return this.http.post(API_LINKS.SLIDER_URL + '/add', data).pipe(take(1));
  }
  editSliders(data: any, sliderID: any): Observable<any> {
    const params = new HttpParams().set('slider_id', sliderID);
    return this.http
      .post(API_LINKS.SLIDER_URL + '/update', data, { params: params })
      .pipe(take(1));
  }
  deleteSliders(sliderID: any): Observable<any> {
    const params = new HttpParams().set('slider_id', sliderID);
    return this.http
      .delete(API_LINKS.SLIDER_URL, { params: params })
      .pipe(take(1));
  }
}
