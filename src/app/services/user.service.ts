import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User>;

  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.usersCollection = this.afs.collection('users');
  }

  addUser(user: User) {
    this.usersCollection.add(user);
  }

  getUser(id: string) {
    return this.usersCollection.doc(id).get();
  }

  addSubscribersToWar(warriors: any[], warId: string) {
    warriors.forEach(warrior => {
      if (warrior['userRef'] != null) {
        let newWars: string[] = [];

        this.usersCollection.doc(warrior['userRef'].split('/')[1]).get().subscribe(d => {
          newWars = d.get('subscribedWars');

          if (newWars == undefined) {
            newWars = [];
          }

          newWars.push(warId);

          this.usersCollection.doc(warrior['userRef'].split('/')[1]).update({
            subscribedWars: newWars
          });
        });
      }
    });

    let myNewWars: string[] = [];
    this.afAuth.user.subscribe(t => {
      this.usersCollection.doc(t["uid"]).get().subscribe(d => {
        myNewWars = d.get('subscribedWars');

        if (myNewWars == undefined) {
          myNewWars = [];
        }

        myNewWars.push(warId);

        this.usersCollection.doc(t["uid"]).update({
          subscribedWars: myNewWars
        });
      });
    },
      e => console.error(e)
    );
  }

  getSubscribedWars(user: string) {
    return this.usersCollection.doc(user).snapshotChanges();
  }
}
