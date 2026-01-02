import { TestBed } from '@angular/core/testing';

import { IngredientsSearch } from './ingredients-search';

describe('IngredientsSearch', () => {
  let service: IngredientsSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
