import { Component, Inject } from '@angular/core';
import { TiendaInterface } from '../../interfaces/tienda';
import { TiendaService } from '../../services/tienda.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiendaResponseInterface } from '../../interfaces/response';

@Component({
  selector: 'app-tienda-form',
  templateUrl: './tienda-form.component.html',
  styleUrls: ['./tienda-form.component.scss']
})
export class TiendaFormComponent {
  titulo: string = '';
  accion: string = '';
  tienda?: TiendaInterface;
  tiendaForm!: FormGroup;

  unsubscribe$: Subject<void> = new Subject<void>();

  constructor (
    private _tiendaService: TiendaService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<TiendaFormComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.titulo = data.titulo;
    this.accion = data.accion;
    this.tienda = data.tienda;
  }

  ngOnInit(): void {
    this.tiendaForm = this.initForm();
  }

  ngOnDestroy(): void {
    // this.unsubscribe$.unsubscribe();
    // this.unsubscribe$.complete();
  }

  initForm() {
    return this._formBuilder.group({
      tienda: [this.tienda?.tienda ? this.tienda?.tienda : 0  ],
      sucursal: [this.tienda?.sucursal ? this.tienda.sucursal : '', [Validators.required, Validators.minLength(3)]],
      direccion: [this.tienda?.direccion ? this.tienda.direccion : '', [Validators.required, Validators.minLength(3)]]
    })
  }

  submitForm() {
    switch(this.accion) {
      case 'post':
        this.postTienda();
        break;
      case 'put':
        this.putTienda();
        break;
    }
  }

  postTienda() {
    if (!this.tiendaForm?.valid) {
      this._snackBar.open('Formulario invalido!', 'Cerrar', { duration: 3000 })
      return
    }

    this._tiendaService.postTienda(this.tiendaForm?.value).pipe().subscribe((res: TiendaResponseInterface) => {
      if (res.codigoEstatus === 200) {
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
        this.closeModal();
      } else {
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
      }
    })
  }

  putTienda() {
    if (!this.tiendaForm?.valid) {
      this._snackBar.open('Formulario invalido!', 'Cerrar', { duration: 3000 })
      return
    }

    this._tiendaService.putTienda(this.tiendaForm?.value).pipe().subscribe((res: TiendaResponseInterface) => {
      if (res.codigoEstatus === 200) {
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
        this.closeModal();
      } else {
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
      }
    })
  }

  closeModal() {
    this.tiendaForm?.reset();
    this._dialogRef.close(true);
  }
}
