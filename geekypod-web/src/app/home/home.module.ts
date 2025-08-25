import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

import { HomeComponent } from './home.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { PopularPodcastsComponent } from './popular-podcasts/popular-podcasts.component';
import { PopularGenresComponent } from './popular-genres/popular-genres.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SlidersComponent } from './sliders/sliders.component';
import { LatestPodcastComponent } from './latest-podcast/latest-podcast.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    PopularPodcastsComponent,
    PopularGenresComponent,
    NewsletterComponent,
    SlidersComponent,
    LatestPodcastComponent,
    ShortenPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    RouterModule,
    LayoutsModule,
    CarouselModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class HomeModule {}
