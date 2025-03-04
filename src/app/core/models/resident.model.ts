export interface Resident {
  idResidenteUnidad: number;
  nombre: string;
  email: string;
  telefono: string;
  tipo: string;
  estado: string;
  fechaRegistro: string;
}

export interface Pagination {
  size: number;
  page: number;
  nextPage: number;
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

export interface ResidentUnit {
  id: number;
  interior: string;
  conjunto: string;
  estado: string;
}

export interface ResidentUnitsResponse {
  unidades: ResidentUnit[];
  pages: Pagination;
}
