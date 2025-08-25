import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { TableColumns } from './tableColumns';
import { PodcasterService } from '../shared/services/podcaster.service';
@Component({
  selector: 'app-podcasters',
  templateUrl: './podcasters.component.html',
  styleUrl: './podcasters.component.css',
})
export class PodcastersComponent {
  pageID: number = 0;
  totalRecords: any = 0;
  totalPages: number = 0;
  recordsInfo: string = '';
  statusCode: number = 0;
  podcasterList: any = [];
  loading: boolean = false;
  message: string = '';
  condition: any = [];
  imageURL: string = `${environment.imagesURL}`;
  columnsValues = TableColumns;
  columns: any = this.columnsValues;
  pager: any = [3, 5, 10, 50, 100, 200, 300, 500];
  pageRecords: any = 3;

  constructor(
    private podcasterSrv: PodcasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pageID = params['page_id'];
      this.getPodcasterList(this.getStartIndex(), this.pageRecords);
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
    this.getPodcasterList(this.getStartIndex(pageID), this.pageRecords);
  }
  pageChange(event: any) {
    const pageNo = event.page + 1;
    this.router.navigate(['podcasters/page', pageNo]);
  }

  ngOnInit(): void {}

  getPodcasterList(
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
      sort_field: 'podcaster_id',
      sort: -1,
    };

    this.podcasterSrv.getPodcasters(data).subscribe(
      (result: any) => {
        this.loading = false;
        this.podcasterList = result.rows;
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
        this.podcasterList = [];
        this.totalRecords = 0;
        this.totalPages = 0;
        this.router.navigate(['podcasters/page', 1]);
      }
    );
  }

  deletePodcaster(podcaster: any) {
    Swal.fire({
      title: `Are you sure, you want to delete : <span style='color:red'>${podcaster.podcaster_full_name}</span> ?`,
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((res: any) => {
      if (res.value) {
        const podcasterID = podcaster.podcaster_id;
        this.podcasterSrv.deletePodcasters(podcasterID).subscribe(
          () => {
            this.getPodcasterList(this.getStartIndex(), this.pageRecords);
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
    this.router.navigate(['/podcasters/add']);
  }
}
