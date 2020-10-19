import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorsComponent } from './instructors.component';

const routes: Routes = [
  { path: '', component: InstructorsComponent },
  { path: 'editar-usuario/:id', loadChildren: () => import('../edit-user/edit-user.module').then(m => m.EditUserModule) },
  { path: 'editar-usuario', loadChildren: () => import('../edit-user/edit-user.module').then(m => m.EditUserModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorsRoutingModule { }
