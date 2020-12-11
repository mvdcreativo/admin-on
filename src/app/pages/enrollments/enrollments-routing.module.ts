import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollmentComponent } from './enrollment/enrollment.component';

import { EnrollmentsComponent } from './enrollments.component';

const routes: Routes = [
  { path: '', component: EnrollmentsComponent },
  { path: 'nueva', component: EnrollmentComponent },
  { path: 'nueva/:course_id', component: EnrollmentComponent },
  { path: 'nueva/:course_id/:user_id', component: EnrollmentComponent },
  { path: ':id', component: EnrollmentComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
