import { TiendaInterface } from "./tienda";

export interface TiendaResponseInterface {
  codigoEstatus: number;
  estatus: string;
  notificaciones: string;
  data: TiendaInterface[]
}
