import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { WarService } from './../../services/war.service';
import { War } from './../../models/war.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from 'firebase';

@Component({
  selector: 'app-create-war',
  templateUrl: './create-war.page.html',
  styleUrls: ['./create-war.page.scss'],
})
export class CreateWarPage implements OnInit {

  warriorsUsernames: {};
  war: War;
  warriorsAdded: string[];

  constructor(private modalController: ModalController, private alertController: AlertController,
    private firestore: AngularFirestore, public toastController: ToastController, private warService: WarService,
    private afAuth: AngularFireAuth, private router: Router) {

  }

  ngOnInit() {
    this.warriorsAdded = [];
    this.war = {
      name: null,
      intervals: null,
      owner: null,
      date: Date.now(),
      warriors: [],
      history: []
    };

    this.afAuth.user.subscribe(t => {
      this.war.owner = "users/" + t["uid"];
    },
      e => console.error(e)
    );

    this.warriorsUsernames = {};

    this.firestore.collection('users').snapshotChanges().subscribe(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        this.warriorsUsernames[data["username"]] = id;
      });
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async addWarriorByUsername() {
    const alert = await this.alertController.create({
      header: "Add new warrior",
      inputs: [
        {
          name: 'warriorUsername',
          type: 'text',
          placeholder: 'Warrior username'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelled');
          }
        }, {
          text: 'Add',
          handler: (data) => {
            if (this.warriorsUsernames[data.warriorUsername] != null) {
              if (this.warriorsAdded.indexOf(data.warriorUsername) != -1) {
                this.errorToast("User already added");
                console.error("User already added");
              } else {
                this.warriorsAdded.push(data.warriorUsername);
              }
            } else {
              this.errorToast("User not in database");
              console.error("User not in database");
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async addCustomWarrior() {
    const alert = await this.alertController.create({
      header: "Add new warrior",
      inputs: [
        {
          name: 'warriorName',
          type: 'text',
          placeholder: 'Warrior name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelled');
          }
        }, {
          text: 'Add',
          handler: (data) => {
            this.warriorsAdded.push(data.warriorName);
          }
        }
      ]
    });

    await alert.present();
  }

  async errorToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

  deleteWarrior(username: string) {
    this.warriorsAdded.splice(this.warriorsAdded.indexOf(username));
  }

  createWar() {
    this.warriorsAdded.forEach(name => {
      const warriorId = this.warriorsUsernames[name];
      let warrior: {} = {};

      if (warriorId != null) {
        warrior["accepted"] = false;
        warrior["userRef"] = "users/" + warriorId;
      }

      warrior["user"] = name;


      this.war.warriors.push(warrior);
    });

    this.warService.addWar(this.war);
    this.router.navigate(["/tabs/manageTab"]);

  }

}
