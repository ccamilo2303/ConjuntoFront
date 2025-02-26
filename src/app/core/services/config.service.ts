import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private configApp = {
        apiUrl: 'https://21eb4a60-3292-4dff-bd5a-dcbd83ab80c1.mock.pstmn.io',
    };

    getApiUrl(): string {
        return this.configApp.apiUrl;
    }
    
}