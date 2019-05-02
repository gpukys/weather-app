import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule, MatDividerModule, MatToolbarModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { StorageService } from './storage.service';
import { WeatherService } from './weather.service';
import { SearchService } from './search.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OktaAuthModule } from '@okta/okta-angular';
import { LoginComponent } from './login/login.component';

const config = {
  issuer: 'https://dev-875305.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oaj4a7szHbbiJhag356'
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WeatherCardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    OktaAuthModule.initAuth(config)
  ],
  providers: [
    StorageService,
    WeatherService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
    ) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
