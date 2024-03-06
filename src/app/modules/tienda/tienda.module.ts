import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { GridComponent } from './pages/grid/grid.component';
import { SharedModule } from '../shared/shared.module';
import { TiendaFormComponent } from './component/tienda-form/tienda-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GridComponent,
    TiendaFormComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TiendaModule { }
