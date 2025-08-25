import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodesComponent } from './episodes.component';
import { AddEpisodeComponent } from './add-episode/add-episode.component';
import { EditEpisodeComponent } from './edit-episode/edit-episode.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'page',
        children: [
          {
            path: ':page_id',
            component: EpisodesComponent,
            title: 'Geeky Pod :: Episodes',
          },
        ],
      },
      {
        path: 'add',
        component: AddEpisodeComponent,
        title: 'Geeky Pod :: Add Episode',
      },
      {
        path: 'edit/:episode_id',
        component: EditEpisodeComponent,
        title: 'Geeky Pod :: Edit Episode',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpisodesRoutingModule {}
