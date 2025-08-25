import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodesService } from '../shared/services/episodes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.css',
})
export class PodcastsComponent {
  pageID: number = 0;
  pageRecords: number = 24;
  episodeLists: any = [];
  totalRecords: number = 0;
  totalPages: number = 0;
  imageURL: string = `${environment.imagesURL}`;

  constructor(
    private activatedRoute: ActivatedRoute,
    private episodeSrv: EpisodesService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pageID = params['page_id'];
      this.getPodcastList(this.getStartIndex(), this.pageRecords);
      this.pagination(this.pageID);
    });
  }

  pagination(pageID: number = 1) {
    this.getPodcastList(this.getStartIndex(pageID), this.pageRecords);
  }
  pageChange(event: any) {
    const pageNo = event.page + 1;
    this.router.navigate(['podcasts/page', pageNo]);
  }

  getStartIndex(startIndex: number = 1) {
    if (this.pageID > 1) {
      startIndex = (this.pageID - 1) * this.pageRecords + 1;
    } else {
      startIndex = 0;
    }
    return startIndex;
  }

  getPodcastList(startRow: number = 0, pageRecords: number = 10) {
    const data = {
      filter: {
        condition: [['is_active', '=', 'yes']],
      },
      start_row: startRow - 1,
      page_records: pageRecords,
      sort_field: 'episode_date',
      sort: -1,
    };

    this.episodeSrv.getEpisodes(data).subscribe(
      (result: any) => {
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
