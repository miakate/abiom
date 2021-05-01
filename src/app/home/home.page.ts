import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DetailsPage } from './details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  configUrl = 'http://localhost:3000/banks';
  banks: any;
  constructor(private http: HttpClient,
    private modalController: ModalController,
    private navCtrl: NavController) { }

  ngOnInit(): any {
    return this.http.get(this.configUrl).subscribe((data) => {
      this.banks = data;
      console.log(data);
    });
  }
  async showBank(bank) {
    // console.log(bank)
    const modal = await this.modalController.create({
      component: DetailsPage,
      componentProps: { value: bank }
    });
    return await modal.present();
  }

}
