import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ArticulosService } from '../../services/articulos.service';
import { ArticuloResponse } from '../../interfaces/articulo-response';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticuloInterface } from '../../interfaces/articulo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ArticuloFormComponent } from '../../components/articulo-form/articulo-form.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  tienda: number = 0;
  columns: string [] = ['codigo', 'descripcion', 'precio', 'opciones'];
  dataSource!: MatTableDataSource<ArticuloInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _articuloService: ArticulosService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this._route.params.subscribe(params => {
      this.tienda = params['id'];

      if (this.tienda <= 0) this._router.navigate(['/tiendas'])
    })
  }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos () {
    this._articuloService.getArticulos(this.tienda).subscribe((res: ArticuloResponse) => {
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
      this._snackBar.open('Ocurrio un error al obtener tiendas!', 'Cerrar', { duration: 3000 });
    })
  }

  addEdit (titulo: string, accion: string, articulo?: ArticuloInterface) {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.autoFocus = true;
    config.width = '550px';
    config.height = '450px';
    config.data = {
      titulo,
      accion,
      articulo
    };

    const dialogRef = this._dialog.open(ArticuloFormComponent, config);

    dialogRef.afterClosed().subscribe(res => {
      if (res){
        this.getArticulos();
      }
    })
  }

  deleteArticulo(id: number, articulo: string) {
    if (confirm(`Desea elimminar la tienda ${articulo}?`)){
      this._articuloService.deleteArticulo(id).subscribe((res: ArticuloResponse) => {
        if (res.codigoEstatus === 200) {
          this.getArticulos();
          this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
        } else {
          this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
        }
      }, err => {
        console.error(err);
        this._snackBar.open('Ocurrio un error al eliminar tienda!', 'Cerrar', { duration: 3000})
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
