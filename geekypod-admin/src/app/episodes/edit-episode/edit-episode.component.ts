import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodesService } from '../../shared/services/episodes.service';
import { GenreService } from '../../shared/services/genre.service';
import { PodcasterService } from '../../shared/services/podcaster.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-episode',
  templateUrl: './edit-episode.component.html',
  styleUrl: './edit-episode.component.css',
})
export class EditEpisodeComponent {
  editEpisodeForm!: FormGroup;
  editEpisodeImgView: boolean = false;
  episodeID: number = 0;
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

  editImage: string = '';
  statusCode: number = 0;
  message: string = '';
  episodeTitleSlug: string = '';
  podcasterLists: any = [];
  genreLists: any = [];
  imageURL: string = `${environment.imagesURL}`;

  constructor(
    private router: Router,
    private episodeSrv: EpisodesService,
    private podcasterSrv: PodcasterService,
    private genreSrv: GenreService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.episodeID = params['episode_id'];
      this.getEpisode(this.episodeID);
    });
    this.getGenreList();
    this.getPodcasterList();
  }

  ngOnInit(): void {
    this.editFormInit();
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
  getEpisode(episodeID: number) {
    const data = {
      filter: {
        condition: [['episode_id', '=', episodeID]],
      },
      start_row: 0,
      page_records: 1,
      sort_field: 'episode_id',
      sort: -1,
    };

    this.episodeSrv.getEpisodes(data).subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.editEpisodeForm = new FormGroup({
          episode_season: new FormControl(details.episode_season),
          episode_no: new FormControl(details.episode_no),
          episode_title: new FormControl(details.episode_title),
          episode_title_slug: new FormControl(details.episode_title_slug),
          episode_description: new FormControl(details.episode_description),
          podcaster_id: new FormControl(details.podcaster_id),
          genre_id: new FormControl(details.genre_id),
          episode_spotify_link: new FormControl(details.episode_spotify_link),
          episode_youtube_link: new FormControl(details.episode_youtube_link),
          episode_date: new FormControl(details.episode_date),
          is_popular: new FormControl(details.is_popular),
          is_active: new FormControl(details.is_active),
        });
        this.editImage = this.imageURL + '/' + details.episode_image;
      },
      (err: HttpErrorResponse) => {
        alert('No records found');
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
    this.editEpisodeImgView = true;
    const file = event.target.files ? event.target.files[0] : '';
    this.episodeImage = file;
    const reader: any = new FileReader();
    $('#edit_upload_image').val('');
    reader.onloadend = () => {
      let str = reader.result as string;
      this.editImage = str;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  editFormInit() {
    this.editEpisodeForm = new FormGroup({
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
      is_active: new FormControl('yes'),
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

  editEpisodes() {
    let episodeData: any = new FormData();
    episodeData.append(
      'episode_season',
      this.editEpisodeForm.value.episode_season
    );
    episodeData.append('episode_no', this.editEpisodeForm.value.episode_no);
    episodeData.append(
      'episode_title',
      this.editEpisodeForm.value.episode_title
    );
    episodeData.append(
      'episode_title_slug',
      this.editEpisodeForm.value.episode_title_slug
    );
    episodeData.append(
      'episode_description',
      this.editEpisodeForm.value.episode_description
    );
    episodeData.append('podcaster_id', this.editEpisodeForm.value.podcaster_id);
    episodeData.append('genre_id', this.editEpisodeForm.value.genre_id);
    episodeData.append(
      'episode_spotify_link',
      this.editEpisodeForm.value.episode_spotify_link
    );
    episodeData.append(
      'episode_youtube_link',
      this.editEpisodeForm.value.episode_youtube_link
    );
    episodeData.append('episode_date', this.editEpisodeForm.value.episode_date);
    episodeData.append('is_popular', this.editEpisodeForm.value.is_popular);
    episodeData.append('is_active', this.editEpisodeForm.value.is_active);
    episodeData.append('episode_image', this.episodeImage ?? new File([], ''));

    this.episodeSrv.editEpisodes(episodeData, this.episodeID).subscribe(
      (result: any) => {
        this.emptyErrors();
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
