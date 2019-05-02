import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private oktaAuth: OktaAuthService
  ) { }

  public getToken(): string {
    if (JSON.parse(localStorage.getItem('okta-token-storage')) && JSON.parse(localStorage.getItem('okta-token-storage')).accessToken) {
      return JSON.parse(localStorage.getItem('okta-token-storage')).accessToken.accessToken;
    } else {
      return null;
    }
  }
  public isAuthenticated() {
    return this.oktaAuth.isAuthenticated();
  }
}
