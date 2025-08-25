import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, RouterModule, LayoutsModule],
})
export class AboutModule {}
