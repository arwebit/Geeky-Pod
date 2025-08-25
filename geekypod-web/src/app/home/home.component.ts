import { Component } from '@angular/core';
import { ContactService } from '../shared/services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  youtubeLink: string = '#';
  spotifyLink: string = '#';
  constructor(private contactSrv: ContactService) {
    this.getContact();
  }

  getContact() {
    this.contactSrv.getContact().subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.youtubeLink = details.youtube_link;
        this.spotifyLink = details.spotify_link;
      },
      (err: HttpErrorResponse) => {
        alert('No records');
      }
    );
  }
}
