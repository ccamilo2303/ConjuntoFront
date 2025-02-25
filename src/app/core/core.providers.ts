import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB-p0p2oJdZHsBlJuG_WzuwEno6ZgkDmVs",
    authDomain: "conjunto-back.firebaseapp.com",
    projectId: "conjunto-back",
    storageBucket: "conjunto-back.firebasestorage.app",
    messagingSenderId: "1062208718850",
    appId: "1:1062208718850:web:74feb81315386ad0cfbf1b",
    measurementId: "G-FHX4C5L58X"
};

export const coreProviders = [
  provideHttpClient(withInterceptors([AuthInterceptor, ErrorInterceptor])),
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideAuth(() => getAuth())
];