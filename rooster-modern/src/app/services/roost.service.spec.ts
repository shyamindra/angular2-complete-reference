/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoostService } from './roost.service';

describe('RoostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoostService]
    });
  });

  it('should ...', inject([RoostService], (service: RoostService) => {
    expect(service).toBeTruthy();
  }));
});
