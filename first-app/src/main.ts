import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';
// this is optional
import { provideProtractorTestingSupport } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
    providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
  }).catch((err) => console.error(err));