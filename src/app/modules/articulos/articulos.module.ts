import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticulosRoutingModule } from './articulos-routing.module';
import { GridComponent } from './pages/grid/grid.component';
import { SharedModule } from '../shared/shared.module';
import { ArticuloFormComponent } from './components/articulo-form/articulo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';


@NgModule({
  declarations: [
    GridComponent,
    ArticuloFormComponent,
    ListaProductosComponent
  ],
  imports: [
    CommonModule,
    ArticulosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ArticulosModule { }
