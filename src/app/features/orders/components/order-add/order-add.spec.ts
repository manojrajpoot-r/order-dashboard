import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdd } from './order-add';

describe('OrderAdd', () => {
  let component: OrderAdd;
  let fixture: ComponentFixture<OrderAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
