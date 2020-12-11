import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsComponent } from './payments.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  { path: '', component: PaymentsComponent },
  { path: 'nuevo', component: PaymentComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
