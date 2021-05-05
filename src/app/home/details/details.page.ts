import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { MapPage } from '../map/map.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public value;

  constructor(private modalController: ModalController, private navCtrl: NavController) {

  }
  ngOnInit() {
  }

  async showMap(branch) {
    console.log("showMap");
    const modal = await this.modalController.create({
      component: MapPage,
      componentProps: { branch }

    });
    return await modal.present();
  }

  goBack() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
