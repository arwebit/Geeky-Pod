import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getContact(): Observable<any> {
    return this.http.get(API_LINKS.CONTACT_URL).pipe(take(1));
  }

  getAbout(): Observable<any> {
    return this.http.get(API_LINKS.ABOUT_URL).pipe(take(1));
  }
}
