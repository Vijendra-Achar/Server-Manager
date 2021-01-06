import { TestBed } from '@angular/core/testing';

import { SnackBarDailogBoxService } from './snack-bar-dailog-box.service';

describe('SnackBarDailogBoxService', () => {
  let service: SnackBarDailogBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarDailogBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
