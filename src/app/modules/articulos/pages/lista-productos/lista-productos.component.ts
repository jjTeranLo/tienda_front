import { Component, ViewChild } from '@angular/core';
import { ArticuloInterface } from '../../interfaces/articulo';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ArticulosService } from '../../services/articulos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticuloResponse } from '../../interfaces/articulo-response';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent {
  columns: string [] = ['codigo', 'descripcion', 'precio', 'opciones'];
  dataSource!: MatTableDataSource<ArticuloInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _articuloService: ArticulosService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos () {
    this._articuloService.getArticulosListado().subscribe((res: ArticuloResponse) => {
      if (res.codigoEstatus === 200) {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 });
      } else {
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 });
      }
    }, error => {
      console.error(error);
      this._snackBar.open('Ocurrio un error al obtener articulos!', 'Cerrar', { duration: 3000 });
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
