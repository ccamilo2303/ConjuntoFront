import { Pagination } from "./pagination.model";
import { Unit } from "./unit.model";

export interface Resident {
  idResidenteUnidad: number;
  nombre: string;
  email: string;
  telefono: string;
  tipo: string;
  estado: string;
  fechaRegistro: string;
}

export interface ResidentsResponse {
  residentes: Resident[];
  pages: Pagination;
}

export interface ResidentStatusUpdate {
  idEstado: number;
}

export interface ResidentTypeUpdate {
  idTipo: number;
}

export interface ResidentUnitsResponse {
  unidades: Unit[];
  pages: Pagination;
}
