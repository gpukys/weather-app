import { Component, OnInit } from '@angular/core';
import { StorageService, Coordinates } from '../storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  currentCoordinates: Coordinates;

  constructor(
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.currentCoordinates = this.storageService.getCoordinates();
    if (!this.currentCoordinates) {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(e => {
          this.storageService.setCoordinates(e.coords.latitude, e.coords.longitude);
          this.currentCoordinates = this.storageService.getCoordinates();
        });
      }
    }

    }
  }
