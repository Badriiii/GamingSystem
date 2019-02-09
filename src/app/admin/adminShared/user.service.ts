import { Injectable } from '@angular/core';
import {  
    CanActivate, 
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;

    constructor( private router: Router ) {
        firebase.initializeApp({
            apiKey: "AIzaSyAL0fo8cXm2uNN6Ia5ia_A-PVBNhQmhfpE",
            authDomain: "gamingsystem-2833b.firebaseapp.com",
            databaseURL: "https://gamingsystem-2833b.firebaseio.com",
            projectId: "gamingsystem-2833b",
            storageBucket: "gamingsystem-2833b.appspot.com",
            messagingSenderId: "701957518491"
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
        let url: string = state.url;
        return this.verifyLogin(url);
    }   

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }
                
        this.router.navigate(['/admin/login']);
        return false;
    }
}