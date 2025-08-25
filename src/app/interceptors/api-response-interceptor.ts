import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request interceptat:', request.url);

    return next.handle(request).pipe(
      map(event => {
        // Verificăm dacă event-ul este un răspuns HTTP și are un body
        if (event instanceof HttpResponse && event.body) {
          // Verificăm dacă body-ul este un obiect (și nu un array sau alt tip)
          // pentru a evita modificarea răspunsurilor care returnează liste.
          if (typeof event.body === 'object' && !Array.isArray(event.body)) {
            console.log('Răspuns interceptat. Adăugare timestamp...');
            // Clonăm body-ul și adăugăm noua proprietate
            const modifiedBody = { ...event.body, responseTimestamp: new Date().toISOString() };
            // Clonăm event-ul de răspuns cu noul body
            return event.clone({ body: modifiedBody });
          }
        }
        // Pentru orice alt tip de event, îl lăsăm nemodificat
        return event;
      })
    );
  }
}
