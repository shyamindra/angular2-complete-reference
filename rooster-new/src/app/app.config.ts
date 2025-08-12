import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';
import { RoostService } from './services/roost.service';
import { SideNav } from './shared/side-nav';
import { Widget } from './shared/widget';
import { Roost } from './shared/roost';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    UserService,
    SessionService,
    RoostService,
    SideNav,
    Widget,
    Roost
  ]
};