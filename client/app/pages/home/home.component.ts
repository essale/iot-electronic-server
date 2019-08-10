import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { SupplierService } from '../../../app/services/supplier.service'

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(AgmMap)
  map: AgmMap;

  // User Selected Location (initialize to center of Israel)
  public location: Location = {
    lat: 32.314528,
    lng: 34.862023,
    marker: {
      lat: 32.314528,
      lng: 34.862023,
      draggable: true
    },
    zoom: 7,
    viewport: false
  };

  public markers: Marker[] = [];

  geocoder: any;
  mapColNumber: number = 2;
  mapRowsNumber: number = 14;

  constructor(
    public auth: AuthService,
    public mapsApiLoader: MapsAPILoader,
    private supplierService: SupplierService,
  ) {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  mapReady($event: any) {
    this.markers = []
    this.supplierService.getSuppliers().subscribe(
      suppliers => {
        suppliers.forEach(element => {
          this.findLocation(element.address, element.supplierName);
      })
      },
      error => console.log(error)
    );
  }

  findLocation(address, label = new String()) {
    console.info("placing marker on: " + address);
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;

          this.markers.push({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            draggable: false,
            label: label.toString()
          });
          this.map.triggerResize(false);
        }
      } else {
        alert("Sorry, this search produced no results.");
      }
    }
    )
  }
}
