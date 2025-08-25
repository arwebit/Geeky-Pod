import { Component } from '@angular/core';
import { SlidersService } from '../../shared/services/sliders.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrl: './add-slider.component.css',
})
export class AddSliderComponent {
  addSliderForm!: FormGroup;
  addSliderImgView: boolean = false;

  sliderHeaderTextErr: string = '';
  sliderParaTextErr: string = '';
  sliderButtonTextErr: string = '';
  sliderButtonURLErr: string = '';
  sliderImageErr: string = '';
  sliderImage!: File | null;

  addImage: string = '';
  statusCode: number = 0;
  message: string = '';

  constructor(private router: Router, private sliderSrv: SlidersService) {}

  ngOnInit(): void {
    this.addFormInit();
  }

  uploadImage(event: any) {
    this.addSliderImgView = true;
    const file = event.target.files ? event.target.files[0] : '';
    this.sliderImage = file;
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
    this.addSliderForm = new FormGroup({
      slider_header_text: new FormControl(''),
      slider_para_text: new FormControl(''),
      slider_button_text: new FormControl(''),
      slider_button_url: new FormControl(''),
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

  addSliders() {
    let sliderData: any = new FormData();
    sliderData.append(
      'slider_header_text',
      this.addSliderForm.value.slider_header_text
    );
    sliderData.append(
      'slider_button_text',
      this.addSliderForm.value.slider_button_text
    );
    sliderData.append(
      'slider_para_text',
      this.addSliderForm.value.slider_para_text
    );
    sliderData.append(
      'slider_button_url',
      this.addSliderForm.value.slider_button_url
    );
    sliderData.append('slider_image', this.sliderImage ?? new File([], ''));

    this.sliderSrv.addSliders(sliderData).subscribe(
      (result: any) => {
        this.addImage = '';
        this.emptyErrors();
        this.addSliderImgView = false;
        this.addSliderForm.reset();
        this.addFormInit();
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
