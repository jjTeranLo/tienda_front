import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './pages/grid/grid.component';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';

const routes: Routes = [
  { path: 'articulos/:id', component: GridComponent },
  { path: 'articulos-listado', component: ListaProductosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticulosRoutingModule { }
