import { HttpClient } from '@angular/common/http';
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
}
