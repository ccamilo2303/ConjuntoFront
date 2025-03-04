import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { UnitsResponse, UnitResidentsResponse, UnitConceptsResponse, UnitBillingsResponse } from '../models/unit.model';

@Injectable({
    providedIn: 'root'
})
export class UnitService {

    private configService = inject(ConfigService);

    constructor(private http: HttpClient) { }

    getUnits(page: number, size: number): Observable<UnitsResponse> {
        return this.http.get<UnitsResponse>(`${this.configService.getApiUrl()}/web/unidades?page=${page}&size=${size}`);
    }

    getUnitResidents(idUnidad: number, page: number, size: number): Observable<UnitResidentsResponse> {
        return this.http.get<UnitResidentsResponse>(`${this.configService.getApiUrl()}/web/unidad/${idUnidad}/residentes?page=${page}&size=${size}`);
    }

    getUnitConcepts(idUnidad: number, page: number, size: number): Observable<UnitConceptsResponse> {
        return this.http.get<UnitConceptsResponse>(`${this.configService.getApiUrl()}/web/unidad/${idUnidad}/conceptos?page=${page}&size=${size}`);
    }

    getUnitBillings(idUnidad: number, page: number, size: number): Observable<UnitBillingsResponse> {
        return this.http.get<UnitBillingsResponse>(`${this.configService.getApiUrl()}/web/unidad/${idUnidad}/cuentas-cobro?page=${page}&size=${size}`);
    }

    associateUnitConcept(idUnidad: number, idConcepto: number): Observable<any> {
        return this.http.put<any>(`${this.configService.getApiUrl()}/web/unidad/${idUnidad}/concepto/${idConcepto}`, {});
    }

    associateUnitResident(idUnidad: number, idResidente: number): Observable<any> {
        return this.http.put<any>(`${this.configService.getApiUrl()}/web/unidad/${idUnidad}/residente/${idResidente}`, {});
    }

    deleteUnitResident(idResidenteUnidad: number): Observable<any> {
        return this.http.delete<any>(`${this.configService.getApiUrl()}/web/unidad/${idResidenteUnidad}`);
    }
    
}
