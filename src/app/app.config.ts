import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { ApiResponseInterceptor } from './interceptors/api-response-interceptor';
import { WINDOW } from './tokens/window.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule),

    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiResponseInterceptor,
      multi: true,
    },

    // Adaugă acest provider pentru a oferi acces la obiectul `window`
    {
      provide: WINDOW,
      useFactory: () => {
        // Această verificare asigură că `window` este disponibil (codul rulează în browser)
        // și previne erorile în medii non-browser (ex: Server-Side Rendering).
        // În teste, acest provider va fi suprascris cu o versiune "mock".
        return typeof window !== 'undefined' ? window : {};
      },
    },
  ],
};