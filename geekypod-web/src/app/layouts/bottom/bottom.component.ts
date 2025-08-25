import { Component } from '@angular/core';
import { ContactService } from '../../shared/services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrl: './bottom.component.css',
})
export class BottomComponent {
  instagramLink: string = '#';
  youtubeLink: string = '#';
  spotifyLink: string = '#';
  email: string = '#';
  mobileNo: string = '';
  address: string = '';

  constructor(private contactSrv: ContactService) {
    this.getContact();
  }

  getContact() {
    this.contactSrv.getContact().subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.instagramLink = details.instagram_link;
        this.youtubeLink = details.youtube_link;
        this.spotifyLink = details.spotify_link;
        this.email = details.contact_email;
        this.mobileNo = details.mobile_no;
        this.address = details.address;
      },
      (err: HttpErrorResponse) => {
        alert('No records');
      }
    );
  }
}
