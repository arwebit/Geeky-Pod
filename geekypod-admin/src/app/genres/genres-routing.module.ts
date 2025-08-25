import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './genres.component';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { EditGenreComponent } from './edit-genre/edit-genre.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'page',
        children: [
          {
            path: ':page_id',
            component: GenresComponent,
            title: 'Geeky Pod :: Genres',
          },
        ],
      },
      {
        path: 'add',
        component: AddGenreComponent,
        title: 'Geeky Pod :: Add Genre',
      },
      {
        path: 'edit/:genre_id',
        component: EditGenreComponent,
        title: 'Geeky Pod :: Edit Genre',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenresRoutingModule {}
