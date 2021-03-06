import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorGuard } from 'src/app/auth/guards/administrador.guard';

import { StudentsComponent } from './students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'editar-usuario/:id', loadChildren: () => import('../edit-user/edit-user.module').then(m => m.EditUserModule),canActivate:[AdministradorGuard] },
  { path: 'editar-usuario', loadChildren: () => import('../edit-user/edit-user.module').then(m => m.EditUserModule),canActivate:[AdministradorGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
