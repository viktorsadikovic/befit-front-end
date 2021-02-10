import { TestBed } from '@angular/core/testing';

import { MealsGuard } from './meals.guard';

describe('MealsGuard', () => {
  let guard: MealsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MealsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
