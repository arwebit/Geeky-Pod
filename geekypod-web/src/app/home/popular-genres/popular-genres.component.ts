import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { GenresService } from '../../shared/services/genres.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-popular-genres',
  templateUrl: './popular-genres.component.html',
  styleUrl: './popular-genres.component.css',
})
export class PopularGenresComponent {
  genres: any = [];
  responsiveOptions: any[] | undefined;
  imageURL: string = `${environment.imagesURL}`;

  constructor(private router: Router, private genreSrv: GenresService) {
    this.getGenreList();
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getGenreList() {
    const data = {
      filter: {
        condition: [
          ['is_popular', '=', 'yes'],
          ['is_active', '=', 'yes'],
        ],
      },
      start_row: 0,
      page_records: 15,
      sort_field: '',
      sort: -1,
    };

    this.genreSrv.getGenres(data).subscribe(
      (result: any) => {
        this.genres = result.rows;
      },
      (err: HttpErrorResponse) => {
        alert('No genres found');
      }
    );
  }
}
