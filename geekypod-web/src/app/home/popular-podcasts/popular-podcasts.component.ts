import { Component } from '@angular/core';
import { EpisodesService } from '../../shared/services/episodes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-popular-podcasts',
  templateUrl: './popular-podcasts.component.html',
  styleUrl: './popular-podcasts.component.css',
})
export class PopularPodcastsComponent {
  episodes: any = [];
  responsiveOptions: any[] | undefined;
  imageURL: string = `${environment.imagesURL}`;

  constructor(private episodeSrv: EpisodesService) {
    this.getPodcastList();
  }

  slider() {
    const cards = document.querySelectorAll('.card');

    if (cards.length === 0) {
      setTimeout(() => this.slider(), 500); // Retry if no cards are available
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Show when in viewport
          } else {
            entry.target.classList.remove('visible'); // Hide when out of viewport
          }
        });
      },
      { threshold: 0.4 } // Trigger when 40% of card is visible
    );

    cards.forEach((card) => {
      observer.observe(card);
      card.classList.add('visible'); // Ensure visibility
    });
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

  getPodcastList() {
    const data = {
      filter: {
        condition: [
          ['is_popular', '=', 'yes'],
          ['is_active', '=', 'yes'],
        ],
      },
      start_row: 0,
      page_records: 15,
      sort_field: 'episode_date',
      sort: -1,
    };

    this.episodeSrv.getEpisodes(data).subscribe(
      (result: any) => {
        this.episodes = result.rows;
        setTimeout(() => {
          this.slider(); // Ensure cards exist before observing them
        }, 500);
      },
      (err: HttpErrorResponse) => {
        alert('No genres found');
      }
    );
  }
}
