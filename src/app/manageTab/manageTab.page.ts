import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { WarService } from './../services/war.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateWarPage } from './create-war/create-war.page';
import { DetailWarPage } from './detail-war/detail-war.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageTab',
  templateUrl: 'manageTab.page.html',
  styleUrls: ['manageTab.page.scss']
})
export class manageTabPage {
  public myWarsIds: any[];
  public myWars: any[];

  public noAcceptedWars: any[];
  public userRef: string;

  constructor(private modalController: ModalController, private router: Router, private userService: UserService,
    private afAuth: AngularFireAuth, private warService: WarService, private splash: SplashScreen) {
    splash.show();
    this.myWarsIds = [];
    this.myWars = [];
    this.noAcceptedWars = [];

    this.afAuth.user.subscribe(t => {
      this.userRef = "users/" + t["uid"];

      this.userService.getSubscribedWars(t["uid"]).subscribe(d => {
        if (d.payload.get('subscribedWars') != undefined) {
          this.myWarsIds = d.payload.get('subscribedWars');
          this.myWarsIds.forEach(war => {
            this.warService.getWar(war).subscribe(w => {
              w.payload.get('warriors').forEach(warrior => {
                if (warrior["user"] == this.userRef && warrior["accepted"] == false) {
                  this.noAcceptedWars.push(w.payload.get('name') + w.payload.get('date'));
                  splash.hide();
                }
              });
              this.myWars.push(w);
            })
          });
        }
      });
    },
      e => console.error(e)
    );
  }

  createWar() {
    this.router.navigate(["create-war"]);
  }

  async detailWar(war: any) {
    const modal = await this.modalController.create({
      component: DetailWarPage,
      componentProps: {
        war: war
      }
    });

    return await modal.present();
  }


}
