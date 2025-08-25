import { Component } from '@angular/core';
import { SearchService } from '../shared/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css',
})
export class GenreComponent {
  pageID: number = 0;
  genreSlug: string = '';
  genreName: string = '';
  pageRecords: number = 24;
  episodeLists: any = [];
  totalRecords: number = 0;
  totalPages: number = 0;
  imageURL: string = `${environment.imagesURL}`;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchSrv: SearchService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pageID = params['page_id'];
      this.genreSlug = params['genre_slug'];
      this.getGenreList(this.getStartIndex(), this.pageRecords);
      this.pagination(this.pageID);
    });
  }

  pagination(pageID: number = 1) {
    this.getGenreList(this.getStartIndex(pageID), this.pageRecords);
  }
  pageChange(event: any) {
    const pageNo = event.page + 1;
    this.router.navigate(['genre', this.genreSlug, 'page', pageNo]);
  }

  getStartIndex(startIndex: number = 1) {
    if (this.pageID > 1) {
      startIndex = (this.pageID - 1) * this.pageRecords + 1;
    } else {
      startIndex = 0;
    }
    return startIndex;
  }

  getGenreList(startRow: number = 0, pageRecords: number = 10) {
    const data = {
      filter: {
        condition: [['episode_lists.is_active', '=', 'yes']],
      },
      start_row: startRow - 1,
      page_records: pageRecords,
      sort_field: '',
      sort: -1,
    };

    this.searchSrv.getGenres(data, this.genreSlug).subscribe(
      (result: any) => {
        let [name] = result.rows;
        this.genreName = name.genre_name;
        this.episodeLists = result.rows;
        this.totalRecords = result.total_rows;
        this.totalPages = result.no_of_required_pages;
      },
      (err: HttpErrorResponse) => {
        alert('No episode found');
      }
    );
  }
}
