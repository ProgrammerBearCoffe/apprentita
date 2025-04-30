import { Injectable } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class AuthService{

    user: Observable < User| null>;

    constructor(private firebaseAuth: Auth){

        this.setSessionStoragePersistence();
        this.user = user(this.firebaseAuth);
    }

    private setSessionStoragePersistence(): void {

        setPersistence(this.firebaseAuth, browserLocalPersistence)
    }

    login(usuario: any): Observable<void> {

        const promise = signInWithEmailAndPassword(

            this.firebaseAuth,
            usuario.email,
            usuario.password
        )
        .then(() => {
        
        })

        return from(promise);
    }

    logout(): Observable<void> {
        
        const promise = signOut(this.firebaseAuth).then(() => {
          
            sessionStorage.clear();
        });
        return from(promise);
      }

}