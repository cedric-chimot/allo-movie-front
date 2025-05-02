import { TestBed } from '@angular/core/testing';

import { ActeursService } from './acteurs.service';

describe('ActeursService', () => {
  let service: ActeursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActeursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
