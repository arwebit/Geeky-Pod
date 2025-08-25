import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor(private http: HttpClient) {}

  getGenres(data: any): Observable<any> {
    return this.http.post(API_LINKS.GENRE_URL, data).pipe(take(1));
  }
}
