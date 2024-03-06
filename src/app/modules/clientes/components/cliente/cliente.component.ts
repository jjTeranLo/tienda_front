import { Component, Inject } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteInterface } from '../../interfaces/clienteinterface';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
  titulo: string = '';
  action: string = '';
  cliente?: ClienteInterface;

  constructor (
    private _clienteService: ClienteService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<ClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.titulo = this.data.titulo;
    this.action = this.data.action;
    this.cliente = this.data.cliente;
  }

  ngOnInit(): void {
    console.log(this.titulo)
    console.log(this.action)
    console.log(this.cliente)
  }

  ngOnDestroy(): void {

  }

  initForm() {
    return this._formBuilder.group({
      id: ['', []],
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: []
    })
  }

}
