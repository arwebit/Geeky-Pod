import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribersComponent } from './subscribers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'page/:page_id',
        component: SubscribersComponent,
        title: 'Geeky Pod :: Subscribers',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribersRoutingModule {}
