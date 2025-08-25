import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SlidersService } from '../../shared/services/sliders.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-slider',
  templateUrl: './edit-slider.component.html',
  styleUrl: './edit-slider.component.css',
})
export class EditSliderComponent {
  editSliderForm!: FormGroup;
  editSliderImgView: boolean = false;
  sliderID: number = 0;
  sliderHeaderTextErr: string = '';
  sliderParaTextErr: string = '';
  sliderButtonTextErr: string = '';
  sliderButtonURLErr: string = '';
  sliderImageErr: string = '';
  sliderImage!: File | null;

  editImage: string = '';
  statusCode: number = 0;
  message: string = '';
  imageURL: string = `${environment.imagesURL}`;

  constructor(
    private router: Router,
    private sliderSrv: SlidersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.sliderID = params['slider_id'];
      this.getSlider(this.sliderID);
    });
  }

  getSlider(sliderID: number) {
    const data = {
      filter: {
        condition: [['slider_id', '=', sliderID]],
      },
      start_row: 0,
      page_records: 1,
      sort_field: 'slider_id',
      sort: -1,
    };

    this.sliderSrv.getSliders(data).subscribe(
      (result: any) => {
        const [details] = result.rows;
        this.editSliderForm = new FormGroup({
          slider_header_text: new FormControl(details.slider_header_text),
          slider_para_text: new FormControl(details.slider_para_text),
          slider_button_text: new FormControl(details.slider_button_text),
          slider_button_url: new FormControl(details.slider_button_url),
          is_active: new FormControl(details.is_active),
        });
        this.editImage = this.imageURL + '/' + details.slider_image;
      },
      (err: HttpErrorResponse) => {
        alert('No records found');
      }
    );
  }
  ngOnInit(): void {
    this.editFormInit();
  }

  uploadImage(event: any) {
    this.editSliderImgView = true;
    const file = event.target.files ? event.target.files[0] : '';
    this.sliderImage = file;
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
    this.editSliderForm = new FormGroup({
      slider_header_text: new FormControl(''),
      slider_para_text: new FormControl(''),
      slider_button_text: new FormControl(''),
      slider_button_url: new FormControl(''),
      is_active: new FormControl(''),
    });
  }

  emptyErrors() {
    this.sliderHeaderTextErr = '';
    this.sliderButtonTextErr = '';
    this.sliderParaTextErr = '';
    this.sliderButtonURLErr = '';
    this.sliderImageErr = '';
    this.message = '';
  }

  editSliders() {
    let sliderData: any = new FormData();
    sliderData.append(
      'slider_header_text',
      this.editSliderForm.value.slider_header_text
    );
    sliderData.append(
      'slider_button_text',
      this.editSliderForm.value.slider_button_text
    );
    sliderData.append(
      'slider_para_text',
      this.editSliderForm.value.slider_para_text
    );
    sliderData.append(
      'slider_button_url',
      this.editSliderForm.value.slider_button_url
    );
    sliderData.append('is_active', this.editSliderForm.value.is_active);
    sliderData.append('slider_image', this.sliderImage ?? new File([], ''));

    this.sliderSrv.editSliders(sliderData, this.sliderID).subscribe(
      (result: any) => {
        this.emptyErrors();
        this.message = result.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      (err: HttpErrorResponse) => {
        this.emptyErrors();
        this.sliderHeaderTextErr = err.error.errors.slider_header_text;
        this.sliderButtonTextErr = err.error.errors.slider_button_text;
        this.sliderParaTextErr = err.error.errors.slider_para_text;
        this.sliderButtonURLErr = err.error.errors.slider_button_url;
        this.sliderImageErr = err.error.errors.slider_image;
      }
    );
  }
}
