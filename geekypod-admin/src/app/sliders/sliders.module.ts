import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlidersRoutingModule } from './sliders-routing.module';
import { SlidersComponent } from './sliders.component';
import { AddSliderComponent } from './add-slider/add-slider.component';
import { EditSliderComponent } from './edit-slider/edit-slider.component';
import { PaginatorModule } from 'primeng/paginator';
import { LayoutsModule } from '../layouts/layouts.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SlidersComponent, AddSliderComponent, EditSliderComponent],
  imports: [
    CommonModule,
    SlidersRoutingModule,
    ReactiveFormsModule,
    LayoutsModule,
    PaginatorModule,
  ],
})
export class SlidersModule {}
