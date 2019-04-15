import { Component, OnInit, Input, HostBinding, AfterViewInit, AfterViewChecked, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { Coordinates } from '../storage.service';
import { WeatherService, CurrentWeatherResponse } from '../weather.service';
import { debounceTime, switchMap, startWith, tap, finalize } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { SearchService, City } from '../search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, AfterContentInit {

  @Input()
  set coordinates(value: Coordinates) {
    if (value) {
      this.coordinates$ = value;
      this.weatherService.getCurrentWeather(value.lat, value.long).subscribe(res => {
        this.currentWeather = this.parseCurrentWeather(res);
        this.gotWeather.emit(value);
      });
    }
  }

  @Output() gotWeather = new EventEmitter();

  private coordinates$: Coordinates;

  input = false;

  locationData: City;

  searchForm;
  cities: Observable<{}>;

  currentWeather: WeatherData;

  constructor(
    private weatherService: WeatherService,
    private searchService: SearchService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: null
    });
  }

  ngAfterContentInit() {
    this.cities = this.searchForm.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((val: any) => {
        if (val.query && val.query.country) {
          this.coordinates = {lat: val.query.lat, long: val.query.long};
          this.locationData = val.query;
          return this.cities;
        } else {
          return this.searchService.getCities(val.query);
        }
      }),
    );
  }

  private parseCurrentWeather(response: CurrentWeatherResponse): WeatherData {
    return {
      tempCelsius: response.current.temp_c,
      tempFahrenheit: response.current.temp_f,
      country: response.location.country,
      locationName: response.location.name
    };
  }

  toggleInput() {
    this.input = !this.input;
  }

  displayFn(city?: City): string | undefined {
    return city ? city.formatted : undefined;
  }

}

export interface WeatherData {
  tempCelsius: string;
  tempFahrenheit: string;
  country: string;
  locationName: string;
}
