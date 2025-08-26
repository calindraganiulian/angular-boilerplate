import { TestBed } from '@angular/core/testing';
import { ApiResponseInterceptor } from './api-response-interceptor';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ApiResponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiResponseInterceptor,
      provideHttpClient(),
      provideHttpClientTesting(),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiResponseInterceptor,
        multi: true,
      },
    ]
  }));

  it('should be created', () => {
    const interceptor: ApiResponseInterceptor = TestBed.inject(ApiResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
