import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const WEATHER_API_KEY = '512a63f4a8a3442581f192755191004';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  currentWeatherUrl = 'http://api.apixu.com/v1/current.json';

  constructor(
    private httpClient: HttpClient
  ) {}

  getCurrentWeather(lat: number, long: number) {
    return this.httpClient.get<CurrentWeatherResponse>(this.currentWeatherUrl, {
      params: {
        key: WEATHER_API_KEY,
        q: [lat, long].join(',')
      }
    });
  }

}

export interface CurrentWeatherResponse {
  current: CurrentResponse;
  location: LocationResponse;
}

export interface CurrentResponse {
  temp_c: string;
  temp_f: string;
}

export interface LocationResponse {
  country: string;
  name: string;
}
