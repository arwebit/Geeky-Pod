import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlidersService } from '../../shared/services/sliders.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrl: './sliders.component.css',
})
export class SlidersComponent implements OnInit {
  sliderLists: any = [];
  imageURL: string = `${environment.imagesURL}`;

  constructor(private router: Router, private sliderSrv: SlidersService) {
    this.getSliderList();
  }

  ngOnInit(): void {}

  getSliderList() {
    const data = {
      filter: {
        condition: [],
      },
      start_row: 0,
      page_records: 10000000,
      sort_field: 'slider_id',
      sort: -1,
    };

    this.sliderSrv.getSliders(data).subscribe(
      (result: any) => {
        this.sliderLists = result.rows;
      },
      (err: HttpErrorResponse) => {
        alert('No slider found');
      }
    );
  }
}
