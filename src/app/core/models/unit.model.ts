import { Billing } from "./billing.model";
import { Concept } from "./concept.model";
import { Pagination } from "./pagination.model";
import { Resident } from "./resident.model";

export interface Unit {
  id: number;
  interior: string;
  conjunto: string;
  estado: string;
}

export interface UnitsResponse {
    unidades: Unit[],
    pages: Pagination
}

export interface UnitResidentsResponse {
    residentes: Resident[]
}

export interface UnitConceptsResponse {
    conceptos: Concept[]
}

export interface UnitBillingsResponse {
    cuentasCobro: Billing[]
}

export interface AssociateUnitConceptRequest {
    idUnidad: number;
    idConcepto: number;
}

export interface AssociateUnitResidentRequest {
    idUnidad: number;
    idResidente: number;
}

export interface DeleteUnitResidentRequest {
    idResidenteUnidad: number;
}