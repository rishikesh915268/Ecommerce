import { TestBed } from '@angular/core/testing';

import { FavItemsService } from './fav-items.service';

describe('FavItemsService', () => {
  let service: FavItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
