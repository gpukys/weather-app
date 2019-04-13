import { Component, OnInit, Input } from '@angular/core';
import { Coordinates } from '../storage.service';
import { WeatherService, CurrentWeatherResponse } from '../weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input()
  set coordinates(value: Coordinates) {
    if (value) {
      this.coordinates$ = value;
      this.weatherService.getCurrentWeather(value.lat, value.long).subscribe(res => {
        this.currentWeather = this.parseCurrentWeather(res);
      });
    }
  }

  private coordinates$: Coordinates;

  currentWeather: WeatherData;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
  }

  private parseCurrentWeather(response: CurrentWeatherResponse): WeatherData {
    return {
      tempCelsius: response.current.temp_c,
      tempFahrenheit: response.current.temp_f,
      country: response.location.country,
      locationName: response.location.name
    };
  }

}

export interface WeatherData {
  tempCelsius: string;
  tempFahrenheit: string;
  country: string;
  locationName: string;
}
