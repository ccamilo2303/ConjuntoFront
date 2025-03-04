import { Concept } from "./concept.model"
import { Unit } from "./unit.model"

export interface Billing {
    id: number,
    estado: string,
    fechaInicio: string,
    fechaFin: string,
    total: number,
    conceptos: Concept[],
    fechaRegistro: string,
    unidad: Unit
}