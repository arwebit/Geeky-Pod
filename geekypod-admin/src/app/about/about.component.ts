import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';
import { ContactService } from '../shared/services/contact.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  editButton: boolean = true;
  aboutForm!: FormGroup;
  editAboutImgView: boolean = false;

  aboutErr: string = '';
  aboutButtonErr: string = '';
  aboutLinkErr: string = '';
  aboutImageErr: string = '';
  aboutImage!: File | null;

  aboutImageURL: string = '';
  statusCode: number = 0;
  message: string = '';
  imageURL: string = `${environment.imagesURL}`;

  constructor(private aboutSrv: ContactService) {}

  ngOnInit(): void {
    this.aboutFormInit();
    this.getAbout();
  }

  getAbout() {
    this.aboutSrv.getAbout().subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.aboutForm = new FormGroup({
          about_me: new FormControl(details.about_me),
          about_button_text: new FormControl(details.about_button_text),
          about_button_link: new FormControl(details.about_button_link),
        });
        this.aboutImageURL = this.imageURL + '/' + details.about_pic;
      },
      (err: HttpErrorResponse) => {
        alert('No records found');
      }
    );
  }

  uploadImage(event: any) {
    this.editAboutImgView = true;
    const file = event.target.files ? event.target.files[0] : '';
    this.aboutImage = file;
    const reader: any = new FileReader();
    $('#about_image').val('');
    reader.onloadend = () => {
      let str = reader.result as string;
      this.aboutImageURL = str;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  aboutFormInit() {
    this.aboutForm = new FormGroup({
      about_me: new FormControl(''),
      about_button_text: new FormControl(''),
      about_button_link: new FormControl(''),
    });
  }

  emptyErrors() {
    this.aboutErr = '';
    this.aboutButtonErr = '';
    this.aboutLinkErr = '';
    this.aboutImageErr = '';
    this.message = '';
  }

  saveAbout() {
    let aboutData: any = new FormData();
    aboutData.append('about_me', this.aboutForm.value.about_me);
    aboutData.append(
      'about_button_text',
      this.aboutForm.value.about_button_text
    );
    aboutData.append(
      'about_button_link',
      this.aboutForm.value.about_button_link
    );
    aboutData.append('about_pic', this.aboutImage ?? new File([], ''));

    this.aboutSrv.saveAbout(aboutData).subscribe(
      (result: any) => {
        this.emptyErrors();
        this.message = result.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      (err: HttpErrorResponse) => {
        this.emptyErrors();
        this.aboutErr = err.error.errors.about_me;
        this.aboutButtonErr = err.error.errors.about_button_text;
        this.aboutLinkErr = err.error.errors.about_button_link;
        this.aboutImageErr = err.error.errors.about_pic;
      }
    );
  }
}
