import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getRecords(): Observable<any> {
    return this.http.get(API_LINKS.DASHBOARD_URL + '/records').pipe(take(1));
  }
}
