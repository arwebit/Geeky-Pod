import { Component } from '@angular/core';
import {} from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GenreService } from '../../shared/services/genre.service';
import { environment } from '../../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.css',
})
export class EditGenreComponent {
  genreID: number = 0;
  editButton: boolean = true;
  editGenreForm!: FormGroup;
  editGenreImgView: boolean = false;

  genreNameErr: string = '';
  genreSlugErr: string = '';
  genreImageErr: string = '';
  genreImage!: File | null;

  editImage: string = '';
  statusCode: number = 0;
  message: string = '';
  imageURL: string = `${environment.imagesURL}`;
  genreSlug: string = '';

  constructor(
    private genreSrv: GenreService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.genreID = params['genre_id'];
      this.getGenre(this.genreID);
    });
  }
  getGenreSlug(event: Event) {
    let genreName: any = (<HTMLInputElement>event.target).value;

    this.genreSlug = genreName
      .replace(/[^a-zA-Z0-9-]+/g, ' ')
      .split(' ')
      .join('-')
      .toLowerCase();
  }
  ngOnInit(): void {
    this.editFormInit();
  }

  getGenre(genreID: number) {
    const data = {
      filter: {
        condition: [['genre_id', '=', genreID]],
      },
      start_row: 0,
      page_records: 1,
      sort_field: 'genre_id',
      sort: -1,
    };

    this.genreSrv.getGenres(data).subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.editGenreForm = new FormGroup({
          genre_name: new FormControl(details.genre_name),
          genre_slug: new FormControl(details.genre_slug),
          is_popular: new FormControl(details.is_popular),
          is_active: new FormControl(details.is_active),
        });
        this.editImage = this.imageURL + '/' + details.genre_image;
      },
      (err: HttpErrorResponse) => {
        alert('No records found');
      }
    );
  }

  uploadImage(event: any) {
    this.editGenreImgView = true;
    const file = event.target.files ? event.target.files[0] : '';
    this.genreImage = file;
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
    this.editGenreForm = new FormGroup({
      genre_name: new FormControl(''),
      genre_slug: new FormControl(''),
      is_popular: new FormControl('yes'),
      is_active: new FormControl('yes'),
    });
  }

  emptyErrors() {
    this.genreNameErr = '';
    this.genreSlugErr = '';
    this.genreImageErr = '';
    this.message = '';
  }

  editGenres() {
    let genreData: any = new FormData();
    genreData.append('genre_name', this.editGenreForm.value.genre_name);
    genreData.append('genre_slug', this.editGenreForm.value.genre_slug);
    genreData.append('genre_image', this.genreImage ?? new File([], ''));
    genreData.append('is_popular', this.editGenreForm.value.is_popular);
    genreData.append('is_active', this.editGenreForm.value.is_active);
    this.genreSrv.editGenres(genreData, this.genreID).subscribe(
      (result: any) => {
        this.emptyErrors();
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
