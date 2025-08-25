import { Component, OnInit } from '@angular/core';
import {} from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PodcasterService } from '../../shared/services/podcaster.service';
declare var $: any;
@Component({
  selector: 'app-edit-podcaster',
  templateUrl: './edit-podcaster.component.html',
  styleUrl: './edit-podcaster.component.css',
})
export class EditPodcasterComponent implements OnInit {
  podcasterID: number = 0;
  editPodcasterForm!: FormGroup;

  podcasterNameErr: string = '';
  podcasterSlugErr: string = '';
  podcasterBioErr: string = '';
  podcasterDesignationErr: string = '';
  podcasterImageErr: string = '';
  podcasterImage!: File | null;

  editImage: string = '';
  statusCode: number = 0;
  message: string = '';
  imageURL: string = `${environment.imagesURL}`;
  podcasterSlug: string = '';
  constructor(
    private podcasterSrv: PodcasterService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.podcasterID = params['podcaster_id'];
      this.getPodcaster(this.podcasterID);
    });
  }

  ngOnInit(): void {
    this.editFormInit();
  }

  getPodcasterSlug(event: Event) {
    let podcasterName: any = (<HTMLInputElement>event.target).value;

    this.podcasterSlug = podcasterName
      .replace(/[^a-zA-Z0-9-]+/g, ' ')
      .split(' ')
      .join('-')
      .toLowerCase();
  }

  getPodcaster(podcasterID: number) {
    const data = {
      filter: {
        condition: [['podcaster_id', '=', podcasterID]],
      },
      start_row: 0,
      page_records: 1,
      sort_field: 'podcaster_id',
      sort: -1,
    };

    this.podcasterSrv.getPodcasters(data).subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.editPodcasterForm = new FormGroup({
          podcaster_full_name: new FormControl(details.podcaster_full_name),
          podcaster_slug: new FormControl(details.podcaster_slug),
          podcaster_popular: new FormControl(details.podcaster_popular),
          podcaster_bio: new FormControl(details.podcaster_bio),
          podcaster_designation: new FormControl(details.podcaster_designation),
          is_active: new FormControl(details.is_active),
        });
        this.editImage = this.imageURL + '/' + details.podcaster_image;
      },
      (err: HttpErrorResponse) => {
        alert('No records found');
      }
    );
  }
  uploadImage(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.podcasterImage = file;
    const reader: any = new FileReader();
    $('#edit_upload_image').val('');
    reader.onloadend = () => {
      let str = reader.result as string;
      this.editImage = str;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  editFormInit() {
    this.editPodcasterForm = new FormGroup({
      podcaster_full_name: new FormControl(''),
      podcaster_slug: new FormControl(''),
      podcaster_popular: new FormControl(''),
      podcaster_bio: new FormControl(''),
      podcaster_designation: new FormControl(''),
      is_active: new FormControl(''),
    });
  }

  emptyErrors() {
    this.podcasterNameErr = '';
    this.podcasterSlugErr = '';
    this.podcasterBioErr = '';
    this.podcasterDesignationErr = '';
    this.podcasterImageErr = '';
    this.message = '';
  }

  editPodcasters() {
    let podcasterData: any = new FormData();
    podcasterData.append(
      'podcaster_full_name',
      this.editPodcasterForm.value.podcaster_full_name
    );
    podcasterData.append(
      'podcaster_slug',
      this.editPodcasterForm.value.podcaster_slug
    );
    podcasterData.append(
      'podcaster_image',
      this.podcasterImage ?? new File([], '')
    );
    podcasterData.append(
      'podcaster_popular',
      this.editPodcasterForm.value.podcaster_popular
    );
    podcasterData.append(
      'podcaster_bio',
      this.editPodcasterForm.value.podcaster_bio
    );
    podcasterData.append(
      'podcaster_designation',
      this.editPodcasterForm.value.podcaster_designation
    );
    podcasterData.append('is_active', this.editPodcasterForm.value.is_active);

    this.podcasterSrv.editPodcasters(podcasterData, this.podcasterID).subscribe(
      (result: any) => {
        this.emptyErrors();
        this.message = result.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      (err: HttpErrorResponse) => {
        this.emptyErrors();
        this.podcasterNameErr = err.error.errors.podcaster_full_name;
        this.podcasterSlugErr = err.error.errors.podcaster_slug;
        this.podcasterBioErr = err.error.errors.podcaster_bio;
        this.podcasterDesignationErr = err.error.errors.podcaster_designation;
        this.podcasterImageErr = err.error.errors.podcaster_image;
      }
    );
  }
}
