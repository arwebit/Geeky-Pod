import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ContactService } from '../shared/services/contact.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  aboutMe: string = '';
  aboutPic: string = '';
  aboutButton: string = '';
  aboutButtonLink: string = '';
  imageURL: string = `${environment.imagesURL}`;

  constructor(private aboutSrv: ContactService) {
    this.getAbout();
  }

  getAbout() {
    this.aboutSrv.getAbout().subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.aboutMe = details.about_me;
        this.aboutPic = `${this.imageURL}/${details.about_pic}`;
        this.aboutButton = details.about_button_text;
        this.aboutButtonLink = details.about_button_link;
      },
      (err: HttpErrorResponse) => {
        alert('No records');
      }
    );
  }
}
