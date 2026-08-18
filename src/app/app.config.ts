import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideRouter,
  withInMemoryScrolling
} from '@angular/router';

import {
  provideHttpClient,
  withFetch
} from '@angular/common/http';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    ),

    provideHttpClient(
      withFetch()
    ),

    importProvidersFrom(
      NgbCollapseModule
    )

  ]

};
