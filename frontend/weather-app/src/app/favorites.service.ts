import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from './search.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoritesUrl = 'api/favorite';

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService
  ) {}

  getAllFavorites() {
    return this.httpClient.get<City[]>(this.favoritesUrl, {headers: {
        Authorization: 'Bearer ' + this.auth.getToken()
    }});
  }

  addFavorite(city: City) {
    return this.httpClient.post(this.favoritesUrl, city, {headers: {
      Authorization: 'Bearer ' + this.auth.getToken()
    }});
  }

  deleteFavorite(uid: string) {
    return this.httpClient.delete(`${this.favoritesUrl}/${uid}`, {headers: {
      Authorization: 'Bearer ' + this.auth.getToken()
    }});
  }


}
