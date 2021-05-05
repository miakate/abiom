import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { icon, Marker } from 'leaflet';
import { ModalController } from '@ionic/angular';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {

  map: Leaflet.Map;
  public branch;
  constructor(private modalController: ModalController) { }

  ngOnInit(): void {

  }

  ionViewDidEnter() {
    this.map = new Leaflet.Map('mapId').setView([42.35663, -71.1109], 16);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);

    this.leafletMap();
  }

  leafletMap() {
    if (this.branch.length > 1) {
      for (const property of this.branch) {
        Leaflet.marker([property.lat, property.long]).addTo(this.map)
          .bindPopup(property.city)
          .openPopup();
      }
    } else {
      Leaflet.marker([this.branch.lat, this.branch.long]).addTo(this.map)
        .bindPopup(this.branch.city)
        .openPopup();
    }

  }

  ionViewWillLeave() {
    this.map.remove();
  }

  goBack() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  // /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }
}