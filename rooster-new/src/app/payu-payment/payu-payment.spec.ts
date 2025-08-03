import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayuPayment } from './payu-payment';

describe('PayuPayment', () => {
  let component: PayuPayment;
  let fixture: ComponentFixture<PayuPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayuPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayuPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
