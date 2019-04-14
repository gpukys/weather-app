import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { prepareSyntheticPropertyName } from '@angular/compiler/src/render3/util';
const API_KEY = '1d65b907c66e4d0db99131b327e4b002';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchUrl = 'https://api.opencagedata.com/geocode/v1/json';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCities(query: string): Observable<City> {
    return this.httpClient.get(this.searchUrl, {
      params: {
        key: API_KEY,
        q: query
      }
    }).pipe(
      pluck('results'),
      map(res => {
        return (res as any).map(city => this.parseCity(city));
      }),
    );
  }

  parseCity(res): City | null {
    if (res.components && res.geometry) {
      return {
        country: res.components.country,
        county: res.components.county || res.components.state,
        city: res.components.city || res.components.hamlet,
        lat: res.geometry.lat,
        long: res.geometry.lng,
        formatted: res.formatted
      };
    } else {
      return null;
    }
  }
}

export interface City {
  country: string;
  county: string;
  city: string;
  lat: number;
  long: number;
  formatted: string;
}