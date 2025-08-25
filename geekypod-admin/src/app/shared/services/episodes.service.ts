import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../apilinks';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  constructor(private http: HttpClient) {}

  getEpisodes(data: any): Observable<any> {
    return this.http.post(API_LINKS.EPISODE_URL, data).pipe(take(1));
  }
  addEpisodes(data: any): Observable<any> {
    return this.http.post(API_LINKS.EPISODE_URL + '/add', data).pipe(take(1));
  }
  editEpisodes(data: any, episodeID: any): Observable<any> {
    const params = new HttpParams().set('episode_id', episodeID);
    return this.http
      .post(API_LINKS.EPISODE_URL + '/update', data, { params: params })
      .pipe(take(1));
  }
  deleteEpisodes(episodeID: any): Observable<any> {
    const params = new HttpParams().set('episode_id', episodeID);
    return this.http
      .delete(API_LINKS.EPISODE_URL, { params: params })
      .pipe(take(1));
  }
}
