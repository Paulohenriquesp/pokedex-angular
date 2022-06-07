import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';

// Shared //
import { SharedModule } from '../shared/shared.module';

// Component //
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';





@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule,
  ]
})
export class PagesModule { }
