import { ArticuloInterface } from "./articulo";

export interface ArticuloResponse {
  codigoEstatus: number;
  estatus: string;
  notificaciones: string;
  data: ArticuloInterface[]
}
