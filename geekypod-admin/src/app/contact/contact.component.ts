import { Component } from '@angular/core';
import { ContactService } from '../shared/services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  addContactForm!: FormGroup;
  addcontactImgView: boolean = false;

  googleFormErr: string = '';
  instaLinkErr: string = '';
  ytLinkErr: string = '';
  spotifyLinkErr: string = '';
  emailErr: string = '';
  mobileNoErr: string = '';
  addressErr: string = '';
  statusCode: number = 0;
  message: string = '';

  constructor(private router: Router, private contactSrv: ContactService) {}

  ngOnInit(): void {
    this.addFormInit();
    this.contactSrv.getContact().subscribe((res: any) => {
      const [details] = res.rows;
      this.addContactForm = new FormGroup({
        google_form_link: new FormControl(details.google_form_link),
        contact_email: new FormControl(details.contact_email),
        address: new FormControl(details.address),
        mobile_no: new FormControl(details.mobile_no),
        instagram_link: new FormControl(details.instagram_link),
        youtube_link: new FormControl(details.youtube_link),
        spotify_link: new FormControl(details.spotify_link),
      });
    });
  }

  addFormInit() {
    this.addContactForm = new FormGroup({
      google_form_link: new FormControl(''),
      address: new FormControl(''),
      contact_email: new FormControl(''),
      mobile_no: new FormControl(''),
      instagram_link: new FormControl(''),
      youtube_link: new FormControl(''),
      spotify_link: new FormControl(''),
    });
  }

  emptyErrors() {
    this.googleFormErr = '';
    this.emailErr = '';
    this.mobileNoErr = '';
    this.instaLinkErr = '';
    this.spotifyLinkErr = '';
    this.ytLinkErr = '';
    this.addressErr = '';
    this.message = '';
  }

  addContacts() {
    this.contactSrv.saveContact(this.addContactForm.value).subscribe(
      (result: any) => {
        this.emptyErrors();
        this.message = result.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      (err: HttpErrorResponse) => {
        this.emptyErrors();
        this.googleFormErr = err.error.errors.google_form_link;
        this.addressErr = err.error.errors.address;
        this.emailErr = err.error.errors.contact_email;
        this.mobileNoErr = err.error.errors.mobile_no;
        this.instaLinkErr = err.error.errors.instagram_link;
        this.ytLinkErr = err.error.errors.youtube_link;
        this.spotifyLinkErr = err.error.errors.spotify_link;
      }
    );
  }
}
