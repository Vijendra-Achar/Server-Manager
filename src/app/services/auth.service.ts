import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SnackBarDailogBoxService } from './snack-bar-dailog-box.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: firebase.default.auth.UserCredential;

  $currentUser: firebase.default.User;

  authErrors = new BehaviorSubject<string>('');

  $authErrors = this.authErrors.asObservable();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar,
    private snackDialog: SnackBarDailogBoxService
  ) {}

  getUserState() {
    return this.angularFireAuth.authState;
  }

  signUpNewUser(name, email, password) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        this.user = userCred;
        this.$currentUser = userCred.user;
        userCred.user.updateProfile({
          displayName: name,
        });

        this.saveUsertoDatabase(userCred, name, email).then(() => {
          this.snackDialog.showSnackBar(
            `Your account was successfully created! Welcome ${name}`,
            'Dismiss',
            5000
          );
        });
      })
      .catch((error) => {
        this.authErrors.next(error);
      });
  }

  saveUsertoDatabase(
    userCred: firebase.default.auth.UserCredential,
    name: string,
    email: string
  ) {
    return this.angularFirestore.doc(`users/${userCred.user.uid}`).set({
      name,
      email,
      uid: userCred.user.uid,
    });
  }

  login(email, password) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        this.$currentUser = userCred.user;
        this.snackDialog.showSnackBar(
          `Login Successful! Welcome back ${this.$currentUser.displayName}`,
          'Dismiss',
          5000
        );
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.authErrors.next(error);
      });
  }

  logout() {
    return this.angularFireAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
