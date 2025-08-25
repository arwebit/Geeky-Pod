import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    title: 'Geeky Pod',
  },
  {
    path: 'podcasts',
    loadChildren: () =>
      import('./podcasts/podcasts.module').then((m) => m.PodcastsModule),
  },
  {
    path: 'genre',
    loadChildren: () =>
      import('./genre/genre.module').then((m) => m.GenreModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
