import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreComponent } from './genre.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':genre_slug/page',
        children: [
          {
            path: ':page_id',
            component: GenreComponent,
            title: 'Geeky Pod :: Genres',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenreRoutingModule {}
