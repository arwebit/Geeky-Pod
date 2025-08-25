import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlidersComponent } from './sliders.component';
import { AddSliderComponent } from './add-slider/add-slider.component';
import { EditSliderComponent } from './edit-slider/edit-slider.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'page',
        children: [
          {
            path: ':page_id',
            component: SlidersComponent,
            title: 'Geeky Pod :: Sliders',
          },
        ],
      },
      {
        path: 'add',
        component: AddSliderComponent,
        title: 'Geeky Pod :: Add Slider',
      },
      {
        path: 'edit/:slider_id',
        component: EditSliderComponent,
        title: 'Geeky Pod :: Edit Slider',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlidersRoutingModule {}
