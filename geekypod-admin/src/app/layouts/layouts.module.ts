import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopComponent } from './top/top.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TopComponent, SidebarComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [TopComponent, SidebarComponent, FooterComponent],
})
export class LayoutsModule {}
