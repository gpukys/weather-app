import { Component, OnInit, Input, AfterContentInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { WeatherService, CurrentResponse, ForecastResponse } from '../weather.service';
import { debounceTime, switchMap, startWith, tap, finalize } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { SearchService, City } from '../search.service';
import { Observable, forkJoin } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, AfterContentInit {

  @Input()
  set city(value: City) {
    if (value) {
      this.cityData = value;
      const obs1 = this.weatherService.getCurrentWeather(value.lat, value.long);
      const obs2 = this.weatherService.getWeatherForecast(value.lat, value.long);
      forkJoin(obs1, obs2).subscribe(res => {
        const current = res[0];
        const forecast = res[1];
        this.currentWeather = this.parseCurrentWeather(current);
        this.forecast = this.parseForecast(forecast);
      });
    }
  }

  @Output() selectedCity = new EventEmitter();
  @Output() deletedCity = new EventEmitter();

  cityData: City;

  input = false;

  searchForm;
  cities: Observable<{}>;

  currentWeather: WeatherData;
  forecast: ForecastData[];

  selected = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target) && this.currentWeather) {
      this.selected = !this.selected;
    } else {
      this.selected = false;
    }
  }

  constructor(
    private weatherService: WeatherService,
    private searchService: SearchService,
    private fb: FormBuilder,
    private eRef: ElementRef
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: ''
    });
  }

  ngAfterContentInit() {
    this.cities = this.searchForm.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((val: any) => {
        if (val.query && val.query.country) {
          this.selectedCity.emit(val.query);
          return this.cities;
        } else if (val) {
          return this.searchService.getCities(val.query);
        }
      }),
    );
  }

  private parseCurrentWeather(response: CurrentResponse): WeatherData {
    const parse = response.condition.icon.split('/');

    return {
      tempC: Math.round(response.temp_c),
      tempF: Math.round(response.temp_f),
      iconPath: Array(parse[parse.length - 2], parse[parse.length - 1]).join('/'),
      isDay: !!response.is_day
    };
  }

  private parseForecast(response: ForecastResponse[]): ForecastData[] {
    const res: ForecastData[] = [];
    response.forEach((forecast, index) => {
      if (index !== 0) {
        const parse = forecast.day.condition.icon.split('/');
        res.push({
          date: moment(forecast.date).format('MM-DD'),
          maxTempC: Math.round(forecast.day.maxtemp_c),
          maxTempF: Math.round(forecast.day.maxtemp_f),
          minTempC: Math.round(forecast.day.mintemp_c),
          minTempF: Math.round(forecast.day.mintemp_f),
          iconPath: Array(parse[parse.length - 2], parse[parse.length - 1]).join('/')
        });
      }
    });
    return res;
  }

  toggleInput() {
    this.input = !this.input;
  }

  displayFn(city?: City): string | undefined {
    return city ? city.formatted : undefined;
  }

  displayForecast() {
    console.log('forecast');
  }

  deleteCity() {
    this.deletedCity.emit(this.cityData.uid);
  }

}

export interface WeatherData {
  tempC: number;
  tempF: number;
  iconPath: string;
  isDay: boolean;
}

export interface ForecastData {
  date: string;
  maxTempC: number;
  maxTempF: number;
  minTempC: number;
  minTempF: number;
  iconPath: string;
}
