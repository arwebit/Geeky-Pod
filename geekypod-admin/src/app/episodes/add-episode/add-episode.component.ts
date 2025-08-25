import { Component } from '@angular/core';
import { EpisodesService } from '../../shared/services/episodes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PodcasterService } from '../../shared/services/podcaster.service';
import { GenreService } from '../../shared/services/genre.service';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrl: './add-episode.component.css',
})
export class AddEpisodeComponent {
  addEpisodeForm!: FormGroup;
  addEpisodeImgView: boolean = false;

  episodeTitleErr: string = '';
  episodeSeasonErr: string = '';
  episodeNoErr: string = '';
  episodeTitleSlugErr: string = '';
  episodeDescriptionErr: string = '';
  episodePodcasterErr: string = '';
  episodeGenreErr: string = '';
  episodeSpotifyLinkErr: string = '';
  episodeYouTubeLinkErr: string = '';
  episodeDateErr: string = '';
  episodeImageErr: string = '';
  episodeImage!: File | null;

  addImage: string = '';
  statusCode: number = 0;
  message: string = '';
  episodeTitleSlug: string = '';
  podcasterLists: any = [];
  genreLists: any = [];

  constructor(
    private router: Router,
    private episodeSrv: EpisodesService,
    private podcasterSrv: PodcasterService,
    private genreSrv: GenreService
  ) {
    this.getGenreList();
    this.getPodcasterList();
  }

  ngOnInit(): void {
    this.addFormInit();
  }

  getGenreList() {
    const data = {
      filter: {
        condition: [],
      },
      start_row: 0,
      page_records: 1000000000000000,
      sort_field: 'genre_id',
      sort: -1,
    };

    this.genreSrv.getGenres(data).subscribe(
      (result: any) => {
        this.genreLists = result.rows;
      },
      (err: HttpErrorResponse) => {
        alert('No Genres Found');
      }
    );
  }

  getPodcasterList() {
    const data = {
      filter: {
        condition: [],
      },
      start_row: 0,
      page_records: 1000000000000000,
      sort_field: 'podcaster_id',
      sort: -1,
    };

    this.podcasterSrv.getPodcasters(data).subscribe(
      (result: any) => {
        this.podcasterLists = result.rows;
      },
      (err: HttpErrorResponse) => {
        alert('No Podcasters Found');
      }
    );
  }

  getEpisodeTitleSlug(event: Event) {
    let episodeTitle: any = (<HTMLInputElement>event.target).value;

    this.episodeTitleSlug = episodeTitle
      .replace(/[^a-zA-Z0-9-]+/g, ' ')
      .split(' ')
      .join('-')
      .toLowerCase();
  }

  uploadImage(event: any) {
    this.addEpisodeImgView = true;
    const file = event.target.files ? event.target.files[0] : '';
    this.episodeImage = file;
    const reader: any = new FileReader();
    $('#add_upload_image').val('');
    reader.onloadend = () => {
      let str = reader.result as string;
      this.addImage = str;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  addFormInit() {
    this.addEpisodeForm = new FormGroup({
      episode_season: new FormControl(''),
      episode_no: new FormControl(''),
      episode_title: new FormControl(''),
      episode_title_slug: new FormControl(''),
      episode_description: new FormControl(''),
      podcaster_id: new FormControl(''),
      genre_id: new FormControl(''),
      episode_spotify_link: new FormControl(''),
      episode_youtube_link: new FormControl(''),
      episode_date: new FormControl(''),
      is_popular: new FormControl('yes'),
    });
  }

  emptyErrors() {
    this.episodeTitleErr = '';
    this.episodeSeasonErr = '';
    this.episodeNoErr = '';
    this.episodeTitleSlugErr = '';
    this.episodeDescriptionErr = '';
    this.episodePodcasterErr = '';
    this.episodeGenreErr = '';
    this.episodeSpotifyLinkErr = '';
    this.episodeYouTubeLinkErr = '';
    this.episodeDateErr = '';
    this.episodeImageErr = '';
    this.message = '';
  }

  addEpisodes() {
    let episodeData: any = new FormData();
    episodeData.append(
      'episode_season',
      this.addEpisodeForm.value.episode_season
    );
    episodeData.append('episode_no', this.addEpisodeForm.value.episode_no);
    episodeData.append(
      'episode_title',
      this.addEpisodeForm.value.episode_title
    );
    episodeData.append(
      'episode_title_slug',
      this.addEpisodeForm.value.episode_title_slug
    );
    episodeData.append(
      'episode_description',
      this.addEpisodeForm.value.episode_description
    );
    episodeData.append('podcaster_id', this.addEpisodeForm.value.podcaster_id);
    episodeData.append('genre_id', this.addEpisodeForm.value.genre_id);
    episodeData.append(
      'episode_spotify_link',
      this.addEpisodeForm.value.episode_spotify_link
    );
    episodeData.append(
      'episode_youtube_link',
      this.addEpisodeForm.value.episode_youtube_link
    );
    episodeData.append('episode_date', this.addEpisodeForm.value.episode_date);
    episodeData.append('is_popular', this.addEpisodeForm.value.is_popular);
    episodeData.append('episode_image', this.episodeImage ?? new File([], ''));

    this.episodeSrv.addEpisodes(episodeData).subscribe(
      (result: any) => {
        this.addImage = '';
        this.emptyErrors();
        this.addEpisodeImgView = false;
        this.addEpisodeForm.reset();
        this.addFormInit();
        this.message = result.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      (err: HttpErrorResponse) => {
        this.emptyErrors();
        this.episodeTitleErr = err.error.errors.episode_title;
        this.episodeSeasonErr = err.error.errors.episode_season;
        this.episodeNoErr = err.error.errors.episode_no;
        this.episodeTitleSlugErr = err.error.errors.episode_title_slug;
        this.episodeDescriptionErr = err.error.errors.episode_description;
        this.episodePodcasterErr = err.error.errors.podcaster_id;
        this.episodeGenreErr = err.error.errors.genre_id;
        this.episodeSpotifyLinkErr = err.error.errors.episode_spotify_link;
        this.episodeYouTubeLinkErr = err.error.errors.episode_youtube_link;
        this.episodeImageErr = err.error.errors.episode_image;
        this.episodeDateErr = err.error.errors.episode_date;
      }
    );
  }
}
