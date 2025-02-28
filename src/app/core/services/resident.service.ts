import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { ResidentStatusUpdate, ResidentTypeUpdate, ResidentUnitsResponse, ResidentsResponse } from '../models/resident.model';

@Injectable({
    providedIn: 'root'
})
export class ResidentService {

    private configService = inject(ConfigService);

    constructor(private http: HttpClient) { }

    getResidents(page: number, size: number): Observable<ResidentsResponse> {
        return this.http.get<ResidentsResponse>(`${this.configService.getApiUrl()}/web/residentes?page=${page}&size=${size}`);
    }

    getResidentUnits(idResidente: number, page: number, size: number): Observable<ResidentUnitsResponse> {
        return this.http.get<ResidentUnitsResponse>(`${this.configService.getApiUrl()}/web/residente/${idResidente}/unidad?page=${page}&size=${size}`);
    }

    updateResidentState(id: number, stateUpdate: ResidentStatusUpdate): Observable<any> {
        return this.http.put<any>(`${this.configService.getApiUrl()}/web/residente/${id}/estado`, stateUpdate);
    }

    updateResidentType(id: number, typeUpdate: ResidentTypeUpdate): Observable<any> {
        return this.http.put<any>(`${this.configService.getApiUrl()}/web/residente/${id}/tipo`, typeUpdate);
    }
    
}
