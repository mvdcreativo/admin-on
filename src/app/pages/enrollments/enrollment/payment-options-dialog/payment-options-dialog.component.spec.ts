import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionsDialogComponent } from './payment-options-dialog.component';

describe('PaymentOptionsDialogComponent', () => {
  let component: PaymentOptionsDialogComponent;
  let fixture: ComponentFixture<PaymentOptionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOptionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
