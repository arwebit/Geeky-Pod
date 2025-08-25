import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenreService } from '../../shared/services/genre.service';
import { FormGroup, FormControl } from '@angular/forms';
import {} from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrl: './add-genre.component.css',
})
export class AddGenreComponent implements OnInit {
  addGenreForm!: FormGroup;
  addGenreImgView: boolean = false;

  genreNameErr: string = '';
  genreSlugErr: string = '';
  genreImageErr: string = '';
  genreImage!: File | null;

  addImage: string = '';
  statusCode: number = 0;
  message: string = '';
  genreSlug: string = '';

  constructor(private router: Router, private genreSrv: GenreService) {}

  ngOnInit(): void {
    this.addFormInit();
  }
  getGenreSlug(event: Event) {
    let genreName: any = (<HTMLInputElement>event.target).value;

    this.genreSlug = genreName
      .replace(/[^a-zA-Z0-9-]+/g, ' ')
      .split(' ')
      .join('-')
      .toLowerCase();
  }

  uploadImage(event: any) {
    this.addGenreImgView = true;
    const file = event.target.files ? event.target.files[0] : '';
    this.genreImage = file;
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
    this.addGenreForm = new FormGroup({
      genre_name: new FormControl(''),
      genre_slug: new FormControl(''),
      is_popular: new FormControl('yes'),
    });
  }

  emptyErrors() {
    this.genreNameErr = '';
    this.genreSlugErr = '';
    this.genreImageErr = '';
    this.message = '';
  }

  addGenres() {
    let genreData: any = new FormData();
    genreData.append('genre_name', this.addGenreForm.value.genre_name);
    genreData.append('genre_slug', this.addGenreForm.value.genre_slug);
    genreData.append('is_popular', this.addGenreForm.value.is_popular);
    genreData.append('genre_image', this.genreImage ?? new File([], ''));

    this.genreSrv.addGenres(genreData).subscribe(
      (result: any) => {
        this.addImage = '';
        this.emptyErrors();
        this.addGenreImgView = false;
        this.addGenreForm.reset();
        this.addFormInit();
        this.message = result.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      (err: HttpErrorResponse) => {
        this.emptyErrors();
        this.genreNameErr = err.error.errors.genre_name;
        this.genreSlugErr = err.error.errors.genre_slug;
        this.genreImageErr = err.error.errors.genre_image;
      }
    );
  }
}
