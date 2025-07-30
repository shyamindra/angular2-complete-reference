/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComplaintService } from './complaint.service';

describe('ComplaintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplaintService]
    });
  });

  it('should ...', inject([ComplaintService], (service: ComplaintService) => {
    expect(service).toBeTruthy();
  }));
});
