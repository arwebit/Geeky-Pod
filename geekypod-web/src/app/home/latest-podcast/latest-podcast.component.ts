import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodesService } from '../../shared/services/episodes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-latest-podcast',
  templateUrl: './latest-podcast.component.html',
  styleUrl: './latest-podcast.component.css',
})
export class LatestPodcastComponent implements OnInit {
  episodeImage: string = '';
  episodeTitle: string = '';
  episodeDescription: string = '';
  episodeSpotifyLink: string = '';
  episodeYoutubeLink: string = '';

  imageURL: string = `${environment.imagesURL}`;

  constructor(private router: Router, private episodeSrv: EpisodesService) {
    this.getEpisodeList();
  }

  ngOnInit(): void {}

  getEpisodeList() {
    const data = {
      filter: {
        condition: [['is_popular', '=', 'yes']],
      },
      start_row: 0,
      page_records: 1,
      sort_field: 'episode_date',
      sort: -1,
    };

    this.episodeSrv.getEpisodes(data).subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.episodeImage = `${this.imageURL}/${details.episode_image}`;
        this.episodeTitle = details.episode_title;
        this.episodeDescription = details.episode_description;
        this.episodeSpotifyLink = details.episode_spotify_link;
        this.episodeYoutubeLink = details.episode_youtube_link;
      },
      (err: HttpErrorResponse) => {
        alert('No latest podcast found');
      }
    );
  }
}
