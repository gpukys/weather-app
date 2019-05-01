import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoritesUrl = 'api/favorite';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllFavorites() {
    return this.httpClient.get<City[]>(this.favoritesUrl);
  }

  addFavorite(city: City) {
    return this.httpClient.post(this.favoritesUrl, city);
  }

  deleteFavorite(uid: string) {
    return this.httpClient.delete(`${this.favoritesUrl}/${uid}`);
  }


}
