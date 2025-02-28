import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { RequestsResponse, UpdateStateRequest } from '../models/request.model';

@Injectable({
    providedIn: 'root'
})
export class ManagementService {

    private configService = inject(ConfigService);

    constructor(private http: HttpClient) { }

    getRequests(page: number, size: number): Observable<RequestsResponse> {
        return this.http.get<RequestsResponse>(`${this.configService.getApiUrl()}/web/solicitudes?page=${page}&size=${size}`);
    }   

    updateStateRequest(id: string, updateStateRequest: UpdateStateRequest): Observable<any> {
        return this.http.put<any>(`${this.configService.getApiUrl()}/web/solicitud/${id}/estado`, updateStateRequest);
    }

}
