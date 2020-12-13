import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorGuard } from 'src/app/auth/guards/administrador.guard';
import { EnrollmentComponent } from './enrollment/enrollment.component';

import { EnrollmentsComponent } from './enrollments.component';

const routes: Routes = [
  { path: '', component: EnrollmentsComponent,canActivate:[AdministradorGuard] },
  { path: 'nueva', component: EnrollmentComponent ,canActivate:[AdministradorGuard] },
  { path: 'nueva/:course_id', component: EnrollmentComponent ,canActivate:[AdministradorGuard] },
  { path: 'nueva/:course_id/:user_id', component: EnrollmentComponent ,canActivate:[AdministradorGuard] },
  { path: ':id', component: EnrollmentComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
