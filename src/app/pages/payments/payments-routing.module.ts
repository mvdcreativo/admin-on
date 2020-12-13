import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsComponent } from './payments.component';
import { PaymentComponent } from './payment/payment.component';
import { AdministradorGuard } from 'src/app/auth/guards/administrador.guard';


const routes: Routes = [
  { path: '', component: PaymentsComponent,canActivate:[AdministradorGuard] },
  { path: 'nuevo', component: PaymentComponent,canActivate:[AdministradorGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
