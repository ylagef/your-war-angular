import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-war',
  templateUrl: './create-war.page.html',
  styleUrls: ['./create-war.page.scss'],
})
export class CreateWarPage implements OnInit {

  warriors: any[];
  warriorsUsernames: any[];

  constructor(private modalController: ModalController, private alertController: AlertController,
    private firestore: AngularFirestore, public toastController: ToastController) { }

  ngOnInit() {
    this.warriors = [];
    this.warriorsUsernames = [];

    this.firestore.collection('users').valueChanges().subscribe(w => {
      w.forEach(user => {
        this.warriorsUsernames.push(user["username"]);
      });
      console.log(this.warriorsUsernames);
    },
      e => {
        console.error(e);
      }
    );
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async addWarrior() {
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
            if (this.warriorsUsernames.indexOf(data.warriorUsername) != -1) {
              this.warriors.push(data.warriorUsername);
            } else {
              this.errorToast("User is not registered");
              console.error("User is not on database");
            }
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
    console.log(username);
    this.warriors.splice(this.warriors.indexOf(username));
  }

}
