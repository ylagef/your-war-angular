import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateWarPage } from '../create-war/create-war.page';

@Component({
  selector: 'app-manageTab',
  templateUrl: 'manageTab.page.html',
  styleUrls: ['manageTab.page.scss']
})
export class manageTabPage {

  constructor(private modalController: ModalController) { }

  async createWar() {
    console.log("create...");

    const modal = await this.modalController.create({
      component: CreateWarPage
    });
    
    return await modal.present();
  }

}
