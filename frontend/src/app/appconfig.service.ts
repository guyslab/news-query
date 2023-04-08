import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;
  private http : HttpClient;
  
  constructor(http: HttpClient) {
	this.http = http;
  }

  loadAppConfig(): Promise<void> {
    const request$ = this.http.get('/assets/config/appsettings.json');
    return lastValueFrom(request$)
      .then(config => {
        this.appConfig = config;
      });
  }

  get apiBaseUrl() : string {
    return this.appConfig.apiBaseUrl;
  }
}