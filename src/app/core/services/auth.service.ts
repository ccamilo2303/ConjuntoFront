import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { from, Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private auth = inject(Auth);

    login(email: string, password: string): Observable<User | null> {
        return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
            map(userCredential => userCredential.user)
        );
    }

    logout(): Promise<boolean> {
        return signOut(this.auth).then(() => {
            return true;
        }).catch((error) => {
            return false;
        });
    }

    getAuthState(): Observable<User | null> {
        return new Observable((observer) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                observer.next(user);
            }, (error) => {
                observer.error(error);
            }, () => {
                observer.complete();
            });

            return { unsubscribe };
        });
    }

    async getToken(): Promise<string | null> {
        const user = this.auth.currentUser;
        if (user) {
            return await user.getIdToken();
        }
        return null;
    }

}
