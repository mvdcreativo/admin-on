import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentComponent } from './payment/payment.component';
import { DataPersonPaymentComponent } from './components/data-person-payment/data-person-payment.component';
import { DialogCuposComponent } from './components/dialog-cupos/dialog-cupos.component';


@NgModule({
  declarations: [
    PaymentsComponent, 
    PaymentComponent, 
    DataPersonPaymentComponent,
    DialogCuposComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule
  ]
})
export class PaymentsModule { }
