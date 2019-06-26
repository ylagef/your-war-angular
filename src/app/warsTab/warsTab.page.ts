import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-warsTab',
  templateUrl: 'warsTab.page.html',
  styleUrls: ['warsTab.page.scss']
})
export class warsTabPage {
  wars: any[];

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.firestore.collection('wars').valueChanges().subscribe(w => {
      this.wars = w;
    },
      e => {
        console.error(e);
      }
    );
  }
}
