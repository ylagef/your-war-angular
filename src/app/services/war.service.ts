import { UserService } from './user.service';
import { War } from '../models/war.model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarService {

  warsCollection: AngularFirestoreCollection<War>;
  wars: Observable<War>;

  constructor(public afs: AngularFirestore, private userService: UserService) {
    this.warsCollection = this.afs.collection('wars');
  }

  addWar(war: War) {
    let lastDate: number = new Date().getTime();

    let aliveWarriors: any[] = Object.assign([], war.warriors);
    let history: any[] = [];

    const intervals: number = war.intervals;

    while (aliveWarriors.length > 1) {
      let winnerIndex;
      let loserIndex

      if (aliveWarriors.length == 2) {
        winnerIndex = 0;
        loserIndex = 1;
      } else {
        winnerIndex = Math.floor(Math.random() * (aliveWarriors.length - 1));
        loserIndex = 0;

        while (loserIndex == winnerIndex) {
          loserIndex = Math.floor(Math.random() * (aliveWarriors.length - 1))
        }
      }

      let winner = aliveWarriors[winnerIndex];
      let loser = aliveWarriors[loserIndex];

      lastDate += intervals * 60000;
      let h = {
        date: lastDate,
        winner: winner['user'],
        loser: loser['user'],
        remaining: aliveWarriors.length - 1
      }

      history.push(h);
      aliveWarriors.splice(loserIndex, 1);
    }

    war.history = history;
    console.log(war);

    this.warsCollection.add(war).then(d => {
      this.userService.addSubscribersToWar(war.warriors, d.id);
    });
  }

  getWar(id: string) {
    return this.warsCollection.doc(id).snapshotChanges();
  }
}
