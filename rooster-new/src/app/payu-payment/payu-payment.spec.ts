import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayuPaymentComponent } from './payu-payment';

describe('PayuPaymentComponent', () => {
  let component: PayuPaymentComponent;
  let fixture: ComponentFixture<PayuPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayuPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayuPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
