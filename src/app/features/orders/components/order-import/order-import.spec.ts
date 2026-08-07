import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderImport } from './order-import';

describe('OrderImport', () => {
  let component: OrderImport;
  let fixture: ComponentFixture<OrderImport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderImport],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderImport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
