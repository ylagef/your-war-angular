import { WarService } from './../services/war.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-warsTab',
  templateUrl: 'warsTab.page.html',
  styleUrls: ['warsTab.page.scss']
})
export class warsTabPage {
  public myWarsIds: any[];
  public myWarsHistory: any[];

  public userRef: string;

  constructor(public afAuth: AngularFireAuth, private userService: UserService,
    private warService: WarService) {
    this.myWarsIds = [];
    this.myWarsHistory = [];

    this.afAuth.user.subscribe(t => {
      this.userRef = "users/" + t["uid"];

      this.userService.getSubscribedWars(t["uid"]).subscribe(d => {
        if (d.payload.get('subscribedWars') != undefined) {
          this.myWarsIds = d.payload.get('subscribedWars');
          this.myWarsIds.forEach(war => {
            this.warService.getWar(war).subscribe(w => {
              w.payload.get("history").forEach(h => {
                if (h.date < new Date().getTime()) {
                  h.date = new Date(h.date).toUTCString();
                  this.myWarsHistory.push(h);
                }
              });

            })
          });
        }
      });
    },
      e => console.error(e)
    );
  }
}
