import { TestBed } from '@angular/core/testing';

import { GameShareDataService } from './game-share-data.service';

describe('GameShareDataService', () => {
  let service: GameShareDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameShareDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
