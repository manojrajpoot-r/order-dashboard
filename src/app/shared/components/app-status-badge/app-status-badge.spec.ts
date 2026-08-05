import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStatusBadge } from './app-status-badge';

describe('AppStatusBadge', () => {
  let component: AppStatusBadge;
  let fixture: ComponentFixture<AppStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStatusBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(AppStatusBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
