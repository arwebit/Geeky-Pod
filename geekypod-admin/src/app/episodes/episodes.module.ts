import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodesRoutingModule } from './episodes-routing.module';
import { EpisodesComponent } from './episodes.component';
import { EditEpisodeComponent } from './edit-episode/edit-episode.component';
import { AddEpisodeComponent } from './add-episode/add-episode.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  declarations: [EpisodesComponent, EditEpisodeComponent, AddEpisodeComponent],
  imports: [
    CommonModule,
    EpisodesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    PaginatorModule,
  ],
})
export class EpisodesModule {}
