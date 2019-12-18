import { TestBed } from '@angular/core/testing';

import { AppintializorService } from './appintializor.service';

describe('AppintializorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppintializorService = TestBed.get(AppintializorService);
    expect(service).toBeTruthy();
  });
});
