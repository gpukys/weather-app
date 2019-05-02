import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { v4 as uuid } from 'uuid';
import { City, SearchService } from '../search.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  cities: City[] = [];
  favorites: City[] = [];

  constructor(
    private storageService: StorageService,
    private searchService: SearchService,
    private favoritesService: FavoritesService
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
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritesService.getAllFavorites().subscribe(res => {
      this.favorites = res;
    });
  }

  isFavorite(uid: string): boolean {
    if (this.favorites.length > 0) {
      for (const i of this.favorites) {
        if (i.uid === uid) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  deleteCity(uid: string) {
    this.storageService.deleteCity(uid);
    this.loadCities();
  }

  onFavoriteToggle(event: {favorite: boolean, city: City}) {
    if (event.favorite) {
      this.favoritesService.addFavorite(event.city).subscribe(res => {
        this.loadFavorites();
      });
    } else {
      this.favoritesService.deleteFavorite(event.city.uid).subscribe(res => {
        this.loadFavorites();
      });
    }
  }
}
