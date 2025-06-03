import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'; // 👈

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(NgbCollapseModule) // 👈 Ajouter ici pour rendre NgbCollapseModule accessible globalement
  ]
};
