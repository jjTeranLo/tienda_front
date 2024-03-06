import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TiendaInterface } from '../interfaces/tienda';
import { TiendaResponseInterface } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(
    private _http: HttpClient
  ) { }

  getTiendas () {
    return this._http.get<TiendaResponseInterface>(`${environment.api_url}Tienda`);
  }

  getTienda (tienda: number) {
    return this._http.get(`${environment.api_url}Tienda/${tienda}`)
  }

  postTienda (tienda: TiendaInterface) {
    return this._http.post<TiendaResponseInterface>(`${environment.api_url}Tienda`, tienda);
  }

  putTienda (tienda: TiendaInterface) {
    return this._http.put<TiendaResponseInterface>(`${environment.api_url}Tienda`, tienda)
  }

  deleteTienda (tienda: number) {
    return this._http.delete<TiendaResponseInterface>(`${environment.api_url}Tienda?id=${tienda}`)
  }
}
