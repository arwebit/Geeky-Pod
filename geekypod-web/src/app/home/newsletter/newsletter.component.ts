import { Component } from '@angular/core';
import { SubscribersService } from '../../shared/services/subscribers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
})
export class NewsletterComponent {
  subscriberEmail: string = '';
  googleFormLink: string = '#';

  constructor(
    private subscriberSrv: SubscribersService,
    private messageService: MessageService,
    private contactSrv: ContactService
  ) {
    this.getContact();
  }
  getContact() {
    this.contactSrv.getContact().subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.googleFormLink = details.google_form_link;
      },
      (err: HttpErrorResponse) => {
        alert('No records');
      }
    );
  }
  // subscriber() {
  //   const data = {
  //     subscriber_email: this.subscriberEmail,
  //   };
  //   this.subscriberSrv.saveSubscribers(data).subscribe(
  //     (result: any) => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Success',
  //         detail: 'Yo have been subscribed',
  //       });
  //       this.subscriberEmail = '';
  //     },
  //     (err: HttpErrorResponse) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: err.error.message,
  //       });
  //     }
  //   );
  // }
}
