import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopComponent } from './top/top.component';
import { RouterModule } from '@angular/router';
import { BottomComponent } from './bottom/bottom.component';

@NgModule({
  declarations: [TopComponent, BottomComponent],
  imports: [CommonModule, RouterModule],
  exports: [TopComponent, BottomComponent],
})
export class LayoutsModule {}
