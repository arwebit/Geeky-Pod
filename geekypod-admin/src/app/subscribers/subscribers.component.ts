import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { TableColumns } from './tableColumns';
import { SubscriberService } from '../shared/services/subscriber.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css',
})
export class SubscribersComponent {
  pageID: number = 0;
  totalRecords: any = 0;
  totalPages: number = 0;
  recordsInfo: string = '';
  statusCode: number = 0;
  subscriberList: any = [];
  loading: boolean = false;
  message: string = '';
  condition: any = [];
  columnsValues = TableColumns;
  columns: any = this.columnsValues;
  pager: any = [3, 5, 10, 50, 100, 200, 300, 500];
  pageRecords: any = 3;

  constructor(
    private subscriberSrv: SubscriberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pageID = params['page_id'];
      this.getSubscriberList(this.getStartIndex(), this.pageRecords);
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
    this.getSubscriberList(this.getStartIndex(pageID), this.pageRecords);
  }
  pageChange(event: any) {
    const pageNo = event.page + 1;
    this.router.navigate(['subscribers/page', pageNo]);
  }

  ngOnInit(): void {}

  getSubscriberList(
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
      sort_field: 'subscriber_id',
      sort: -1,
    };

    this.subscriberSrv.getSubscribers(data).subscribe(
      (result: any) => {
        this.loading = false;
        this.subscriberList = result.rows;
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
        this.subscriberList = [];
        this.totalRecords = 0;
        this.totalPages = 0;
        this.router.navigate(['subscribers/page', 1]);
      }
    );
  }

  deleteSubscriber(subscriber: any) {
    Swal.fire({
      title: `Are you sure, you want to delete : <span style='color:red'>${subscriber.subscriber_email}</span> ?`,
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((res: any) => {
      if (res.value) {
        const subscriberID = subscriber.subscriber_id;
        this.subscriberSrv.deleteSubscribers(subscriberID).subscribe(
          () => {
            this.getSubscriberList(this.getStartIndex(), this.pageRecords);
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
}
