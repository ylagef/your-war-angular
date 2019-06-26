import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profileTab',
  templateUrl: 'profileTab.page.html',
  styleUrls: ['profileTab.page.scss']
})
export class profileTabPage {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = this.afAuth.user;
    this.user.subscribe(u => console.warn(u));
  }

  loginGoogle() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();

      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          console.log(res);
          console.log(this.afAuth.user);
        }, err => {
          console.log(err);
          reject(err);
        })
    });
  }

  loginEmail() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.EmailAuthProvider();

      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
          console.log(res);
          console.log(this.afAuth.user);
        }, err => {
          console.log(err);
          reject(err);
        })
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(res => console.log(res));
  }
}