import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticuloInterface } from '../../interfaces/articulo';
import { ArticuloResponse } from '../../interfaces/articulo-response';
import { ArticulosService } from '../../services/articulos.service';
import { TiendaService } from 'src/app/modules/tienda/services/tienda.service';
import { TiendaResponseInterface } from 'src/app/modules/tienda/interfaces/response';
import { TiendaInterface } from 'src/app/modules/tienda/interfaces/tienda';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.scss']
})
export class ArticuloFormComponent {
  titulo: string = '';
  accion: string = '';
  articulo?: ArticuloInterface;
  articuloForm!: FormGroup;
  tiendas: TiendaInterface[] = [];

  constructor (
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<ArticuloFormComponent>,
    private _snackBar: MatSnackBar,
    private _articuloService: ArticulosService,
    private _tiendaService: TiendaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.titulo = data.titulo;
    this.accion = data.accion;
    this.articulo = data.articulo;
  }

  ngOnInit(): void {
    this.articuloForm = this.initForm();
    this.getTiendas();
  }

  initForm() {
    return this._formBuilder.group({
      articulo: [this.articulo?.articulo ? this.articulo.articulo : 0],
      codigo: [this.articulo?.codigo ? this.articulo?.codigo : '', [Validators.required]],
      descripcion: [this.articulo?.descripcion ? this.articulo?.descripcion : '', [Validators.required, Validators.minLength(3)]],
      imagen: [],
      stock: [this.articulo?.stock ? this.articulo?.stock : '', [Validators.required]],
      precio: [this.articulo?.precio ? this.articulo?.precio : '', [Validators.required]],
      tienda: [this.articulo?.tienda ? this.articulo?.tienda : '', [Validators.required]]
    })
  }

  getTiendas () {
    this._tiendaService.getTiendas().subscribe((res: TiendaResponseInterface) => {
      this.tiendas = res.data;
    })
  }

  submitForm() {
    switch(this.accion) {
      case 'post':
        this.post();
        break;
      case 'put':
        this.put();
        break;
    }
  }

  post() {
    if (!this.articuloForm?.valid) {
      this._snackBar.open('Formulario invalido!', 'Cerrar', { duration: 3000 })
      return
    }

    this._articuloService.postArticulo(this.articuloForm?.value).pipe().subscribe((res: ArticuloResponse) => {
      if (res.codigoEstatus === 200) {
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
        this.close();
      } else {
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
      }
    })
  }

  put() {
    if (!this.articuloForm?.valid) {
      this._snackBar.open('Formulario invalido!', 'Cerrar', { duration: 3000 })
      return
    }

    this._articuloService.putArticulo(this.articuloForm?.value).pipe().subscribe((res: ArticuloResponse) => {
      if (res.codigoEstatus === 200) {
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
        this.close();
      } else {
        this._snackBar.open(res.notificaciones, 'Cerrar', { duration: 3000 })
      }
    })
  }

  close() {
    this.articuloForm.reset();
    this._dialogRef.close(true);
  }
}
