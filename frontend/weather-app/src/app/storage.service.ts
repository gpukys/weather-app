import { Injectable } from '@angular/core';
import { City } from './search.service';
const COORDINATES = 'coordinates';
const CITIES = 'cities';

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }

  addCity(city: City) {
    const cityList = this.getCities();
    if (!cityList) {
      this.setCities(Array(city));
    } else {
      cityList.push(city);
      this.setCities(cityList);
    }
  }

  setCities(cities: City[]) {
    localStorage.setItem(CITIES, JSON.stringify(cities));
  }

  getCities(): City[] {
    return JSON.parse(localStorage.getItem(CITIES));
  }

  deleteCity(uid: string) {
    const cityList = this.getCities();
    cityList.splice(cityList.findIndex(city => {
      return city.uid === uid;
    }), 1);
    this.setCities(cityList);
  }

}

export interface Coordinates {
  lat: number;
  long: number;
}
