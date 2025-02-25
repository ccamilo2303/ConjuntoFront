import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private configApp = {
        apiUrl: 'https://api.miapp.com',
        modoProduccion: true,
        tiempoEspera: 5000
    };

    getApiUrl(): string {
        return this.configApp.apiUrl;
    }

    isProduccion(): boolean {
        return this.configApp.modoProduccion;
    }

    getTiempoEspera(): number {
        return this.configApp.tiempoEspera;
    }
}