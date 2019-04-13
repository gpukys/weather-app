import { Injectable } from '@angular/core';
const COORDINATES = 'coordinates';

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }

  getCoordinates(): Coordinates | null {
    const coordinates = localStorage.getItem(COORDINATES);
    if (coordinates) {
      const splitValues = coordinates.split(',');
      return {lat: parseFloat(splitValues[0]), long: parseFloat(splitValues[1])};
    }
    return null;
  }

  setCoordinates(lat: number, long: number) {
    localStorage.setItem(COORDINATES, [lat, long].join(','));
  }

}

export interface Coordinates {
  lat: number;
  long: number;
}
