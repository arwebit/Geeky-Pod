import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getGenres(data: any, slug: string): Observable<any> {
    const params = new HttpParams().set('slug', slug);
    return this.http
      .post(API_LINKS.SEARCH_BY_SLUG_URL + '/genre', data, { params: params })
      .pipe(take(1));
  }
}
