import { TestBed, inject } from '@angular/core/testing';

import { takeAwayService } from './takeaway.service';

describe('TakeawayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [takeAwayService]
    });
  });

  it('should ...', inject([takeAwayService], (service: takeAwayService) => {
    expect(service).toBeTruthy();
  }));
});
