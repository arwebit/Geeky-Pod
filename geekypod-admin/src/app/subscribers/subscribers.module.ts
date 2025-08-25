import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { SubscribersComponent } from './subscribers.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [SubscribersComponent],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    ReactiveFormsModule,
    LayoutsModule,
    PaginatorModule,
  ],
})
export class SubscribersModule {}
