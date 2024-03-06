import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ArticuloResponse } from '../interfaces/articulo-response';
import { ArticuloInterface } from '../interfaces/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(
    private _http: HttpClient
  ) { }

  getArticulosListado() {
    console.log(`${environment.api_url}Articulo/all`)
    return this._http.get<ArticuloResponse>(`${environment.api_url}Articulo/all`)
  }

  getArticulos(tienda: number) {
    return this._http.get<ArticuloResponse>(`${environment.api_url}Articulo?tienda=${tienda}`)
  }

  getArticulo(articulo: number) {
    return this._http.get<ArticuloResponse>(`${environment.api_url}Articulo/${articulo}`)
  }

  postArticulo(articulo: ArticuloInterface) {
    articulo.imagen = "null";
    return this._http.post<ArticuloResponse>(`${environment.api_url}Articulo`, articulo);
  }

  putArticulo(articulo: ArticuloInterface) {
    articulo.imagen = "null";
    return this._http.put<ArticuloResponse>(`${environment.api_url}Articulo`, articulo);
  }

  deleteArticulo(articulo: number) {
    return this._http.delete<ArticuloResponse>(`${environment.api_url}Articulo?id=${articulo}`)
  }
}
