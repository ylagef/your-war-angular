import { War } from './../../models/war.model';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-detail-war',
  templateUrl: './detail-war.page.html',
  styleUrls: ['./detail-war.page.scss'],
})
export class DetailWarPage {
  war: DocumentSnapshot<War>;

  constructor(private navParams: NavParams, private modalController: ModalController) {
    this.war = navParams.get("war");
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
