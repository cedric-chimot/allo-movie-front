import { TestBed } from '@angular/core/testing';

import { SignalementsService } from './signalements.service';

describe('SignalementsService', () => {
  let service: SignalementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
