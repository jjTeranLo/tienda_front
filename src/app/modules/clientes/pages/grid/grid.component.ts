import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteInterface } from '../../interfaces/clienteinterface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../../services/cliente.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClienteComponent } from '../../components/cliente/cliente.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  columns: string[] = ['id', 'nombres', 'apellidos', 'direccion', 'opciones'];
  dataSource!: MatTableDataSource<ClienteInterface>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor (
    private _clienteService: ClienteService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._clienteService.get().pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res)
    })
  }

  ngOnDestroy(): void {
    // this.unsubscribe$.unsubscribe();
    // this.unsubscribe$.complete();
  }

  addEdit (titulo: string, action: string, cliente?: ClienteInterface) {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.autoFocus = true;
    config.width = '500px';
    config.height = '450px';
    config.data = {
      titulo,
      action,
      cliente
    };

    const dialogRef = this._dialog.open(ClienteComponent, config);
  }

  deleteCliente(cliente: number) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
