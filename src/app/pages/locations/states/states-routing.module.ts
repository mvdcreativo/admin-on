import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorGuard } from 'src/app/auth/guards/administrador.guard';

import { StatesComponent } from './states.component';

const routes: Routes = [
  { path: '', component: StatesComponent ,canActivate:[AdministradorGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesRoutingModule { }
