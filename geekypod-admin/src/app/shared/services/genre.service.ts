import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}

  getGenres(data: any): Observable<any> {
    return this.http.post(API_LINKS.GENRE_URL, data).pipe(take(1));
  }
  addGenres(data: any): Observable<any> {
    return this.http.post(API_LINKS.GENRE_URL + '/add', data).pipe(take(1));
  }
  editGenres(data: any, genreID: any): Observable<any> {
    const params = new HttpParams().set('genre_id', genreID);
    return this.http
      .post(API_LINKS.GENRE_URL + '/update', data, { params: params })
      .pipe(take(1));
  }
  deleteGenres(genreID: any): Observable<any> {
    const params = new HttpParams().set('genre_id', genreID);
    return this.http
      .delete(API_LINKS.GENRE_URL, { params: params })
      .pipe(take(1));
  }
}
