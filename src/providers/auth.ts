import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
// import firebase from 'firebase/app';
import { AngularFireDatabase } from "angularfire2/database";


@Injectable()

export class AuthProvider {


    
    constructor(
        public afAuth: AngularFireAuth,
        public afDB: AngularFireDatabase) {}

loginUser(newEmail: string, newPassword: string): Promise<any>{
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword)
}

signupUser(firstName: string, lastName: string, Email: string, Password: string): Promise<any>{
    return this.afAuth.auth.createUserWithEmailAndPassword(Email, Password).then(user => {
        this.afDB.object(`/users/${user.uid}`).set({firstName: firstName, lastName: lastName, Email: Email, Password: Password})
    });
  }

  logoutUser(): Promise<any> {

    return this.afAuth.auth.signOut();
  }

}

