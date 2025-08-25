import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastersComponent } from './podcasters.component';
import { AddPodcasterComponent } from './add-podcaster/add-podcaster.component';
import { EditPodcasterComponent } from './edit-podcaster/edit-podcaster.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'page',
        children: [
          {
            path: ':page_id',
            component: PodcastersComponent,
            title: 'Geeky Pod :: Podcasters',
          },
        ],
      },
      {
        path: 'add',
        component: AddPodcasterComponent,
        title: 'Geeky Pod :: Add Podcaster',
      },
      {
        path: 'edit/:podcaster_id',
        component: EditPodcasterComponent,
        title: 'Geeky Pod :: Edit Podcaster',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastersRoutingModule {}
