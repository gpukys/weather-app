import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';
const WEATHER_API_KEY = '512a63f4a8a3442581f192755191004';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  currentWeatherUrl = 'http://api.apixu.com/v1/current.json';
  forecastUrl = 'http://api.apixu.com/v1/forecast.json';

  constructor(
    private httpClient: HttpClient
  ) {}

  getCurrentWeather(lat: number, long: number) {
    return this.httpClient.get(this.currentWeatherUrl, {
      params: {
        key: WEATHER_API_KEY,
        q: [lat, long].join(',')
      }
    }).pipe<CurrentResponse>(
      pluck('current')
    );
  }

  getWeatherForecast(lat: number, long: number) {
    return this.httpClient.get(this.forecastUrl, {
      params: {
        key: WEATHER_API_KEY,
        q: [lat, long].join(','),
        days: '7'
      }
    }).pipe<ForecastResponse[]>(
      pluck('forecast', 'forecastday')
    );
  }

}

export interface CurrentResponse {
  temp_c: number;
  temp_f: number;
  condition: {icon: string};
  is_day: number;
}

export interface ForecastResponse {
  date: string;
  day: ForecastDay;
}

export interface ForecastDay {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  condition: {icon: string};
}
