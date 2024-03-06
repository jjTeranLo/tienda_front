import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteInterface } from '../interfaces/clienteinterface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly api_url: string = 'https://jsonplaceholder.typicode.com/users';
  private readonly data: ClienteInterface [] = [
    { id: 1, nombre: 'Juan', apellidos: 'Teran', direccion: 'Ficus 110'}
  ]
  constructor(
    private _http: HttpClient
  ) { }

  get() {
    return of(this.data);
  }
}
