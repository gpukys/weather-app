import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { v4 as uuid } from 'uuid';
import { City, SearchService } from '../search.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  cities: City[] = [];

  constructor(
    private storageService: StorageService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.loadCities();
    if (this.cities.length === 0) {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(e => {
          this.searchService.getCityByLocation(e.coords.latitude, e.coords.longitude).subscribe(city => {
            const res = city[0];
            res.uid = uuid();
            this.storageService.addCity(res);
            this.loadCities();
          });
        });
      }
    }
  }

  onCitySelect(city: City) {
    city.uid = uuid();
    this.storageService.addCity(city);
    this.loadCities();
  }

  loadCities() {
    this.cities = this.storageService.getCities();
  }

  deleteCity(uid: string) {
    this.storageService.deleteCity(uid);
    this.loadCities();
  }
}
