import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreComponent } from './genre.component';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  declarations: [GenreComponent],
  imports: [
    CommonModule,
    GenreRoutingModule,
    RouterModule,
    LayoutsModule,
    PaginatorModule,
  ],
})
export class GenreModule {}
