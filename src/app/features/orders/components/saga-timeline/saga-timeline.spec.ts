import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SagaTimeline } from './saga-timeline';

describe('SagaTimeline', () => {
  let component: SagaTimeline;
  let fixture: ComponentFixture<SagaTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SagaTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(SagaTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
