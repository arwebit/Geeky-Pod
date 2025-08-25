import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    title: 'Geeky Pod :: Login',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    title: 'Geeky Pod :: Home',
    canActivate: [loginGuard],
  },
  {
    path: 'genres',
    loadChildren: () =>
      import('./genres/genres.module').then((m) => m.GenresModule),
    title: 'Geeky Pod :: Genres',
    canActivate: [loginGuard],
  },
  {
    path: 'podcasters',
    loadChildren: () =>
      import('./podcasters/podcasters.module').then((m) => m.PodcastersModule),
    title: 'Geeky Pod :: Podcasters',
    canActivate: [loginGuard],
  },
  {
    path: 'subscribers',
    loadChildren: () =>
      import('./subscribers/subscribers.module').then(
        (m) => m.SubscribersModule
      ),
    title: 'Geeky Pod :: Subscribers',
    canActivate: [loginGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    title: 'Geeky Pod :: Profile',
    canActivate: [loginGuard],
  },
  {
    path: 'sliders',
    loadChildren: () =>
      import('./sliders/sliders.module').then((m) => m.SlidersModule),
    title: 'Geeky Pod :: Sliders',
    canActivate: [loginGuard],
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./episodes/episodes.module').then((m) => m.EpisodesModule),
    title: 'Geeky Pod :: Episodes',
    canActivate: [loginGuard],
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
    title: 'Geeky Pod :: Contact',
    canActivate: [loginGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
    title: 'Geeky Pod :: About',
    canActivate: [loginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
