import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPersonPaymentComponent } from './data-person-payment.component';

describe('DataPersonPaymentComponent', () => {
  let component: DataPersonPaymentComponent;
  let fixture: ComponentFixture<DataPersonPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPersonPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPersonPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
