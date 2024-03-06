import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule) },
  { path: '', loadChildren: () => import('./modules/tienda/tienda.module').then(m => m.TiendaModule) },
  { path: '', loadChildren: () => import('./modules/articulos/articulos.module').then(m => m.ArticulosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
