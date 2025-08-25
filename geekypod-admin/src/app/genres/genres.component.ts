import { Component } from '@angular/core';
import { TableColumns } from './tableColumns';
import { GenreService } from '../shared/services/genre.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent {
  pageID: number = 0;
  totalRecords: any = 0;
  totalPages: number = 0;
  recordsInfo: string = '';
  statusCode: number = 0;
  genreList: any = [];
  loading: boolean = false;
  message: string = '';
  condition: any = [];
  imageURL: string = `${environment.imagesURL}`;
  columnsValues = TableColumns;
  columns: any = this.columnsValues;
  pager: any = [3, 5, 10, 50, 100, 200, 300, 500];
  pageRecords: any = 3;

  constructor(
    private genreSrv: GenreService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pageID = params['page_id'];
      this.getGenreList(this.getStartIndex(), this.pageRecords);
      this.pagination(this.pageID);
    });
  }

  getStartIndex(startIndex: number = 1) {
    if (this.pageID > 1) {
      startIndex = (this.pageID - 1) * this.pageRecords + 1;
    } else {
      startIndex = 0;
    }
    return startIndex;
  }

  pagination(pageID: number = 1) {
    this.getGenreList(this.getStartIndex(pageID), this.pageRecords);
  }
  pageChange(event: any) {
    const pageNo = event.page + 1;
    this.router.navigate(['genres/page', pageNo]);
  }

  ngOnInit(): void {}

  getGenreList(
    startRow: number = 0,
    pageRecords: number = 10,
    condition: any = []
  ) {
    this.loading = true;
    const data = {
      filter: {
        condition: condition,
      },
      start_row: startRow - 1,
      page_records: pageRecords,
      sort_field: 'genre_id',
      sort: -1,
    };

    this.genreSrv.getGenres(data).subscribe(
      (result: any) => {
        this.loading = false;
        this.genreList = result.rows;
        this.totalRecords = result.total_rows;
        this.totalPages = result.no_of_required_pages;

        let startIndex = (this.pageID - 1) * pageRecords;
        let endIndex = startIndex + this.pageRecords;

        let startRecord = startIndex + 1;
        let endRecord = endIndex;

        if (endRecord > this.totalRecords) {
          endRecord = this.totalRecords;
        }

        if (this.totalRecords === undefined) {
          this.recordsInfo = '';
        } else {
          this.recordsInfo = `Showing ${
            this.totalRecords > 0 ? startRecord : 0
          } to ${+endRecord} of ${this.totalRecords} records`;
        }
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.statusCode = err.error.statusCode;
        this.message = err.error.message;
        this.genreList = [];
        this.totalRecords = 0;
        this.totalPages = 0;
        this.router.navigate(['genres/page', 1]);
      }
    );
  }

  deleteGenre(genre: any) {
    Swal.fire({
      title: `Are you sure, you want to delete : <span style='color:red'>${genre.genre_name}</span> ?`,
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((res: any) => {
      if (res.value) {
        const genreID = genre.genre_id;
        this.genreSrv.deleteGenres(genreID).subscribe(
          () => {
            this.getGenreList(this.getStartIndex(), this.pageRecords);
            Swal.fire('Success', 'Successfully deleted', 'success');
          },
          (err: HttpErrorResponse) => {
            Swal.fire('Error', 'Failed to delete', 'error');
          }
        );
      } else {
        Swal.fire('Info', 'Data not deleted', 'info');
      }
    });
  }

  redirectAdd() {
    this.router.navigate(['/genres/add']);
  }
}
