import { TestBed, inject } from '@angular/core/testing';

import { CustomHttpClientService } from './custom-http-client.service';

describe('CustomHttpClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomHttpClientService]
    });
  });

  it('should be created', inject([CustomHttpClientService], (service: CustomHttpClientService) => {
    expect(service).toBeTruthy();
  }));
});
