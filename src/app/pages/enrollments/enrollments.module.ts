import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { PaymentOptionsDialogComponent } from './enrollment/payment-options-dialog/payment-options-dialog.component';



@NgModule({
  declarations: [EnrollmentsComponent, EnrollmentComponent, PaymentOptionsDialogComponent],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    SharedModule
  ]
})
export class EnrollmentsModule { }
