import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastersRoutingModule } from './podcasters-routing.module';
import { PodcastersComponent } from './podcasters.component';
import { AddPodcasterComponent } from './add-podcaster/add-podcaster.component';
import { EditPodcasterComponent } from './edit-podcaster/edit-podcaster.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  declarations: [
    PodcastersComponent,
    AddPodcasterComponent,
    EditPodcasterComponent,
  ],
  imports: [
    CommonModule,
    PodcastersRoutingModule,
    ReactiveFormsModule,
    LayoutsModule,
    PaginatorModule,
  ],
})
export class PodcastersModule {}
