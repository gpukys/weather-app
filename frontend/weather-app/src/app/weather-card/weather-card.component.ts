import { Component, OnInit, Input, HostBinding, AfterViewInit, AfterViewChecked, AfterContentInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
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
  set city(value: City) {
    if (value) {
      this.cityData = value;
      this.weatherService.getCurrentWeather(value.lat, value.long).subscribe(res => {
        this.currentWeather = this.parseCurrentWeather(res);
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

  selected = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target) && this.currentWeather) {
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

  private parseCurrentWeather(response: CurrentWeatherResponse): WeatherData {
    const parse = response.current.condition.icon.split('/');

    return {
      tempC: Math.round(response.current.temp_c),
      tempF: Math.round(response.current.temp_f),
      iconPath: Array(parse[parse.length - 2], parse[parse.length - 1]).join('/'),
      isDay: !!response.current.is_day
    };
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
