import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastsRoutingModule } from './podcasts-routing.module';
import { PodcastsComponent } from './podcasts.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PodcastsComponent],
  imports: [
    CommonModule,
    PodcastsRoutingModule,
    RouterModule,
    LayoutsModule,
    PaginatorModule,
  ],
})
export class PodcastsModule {}
