import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresComponent } from './genres.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from '../layouts/layouts.module';
import { PaginatorModule } from 'primeng/paginator';
import { MessageService } from 'primeng/api';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { EditGenreComponent } from './edit-genre/edit-genre.component';
@NgModule({
  declarations: [GenresComponent, AddGenreComponent, EditGenreComponent],
  imports: [
    CommonModule,
    GenresRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    PaginatorModule,
  ],
  providers: [MessageService],
})
export class GenresModule {}
