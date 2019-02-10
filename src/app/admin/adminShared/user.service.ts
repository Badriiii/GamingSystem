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
    loggedInUser: string;
    authUser: any;
    
    constructor( private router: Router ) {
        var config = {
            apiKey: "AIzaSyAL0fo8cXm2uNN6Ia5ia_A-PVBNhQmhfpE",
            authDomain: "gamingsystem-2833b.firebaseapp.com",
            databaseURL: "https://gamingsystem-2833b.firebaseio.com",
            projectId: "gamingsystem-2833b",
            storageBucket: "gamingsystem-2833b.appspot.com",
            messagingSenderId: "701957518491"
          };
          firebase.initializeApp(config);
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

    register(email: string, password: string){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                alert(error.message + `Please Try Again!`);
        });
    }

    verifyUser() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                let authUser = firebase.auth().currentUser;
                this.loggedInUser = authUser.email;
                this.userLoggedIn = true;
                alert(`Welcome ` + authUser.email);
                authUser = null;
                this.router.navigate(['/admin']);
             }
        });
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error) {
                alert(error.message + `Unable to login. Try again!`);
        });
    }

    logout(){
        this.userLoggedIn = false;
        firebase.auth().signOut().then(() => {
            alert(`Logged Out!`);

        }, function(error) {
            alert(error.message + `Unable to logout. Try again!`);
        });
    }
}