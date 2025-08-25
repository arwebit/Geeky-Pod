import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  genreCount: number = 0;
  episodeCount: number = 0;
  podcasterCount: number = 0;
  subscriberCount: number = 0;

  constructor(private dashboardSrv: DashboardService, private router: Router) {
    this.getDashboardRecords();
  }

  ngOnInit(): void {}

  getDashboardRecords() {
    this.dashboardSrv.getRecords().subscribe(
      (result: any) => {
        const details = result.rows;
        this.genreCount = details.genre_count;
        this.episodeCount = details.episode_count;
        this.podcasterCount = details.podcaster_count;
        this.subscriberCount = details.subscriber_count;
      },
      (err: HttpErrorResponse) => {
        alert('Something went wrong');
      }
    );
  }

  navigateURL(urlString: string) {
    this.router.navigate([urlString]);
  }
}
