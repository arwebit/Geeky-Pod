import { Component, OnInit } from '@angular/core';
import { GenresService } from '../../shared/services/genres.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrl: './top.component.css',
})
export class TopComponent implements OnInit {
  genres: any = [];
  instagramLink: string = '#';

  constructor(
    private genreSrv: GenresService,
    private contactSrv: ContactService
  ) {}

  ngOnInit(): void {
    this.getGenreList();
    this.getContact();
  }
  getContact() {
    this.contactSrv.getContact().subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.instagramLink = details.instagram_link;
      },
      (err: HttpErrorResponse) => {
        alert('No records');
      }
    );
  }
  getGenreList() {
    const data = {
      filter: {
        condition: [['is_active', '=', 'yes']],
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
