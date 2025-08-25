import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {} from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
import { PodcasterService } from '../../shared/services/podcaster.service';
declare var $: any;

@Component({
  selector: 'app-add-podcaster',
  templateUrl: './add-podcaster.component.html',
  styleUrl: './add-podcaster.component.css',
})
export class AddPodcasterComponent implements OnInit {
  addPodcasterForm!: FormGroup;
  addPodcasterImgView: boolean = false;

  podcasterNameErr: string = '';
  podcasterSlugErr: string = '';
  podcasterBioErr: string = '';
  podcasterDesignationErr: string = '';
  podcasterImageErr: string = '';
  podcasterImage!: File | null;

  addImage: string = '';
  statusCode: number = 0;
  message: string = '';
  podcasterSlug: string = '';

  constructor(private router: Router, private podcasterSrv: PodcasterService) {}

  ngOnInit(): void {
    this.addFormInit();
  }
  getPodcasterSlug(event: Event) {
    let podcasterName: any = (<HTMLInputElement>event.target).value;

    this.podcasterSlug = podcasterName
      .replace(/[^a-zA-Z0-9-]+/g, ' ')
      .split(' ')
      .join('-')
      .toLowerCase();
  }
  uploadImage(event: any) {
    this.addPodcasterImgView = true;
    const file = event.target.files ? event.target.files[0] : '';
    this.podcasterImage = file;
    const reader: any = new FileReader();
    $('#add_upload_image').val('');
    reader.onloadend = () => {
      let str = reader.result as string;
      this.addImage = str;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  addFormInit() {
    this.addPodcasterForm = new FormGroup({
      podcaster_full_name: new FormControl(''),
      podcaster_slug: new FormControl(''),
      podcaster_popular: new FormControl('yes'),
      podcaster_bio: new FormControl(''),
      podcaster_designation: new FormControl(''),
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

  addPodcasters() {
    let podcasterData: any = new FormData();
    podcasterData.append(
      'podcaster_full_name',
      this.addPodcasterForm.value.podcaster_full_name
    );
    podcasterData.append(
      'podcaster_slug',
      this.addPodcasterForm.value.podcaster_slug
    );
    podcasterData.append(
      'podcaster_image',
      this.podcasterImage ?? new File([], '')
    );
    podcasterData.append(
      'podcaster_popular',
      this.addPodcasterForm.value.podcaster_popular
    );
    podcasterData.append(
      'podcaster_bio',
      this.addPodcasterForm.value.podcaster_bio
    );
    podcasterData.append(
      'podcaster_designation',
      this.addPodcasterForm.value.podcaster_designation
    );

    this.podcasterSrv.addPodcasters(podcasterData).subscribe(
      (result: any) => {
        this.addImage = '';
        this.emptyErrors();
        this.addPodcasterImgView = false;
        this.addPodcasterForm.reset();
        this.addFormInit();
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
