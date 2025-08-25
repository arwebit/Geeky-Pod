import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastsComponent } from './podcasts.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'page/:page_id',
        component: PodcastsComponent,
        title: 'Geeky Pod :: Podcasts',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastsRoutingModule {}
