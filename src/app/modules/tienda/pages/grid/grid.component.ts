import { TiendaResponseInterface } from './../../interfaces/response';
import { Component, ViewChild } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import { TiendaInterface } from '../../interfaces/tienda';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { TiendaFormComponent } from '../../component/tienda-form/tienda-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  columns: string[] = ['sucursal', 'direccion', 'opciones'];
  dataSource!: MatTableDataSource<TiendaInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private _tiendaService: TiendaService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getTiendas();
  }

  ngOnDestroy(): void {
    // this.unsubscribe$.unsubscribe();
    // this.unsubscribe$.complete();
  }
  getTiendas() {
    this._tiendaService.getTiendas().pipe(takeUntil(this.unsubscribe$)).subscribe((res: TiendaResponseInterface) => {
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

  addEdit (titulo: string, accion: string, tienda?: TiendaInterface) {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.autoFocus = true;
    config.width = '550px';
    config.height = '300px';
    config.data = {
      titulo,
      accion,
      tienda
    };

    const dialogRef = this._dialog.open(TiendaFormComponent, config);

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.getTiendas();
    })
  }

  deleteCliente(id: number, tienda: string) {
    if (confirm(`Desea elimminar la tienda ${tienda}?`)){
      this._tiendaService.deleteTienda(id).subscribe((res: TiendaResponseInterface) => {
        if (res.codigoEstatus === 200) {
          this.getTiendas();
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

  productos(tienda: number) {
    this._router.navigate([`/articulos/${tienda}`])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
